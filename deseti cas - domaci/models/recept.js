const mongoose = require("mongoose");

const receptiSchema = new mongoose.Schema({
	name: {
		type: String,
		default: "hrana",
		minLength: 3,
	},
	prepTime: {
		type: Number,
		min: 1,
	},
});

module.exports = mongoose.model("Recept", receptiSchema);
