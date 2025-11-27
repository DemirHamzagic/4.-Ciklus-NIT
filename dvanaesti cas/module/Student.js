const mongoose = require("mongoose");

const studentScheme = new mongoose.Schema({
	name: String,
	city: String,
	age: Number,
	// courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

module.exports = mongoose.model("Student", studentScheme);
