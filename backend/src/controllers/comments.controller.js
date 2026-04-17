const Comment = require('../models/comments.model');

const getComments = (req, res) => {
  const { id } = req.params;

  Comment.getCommentsByTaskId(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(200).json(result.rows);
  });
};

const createComment = (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content é obrigatório' });
  }

  Comment.createComment(id, content, (err, result) => {
    if (err) {
      // possível erro de FK (task inexistente)
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json(result.rows[0]);
  });
};

module.exports = {
  getComments,
  createComment
};