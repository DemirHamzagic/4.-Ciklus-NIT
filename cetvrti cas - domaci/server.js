const { log } = require("console");
const express = require("express");
const app = express();

const logger = (req, res, next) => {
	const date = new Date();
	console.log(`${date.toISOString()} ${req.method} ${req.url}`);
	next();
};

const student = (req, res, next) => {
	const student = req.header("X-Student");
	if (student === "Demir") {
		console.log("Student je nadjen");
		res.send("Student je nadjen");
		next();
	} else {
		console.log("Student invalidan");
		res.status(400).send("Nije nadjen");
	}
};

app.use(logger);
// app.use(student);

const checkRole = (req, res, next) => {
	const { role } = req.query;
	if (role === "admin") {
		console.log("Admin je na serveru");
		res.send("Admin je na serveru");
		next();
	} else {
		res.status(403).send("Pristup odbijen");
	}
};

app.get("/", (req, res) => {
	res.send("Pocetna stranica");
});

app.get("/dashboard", checkRole, (req, res) => {
	res.send("Pristup je...");
});

app.get("/profile", (req, res) => {
	res.send("Ovo je korisnicki profil");
});

const checkTime = (req, res, next) => {
	const date = new Date();
	if (date.getHours() >= 8 && date.getHours() <= 20) {
		console.log("Pristup odobren u vreme izmedju 8-20 casova");
		next();
	} else {
		res.status(403).send("Pristup nije odobren zbog vremena");
	}
};

const checkAuth = (req, res, next) => {
	const apiKey = req.header("x-api-key");
	if (apiKey === "tajna123") {
		console.log("key je dobar");
		next();
	} else {
		res.status(401).send("Neautorizovan pristup!");
	}
};

app.get("/secret", checkTime, checkAuth, (req, res) => {
	res.send("Ovo tajna ruta");
});

app.use((req, res) => {
	res.status(404).send("<h2>404 - Stranica nije pronađena</h2>");
});

const validateRegister = (req, res, next) => {
	const { username, email, password } = req.body;
	if (username.length > 3 && email.includes("@") && password.length > 5) {
		next();
	} else {
		res.status(400).json({ error: "Podaci nisu validni!" });
	}
};

app.post("/register", (req, res) => {
	res.json({ message: "Uspešno registrovan korisnik!" });
});

app.listen(3000);
