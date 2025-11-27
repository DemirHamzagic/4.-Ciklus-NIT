function validateBook(req, res, next) {
	const { title, author, year, pages } = req.body;

	if (req.method === "POST" || req.method === "PUT") {
		if (!title || !author || !year || !pages)
			return res.status(400).send("Svi podaci moraju biti uneti");
	}

	if (title && title.length < 1)
		return res.status(400).send("Naslov je prekratak");
	if (pages && pages < 10)
		return res.status(400).send("Broj strana mora biti veci od 10");
	next();
}

module.exports = validateBook;
