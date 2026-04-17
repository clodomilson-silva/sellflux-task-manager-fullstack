const client = require('../config/db');

const getCommentsByTaskId = (taskId, callback) => {
  const query = `
    SELECT * FROM comments
    WHERE task_id = $1
    ORDER BY created_at ASC
  `;
  client.query(query, [taskId], callback);
};

const createComment = (taskId, content, callback) => {
  const query = `
    INSERT INTO comments (task_id, content)
    VALUES ($1, $2)
    RETURNING *
  `;
  client.query(query, [taskId, content], callback);
};

module.exports = {
  getCommentsByTaskId,
  createComment
};