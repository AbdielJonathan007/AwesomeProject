import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Database } from './database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize database
const db = new Database();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Progress Buddy API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Initialize database and routes
async function startServer() {
  try {
    await db.init();
    console.log('✅ Database initialized successfully');
    
    // Import and set up routes after database is ready
    const { default: activitiesRouter } = await import('./routes/activities.js');
    const { default: logsRouter } = await import('./routes/logs.js');
    const { default: notificationsRouter } = await import('./routes/notifications.js');
    
    app.use('/api/activities', activitiesRouter);
    app.use('/api/logs', logsRouter);
    app.use('/api/notifications', notificationsRouter);
    
    console.log('✅ Routes initialized successfully');
    
    app.listen(PORT, () => {
      console.log(`🚀 Progress Buddy API server running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    });
    
  } catch (error) {
    console.error('❌ Failed to initialize server:', error);
    process.exit(1);
  }
}

startServer();

export { db };