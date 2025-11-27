const express = require("express");
const router = express.Router();
const { users, books } = require("../data");
const { route } = require("./users");

router.get("/", (req, res) => {
	res.json(books);
});

router.get("/borrowed", (req, res) => {
	const findBooks = users.flatMap((e) => e.borrowedBooks);
	if (findBooks.length === 0)
		return res.status(404).send("Nijedna knjiga nije pozajmljena");

	const borrowedBooks = books.filter((e) => findBooks.includes(e.id));
	res.json(borrowedBooks);
});

router.get("/:id/users", (req, res) => {
	const id = +req.params.id;
	const findBook = users.filter((e) => e.borrowedBooks.includes(id));
	if (!findBook) return res.status(404).send("Niko nije uzeo ovu knjigu");

	res.json(findBook);
});

router.get("/:id", (req, res) => {
	const id = +req.params.id;
	const findBook = books.find((e) => e.id === id);
	if (!findBook) return res.status(404).send("Knjiga nije pronadjena :(");
	res.json(findBook);
});

router.post("/", (req, res) => {
	const { title } = req.body;
	if (!title) return res.status(400).send("Morate uneti naziv knjige");

	const newBook = { id: books.length + 1, title };
	books.push(newBook);
	res.send("Nova knjiga je dodata");
});

router.put("/:id", (req, res) => {
	const id = +req.params.id;
	const index = books.findIndex((e) => e.id === id);
	if (index === -1) return res.status(404).send("Knjiga nije pronadjena");

	const { title } = req.body;
	if (!title) return res.status(400).send("Morate uneti naziv knjige");

	books[index] = { id, title };
	res.send("Naziv knjige je promenjen");
});

router.delete("/:id", (req, res) => {
	const id = +req.params.id;
	const findBook = books.find((e) => e.id === id);
	if (!findBook) return res.status(404).send("Knjiga nije pronadjena");

	books = books.filter((e) => e.id !== findBook.id);
	res.send("Knjiga je obrisana");
});

module.exports = router;
