const Recept = require("../models/recept");

async function getAllRecepts(req, res) {
	const filters = {};
	if (req.query.name) filters.name = { $eq: req.query.name };
	if (req.query.prepTime) filters.prepTime = { $eq: +req.query.prepTime };

	if (req.query.excludeName) filters.name = { $ne: req.query.excludeName };
	if (req.query.minPrepTime)
		if (req.query.foodNames)
			// 	filters.prepTime = { $gte: +req.query.minPrepTime };
			// if (req.query.validTime) filters.prepTime = { $gt: +req.query.minPrepTime };

			// if (req.query.maxTime) filters.prepTime = { $lte: +req.query.maxTime };
			// if (req.query.lessThan) filters.prepTime = { $lt: +req.query.lessThan };

			filters.name = { $in: req.query.foodNames.split(",") };
	if (req.query.ExcludeFoodNames)
		filters.name = { $nin: req.query.ExcludeFoodNames.split(",") };

	if (req.query.nameContains)
		filters.name = { $regex: req.query.nameContains, $options: "i" };

	if (req.query.maxTime || req.query.minTime) {
		filters.prepTime = {};
		if (req.query.minTime) filters.prepTime.$gte = +req.query.minTime;
		if (req.query.maxTime) filters.prepTime.$lte = +req.query.maxTime;
	}

	const sortField = req.query.sortBy || "name";
	const sortOrder = req.query.order === "desc" ? -1 : 1;
	const limit = Number(req.query.limit) || 10;
	const skip = Number(req.query.skip) || 0;

	const recepts = await Recept.find()
		.sort({ [sortField]: sortOrder })
		.skip(skip)
		.limit(limit);
	res.json(recepts);
}

async function getRecept(req, res) {
	try {
		const recept = await Recept.findById(req.params.id);
		if (!recept) return res.json({ message: "Recept nije pronadjen" });
		res.json(recept);
	} catch (err) {
		return res.json({ message: "Greska", err: err.message });
	}
}

async function createRecept(req, res) {
	try {
		const recept = new Recept(req.body);
		await recept.save();
		res.status(201).json(recept);
	} catch (err) {
		return res.json({ message: "Greska", err: err.message });
	}
}

async function deleteRecept(req, res) {
	try {
		const recept = await Recept.findByIdAndDelete(req.params.id);
		if (!recept) return res.json({ message: "Recept nije pronadjen" });
		res.json({ message: "Recept je obrisan" });
	} catch (err) {
		return res.json({ message: "Greska", err: err.message });
	}
}

async function updateRecept(req, res) {
	try {
		const updated = await Recept.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		if (!updated) return res.json({ message: "Recept nije pronadjen" });
		res.json(updated);
	} catch (err) {
		return res.json({ message: "Greska", err: err.message });
	}
}

async function replaceRecept(req, res) {
	try {
		const updatedRecept = await Recept.replaceOne(
			{ _id: req.params.id },
			req.body
		);
		if (updatedRecept.matchedCount === 0)
			return res.status(404).json({ message: "Recept nije pronadjen" });
		const recept = await Recept.findById(req.params.id);
		res.json(recept);
	} catch (err) {
		return res.json({ message: "Greska", err: err.message });
	}
}

module.exports = {
	getRecept,
	getAllRecepts,
	createRecept,
	updateRecept,
	replaceRecept,
	deleteRecept,
};
