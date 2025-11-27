const User = require("../models/User");
const generateAccessToken = require("../util/tokenGenerator");

async function registerUser(req, res) {
	try {
		const newUser = new User(req.body);
		await newUser.save();
		res.status(201).json(newUser);
	} catch (err) {
		return res.status(400).json({
			message: "Greska prilikom kreiranja korisnika",
			error: err.message,
		});
	}
}

async function loginUser(req, res) {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user)
			return res
				.status(404)
				.json({ message: "Korisnik sa ovim email-om ne postoji" });
		const match = await user.comparePasswords(password);
		if (!match)
			return res.status(404).json({ message: "Sifra je netacna" });

		const accessToken = generateAccessToken(user);

		res.json({ message: "Login uspesan", user, accessToken });
	} catch (err) {
		return res.status(400).json({
			message: "Greska prilikom logovanja korisnika",
			error: err.message,
		});
	}
}

async function logoutUser(req, res) {
	try {
		return res.json({ message: "Uspesno odjavljivanje" });
	} catch (err) {
		return res.status(500).json({ message: "Greska u odjavi" });
	}
}

async function userProfile(req, res) {
	try {
		if (req.user.id != req.params.id)
			return res
				.status(403)
				.json({ message: "Nemate pristup tudjem profilu" });
		const user = await User.findById(req.params.id).select("-password");
		if (!user)
			return res.status(404).json({ message: "Korisnik nije pronadjen" });
		console.log(user);
		res.json(user);
	} catch (err) {
		return res.status(400).json({
			message: "Greska prilikom vracanja profila",
			error: err.message,
		});
	}
}

module.exports = { registerUser, loginUser, logoutUser, userProfile };
