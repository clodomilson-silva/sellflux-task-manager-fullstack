const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasks.controller');
const commentsRoutes = require('./comments.routes');

router.get('/', tasksController.getTasks);
router.post('/', tasksController.createTask);
router.patch('/:id', tasksController.toggleTask);
router.delete('/:id', tasksController.deleteTask);

// ROTAS ANINHADAS PARA COMMENTS
router.use('/:id/comments', commentsRoutes);

module.exports = router;