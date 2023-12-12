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
const updateMe = async (req, res) => {};
const deleteMe = async (req, res) => {};
const putFollow = async (req, res) => {};
const putUnfollow = async (req, res) => {};

module.exports = {
  getMe, updateMe, deleteMe, putFollow, putUnfollow,
};
