const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const mongoose = require('mongoose');
const metricsRoutes = require('./routes/metrics');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/decarbeon')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Use metrics routes
app.use('/api/metrics', metricsRoutes);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Set();

// WebSocket data store for real-time updates
let wsData = {
  carbonMetrics: {},
  waterMetrics: {},
  wasteMetrics: {},
  energyMetrics: {}
};

// Function to broadcast data to all connected clients
const broadcastData = (data) => {
  const message = JSON.stringify(data);
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(message);
      } catch (error) {
        console.error('Error broadcasting data:', error);
        client.terminate();
      }
    }
  });
};

// WebSocket connection handler
wss.on('connection', (ws, req) => {
  clients.add(ws);
  console.log('New client connected');

  // Setup ping-pong for connection health check
  ws.isAlive = true;
  ws.on('pong', () => {
    ws.isAlive = true;
  });

  // Error handling
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clients.delete(ws);
    ws.terminate();
  });

  // Send initial data
  try {
    const initialData = {
      type: 'initial_data',
      data: wsData
    };
    ws.send(JSON.stringify(initialData));
  } catch (error) {
    console.error('Error sending initial data:', error);
    ws.terminate();
  }

  // Handle incoming messages
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      // Handle different types of messages
      if (data.type === 'get_metrics') {
        ws.send(JSON.stringify({
          type: 'metrics_update',
          data: wsData
        }));
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('close', () => {
    ws.isAlive = false;
    clients.delete(ws);
    console.log('Client disconnected');
  });
});

// Health check interval
const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      clients.delete(ws);
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', () => {
  clearInterval(interval);
});

// Root endpoint with API documentation
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Decarbeon API",
    version: "1.0.0",
    endpoints: {
      "/": "API documentation",
      "/api/emissions": "GET - Retrieve emissions data",
      "/api/emissions/update": "POST - Update emissions data"
    }
  });
});

// REST API endpoints
app.get('/api/emissions', (req, res) => {
  res.json(emissionsData);
});

// Update emissions data
app.post('/api/emissions/update', async (req, res) => {
  try {
    const updates = req.body;
    // Update the wsData with new emissions data
    wsData = {
      ...wsData,
      carbonMetrics: updates.carbonMetrics || wsData.carbonMetrics,
      waterMetrics: updates.waterMetrics || wsData.waterMetrics,
      wasteMetrics: updates.wasteMetrics || wsData.wasteMetrics,
      energyMetrics: updates.energyMetrics || wsData.energyMetrics
    };    

    // Broadcast updates to all connected clients
    broadcastData({
      type: 'data_update',
      data: wsData
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating emissions data:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});