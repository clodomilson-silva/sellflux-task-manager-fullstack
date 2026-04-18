const express = require('express');
const cors = require('cors');
const app = express();

const taskRoutes = require('./routes/tasks.routes');

const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3001,http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('Origem nao permitida por CORS'));
    }
  })
);

app.use(express.json());

app.use('/tasks', taskRoutes);

module.exports = app;