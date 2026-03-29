import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

import express from 'express';
import cors from 'cors';

async function start() {
  const app = express();
  const PORT = process.env.PORT || 5000;

  // Middleware
  app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? false : 'http://localhost:5173', // Allow specific origin in dev, auto-detect in prod
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow credentials
  }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));

  // Import routes after dotenv is configured
  const { default: booksRouter } = await import('../routes/books.js');
  const authRoutes = (await import('../routes/authRoutes.js')).default;
  
  // Register routes
  app.use('/api/books', booksRouter);
  app.use('/api/auth', authRoutes);

  // Error handling
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message });
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});