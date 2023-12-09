const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

const getStatus = (req, res) => {
  // GET /status
  res.status(200).json({ status: 'Server is running' });
};

const getStats = (req, res) => {
  // GET /stats
  res.status(200).json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
};

module.exports = { getStatus, getStats };
