const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: String,
	description: String,
	price: Number,
	category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
	manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: "Manufacturer" },
	inStock: Boolean,
	ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
});

module.exports = mongoose.model("Product", productSchema);
