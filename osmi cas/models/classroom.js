const mongoose = require("mongoose");

const classroomScheme = new mongoose.Schema({
	name: {
		type: String,
		capacity: Number,
		building: String,
		required: true,
		default: "ucionicaSkole",
		max: 30,
	},
});

module.exports = mongoose.model("Classroom", classroomScheme);
