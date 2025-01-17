const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

// Hardcoded credentials (for testing purposes)
const USERNAME = 'admin';
const PASSWORD_HASH = '$2b$10$KPWTnF5jbqPcdQnzUIkxZ.664F7oOJsuvdBeKT4T7i8JJpxnZbota'; // Password: "password"
const JWT_SECRET = 'your_secret_key';

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check username
  if (username !== USERNAME) {
    return res.status(401).json({ message: 'Invalid username' });
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, PASSWORD_HASH);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  // Generate JWT token
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({
    message: 'Login successful',
    token,
  });
});

module.exports = router;
