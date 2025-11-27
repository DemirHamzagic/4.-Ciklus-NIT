const mongoose = require("mongoose");

const gradeScheme = new mongoose.Schema({
	studentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Student",
		required: true,
	},
	subject: String,
	value: Number,
});

module.exports = mongoose.model("Grade", gradeScheme);
