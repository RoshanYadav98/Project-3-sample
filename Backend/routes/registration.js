const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Ensure the path is correct

const router = express.Router();

// Registration API endpoint
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists.' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = new User({ firstName, lastName, email, phone, password: hashedPassword });
  await user.save();

  res.json({ message: 'Registration successful!' });
});

module.exports = router;