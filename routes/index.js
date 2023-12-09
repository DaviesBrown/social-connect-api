/* eslint-disable jest/require-hook */
const express = require('express');
const appRoutes = require('./appRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.use('/', appRoutes);
router.use('/', authRoutes);

module.exports = router;
