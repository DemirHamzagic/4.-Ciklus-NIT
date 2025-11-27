const Product = require("../models/Product");

async function getAllProducts(req, res) {
	try {
		const products = await Product.find();
		if (products.length === 0)
			return res.status(404).json({ message: "Produkti ne postoje" });
		res.json(products);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function getProduct(req, res) {
	try {
		const product = await Product.findById(req.params.id);
		if (!product)
			return res.status(404).json({ message: "Produkt ne postoji" });
		res.json(product);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function createProduct(req, res) {
	try {
		const newProduct = new Product(req.body);
		const savedProduct = await newProduct.save();
		res.status(201).json(savedProduct);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function updateProduct(req, res) {
	try {
		const updated = await Product.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		if (!updated)
			return res.status(404).json({ message: "Product ne postoji" });
		res.json(updated);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function deleteProduct(req, res) {
	try {
		const deleted = await Product.findByIdAndDelete(req.params.id);
		if (!deleted)
			return res.status(404).json({ message: "Produkti ne postoje" });
		res.json({ message: "Produkt je izbrisan" });
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function productPriceRange(req, res) {
	try {
		const filters = {};
		const { minPrice, maxPrice } = req.query;
		if (minPrice || maxPrice) {
			filters.price = {};
			if (minPrice) filters.price.$gte = Number(minPrice);
			if (maxPrice) filters.price.$lte = Number(maxPrice);
		}
		const products = await Product.find(filters);
		if (products.length === 0)
			return res.status(404).json({ message: "Produkti ne postoje" });
		res.json(products);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function productCatMan(req, res) {
	try {
		const filters = {};
		const { category, manufacturer } = req.query;
		if (category) filters.category = { $eq: category };
		if (manufacturer) filters.manufacturer = { $eq: manufacturer };

		const products = await Product.find(filters)
			.populate("category", "name")
			.populate("manufacturer", "name");
		if (products.length === 0)
			return res.status(404).json({ message: "Produkti ne postoje" });
		res.json(products);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function productMinMaxPrice(req, res) {
	try {
		const products = await Product.find().sort({ price: 1 });
		if (products.length === 0)
			return res.status(404).json({ message: "Produkti ne postoje" });
		res.json(products);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function bestSeller(req, res) {
	try {
		const products = await Product.find().populate("ratings");
		if (products.length === 0)
			return res.status(404).json({ message: "Produkt ne postoji" });

		const sortedProducts = products.sort(
			(a, b) => b.ratings.length - a.ratings.length
		);
		res.json(sortedProducts);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function productAvgRating(req, res) {
	try {
		const prod = await Product.findById(req.params.id).populate("ratings");
		if (!prod || prod.ratings.length === 0)
			return res.status(404).json({ message: "Ne postoje" });
		const productsScore = prod.ratings.reduce(
			(sum, rating) => sum + rating.score,
			0
		);
		const average = productsScore / prod.ratings.length;
		res.json({ message: `Prosecna ocena za proizvod je ${average}` });
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

module.exports = {
	getProduct,
	getAllProducts,
	createProduct,
	updateProduct,
	deleteProduct,
	productPriceRange,
	productCatMan,
	productMinMaxPrice,
	bestSeller,
	productAvgRating,
};
