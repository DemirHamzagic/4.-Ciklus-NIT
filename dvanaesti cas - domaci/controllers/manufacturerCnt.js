const Manufacturer = require("../models/Manufacturer");

async function getAllManufacturer(req, res) {
	try {
		const manufacturers = await Manufacturer.find();
		if (manufacturers.length === 0)
			return res.status(404).json({ message: "Ocene ne postoje" });
		res.json(manufacturers);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function getManufacturer(req, res) {
	try {
		const manufacturer = await Manufacturer.findById(req.params.id);
		if (!manufacturer)
			return res.status(404).json({ message: "Ocena ne postoji" });
		res.json(manufacturer);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function createManufacturer(req, res) {
	try {
		const newManufacturer = new Manufacturer(req.body);
		const savedManufacturer = await newManufacturer.save();
		res.status(201).json(savedManufacturer);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function updateManufacturer(req, res) {
	try {
		const updated = await Manufacturer.findByIdAndUpdate(
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

async function deleteManufacturer(req, res) {
	try {
		const deleted = await Manufacturer.findByIdAndDelete(req.params.id);
		if (!deleted)
			return res.status(404).json({ message: "Produkti ne postoje" });
		res.json({ message: "Produkt je izbrisan" });
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function topManufacturer(req, res) {
	try {
		const manufacturer = await Manufacturer.find();
		const topProducts = manufacturer.sort(
			(a, b) => b.products.length - a.products.length
		);
		res.json(topProducts[0]);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function countryManufacturer(req, res) {
	try {
		const { country } = req.query;
		const filter = {};
		if (country) filter.country = { $eq: country };

		const manufacturer = await Manufacturer.find(filter);
		res.json(manufacturer);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

async function AverageManPrice(req, res) {
	try {
		const manufacturer = await Manufacturer.find().populate(
			"products",
			"price"
		);
		const averagePrice = manufacturer.map((e) => {
			const totalPrice = e.products.reduce(
				(sum, product) => sum + product.price,
				0
			);
			const average = totalPrice / e.products.length;
			return { name: e.name, averagePrice: average };
		});
		res.json(averagePrice);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
}

module.exports = {
	getManufacturer,
	getAllManufacturer,
	createManufacturer,
	updateManufacturer,
	deleteManufacturer,
	topManufacturer,
	countryManufacturer,
	AverageManPrice,
};
