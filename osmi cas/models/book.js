const mongoose = require("mongoose");

const bookScheme = new mongoose.Schema({
	title: String,
	pages: Number,
	writer: String,
	releaseYear: Number,
});

module.exports = mongoose.model("Book", bookScheme);
