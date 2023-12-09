/* eslint-disable jest/require-hook */
const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');
const dbClient = require('./utils/db');
const authenticateToken = require('./utils/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

dbClient.connectDB();

app.use(express.json());
app.use('/', routes);

app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Access granted' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
