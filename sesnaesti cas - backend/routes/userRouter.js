const express = require("express");
const router = express.Router();
const controller = require("../controller/userCnt");
const auth = require("../middlewares/auth");

router.get("/me/:id", auth, controller.userProfile);
router.post("/register", controller.registerUser);
router.post("/login", controller.loginUser);
router.post("/logout", auth, controller.logoutUser);

module.exports = router;
