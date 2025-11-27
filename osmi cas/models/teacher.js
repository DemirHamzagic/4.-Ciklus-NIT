const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 3,
	},
	experience: {
		type: String,
		default: "Amater",
	},
	age: {
		type: Number,
		min: 24,
	},
});

module.exports = mongoose.model("Teacher", teacherSchema);
