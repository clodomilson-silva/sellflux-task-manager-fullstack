const client = require('../config/db');

const getAllTasks = (callback) => {
  client.query('SELECT * FROM tasks ORDER BY created_at DESC', [], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result.rows);
  });
};

const createTask = (title, description, callback) => {
  const query = `
    INSERT INTO tasks (title, description)
    VALUES ($1, $2)
    RETURNING *
  `;
  client.query(query, [title, description], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result.rows[0]);
  });
};

const toggleTask = (id, callback) => {
  const query = `
    UPDATE tasks
    SET completed = NOT completed
    WHERE id = $1
    RETURNING *
  `;
  client.query(query, [id], (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result.rows[0]);
  });
};

const deleteTask = (id, callback) => {
  client.query('DELETE FROM tasks WHERE id = $1', [id], callback);
};

module.exports = {
  getAllTasks,
  createTask,
  toggleTask,
  deleteTask
};