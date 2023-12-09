/* eslint-disable jest/require-hook */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    const hasedPassword = await bcrypt.hash(this.password, salt);
    this.password = hasedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
