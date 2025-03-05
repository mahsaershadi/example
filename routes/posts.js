const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { ensureAuthenticated } = require('../middleware/auth');

// View all posts (protected route)
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const posts = await Post.find().populate('author');
    res.render('dashboard', { posts });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.redirect('/login');
  }
});

module.exports = router;