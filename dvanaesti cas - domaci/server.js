require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const manufacturerRouter = require("./routes/manufacturer");
const ratingRouter = require("./routes/rating");

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Povezan sa bazom"))
	.catch(() => console.log("Nije povezan"));

app.use(express.json());

app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/manufacturer", manufacturerRouter);
app.use("/rating", ratingRouter);

app.listen(3000);
