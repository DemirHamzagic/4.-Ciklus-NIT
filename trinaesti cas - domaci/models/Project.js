const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	startDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
		validate: {
			validator: function (vreme) {
				return !this.startDate || vreme > this.startDate;
			},
			message: "Vreme mora biti nakon pocetnog vremena",
		},
	},
	budget: {
		type: Number,
		required: true,
		min: 5000,
	},
	status: {
		type: String,
		enum: ["planning", "active", "completed", "on-hold"],
	},
	priority: {
		type: Number,
		min: 1,
		max: 5,
		default: 3,
	},
	department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
	team: {
		type: [
			{
				employee: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Employee",
				},
				role: {
					type: String,
					required: true,
				},
			},
		],
		validate: {
			validator: function (t) {
				return t.length >= 2;
			},
			message: "Tim mora imati barem 2 clana",
		},
	},
});

module.exports = mongoose.model("Project", projectSchema);
