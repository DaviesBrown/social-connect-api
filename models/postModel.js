const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  text: {
    type: String,
    max: 100,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const postSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    max: 1024,
  },
  comment: {
    type: commentSchema,
  },
  image: {
    type: String,
  },
  likes: {
    type: Array,
    default: [],
  },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
