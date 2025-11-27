const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
	score: {
		type: Number,
		min: 1,
		max: 5,
	},
	comment: String,
	user: String,
	product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
	dateCreated: Date,
});

module.exports = mongoose.model("Rating", ratingSchema);
