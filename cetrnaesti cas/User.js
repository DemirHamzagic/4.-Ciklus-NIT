const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [
			/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
			"Format nije validan",
		],
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
	},
	role: {
		type: String,
		enum: ["student", "professor", "admin"],
	},
	username: {
		type: String,
		validate: {
			validator: function (a) {
				return a.length >= 3;
			},
		},
	},
});

userSchema.pre("save", async function (next) {
	this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
	next();
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	const saltRounds = 10;
	this.password = await bcrypt.hash(this.password, saltRounds);
	next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
	return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.sayHello = function () {
	return `Hello ${this.name}`;
};

module.exports = mongoose.model("User", userSchema);
