const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes);

// Registration API endpoint
app.post('/api/register', (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !phone) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  console.log('Received registration data:', { firstName, lastName, email, phone });

  res.json({ message: 'Registration successful!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An unexpected error occurred!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
