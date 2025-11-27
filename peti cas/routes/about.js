const express = require("express");
const aboutRouter = express.Router();

aboutRouter.get("/", (req, res) => {
	res.send("About stranica");
});

aboutRouter.get("/stavka", (req, res) => {
	res.send(`Govorimo o ${req.query.stavka}`);
});

module.exports = aboutRouter;
