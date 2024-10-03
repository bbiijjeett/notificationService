const rateLimit = require('express-rate-limit');

const apiLimiter  = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 10, // limit each IP to 5 requests per windowMs
    message: 'Too many requests, please try again later.'
});

module.exports = apiLimiter;
