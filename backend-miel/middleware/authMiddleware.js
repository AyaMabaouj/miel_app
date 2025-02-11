const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/BlacklistToken'); // Import Blacklist Model

const authenticate = async (req, res, next) => {
    let token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Remove 'Bearer ' prefix if present
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    try {
        // Check if token is blacklisted
        const blacklistedToken = await BlacklistToken.findOne({ token });
        if (blacklistedToken) {
            return res.status(403).json({ message: 'Token is no longer valid. Please log in again.' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach user info to the request
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = authenticate;
