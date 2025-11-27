const express = require("express");
const studentRouter = express.Router();
const studnets = require("../data");
const validate = require("../middleware/validate");

studentRouter.get("/", (req, res) => {
	res.json(studnets);
});

studentRouter.get("/:id", (req, res) => {
	const id = Number(req.params.id);
	const student = studnets.find((s) => s.id === id);
	if (!student) {
		res.status(404).send(`Student sa id-em: ${id}, ne postoji`);
	} else res.send(student);
});

studentRouter.post("/", (req, res) => {
	const { name } = req.body;
	const newStudent = { id: studnets.length + 1, name };
	if (newStudent.name.length >= 3) {
		studnets.push(newStudent);
		res.status(201);
	} else res.status(400).send("Ime mora biti duze od 2 karaktera");
});

studentRouter.delete("/:id", (req, res) => {
	const id = Number(req.params.id);
	studnets = studnets.filter((e) => e.id !== id);
	res.sendStatus(204);
});

studentRouter.put("/:id", validate, (req, res) => {
	const id = req.params.id;
	const index = studnets.findIndex((e) => e.id == id);
	if (index === -1) {
		return res.status(404).send("Student je nepostoji");
	}
	const { name } = req.body;
	studnets[index] = { id, name };
	res.json(students[index]);
});

studentRouter.patch("/:id", (req, res) => {
	const id = req.params.id;
	const index = studnets.findIndex((e) => e.id == id);
	if (index === -1) {
		return res.status(404).send("Student je nepostoji");
	}
	const { name } = req.body;
	if (name) index.name = name;
	res.json(index);
});

module.exports = studentRouter;
