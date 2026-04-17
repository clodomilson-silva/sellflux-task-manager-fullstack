const Task = require('../models/tasks.model');

const getTasks = (req, res) => {
  Task.getAllTasks((err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result.rows);
  });
};

const createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Titulo é obrigatório' });
  }

  Task.createTask(title, description, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(result.rows[0]);
  });
};

const toggleTask = (req, res) => {
  const { id } = req.params;

  Task.toggleTask(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result.rows[0]);
  });
};

const deleteTask = (req, res) => {
  const { id } = req.params;

  Task.deleteTask(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).send();
  });
};

module.exports = {
  getTasks,
  createTask,
  toggleTask,
  deleteTask
};