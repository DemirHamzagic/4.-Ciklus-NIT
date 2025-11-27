require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes");

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Povezan sa bazom"))
	.catch(() => console.log("Nije povezan"));

app.use(express.json());
app.use(cors());

app.get(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.use("/", userRouter);
app.listen(3000);
