const express = require('express');
const router = express.Router();

// Example route for user authentication
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Login data:', { email, password });
  res.json({ message: 'Login successful!' });
});

module.exports = router;
