const mongoose = require("mongoose");

const studentScheme = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 2,
	},
	age: {
		type: Number,
		required: true,
		min: 12,
	},
	city: {
		type: String,
		default: "Nepoznato",
	},
});

module.exports = mongoose.model("Studnet", studentScheme);
