const express = require("express");
const router = express.Router();
const rateLimiterLogin = require("../middleware/rateLimiter");

const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", rateLimiterLogin, userCtrl.login);

module.exports = router;
