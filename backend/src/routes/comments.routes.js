const express = require('express');
const router = express.Router({ mergeParams: true });

const controller = require('../controllers/comments.controller');

router.get('/', controller.getComments);
router.post('/', controller.createComment);

module.exports = router;