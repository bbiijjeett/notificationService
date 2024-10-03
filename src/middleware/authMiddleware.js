const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Check if Authorization header is present
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied, no token provided.' });
    }

    // Check if token starts with "Bearer "
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ error: 'Invalid token format. Expected Bearer token.' });
    }

    // Extract token by removing "Bearer " prefix
    const token = authHeader.replace('Bearer ', '');

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the user details to the request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token.' });
    }
};

module.exports = authMiddleware;
