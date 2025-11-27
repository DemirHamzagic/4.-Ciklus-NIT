const mongoose = require("mongoose");

const carScheme = new mongoose.Schema({
	brand: String,
	horsePower: Number,
	serialNumber: Number,
	motorType: String,
});

module.exports = mongoose.model("Car", carScheme);
