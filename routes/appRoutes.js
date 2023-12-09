/* eslint-disable jest/require-hook */
const express = require('express');
const appController = require('../controllers/AppController');

const router = express.Router();

// AppController Routes
router.get('/status', appController.getStatus);
router.get('/stats', appController.getStats);

module.exports = router;
