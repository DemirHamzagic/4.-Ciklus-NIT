const Teacher = require("../models/teacher");

async function getTeacher(req, res) {
	try {
		const teacher = await Teacher.findById(req.params.id);
		if (!teacher)
			return res.status(404).json({ message: "Ucitelj ne postoji" });
		res.json(teacher);
	} catch (err) {
		return res.status(400).json({ message: "Greska" });
	}
}

async function getAllTeachers(req, res) {
	const teachers = await Teacher.find();
	res.json(teachers);
}

async function createTeacher(req, res) {
	try {
		const teacher = new Teacher(req.body);
		await teacher.save();
		res.status(201).json(teacher);
	} catch (err) {
		return res.status(400).json({ message: "Greska" });
	}
}

async function updateTeacher(req, res) {
	try {
		const teacher = await Teacher.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		if (!teacher)
			return res.status(404).json({ message: "Ucitelj ne postoji" });

		res.json(teacher);
	} catch (err) {
		return res.status(400).json({ message: "Greska" });
	}
}

async function deleteTeacher(req, res) {
	try {
		const teacher = await Teacher.findByIdAndDelete(req.params.id);
		if (!teacher)
			return res.status(404).json({ message: "Ucitelj ne postoji" });
		res.json({ message: "Ucitelj je izbrisan" });
	} catch (err) {
		return res.status(400).json({ message: "Greska" });
	}
}

module.exports = {
	getTeacher,
	getAllTeachers,
	createTeacher,
	updateTeacher,
	deleteTeacher,
};
