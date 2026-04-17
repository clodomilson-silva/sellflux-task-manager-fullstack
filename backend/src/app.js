const express = require('express');
const app = express();

const taskRoutes = require('./routes/tasks.routes');

app.use(express.json());

app.use('/tasks', taskRoutes);

module.exports = app;