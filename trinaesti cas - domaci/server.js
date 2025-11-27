require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const employeeRouter = require("./routes/employeeRouter");
const departmentRouter = require("./routes/departmentRouter");
const projectRouter = require("./routes/projectRouter");

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Povezan sa bazom"))
	.catch(() => console.log("Nije povezan"));

app.use(express.json());
app.use("/employees", employeeRouter);
app.use("/department", departmentRouter);
app.use("/project", projectRouter);

app.listen(3000);
