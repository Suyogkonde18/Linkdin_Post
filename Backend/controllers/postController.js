const Post = require('../models/Post');
const User = require('../models/User');

// Create Post
exports.createPost = async (req, res) => {
  try {
    const { text } = req.body;

    const post = await Post.create({
      text,
      author: req.user.id, // user ID from auth middleware
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Posts (Home Feed)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('author', 'name email'); 

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
