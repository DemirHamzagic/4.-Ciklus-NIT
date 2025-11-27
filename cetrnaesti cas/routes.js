const express = require("express");
const router = express.Router();
const User = require("./User");

router.post("/users", async (req, res) => {
	try {
		const newUser = new User(req.body);
		await newUser.save();
		res.json(newUser);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
});

router.get("/users", async (req, res) => {
	try {
		const users = await User.find();
		if (!users)
			return res.status(404).json({ message: "Useri nisu pronadjeni" });
		res.json(users);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
});

router.patch("/users/:id", async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!user) return res.status(404).json({ message: "User ne postoji" });
		res.status(200).json(user);
	} catch (err) {
		return res.status(400).json({ message: "Greska", error: err.message });
	}
});

router.post("/check", async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user)
		return res.status(404).json({ message: "Korisnik nije pronadjen" });
	const hello = await user.sayHello();
	const isMatch = await user.comparePassword(password);
	if (!isMatch)
		return res.status(401).json({ message: "Pogresili ste lozinku" });

	res.json({ message: `Ulogovani ste ${hello}` });
});

module.exports = router;
