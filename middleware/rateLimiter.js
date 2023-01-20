const rateLimiter = require("express-rate-limit");

const rateLimiterLogin = rateLimiter({
  windowMs: 60 * 1000,
  max: 2,
  message: "You have exceeded the 2 requests in 1 minute limit!",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = rateLimiterLogin;
