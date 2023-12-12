/* eslint-disable jest/require-hook */
const express = require('express');
const postController = require('../controllers/PostController');
const authenticateToken = require('../utils/auth');

const router = express.Router();

// PostController routes
router.post('/', authenticateToken, postController.createPost);
router.get('/:id', authenticateToken, postController.getPost);
router.put('/:id', authenticateToken, postController.updatePost);
router.delete('/:id', authenticateToken, postController.deletePost);
router.put('/:id/like', authenticateToken, postController.putLike);
router.put('/:id/unlike', authenticateToken, postController.putUnlike);

module.exports = router;
