function validate(req, res, next) {
	const { name } = req.body;
	if (req.method === "POST" || req.method === "PUT") {
		if (!name) return res.status(400).send("Podaci nisu validni");
	}
	next();
}

function validateAge(req, res, next) {
	const { age } = req.body;
	if (req.method === "POST" || req.method === "PUT") {
		if (!age) return res.status(400).send("Ime nije validno");
	}

	if (age && +age < 12) return res.status(400).send("Broj godina je premali");
	next();
}

module.exports = { validate, validateAge };
