const express = require("express");
const router = express.Router();
const controller = require("../controller/postCnt");
const auth = require("../middlewares/auth");

router.get("/", auth, controller.getAllPosts);
router.post("/", auth, controller.createPost);
router.get("/:id", auth, controller.getOnePost);
router.put("/:id", auth, controller.updatePost);
router.delete("/:id", auth, controller.deletePost);

module.exports = router;
