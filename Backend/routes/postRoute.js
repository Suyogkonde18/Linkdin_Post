const express = require('express');
const { createPost, getAllPosts } = require('../controllers/postController');
const { protect } = require('../middelware/authMiddleware');

const router = express.Router();

router.post('/create', protect, createPost);
router.get('/', protect, getAllPosts);

module.exports = router;
