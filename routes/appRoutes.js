/* eslint-disable jest/require-hook */
const express = require('express');
const appController = require('../controllers/AppController');

const router = express.Router();

/**
 * @swagger
 * /status:
 *   get:
 *     summary: Get server status.
 *     tags: [App]
 *     security:
 *       - cookieAuth: []
 *     description: Returns a JSON object indicating the server status.
 *     responses:
 *       200:
 *         description: Successful response with server status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Server status message.
 */
router.get('/status', appController.getStatus);

/**
 * @swagger
 * /stats:
 *   get:
 *     summary: Get server statistics.
 *     tags: [App]
 *     security:
 *       - cookieAuth: []
 *     description: Returns a JSON object with the status of the database and Redis.
 *     responses:
 *       200:
 *         description: Successful response with database and Redis status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 redis:
 *                   type: boolean
 *                   description: Indicates the availability of Redis.
 *                 db:
 *                   type: boolean
 *                   description: Indicates the availability of the database.
 */
router.get('/stats', appController.getStats);

module.exports = router;
