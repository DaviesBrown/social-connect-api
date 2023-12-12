const Post = require('../models/postModel');

const createPost = async (req, res) => {
  // POST /posts
  const newPost = Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getPost = async (req, res) => {
  // GET /posts/:id
  try {
    const post = await Post.findById(req.params.id);
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
      res.status(403).json('you can delete only your post');
    }
  } catch (err) {
    res.status(500).json({ error: 'This post has been deleted'});
  }
};

const putLike = async (req, res) => {
  // PUT /posts/:id/like
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user.userId)) {
      await post.updateOne({ $push: { likes: req.user.userId } });
      res.status(200).json('The post has been liked');
    } else {
      await post.updateOne({ $pull: { likes: req.user.userId } });
      res.status(200).json('The post has been disliked');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getTimeline = async (req, res) => {
  // GET /posts/timeline/all
  
};

module.exports = {
  createPost, getPost, updatePost, deletePost, putLike, putUnlike,
};