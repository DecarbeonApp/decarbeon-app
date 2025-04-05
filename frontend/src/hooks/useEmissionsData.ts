import { useState, useEffect } from "react";

interface EmissionsData {
  monthlyData: Array<{
    month: string;
    emissions: number;
    reduction: number;
    target: number;
    intensity: number;
  }>;
  sourceData: Array<{
    name: string;
    value: number;
  }>;
}

const DEFAULT_DATA: EmissionsData = {
  monthlyData: [],
  sourceData: []
};

interface UseEmissionsDataReturn {
  data: EmissionsData | null;
  loading: boolean;
  error: string | null;
  updateData: (updates: Partial<EmissionsData>) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001";

export function useEmissionsData(): UseEmissionsDataReturn {
  const [data, setData] = useState<EmissionsData>(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [reconnectAttempt, setReconnectAttempt] = useState(0);
  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 3000;

  // Initial data fetch from REST API
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/metrics/carbon`);
        if (!response.ok) throw new Error('Failed to fetch initial data');
        const initialData = await response.json();
        setData(initialData);
      } catch (err) {
        console.error('Error fetching initial data:', err);
        setError('Failed to fetch initial data');
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const connectWebSocket = () => {
    const websocket = new WebSocket(WS_URL);

    websocket.onopen = () => {
      console.log("WebSocket connected");
      setWs(websocket);
      setReconnectAttempt(0);
      setError(null);
    };

    websocket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (!message.type || !message.data) {
          throw new Error("Invalid message format");
        }
        if (message.type === "data_update" || message.type === "initial_data") {
          setData(prevData => ({
            ...prevData,
            ...message.data,
            monthlyData: Array.isArray(message.data.monthlyData) ? message.data.monthlyData : prevData.monthlyData,
            sourceData: Array.isArray(message.data.sourceData) ? message.data.sourceData : prevData.sourceData
          }));
        }
      } catch (err) {
        console.error("Error processing WebSocket message:", err);
        setError("Error processing real-time updates");
      }
    };

    websocket.onerror = (event: Event) => {
      const wsError = event as Event;
      const errorMessage =
        wsError instanceof Error
          ? wsError.message
          : wsError instanceof Event
          ? "Network connection error"
          : "Unknown WebSocket error";

      console.error("WebSocket error:", errorMessage);
      setError(`WebSocket connection error: ${errorMessage}`);

      if (reconnectAttempt < MAX_RECONNECT_ATTEMPTS) {
        setTimeout(() => {
          setReconnectAttempt((prev) => prev + 1);
          connectWebSocket();
        }, RECONNECT_DELAY * (reconnectAttempt + 1));
      }
    };

    websocket.onclose = () => {
      console.log("WebSocket disconnected");
      setWs(null);
      if (reconnectAttempt < MAX_RECONNECT_ATTEMPTS) {
        setTimeout(() => {
          setReconnectAttempt((prev) => prev + 1);
          connectWebSocket();
        }, RECONNECT_DELAY);
      } else {
        setError(
          "Failed to establish WebSocket connection after multiple attempts"
        );
      }
    };

    return websocket;
  };

  useEffect(() => {
    const abortController = new AbortController();

    // Initial data fetch
    fetch(`${API_URL}/api/emissions`, { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError("Failed to fetch emissions data");
        setLoading(false);
      });

    // WebSocket connection
    const websocket = connectWebSocket();

    return () => {
      abortController.abort();
      websocket.close();
    };
  }, []);

  const updateData = async (updates: Partial<EmissionsData>) => {
    try {
      const response = await fetch(`${API_URL}/api/emissions/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error("Update failed");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update emissions data";
      setError(errorMessage);
      throw err; // Re-throw to allow handling by the caller
    }
  };

  return { data, loading, error, updateData };
}
