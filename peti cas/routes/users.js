const express = require("express");
const router = express.Router();

const { people } = require("../data");
const { validateAge } = require("../middleware/validate");

router.get("/", (req, res) => {
	res.send("Lista korisnika");
});

router.get("/:id", (req, res) => {
	res.send(`Korisnik id-a ${req.params.id}`);
});

router.put("/:id", validateAge, (req, res) => {
	const { name, age, job } = req.body;
	const id = req.params.id;
	const person = people.findIndex((e) => e.id == id);
	if (person === -1) {
		return res.status(404).send("Id nije validan");
	}
	if (!name || !job) {
		return res.status(400).send("Podaci ne postoje");
	}
	people[person] = { id, name, age, job };
	res.json(people[person]);
});

router.patch("/:id", (req, res) => {
	const id = req.params.id;
	const person = people.find((e) => e.id == id);
	if (!person) return res.status(404).send("Not valid");

	const { name } = req.body;
	if (name) person.name = name;
	res.json(person);
});

module.exports = router;
