import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

async function start() {
  const app = express();
  const PORT = process.env.PORT || 5000;

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Import routes after dotenv is configured
  const { default: booksRouter } = await import('../routes/books.js');
  app.use('/api/books', booksRouter);

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
