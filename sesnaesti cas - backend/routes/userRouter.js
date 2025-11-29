const express = require("express");
const router = express.Router();
const controller = require("../controller/userCnt.js");
const auth = require("../middlewares/auth");
const { loginLimiter } = require("../middlewares/rateLimit");

router.get("/me/:id", auth, controller.userProfile);
router.post("/register", controller.registerUser);
router.post("/login", loginLimiter, controller.loginUser);
router.post("/logout", auth, controller.logoutUser);

module.exports = router;
