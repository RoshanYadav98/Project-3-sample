// Import required modules
const express = require('express');
const path = require('path');

// Create an Express application
const app = express();

// Port configuration
const PORT = 3000;

// Serve static files from the "public" directory
const StaticDirectory = path.join(__dirname, 'public');
app.use(express.static(StaticDirectory));

// Log a startup message
console.log('CSC-317 startup template');
console.log('This template uses Node.js, Express, and Express.static');

// Example API route
app.get('/api/example', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
