import { useState, useEffect, useRef } from "react";

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
  const [isConnecting, setIsConnecting] = useState(false);
  const reconnectAttemptRef = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 3000;
  const INITIAL_CONNECTION_TIMEOUT = 5000;
  const isSubscribedRef = useRef(true);

  const connectWebSocket = () => {
    if (isConnecting || !isSubscribedRef.current) return null;
    
    setIsConnecting(true);
    let connectionTimeout: NodeJS.Timeout;
    
    try {
      const websocket = new WebSocket(WS_URL);
      
      connectionTimeout = setTimeout(() => {
        if (websocket.readyState !== WebSocket.OPEN) {
          websocket.close();
          setError("WebSocket connection timeout");
          setIsConnecting(false);
        }
      }, INITIAL_CONNECTION_TIMEOUT);

      websocket.onopen = () => {
        if (!isSubscribedRef.current) {
          websocket.close();
          return;
        }
        clearTimeout(connectionTimeout);
        console.log("WebSocket connected");
        setWs(websocket);
        reconnectAttemptRef.current = 0;
        setIsConnecting(false);
        setError(null);

        // Request initial data after connection
        websocket.send(JSON.stringify({ type: 'get_metrics' }));
      };

      websocket.onmessage = (event) => {
        if (!isSubscribedRef.current) return;
        try {
          const message = JSON.parse(event.data);
          if (!message.type || !message.data) {
            throw new Error("Invalid message format");
          }
          if (message.type === "data_update" || message.type === "metrics_update" || message.type === "initial_data") {
            setData(prevData => ({
              ...prevData,
              ...message.data.carbonMetrics,
              monthlyData: Array.isArray(message.data.carbonMetrics?.monthlyData) 
                ? message.data.carbonMetrics.monthlyData 
                : prevData.monthlyData,
              sourceData: Array.isArray(message.data.carbonMetrics?.sourceData) 
                ? message.data.carbonMetrics.sourceData 
                : prevData.sourceData
            }));
            setLoading(false);
          }
        } catch (err) {
          console.error("Error processing WebSocket message:", err);
          if (isSubscribedRef.current) {
            setError("Error processing real-time updates");
          }
        }
      };

      websocket.onerror = (event: Event) => {
        clearTimeout(connectionTimeout);
        const wsError = event as Event;
        const errorMessage =
          wsError instanceof Error
            ? wsError.message
            : "Network connection error";

        console.error("WebSocket error:", errorMessage);
        if (isSubscribedRef.current) {
          setError(`WebSocket connection error: ${errorMessage}`);
          setIsConnecting(false);

          if (reconnectAttemptRef.current < MAX_RECONNECT_ATTEMPTS) {
            const delay = RECONNECT_DELAY * Math.pow(2, reconnectAttemptRef.current);
            setTimeout(() => {
              if (isSubscribedRef.current) {
                reconnectAttemptRef.current += 1;
                connectWebSocket();
              }
            }, delay);
          }
        }
      };

      websocket.onclose = (event) => {
        clearTimeout(connectionTimeout);
        console.log("WebSocket disconnected", event.code, event.reason);
        if (isSubscribedRef.current) {
          setWs(null);
          setIsConnecting(false);
          
          if (event.code === 1000 || event.code === 1001) {
            // Normal closure or going away
            return;
          }
          
          if (reconnectAttemptRef.current < MAX_RECONNECT_ATTEMPTS) {
            const delay = RECONNECT_DELAY * Math.pow(2, reconnectAttemptRef.current);
            setTimeout(() => {
              if (isSubscribedRef.current) {
                reconnectAttemptRef.current += 1;
                connectWebSocket();
              }
            }, delay);
          } else {
            setError(
              "Failed to establish WebSocket connection after multiple attempts"
            );
          }
        }
      };

      return websocket;
    } catch (err) {
      console.error("Error creating WebSocket:", err);
      if (isSubscribedRef.current) {
        setError("Failed to create WebSocket connection");
        setIsConnecting(false);
      }
      return null;
    }
  };

  useEffect(() => {
    isSubscribedRef.current = true;
    const websocket = connectWebSocket();

    return () => {
      isSubscribedRef.current = false;
      if (websocket) {
        websocket.close(1000, "Component unmounting");
      }
      setWs(null);
      setIsConnecting(false);
      reconnectAttemptRef.current = 0;
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
