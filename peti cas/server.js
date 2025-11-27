const express = require("express");
const app = express();
const userRouter = require("./routes/users");
const aboutRouter = require("./routes/about");
const studentsRouter = require("./routes/students");

app.use("/users", userRouter);
app.use("/about", aboutRouter);
app.use("/students", studentsRouter);

app.listen(3000);
