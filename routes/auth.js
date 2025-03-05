const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log('Registration attempt:', { username, email, password }); // Debugging
  try {
    const user = new User({ username, email, password });
    await user.save();
    console.log('User created:', user); // Debugging
    res.redirect('/login');
  } catch (err) {
    console.error('Registration error:', err); // Debugging
    res.redirect('/register');
  }
});

router.get('/login', (req, res) => {
  res.render('login'); 
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email, password }); // Debugging
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found'); // Debugging
      return res.redirect('/login');
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Incorrect password'); // Debugging
      return res.redirect('/login');
    }

    // Set the session and redirect
    req.session.userId = user._id;
    console.log('Login successful, user ID:', user._id); // Debugging
    res.redirect('/posts');
  } catch (err) {
    console.error('Login error:', err); // Debugging
    res.redirect('/login');
  }
});
// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;