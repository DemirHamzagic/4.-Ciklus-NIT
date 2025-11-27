require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const studentRouter = require("./routes/students");
const courseRouter = require("./routes/courses");
const gradeRouter = require("./routes/grades");

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Povezan sa bazom"))
	.catch(() => console.log("Nije povezano"));

app.use(express.json());

app.use("/students", studentRouter);
app.use("/courses", courseRouter);
app.use("/grades", gradeRouter);

app.listen(3000);
