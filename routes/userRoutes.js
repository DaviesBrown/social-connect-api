/* eslint-disable jest/require-hook */
const express = require('express');
const userController = require('../controllers/UserController');
const authenticateToken = require('../utils/auth');

const router = express.Router();

// UserController routes
router.get('/:id', authenticateToken, userController.getMe);
router.put('/:id', authenticateToken, userController.updateMe);
router.delete('/:id', authenticateToken, userController.deleteMe);
router.put('/:id/follow', authenticateToken, userController.putFollow);
router.put('/:id/unfollow', authenticateToken, userController.putUnfollow);

module.exports = router;
