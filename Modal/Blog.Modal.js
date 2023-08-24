const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    username: String,
    content: String,
  },
  {
    versionKey: false,
  }
);

const blogSchema = mongoose.Schema(
  {
    
    username: String,
    title: String,
    content: String,
    category: String,
    date: String,
    likes: Number,
    comments: [commentSchema],
  },
  {
    versionKey: false,
  }
);

const BlogModal = mongoose.model('Blog', blogSchema);
module.exports = { BlogModal };
