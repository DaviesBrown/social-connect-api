const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    max: 1024,
  },
  images: {
    type: String,
  },
  likes: {
    type: Array,
    default: [],
  },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
