const mongoose = require("mongoose");

const movieScheme = new mongoose.Schema({
	title: String,
	duration: String,
	producer: String,
	rating: Number,
});

module.exports = mongoose.model("Movie", movieScheme);
