import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load environment variables
dotenv.config();

// Initialize Prisma client
const prisma = new PrismaClient();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// CORS configuration - fully permissive for development
app.use(cors({
  origin: '*', // Allow all origins in development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-Requested-With'],
  credentials: false // Set to false for simpler CORS handling
}));

// Handle preflight requests
app.options('*', cors());

// Middleware
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  if (req.method !== 'GET' && req.method !== 'OPTIONS') {
    console.log('Body:', req.body);
  }
  
  // Log response when it completes
  const originalSend = res.send;
  res.send = function(body) {
    console.log(`[${new Date().toISOString()}] Response ${res.statusCode}`);
    return originalSend.call(this, body);
  };
  
  next();
});

// Basic routes with simple text responses
app.get('/', (req, res) => {
  console.log('Root route accessed');
  res.send('Server is running.');
});

app.get('/api', (req, res) => {
  console.log('API route accessed');
  res.send('API root.');
});

// Database test route
app.get('/api/test-db', async (req, res) => {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    res.send('Database connection working.');
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).send('Database connection failed.');
  }
});

// 404 handler
app.use((req, res, next) => {
  console.log(`[404] Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start server
app.listen(port, () => {
  console.log(`==========================================================`);
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`==========================================================`);
  console.log('Available routes:');
  console.log(`- http://localhost:${port}/`);
  console.log(`- http://localhost:${port}/api`);
  console.log(`- http://localhost:${port}/api/test-db`);
  console.log(`==========================================================`);
}); 