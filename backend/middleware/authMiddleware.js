const jwt = require('jsonwebtoken');

// Load secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key'; // Replace 'default_secret_key' with a strong default only for development/testing

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

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      // Handle token verification errors
      return res.status(403).json({
        message: 'Invalid or expired token',
        error: err.message, // Include error details for debugging in development (optional)
      });
    }

    // Attach decoded token data to the request object
    req.user = decoded;

    // Proceed to the next middleware or route
    next();
  });
};
