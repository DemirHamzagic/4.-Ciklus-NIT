const express = require("express");
const books = require("../data/booksData");
const validateBook = require("../middleware/validateBook");
const router2 = express.Router();

router2.get("/", (req, res) => {
	res.json(books);
});

router2.get("/:id", (req, res) => {
	const id = req.params.id;
	const book = books.find((e) => e.id == id);
	if (!book) return res.status(404).send("Item sa ovim id-om ne postoji");

	res.json(book);
});

router2.post("/", validateBook, (req, res) => {
	const { title, author, year, pages } = req.body;
	const newBook = { id: books.length + 1, title, author, year, pages };
	books.push(newBook);
	res.status(201).json(books);
});

router2.put("/:id", validateBook, (req, res) => {
	const id = Number(req.params.id);
	const { title, author, year, pages } = req.body;
	const index = books.findIndex((e) => e.id === id);

	if (index === -1)
		return res.status(404).send("Item sa ovim id-om ne postoji");

	books[index] = { id, title, author, year, pages };
	res.json(books);
});

router2.patch("/:id", validateBook, (req, res) => {
	const id = req.params.id;
	const { title, author, year, pages } = req.body;
	const book = books.find((e) => e.id == id);
	if (!book) return res.status(404).send("Item sa ovim id-om ne postoji");

	if (title) book.title = title;
	if (author) book.author = author;
	if (year) book.year = year;
	if (pages) book.pages = pages;
	res.json(books);
});

router2.delete("/:id", (req, res) => {
	const id = Number(req.params.id);
	const index = books.findIndex((e) => e.id === id);
	if (index === -1)
		return res.status(404).send("Item sa ovim id-om ne postoji");

	books.splice(index, 1);
	res.status(200).send("Knjiga je izbrisana");
});

module.exports = router2;
