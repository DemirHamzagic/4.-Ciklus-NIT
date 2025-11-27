require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const Book = require("./models/book");
const Movie = require("./models/movie");

const studentRouter = require("./routes/student");
const classroomRouter = require("./routes/classroom");
const teacherRouter = require("./routes/teacher");

const app = express();
app.use(express.json());

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Povezan sa bazom"))
	.catch(() => console.error("Nije povezan sa bazom"));

app.get("/", (req, res) => {
	res.send("Baza radi");
});

app.use("/students", studentRouter);
app.use("classroom", classroomRouter);
app.use("teacher", teacherRouter);

app.get("/books", async (req, res) => {
	const books = await Book.find();
	res.json(Book);
});

app.post("/books", async (req, res) => {
	const { title, pages, writer, releaseYear } = req.body;
	try {
		const book = new Book({ title, pages, writer, releaseYear });
		await book.save();
		res.status(201).json(book);
	} catch (err) {
		res.status(500).json({ message: "Greska pri kreiranju" });
	}
});

app.get("books/:id", async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		if (!book)
			return res.status(404).json({ message: "Knjiga ne postoji" });
		res.json(book);
	} catch (err) {
		res.status(400).json({ message: "Greska" });
	}
});

app.put("books/:id", async (req, res) => {
	try {
		const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!book)
			return res.status(404).json({ message: "Knjiga ne postoji" });
		res.json(book);
	} catch (err) {
		res.status(400).json({ message: "Greska" });
	}
});

app.get("/movie", async (req, res) => {
	const movies = await Movie.find();
	res.json(Movie);
});

app.get("/movie/:id", async (req, res) => {
	try {
		const movie = await Movie.findById(req.params.id);
		if (!movie) return res.status(404).json({ message: "Film ne postoji" });
		res.json(movie);
	} catch (err) {
		res.status(400).json({ message: "Greska" });
	}
});

app.listen(3000);
