const mongoose = require("mongoose");

const courseScheme = new mongoose.Schema({
	title: String,
	code: String,
	students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

module.exports = mongoose.model("Course", courseScheme);
