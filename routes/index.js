const express = require('express');
const appRoutes = require('./appRoutes');
const router = express.Router();

router.use('/', appRoutes);

module.exports = router;
