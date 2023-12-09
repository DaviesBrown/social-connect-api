/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const redisClient = require('./redis');

async function authenticateToken(req, res, next) {
  // authentication middleware
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  redisClient.store.sismember('blacklist', token, (err, reply) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (reply === 1) {
      return res.status(401).json({ error: 'Token revoked' });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.user = user;
      next();
    });
  });
}

module.exports = authenticateToken;
