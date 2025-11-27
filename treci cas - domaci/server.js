const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const data = [
	{ id: 1, name: "Bob1" },
	{ id: 2, name: "Bob2" },
	{ id: 3, name: "Bob3" },
	{ id: 4, name: "Bob4" },
];

app.get("/", (req, res) => {
	res.sendFile("index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
	res.send("O nama");
});

app.get("/user/:name", (req, res) => {
	const name = req.params.name;
	res.send(`Zdravo ${name}`);
});

app.get("/search", (req, res) => {
	const { query, category } = req.query;
	res.send(`Pretraga za pojam: ${query} u kategoriji: ${category}`);
});

app.get("/users", (req, res) => {
	res.json(data);
});

app.get("/users", (req, res) => {
	res.json(data);
});

app.get("/math/:a/:b", (req, res) => {
	const { a, b } = req.params;
	res.send(`Zbir brojeva ${a} i ${b} je: ${Number(a) + Number(b)}`);
});

app.get("/multiply/:a/:b", (req, res) => {
	const { a, b } = req.params;
	res.send(`Proizvod brojeva ${a} i ${b} je: ${Number(a) * Number(b)}`);
});

app.post("/add-user", (req, res) => {
	const { name, age } = req.body;
	res.send(`Dodat je korisnik ${name} koji ima ${age} godina`);
});

app.post("/feedback", (req, res) => {
	const { message } = req.body;
	res.send(`Poruka je primljena ${message}`);
});

app.listen(3000);
