function validateCourse(req, res, next) {
	const { name, category, duration, level } = req.body;

	if (req.method === "POST" || req.method === "PUT") {
		if (!name || !category || !duration || !level)
			return res.status(400).send("Svi podaci moraju biti uneti");
	}

	if (duration && parseInt(duration) > 3)
		return res.status(400).send("Kurs mora biti duzi od 3 nedelje");
	if (
		level &&
		!level === "Advanced" &&
		!level === "Intermediate" &&
		!level === "Beginner"
	)
		return res.status(400).send("Tezina kursa nije validna");
	next();
}

module.exports = validateCourse;
