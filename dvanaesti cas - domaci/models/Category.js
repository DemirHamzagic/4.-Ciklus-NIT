const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
	name: String,
	description: String,
	parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
	products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("Category", categorySchema);
