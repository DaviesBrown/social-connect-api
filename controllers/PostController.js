const User = require('../models/userModel');
const { Post, Comment } = require('../models/postModel');

const createPost = async (req, res) => {
  // POST /posts
  const newPost = Post({ userId: req.user.userId, content: req.body.content, ...req.body });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getUserPost = async (req, res) => {
  // GET /posts/me
  try {
    const currentUser = await User.findById(req.user.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json({ error: 'Post not found' });
  }
};

const getPost = async (req, res) => {
  // GET /posts/:id
  try {
    const post = await Post.findById(req.params.id).populate('comments');
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Post not found' });
  }
};

const updatePost = async (req, res) => {
  // PUT /posts/:id
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.user.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json({ message: 'The post has been updated' });
    } else {
      res.status(403).json({ message: 'You can only update your post' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deletePost = async (req, res) => {
  // DELETE /posts/:id
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.user.userId) {
      await post.deleteOne();
      res.status(200).json({ message: 'The post has been deleted' });
    } else {
      res.status(403).json({ message: 'You can delete only your post' });
    }
  } catch (err) {
    res.status(500).json({ error: 'This post has been deleted' });
  }
};

const putLike = async (req, res) => {
  // PUT /posts/:id/like
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user.userId)) {
      await post.updateOne({ $push: { likes: req.user.userId } });
      res.status(200).json({ message: 'The post has been liked' });
    } else {
      await post.updateOne({ $pull: { likes: req.user.userId } });
      res.status(200).json({ message: 'The post has been disliked' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const postComment = async (req, res) => {
  try {
    const { userId } = req.user;
    const postId = req.params.id;
    const { text } = req.body;
    const post = await Post.findById(postId);
    const newComment = await Comment.create({
      text,
      userId,
      post: postId,
    });
    post.comments.push(newComment);
    post.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTimeline = async (req, res) => {
  // GET /posts/timeline/all
  try {
    const currentUser = await User.findById(req.user.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => Post.find({ userId: friendId })),
    );
    res.json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  createPost, getUserPost, getPost, updatePost, deletePost, putLike, postComment, getTimeline,
};
