const Category = require("../models/Category");

async function getAllCategory(req, res) {
	try {
		const categories = await Category.find();
		if (categories.length === 0)
			return res.status(404).json({ message: "Ocene ne postoje" });
		res.json(categories);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function getCategory(req, res) {
	try {
		const category = await Category.findById(req.params.id);
		if (!category)
			return res.status(404).json({ message: "Ocena ne postoji" });
		res.json(category);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function createCategory(req, res) {
	try {
		const newCategory = new Category(req.body);
		const savedCategory = await newCategory.save();
		res.status(201).json(savedCategory);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function updateCategory(req, res) {
	try {
		const updated = await Category.findByIdAndUpdate(
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

async function deleteCategory(req, res) {
	try {
		const deleted = await Category.findByIdAndDelete(req.params.id);
		if (!deleted)
			return res.status(404).json({ message: "Produkti ne postoje" });
		res.json({ message: "Produkt je izbrisan" });
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function subCategories(req, res) {
	try {
		const subCategory = req.query;
		const filter = {};
		if (subCategory) filter.parentCategory = { $eq: subCategory };

		const parentCat = await Category.findOne(filter);
		if (parentCat.length === 0)
			return res.status(404).json({ message: "Produkti ne postoje" });

		const categories = await Category.find({
			parentCategory: parentCat._id,
		}).populate("parentCategory", "name");
		res.json(categories);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function topCategories(req, res) {
	try {
		const categories = await Category.find();
		if (categories.length === 0)
			return res.status(404).json({ message: "Produkti ne postoje" });

		const sortedCategories = categories.sort(
			(a, b) => b.products.length - a.products.length
		);
		res.json(sortedCategories.slice(0, 3));
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

module.exports = {
	getCategory,
	getAllCategory,
	createCategory,
	updateCategory,
	deleteCategory,
	subCategories,
	topCategories,
};
