const express = require("express");
const router = express.Router();
const courses = require("../data/courseData");
const validateCourse = require("../middleware/validateCourse");
const logger = require("../middleware/logger");

router.get("/", logger, (req, res) => {
	res.json(courses);
});

router.get("/:id", logger, (req, res) => {
	const id = req.params.id;
	const course = courses.find((e) => e.id == id);
	if (!courses) return res.status(404).send("Item sa ovim id-om ne postoji");

	res.json(course);
});

router.post("/", validateCourse, logger, (req, res) => {
	const { name, category, duration, level } = req.body;
	const newCourse = {
		id: courses.length + 1,
		name,
		category,
		duration,
		level,
	};
	courses.push(newCourse);
	res.status(201).json(courses);
});

router.put("/:id", validateCourse, logger, (req, res) => {
	const id = Number(req.params.id);
	const { name, category, duration, level } = req.body;
	const index = courses.findIndex((e) => e.id === id);

	if (index === -1)
		return res.status(404).send("Item sa ovim id-om ne postoji");

	courses[index] = { id, name, category, duration, level };
	res.json(courses);
});

router.patch("/:id", validateCourse, logger, (req, res) => {
	const id = req.params.id;
	const { name, category, duration, level } = req.body;
	const course = courses.find((e) => e.id == id);
	if (!course) return res.status(404).send("Item sa ovim id-om ne postoji");

	if (name) course.name = name;
	if (category) course.category = category;
	if (duration) course.duration = duration;
	if (level) course.level = level;
	res.json(courses);
});

router.delete("/:id", logger, (req, res) => {
	const id = Number(req.params.id);
	const index = courses.findIndex((e) => e.id === id);
	if (index === -1)
		return res.status(404).send("Item sa ovim id-om ne postoji");

	courses.splice(index, 1);
	res.status(200).send("Knjiga je izbrisana");
});

module.exports = router;
