require("dotenv").config();
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const receptRouter = require("./routes/recept");

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Povezan sa bazom"))
	.catch(() => console.error("Nije povezan sa bazom"));

app.use(express.json());

app.use("/recept", receptRouter);

app.listen(3000);
