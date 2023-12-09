const dbClient = require('../utils/db');

const getStatus = (req, res) => {
  res.status(200).json({ status: 'Server is running' });
};

const getStats = (req, res) => {
  res.status(200).json({ db: dbClient.isAlive() });
};

module.exports = { getStatus, getStats };
