const jwt = require('jsonwebtoken');

// Secret key for signing tokens
const JWT_SECRET = 'your_secret_key'; // Replace with a secure key in production

/**
 * Middleware to authenticate JWT tokens
 */
exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is provided
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token is missing or invalid' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user data to the request object
    req.user = decoded;

    // Call the next middleware
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
