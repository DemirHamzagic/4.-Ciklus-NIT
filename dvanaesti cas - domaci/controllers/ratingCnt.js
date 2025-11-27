const Product = require("../models/Product");
const Rating = require("../models/Rating");

async function getAllRatings(req, res) {
	try {
		const ratings = await Rating.find();
		if (ratings.length === 0)
			return res.status(404).json({ message: "Ocene ne postoje" });
		res.json(ratings);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function getRating(req, res) {
	try {
		const rating = await Rating.findById(req.params.id);
		if (!rating)
			return res.status(404).json({ message: "Ocena ne postoji" });
		res.json(rating);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function createRating(req, res) {
	try {
		const newRating = new Rating(req.body);
		const savedRating = await newRating.save();
		res.status(201).json(savedRating);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function updateRating(req, res) {
	try {
		const updated = await Rating.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		if (!updated)
			return res.status(404).json({ message: "Ocena ne postoji" });
		res.json(updated);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function deleteRating(req, res) {
	try {
		const deleted = await Rating.findByIdAndDelete(req.params.id);
		if (!deleted)
			return res.status(404).json({ message: "Produkti ne postoje" });
		res.json({ message: "Produkt je izbrisan" });
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function averageRating(req, res) {
	try {
		const products = await Product.find().populate("ratings", "score");

		const averagePerProduct = products.map((e) => {
			const totalRating = e.ratings.reduce(
				(sum, rating) => sum + rating.score,
				0
			);
			return {
				name: e.name,
				averageRating: e.ratings.length
					? totalRating / e.ratings.length
					: 0,
			};
		});
		res.json(averagePerProduct);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function commentFilter(req, res) {
	try {
		const { score } = req.query;
		const filter = {};
		if (score) filter.score = { $eq: Number(score) };

		const products = await Rating.find(filter);
		const comments = products.map((e) => e.comment);
		res.json(comments);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function latestComment(req, res) {
	try {
		const comments = await Rating.find({ product: req.params.id }).sort({
			dateCreated: -1,
		});
		res.json(comments);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

module.exports = {
	getRating,
	getAllRatings,
	createRating,
	updateRating,
	deleteRating,
};
