/* eslint-disable jest/require-hook */
const express = require('express');
const authController = require('../controllers/AuthController');
const authenticateToken = require('../utils/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user.
 *     tags: [Authentication]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registered successfully.
 *       '400':
 *         description: Missing email/username/password or user already exists.
 *       '500':
 *         description: Registration failed.
 */
router.post('/register', authController.registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user.
 *     tags: [Authentication]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully.
 *       '401':
 *         description: Invalid user credentials or password.
 *       '500':
 *         description: Login failed.
 */
router.post('/login', authController.loginUser);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out a user.
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: User logged out successfully.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Logout failed.
 */
router.post('/logout', authenticateToken, authController.logoutUser);

module.exports = router;
