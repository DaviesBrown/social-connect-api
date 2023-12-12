/* eslint-disable jest/require-hook */
const express = require('express');
const appRoutes = require('./appRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.use('/', appRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
