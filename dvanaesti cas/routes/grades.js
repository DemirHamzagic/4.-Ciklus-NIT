const express = require("express");
const router = express.Router();
const Grade = require("../module/Grade");

router.post("/", async (req, res) => {
	try {
		const newGrade = new Grade(req.body);
		const savedGrade = await newGrade.save();
		res.json(savedGrade);
	} catch (err) {
		return res.status(400).json({ message: "Greska", err: err.message });
	}
});

router.get("/", async (req, res) => {
	try {
		const filters = {};
		if (req.query.minValue) filters.value = { $gte: +req.query.minValue };
		const grade = await Grade.find(filters).populate(
			"studentId",
			"name city"
		);
		res.json(grade);
	} catch (err) {
		return res.status(400).json({ message: "Greska", err: err.message });
	}
});

module.exports = router;
