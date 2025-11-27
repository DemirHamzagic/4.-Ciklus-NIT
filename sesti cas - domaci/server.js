const express = require("express");
const studentRouter = require("./routes/students");
const bookRouter = require("./routes/books");
const courseRouter = require("./routes/course");
const app = express();

app.use(express.json());

app.use("/book", bookRouter);
app.use("/course", courseRouter);
app.use("/", studentRouter);

app.listen(3000);
