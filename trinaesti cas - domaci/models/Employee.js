const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
	firstName: {
		type: String,
		minLength: 2,
		required: true,
	},
	lastName: {
		type: String,
		minLength: 2,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [
			/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
			"Neispravan format email-a",
		],
	},
	position: {
		type: String,
		required: true,
		enum: ["developer", "designer", "manager", "hr", "marketing"],
	},
	salary: {
		type: Number,
		required: true,
		min: 30000,
		validate: {
			validator: function (salary) {
				if (!this.position) return true;
				const personSalary = {
					developer: [30000, 100000],
					designer: [40000, 60000],
					manager: [130000, 175000],
					hr: [70000, 100000],
					marketing: [30000, 80000],
				};
				const [min, max] = personSalary[this.position];
				return salary >= min && salary <= max;
			},
			message: "Plata mora biti u opsegu za odredjenu poziciju",
		},
	},
	department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
	hireDate: {
		type: Date,
		default: Date.now,
		validate: {
			validator: function (vreme) {
				return vreme <= new Date();
			},
			message: "Vreme nije validno!",
		},
		required: true,
	},
	isActive: {
		type: Boolean,
		default: true,
	},
	skills: {
		type: [String],
		validate: [
			{
				validator: function (e) {
					return e.length > 0;
				},
				message: "Zaposleni mora imati bar jednu vestinu",
			},
			{
				validator: function (s) {
					return new Set(s).size === s.length;
				},
				message: "Zaposleni moraju imati samo posebne vestine",
			},
		],
	},
	projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
});

module.exports = mongoose.model("Employee", employeeSchema);
