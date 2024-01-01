/* eslint-disable jest/require-hook */
const express = require('express');
const postController = require('../controllers/PostController');
const authenticateToken = require('../utils/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PostInput:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         content:
 *           type: string
 *           description: The content of the post.
 *         image:
 *           type: string
 *           description: URL to the image attached to the post.
 *       example:
 *         content: "This is a sample post content."
 *         image: "https://example.com/sample-image.jpg"
 *
 *     CommentInput:
 *       type: object
 *       required:
 *         - text
 *       properties:
 *         text:
 *           type: string
 *           description: The text content of the comment.
 *       example:
 *         text: "This is a sample comment."
 *
 *     Post:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the post.
 *         userId:
 *           type: string
 *           description: ID of the user who created the post.
 *         content:
 *           type: string
 *           description: The content of the post.
 *         comments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Comment'
 *           description: List of comments associated with the post.
 *         image:
 *           type: string
 *           description: URL to the image attached to the post.
 *         likes:
 *           type: array
 *           items:
 *             type: string
 *           description: List of user IDs who liked the post.
 *       example:
 *         _id: "60aa936093b272001c1e56c5"
 *         userId: "60aa936093b272001c1e56c6"
 *         content: "This is a sample post content."
 *         comments: []
 *         image: "https://example.com/sample-image.jpg"
 *         likes: []
 *
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the comment.
 *         text:
 *           type: string
 *           description: The text content of the comment.
 *         userId:
 *           type: string
 *           description: ID of the user who posted the comment.
 *         post:
 *           type: string
 *           description: ID of the post the comment is associated with.
 *       example:
 *         _id: "60aa936093b272001c1e56c7"
 *         text: "This is a sample comment."
 *         userId: "60aa936093b272001c1e56c6"
 *         post: "60aa936093b272001c1e56c5"
 *
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the user.
 *         username:
 *           type: string
 *           description: The username of the user.
 *         email:
 *           type: string
 *           description: The email address of the user.
 *         profilePicture:
 *           type: string
 *           description: URL to the user's profile picture.
 *         coverPicture:
 *           type: string
 *           description: URL to the user's cover picture.
 *         followers:
 *           type: array
 *           items:
 *             type: string
 *           description: List of user IDs who follow this user.
 *         followings:
 *           type: array
 *           items:
 *             type: string
 *           description: List of user IDs whom this user follows.
 *         isAdmin:
 *           type: boolean
 *           description: Indicates whether the user is an admin.
 *         desc:
 *           type: string
 *           description: Short description/bio of the user.
 *         city:
 *           type: string
 *           description: The city where the user is located.
 *         from:
 *           type: string
 *           description: The origin/place the user is from.
 *       example:
 *         _id: "60aa936093b272001c1e56c6"
 *         username: "sample_user"
 *         email: "user@example.com"
 *         profilePicture: "https://example.com/profile.jpg"
 *         coverPicture: "https://example.com/cover.jpg"
 *         followers: []
 *         followings: []
 *         isAdmin: false
 *         desc: "Sample user bio."
 *         city: "Sample City"
 *         from: "Sample Origin"
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post.
 *     description: Create a new post.
 *     tags:
 *       - Post
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostInput'
 *     responses:
 *       201:
 *         description: Post created successfully.
 *       500:
 *         description: Error creating post.
 */
router.post('/', authenticateToken, postController.createPost);

/**
 * @swagger
 * /posts/me:
 *   get:
 *     summary: Get current user's posts.
 *     description: Retrieve posts of the currently logged-in user.
 *     tags:
 *       - Post
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Current user's posts retrieved successfully.
 *       500:
 *         description: Error retrieving user's posts.
 */
router.get('/me', authenticateToken, postController.getUserPost);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID.
 *     description: Retrieve a post by specifying the post ID.
 *     tags:
 *       - Post
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Post ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post retrieved successfully.
 *       500:
 *         description: Error retrieving post.
 */
router.get('/:id', authenticateToken, postController.getPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post by ID.
 *     description: Update a post by specifying the post ID.
 *     tags:
 *       - Post
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Post ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostInput'
 *     responses:
 *       200:
 *         description: Post updated successfully.
 *       403:
 *         description: Forbidden - User can update only their post.
 *       500:
 *         description: Error updating post.
 */
router.put('/:id', authenticateToken, postController.updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID.
 *     description: Delete a post by specifying the post ID.
 *     tags:
 *       - Post
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Post ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully.
 *       403:
 *         description: Forbidden - User can delete only their post.
 *       500:
 *         description: Error deleting post.
 */
router.delete('/:id', authenticateToken, postController.deletePost);

/**
 * @swagger
 * /posts/{id}/like:
 *   put:
 *     summary: Like or unlike a post.
 *     description: Like or unlike a post by specifying the post ID.
 *     tags:
 *       - Post
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Post ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post liked/unliked successfully.
 *       500:
 *         description: Error liking/unliking post.
 */
router.put('/:id/like', authenticateToken, postController.putLike);

/**
 * @swagger
 * /posts/{id}/comment:
 *   put:
 *     summary: Comment on a post.
 *     description: Comment on a post by specifying the post ID.
 *     tags:
 *       - Post
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Post ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentInput'
 *     responses:
 *       201:
 *         description: Comment posted successfully.
 *       500:
 *         description: Error posting comment.
 */
router.put('/:id/comment', authenticateToken, postController.postComment);

/**
 * @swagger
 * /posts/timeline/all:
 *   get:
 *     summary: Get timeline posts.
 *     description: Retrieve posts from the user's timeline.
 *     tags:
 *       - Post
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Timeline posts retrieved successfully.
 *       500:
 *         description: Error retrieving timeline posts.
 */
router.get('/timeline/all', authenticateToken, postController.getTimeline);

module.exports = router;
