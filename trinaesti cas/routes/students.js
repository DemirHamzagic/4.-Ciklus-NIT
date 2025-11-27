const express = require("express");
const router = express.Router();
const Student = require("../modules/Students");

router.get("/", async (req, res) => {
	try {
		const students = await Student.find();
		res.json(students);
	} catch (err) {
		return res.status(400).json({ message: "Greska", err: err.message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const student = await Student.findById(req.params.id);
		if (!student)
			return res.status(404).json({ message: "Student nije pronadjen" });
		res.status(201).json(student);
	} catch (err) {
		return res.status(400).json({ message: "Greska", err: err.message });
	}
});

router.post("/", async (req, res) => {
	try {
		const newStudent = new Student(req.body);
		const savedStudent = await newStudent.save();
		res.json(savedStudent);
	} catch (err) {
		return res.status(400).json({ message: "Greska", err: err.message });
	}
});

router.patch("/:id", async (req, res) => {
	try {
		const updateStudent = await Student.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		if (!updateStudent)
			return res.status(404).json({ message: "Student nije pronadjen" });
		res.json(updateStudent);
	} catch (err) {
		return res.status(400).json({ message: "Greska", err: err.message });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const deleteStudent = await Student.findByIdAndDelete(req.params.id);
		if (!deleteStudent)
			return res.status(404).json({ message: "Student nije pronadjen" });
		res.json({ message: "Student je izbrisan" });
	} catch (err) {
		return res.status(400).json({ message: "Greska", err: err.message });
	}
});

// ----------------------------------------------

router.get("/:id/isActive", async (req, res) => {
	try {
		const activeStudent = await Student.findById(req.params.id);
		if (!activeStudent)
			return res.status(404).json({ message: "Student nije pronadjen" });
		res.send(
			activeStudent.isActive
				? `Student (${activeStudent.name}) je aktivan(true)`
				: `Student (${activeStudent.name}) nije aktivan(false)`
		);
	} catch (err) {
		return res.status(400).json({ message: "Greska", err: err.message });
	}
});

module.exports = router;
