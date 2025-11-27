const express = require("express");
const router = express.Router();
const grades = require("../module/Grade");
const Student = require("../module/Student");

router.get("/:id/grades", async (req, res) => {
	try {
		const grades = await Grade.find({ studentId: req.params.id });
		res.json(grades);
	} catch (err) {
		return res.status(400).json({ message: "Greska", err: err.message });
	}
});

router.post("", async (req, res) => {
	try {
		const newStudent = new Student(req.body);
		const savedStudent = await newStudent.save();
		res.json(savedStudent);
	} catch (err) {
		return res.status(400).json({ message: "Greska", err: err.message });
	}
});

module.exports = router;
