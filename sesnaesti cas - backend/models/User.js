const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true,
	},
	password: {
		type: String,
		minLength: 6,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		match: [
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			"Invalid email",
		],
	},
	role: {
		type: String,
		enum: ["Student", "Admin"],
		default: "Student",
		// required: true,
	},
});

userSchema.pre("save", function () {
	this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
});

userSchema.pre("save", async function () {
	if (!this.isModified("password")) return;
	this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePasswords = function (pass) {
	return bcrypt.compare(pass, this.password);
};

module.exports = mongoose.model("User", userSchema);
