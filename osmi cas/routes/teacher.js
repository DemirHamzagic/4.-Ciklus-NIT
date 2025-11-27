const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher");

router.get("/", teacherController.getTeacher);

router.get("/:id", teacherController.getAllTeachers);

router.post("/", teacherController.createTeacher);

router.put("/:id", teacherController.updateTeacher);

router.delete("/:id", teacherController.deleteTeacher);

module.exports = router;
