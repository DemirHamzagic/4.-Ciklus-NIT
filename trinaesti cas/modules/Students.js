const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "ime je obavezno"],
		minLength: [2, "Ime mora imati barem 2 karaktera"],
		maxLength: [50, "Ime moze imati najvise 50 karaktera"],
		trim: true,
	},
	city: {
		type: String,
		// enum: {
		// 	values: ["Beograd", "Novi Sad", "Nis", "Subotica", "Novi Pazar"],
		// 	message:
		// 		"Grad mora imati jedan od: Beograd, Novi Sad, Nis, Subotica, Novi Pazar",
		// },
	},
	email: {
		type: String,
		required: [true, "Email je obavezan"],
		lowercase: true,
		unique: true,
		// match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Neispravan format emaila"],
	},

	age: {
		type: Number,
		min: [15, "Najmanje godina moze biti 15"],
		max: [100, "Najvise godina moze biti 100"],
	},
	isActive: {
		type: Boolean,
		default: true,
	},
	enrolledAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model("Student", studentSchema);
