const express = require("express");
const router = express.Router();
const classController = require("../controllers/classroom");

router.get("/", classController.getClass);

router.get("/:id", classController.getAllClasses);

router.post("/", classController.createClassroom);

router.put("/:id", classController.updateClass);

router.patch("/:id", classController.replaceClass);

router.delete("/:id", classController.deleteClassroom);

module.exports = router;
