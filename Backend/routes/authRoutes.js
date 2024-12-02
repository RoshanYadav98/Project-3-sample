const express = require('express');
const User = require('./models/User'); // Import the User model
const bcrypt = require('bcryptjs');    // For password hashing
const router = express.Router();

// Example route for user authentication
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Login data:', { email, password });
  res.json({ message: 'Login successful!' });
});

module.exports = router;

const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// POST: Register a new user
router.post('/register', registerUser);

// POST: Login an existing user
router.post('/login', loginUser);

module.exports = router;

// Registration endpoint
router.post('/api/register', async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  try {
      // Check if the user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Create the new user in the database
      const newUser = new User({
          firstName,
          lastName,
          email,
          phone,
      });

      await newUser.save(); // Save the user to MongoDB

      res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
  } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});
