const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const obejkat = [
	{ id: 1, name: "Lebron" },
	{ id: 1, name: "Lebron" },
	{ id: 1, name: "Lebron" },
];

app.get("/", (req, res) => {
	res.send("Express start");
});

app.get("/about", (req, res) => {
	res.send("<h1>Express about</h1>");
});

app.get("/data", (req, res) => {
	res.json(obejkat);
});

app.get("/users/:id", (req, res) => {
	const userId = req.params.id;
	res.send(`Korisnik ima id ${userId}`);
});

app.get("/user/:name", (req, res) => {
	const userName = req.params.name;
	res.send(`Zdravo ${userName}`);
});

app.get("/search", (req, res) => {
	const { query, term } = req.query;
	res.send(`Trazeni pojam je ${query} ili ${term}`);
	// url je /search?query=nesto
	// za dva query-a: /search?query=nesto&term=haloo
});

app.post("/login", (req, res) => {
	const { username, password } = req.body;
	res.send(`Korisnik ${username} ima sifru ${password}`);
});
// body: JSON.stringify({ name, age });

app.listen(3000);
