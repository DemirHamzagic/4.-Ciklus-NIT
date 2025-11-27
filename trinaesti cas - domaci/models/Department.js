const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		maxLength: 500,
	},
	budget: {
		type: Number,
		required: true,
		min: 0,
		validate: {
			validator: function (plata) {
				return plata >= this.employees.length * 30000;
			},
			message: "Budzet mora biti veci od ukupnih plata",
		},
	},
	location: {
		required: true,
		type: {
			city: {
				type: String,
				required: true,
			},
			country: {
				type: String,
				required: true,
			},
		},
	},
	head: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Employee",
		validate: {
			validator: function (h) {
				const objects = this.employees.map((sum) => sum.toString());
				return objects.includes(h.toString());
			},
			message: "Radnik ne sadrzi head",
		},
	},
	employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
});

module.exports = mongoose.model("Department", departmentSchema);
