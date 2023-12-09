const express = require('express');
const appController = require('../controllers/AppController');
const router = express.Router();

// AppController Routes
router.get('/', appController.getStatus);

module.exports = router;
