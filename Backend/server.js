const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Ensure you have a User model
//const connectDB = require('./config/db');
const registrationRoute = require('./routes/registration'); // Import the registration route

dotenv.config();
const connectDB = require('./config/db');
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Serve static files
app.use(express.static('client/Frontend'));

// Use the registration route
app.use('/api', registrationRoute);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB Connection Error:', err));

// Registration API endpoint
app.post('/api/register', async (req, res) => {
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An unexpected error occurred!' });
});

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));