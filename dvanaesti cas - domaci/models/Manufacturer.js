const mongoose = require("mongoose");

const manufacturerSchema = new mongoose.Schema({
	name: String,
	country: String,
	yearEstablished: Number,
	products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("Manufacturer", manufacturerSchema);
