const Comment = require('../models/comments.model');

const getComments = (req, res) => {
  const { id } = req.params;

  Comment.getCommentsByTaskId(id, (err, comments) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(200).json(comments);
  });
};

const createComment = (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content é obrigatório' });
  }

  Comment.createComment(id, content, (err, comment) => {
    if (err) {
      if (err.code === '23503') {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json(comment);
  });
};

module.exports = {
  getComments,
  createComment
};