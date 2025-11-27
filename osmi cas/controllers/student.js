const Student = require("../models/student");
async function getAllStudents(req, res) {
	const students = await Student.find();
	res.json(students);
}
async function getStudent(req, res) {
	try {
		const student = await Student.findById(req.params.id);
		if (!student)
			return res.status(404).json({ message: "Student ne postoji" });
		res.json(student);
	} catch (err) {
		res.status(400).json({ message: "Format nije ispravan" });
	}
}
async function createStudent(req, res) {
	try {
		const student = new Student(req.body);
		await student.save();
		res.status(201).json(student);
	} catch (err) {
		res.status(500).json({ message: "Greska pri kreiranju" });
	}
}
async function updateStudent(req, res) {
	try {
		const updatedStudent = await Student.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		if (!updatedStudent)
			return res.status(404).json({ message: "Student ne postoji" });
		res.json(updatedStudent);
	} catch (err) {
		res.status(400).json({ message: "Greska" });
	}
}

async function replaceStudent(req, res) {
	try {
		const updated = await Student.replaceOne(
			{ _id: req.params.id },
			req.body
		);
		if (updated.matchedCount === 0)
			return res.status(404).json({ message: "Student nije pronadjen" });
		const student = await Student.findById(req.params.id);
		res.json(student);
	} catch (err) {
		return res.status(400).json({ message: "Greska", err: err.message });
	}
}

async function deleteStudent(req, res) {
	try {
		const deletedStudent = await Student.findByIdAndDelete(req.params.id);
		if (!deletedStudent)
			return res.status(404).json({ message: "Student ne postoji" });
		res.json({ message: "Student je obrisan", deletedStudent });
	} catch (err) {
		res.status(400).json({ message: "Greska" });
	}
}
module.exports = {
	getAllStudents,
	getStudent,
	createStudent,
	updateStudent,
	replaceStudent,
	deleteStudent,
};
