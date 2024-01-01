/* eslint-disable jest/require-hook */
const express = require('express');
const userController = require('../controllers/UserController');
const authenticateToken = require('../utils/auth');

const router = express.Router();

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current user's details.
 *     description: Retrieve details of the currently logged-in user.
 *     security:
 *       - sessionAuth: []
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Current user's details retrieved successfully.
 *       500:
 *         description: Error retrieving user details.
 */
router.get('/me', authenticateToken, userController.getMe);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user details by ID.
 *     description: Retrieve user details by specifying the user ID.
 *     security:
 *       - sessionAuth: []
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 *       500:
 *         description: Error retrieving user details.
 */
router.get('/:id', authenticateToken, userController.getUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user details by ID.
 *     description: Update user details by specifying the user ID.
 *     security:
 *       - sessionAuth: []
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateInput'
 *     responses:
 *       200:
 *         description: User details updated successfully.
 *       403:
 *         description: Forbidden - User can update only their account.
 *       500:
 *         description: Error updating user details.
 */
router.put('/:id', authenticateToken, userController.updateMe);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID.
 *     description: Delete user by specifying the user ID.
 *     security:
 *       - sessionAuth: []
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User account deleted successfully.
 *       403:
 *         description: Forbidden - User can delete only their account.
 *       500:
 *         description: Error deleting user account.
 */
router.delete('/:id', authenticateToken, userController.deleteMe);

/**
 * @swagger
 * /users/{id}/follow:
 *   put:
 *     summary: Follow a user.
 *     description: Follow a user by specifying the user ID.
 *     security:
 *       - sessionAuth: []
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID to follow
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User followed successfully.
 *       403:
 *         description: Forbidden - Cannot follow yourself or already following the user.
 *       500:
 *         description: Error following the user.
 */
router.put('/:id/follow', authenticateToken, userController.putFollow);

/**
 * @swagger
 * /users/{id}/unfollow:
 *   put:
 *     summary: Unfollow a user.
 *     description: Unfollow a user by specifying the user ID.
 *     security:
 *       - sessionAuth: []
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID to unfollow
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User unfollowed successfully.
 *       403:
 *         description: Forbidden - Cannot unfollow yourself or not following the user.
 *       500:
 *         description: Error unfollowing the user.
 */
router.put('/:id/unfollow', authenticateToken, userController.putUnfollow);

module.exports = router;
