require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const studentRouter = require("./modules/Students");
const app = express();

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Povezan sa bazom"))
	.catch(() => console.log("Nije povezan"));

app.use(express.json());
app.use("/student", studentRouter);

app.listen(3000);
