/* eslint-disable jest/require-hook */
const express = require('express');
const authController = require('../controllers/AuthController');

const router = express.Router();

// AuthController routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);

module.exports = router;
