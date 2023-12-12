/* eslint-disable jest/require-hook */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    unique: true,
  },
  profilePicture: {
    type: String,
    default: '',
  },
  coverPicture: {
    type: String,
    default: '',
  },
  followers: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  desc: {
    type: String,
    max: 50,
  },
  city: {
    type: String,
    max: 50,
  },
  from: {
    type: String,
    max: 50,
  },
}, { timestamps: true });

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
