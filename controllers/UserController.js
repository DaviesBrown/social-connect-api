const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const getMe = async (req, res) => {
  // GET /users/:id
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateMe = async (req, res) => {
  // PUT /users/:id
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json('Your account has been updated');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can update only your account!');
  }
};
const deleteMe = async (req, res) => {};
const putFollow = async (req, res) => {};
const putUnfollow = async (req, res) => {};

module.exports = {
  getMe, updateMe, deleteMe, putFollow, putUnfollow,
};
