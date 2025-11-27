const express = require("express");
const router = express.Router();
const { users, books } = require("../data");

router.get("/", (req, res) => {
	res.json(users);
});

router.get("/:id/borrowed", (req, res) => {
	const id = +req.params.id;
	const findUser = users.find((e) => e.id === id);
	if (!findUser) return res.status(404).send("User nije pronadjen");
	const borrowedBooks = books.filter((e) =>
		findUser.borrowedBooks.includes(e.id)
	);
	res.json(borrowedBooks);
});

router.post("/:id/borrowed/:bookId", (req, res) => {
	const id = +req.params.id;
	const bookId = +req.params.bookId;
	const findUser = users.find((e) => e.id === id);
	const findBook = books.find((e) => e.id === bookId);

	if (!findUser) return res.status(404).send("User nije pronadjen");
	if (!findBook) return res.status(404).send("Knjiga nije pronadjena");

	const availableBook = users.filter((e) => e.borrowedBooks.includes(bookId));
	if (availableBook.length > 0)
		return res.status(400).send("Knjiga je vec kod nekog");

	if (findUser.borrowedBooks.includes(findBook.id))
		return res.status(400).send("Korisnik vec ima tu knjigu");

	findUser.borrowedBooks.push(findBook.id);
	res.status(200).send(
		`Korisnik ${findUser.name} uzeo je knjigu ${findBook.title}`
	);
});

router.delete("/users/:id/return/:bookId", (req, res) => {
	const id = +req.params.id;
	const bookId = +req.params.bookId;
	const findUser = users.find((e) => e.id === id);

	if (!findUser) return res.status(404).send("User nije pronadjen");
	if (!findUser.borrowedBooks.includes(bookId))
		return res.status(400).send("Korisnik nije pozajmio tu knjigu");

	findUser.borrowedBooks = findUser.borrowedBooks.filter(
		(id) => id !== bookId
	);
	res.status(200).send("Knjiga je uklonjena");
});

module.exports = router;
