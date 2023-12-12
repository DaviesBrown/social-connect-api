/* eslint-disable jest/require-hook */
const express = require('express');
const userController = require('../controllers/UserController');
const authenticateToken = require('../utils/auth');

const router = express.Router();

// UserController routes
router.get('/:id', authenticateToken, userController.getMe);
router.put('/users/:id', authenticateToken, userController.updateMe);
router.delete('/users/:id', authenticateToken, userController.deleteMe);
router.put('/users/:id/follow', authenticateToken, userController.putFollow);
router.put('/users/:id/unfollow', authenticateToken, userController.putUnfollow);

module.exports = router;
