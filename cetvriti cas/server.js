const express = require("express");
const app = express();

app.use((req, res, next) => {
	console.log(`Url je ${req.url}, metoda je ${req.method}`);
	next();
});

app.get("/", (req, res) => {
	res.send("Hallo");
});

app.get("/balo", (req, res) => {
	res.send("Boom");
});

const checkAuth = (req, res, next) => {
	const apiKey = req.header("x-api-key");
	if (apiKey == "tajna") {
		console.log("uspesno ste se ulogovali");
		next();
	} else {
		console.log("pristup odbijen");
		res.status(401).send("Niste prihvaceni");
	}
};

const check2 = (req, res, next) => {
	const apiKey = req.header("x-student");
	if (apiKey === "student456") {
		console.log("Student456 je prihvacen");
		next();
	} else {
		console.log("Front-student vam je odbio pristup");
		res.status(400).send("Page is unavailable...");
	}
};

const adminMiddleware = (req, res, next) => {
	const { role } = req.query;
	if (role === "admin") {
		console.log("Pristup-admin");
		next();
	} else {
		console.log("Front-student vam je odbio pristup");
		res.status(400).send("Nemate pristup jer niste admin");
	}
};

const userMiddleware = (req, res, next) => {
	const { role } = req.query;
	if (role === "user" || role === "admin") {
		console.log("Pristup-user");
		next();
	} else {
		console.log("Front-student vam je odbio pristup");
		res.status(400).send("Page is unavailable...");
	}
};

app.get("/admin", adminMiddleware, (req, res) => {
	res.send("Ovo je stranica admina");
});

app.get("/user", userMiddleware, (req, res) => {
	res.send("Ovo je stranica usera");
});

app.get("/protected", checkAuth, (req, res) => {
	res.send("Imate pristup");
});

app.listen(3000);
