/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const getMe = async (req, res) => {
  // GET /users/me
  try {
    const user = await User.findById(req.user.userId);
    const { password, updatedAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getUser = async (req, res) => {
  // GET /users/:id
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateMe = async (req, res) => {
  // PUT /users/:id
  if (req.user.userId === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json({ message: 'Your account has been updated' });
    } catch (err) {
      return res.status(500).json({ error: 'User not found' });
    }
  } else {
    return res.status(403).json({ message: 'You can update only your account!' });
  }
};

const deleteMe = async (req, res) => {
  if (req.user.userId === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Your account has been deleted' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  } else {
    return res.status(403).json({ message: 'You can only delete your account!' });
  }
};

const putFollow = async (req, res) => {
  // PUT /users/:id/follow
  if (req.user.userId !== req.params.id) {
    try {
      const followUser = await User.findById(req.params.id);
      const currentUser = await User.findById(req.user.userId);
      if (!followUser.followers.includes(req.user.userId)) {
        await followUser.updateOne({ $push: { followers: req.user.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json({ message: `You have followed ${followUser.username}` });
      } else {
        res.status(403).json({ message: `You already follow ${followUser.username}` });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(403).json({ message: "You can't follow yourself" });
  }
};

const putUnfollow = async (req, res) => {
  // PUT /users/:id/unfollow
  if (req.user.userId !== req.params.id) {
    try {
      const followUser = await User.findById(req.params.id);
      const currentUser = await User.findById(req.user.userId);
      if (followUser.followers.includes(req.user.userId)) {
        await followUser.updateOne({ $pull: { followers: req.user.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json({ message: `You have unfollowed ${followUser.username}` });
      } else {
        res.status(403).json({ message: `You don't follow ${followUser.username}` });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(403).json({ message: "You can't unfollow yourself" });
  }
};

module.exports = {
  getMe, getUser, updateMe, deleteMe, putFollow, putUnfollow,
};
