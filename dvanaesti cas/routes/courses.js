const express = require("express");
const router = express.Router();
const Course = require("../module/Course");
const Student = require("../module/Student");

router.post("/", async (req, res) => {
	try {
		const course = new Course(req.body);
		const savedCourse = await course.save();
		res.json(savedCourse);
	} catch (err) {
		return res.status(400).json({ message: "Greska", err: err.message });
	}
});

router.put("/:courseId/add-student/:studentId", async (req, res) => {
	try {
		const { courseId, studentId } = req.params;
		const course = await Course.findById(courseId);
		const student = await Student.findById(studentId);

		if (!course || !student)
			return res.status(404).json({ message: "Nije pronadjeno" });

		if (!course.students.includes(studentId))
			course.students.push(studentId);
		// if (!student.courses.includes(courseId)) student.courses.push(courseId);

		await course.save();
		// await student.save();
		res.json({ message: "Student je dodat na kurs" });
	} catch (err) {
		return res.status(400).json({ message: "Greska", err: err.message });
	}
});

module.exports = router;
