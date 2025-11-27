const Classroom = require("../models/classroom");

async function getAllClasses(req, res) {
	const classrooms = await Classroom.find();
	res.json(classrooms);
}

async function getClass(req, res) {
	try {
		const classroom = await Classroom.findById(req.params.id);
		if (!classroom)
			return res.status(404).json({ message: "Ucionica ne postoji" });
		res.json(classroom);
	} catch (err) {
		return res.status(400).json({ message: "Greska" });
	}
}

async function createClassroom(req, res) {
	try {
		const classroom = new Classroom(req.body);
		await classroom.save();
		res.status(201).json(classroom);
	} catch (err) {
		return res.status(400).json({ message: "Greska" });
	}
}

async function updateClass(req, res) {
	try {
		const updatedClassroom = await Classroom.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		if (!updatedClassroom)
			return res.status(404).json({ message: "Ucionica ne postoji" });
		res.json(updatedClassroom);
	} catch (err) {
		return res.status(400).json({ message: "Greska" });
	}
}

async function replaceClass(req, res) {
	try {
		const updatedClass = await Classroom.replaceOne(
			{ _id: req.params.id },
			req.body
		);
		if (updatedClass === 0)
			return res.status(404).json({ message: "Ucionica nije nadjena" });
		const classroom = await Classroom.findById(req.params.id);
		res.json(classroom);
	} catch (err) {
		return res.status(400).json({ message: "Greska", err: err.message });
	}
}

async function deleteClassroom(req, res) {
	try {
		const deletedClass = await Classroom.findByIdAndDelete(req.params.id);
		if (!deletedClass)
			return res.status(404).json({ message: "Ucionica ne postoji" });
		res.json({ message: "Ucionica je izbrisana!" });
	} catch (err) {
		return res.status(400).json({ message: "Greska" });
	}
}

module.exports = {
	getClass,
	getAllClasses,
	createClassroom,
	updateClass,
	replaceClass,
	deleteClassroom,
};
