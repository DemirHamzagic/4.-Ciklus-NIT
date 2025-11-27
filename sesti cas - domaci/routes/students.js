const express = require("express");
const students = require("../data/studentData");
const validateStudent = require("../middleware/validateStudent");
const router = express.Router();

router.get("/", (req, res) => {
	res.json(students);
});

router.get("/:id", (req, res) => {
	const id = req.params.id;
	const student = students.find((e) => e.id == id);
	if (!student) return res.status(404).send("Item sa ovim id-om ne postoji");

	res.json(student);
});

router.post("/", validateStudent, (req, res) => {
	const { name, age, city, email } = req.body;
	const newStudent = { id: students.length + 1, name, age, city, email };
	students.push(newStudent);
	res.status(201).json(students);
});

router.put("/:id", validateStudent, (req, res) => {
	const id = Number(req.params.id);
	const { name, age, city, email } = req.body;
	const index = students.findIndex((e) => e.id === id);
	if (index === -1)
		return res.status(404).send("Item sa ovim id-om ne postoji");

	students[index] = { id, name, age, city, email };
	res.json(students);
});

router.patch("/:id", validateStudent, (req, res) => {
	const id = req.params.id;
	const { name, age, city, email } = req.body;
	const studnet = students.find((e) => e.id == id);
	if (!studnet) return res.status(404).send("Item sa ovim id-om ne postoji");

	if (name) studnet.name = name;
	if (age) studnet.age = age;
	if (city) studnet.city = city;
	if (email) studnet.email = email;
	res.json(students);
});

router.delete("/:id", (req, res) => {
	const id = Number(req.params.id);
	const index = students.findIndex((e) => e.id === id);
	if (index === -1)
		return res.status(404).send("Item sa ovim id-om ne postoji");

	students.splice(index, 1);
	res.status(200).send("Student je izbrisan");
});

module.exports = router;
