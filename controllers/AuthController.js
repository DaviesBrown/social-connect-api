/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const redisClient = require('../utils/redis');

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!username) {
      return res.status(400).json({ error: 'Missing username' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const userExists = await User.exists({ email, username });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Registration failed' });
  }
};

const loginUser = async (req, res) => {
  // POST /login
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '24h' });
    return res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

const logoutUser = async (req, res) => {
  // POST /logout
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    await redisClient.store.sadd('blacklist', token);
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Logout failed' });
  }
};

module.exports = { registerUser, loginUser, logoutUser };
