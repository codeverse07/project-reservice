const rateLimit = require('express-rate-limit');

// General API Rate Limiter
exports.globalLimiter = rateLimit({
    max: 1000,
    windowMs: 15 * 60 * 1000,
    message: 'Too many requests!'
});

// Strict Limiter for Auth Routes
exports.authLimiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many login attempts!'
});
