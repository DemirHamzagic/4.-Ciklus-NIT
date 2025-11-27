function validateStudent(req, res, next) {
	const { name, age, city, email } = req.body;

	if (req.method === "POST" || req.method === "PUT") {
		if (!name || !age || !city || !email)
			return res.status(400).send("Svi podaci moraju biti uneti");
	}

	if (age && age < 13) return res.status(400).send("Niste dovoljno stari");
	if (city && city.length < 4)
		return res.status(400).send("Grad mora imati vise od 4 karaktera");
	if (email && !email.includes("@"))
		return res.status(400).send("Email mora biti pravi");
	next();
}

module.exports = validateStudent;
