require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const { rateLimiter } = require("./middlewares/rateLimit");

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Povezan sa bazom"))
	.catch(() => console.log("Nije povezan"));

app.use(express.json());
app.use(cors());
app.use(rateLimiter);

app.use("/api/auth", userRouter);
app.use("/api/posts", postRouter);
app.listen(3000);
