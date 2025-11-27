const os = require("os");
const path = require("path");
const fs = require("fs");
const dataBaze = require("./data");

exports.handleRequest1 = (req, res) => {
	if (req.url === "/") {
		res.writeHead(200, { "Content-Type": "text/plain" });
		res.end("Pocetna stranica! 1");
	} else if (req.url === "/data") {
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(dataBaze.data.serverData1));
	} else if (req.url === "/info") {
		res.writeHead(200, { "Content-Type": "text/plain" });
		res.end(os.freemem().toString());
	} else {
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("Page is unavailable...");
	}
};

exports.handleRequest2 = (req, res) => {
	if (req.url === "/") {
		res.writeHead(200, { "Content-Type": "text/plain" });
		res.end("Pocetna stranica! 2");
	} else if (req.url === "/data") {
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(dataBaze.data.serverData2));
	} else if (req.url === "/path") {
		res.writeHead(200, { "Content-Type": "text/plain" });
		res.end(path.join(__dirname, "data.js"));
	} else {
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("Page is unavailable...");
	}
};

exports.handleRequest3 = (req, res) => {
	if (req.url === "/") {
		res.writeHead(200, { "Content-Type": "text/plain" });
		res.end("Pocetna stranica! 3");
	} else if (req.url === "/data") {
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(dataBaze.data.serverData3));
	} else if (req.url === "/save") {
		res.writeHead(200, { "Content-Type": "text/plain" });
		res.end(
			fs.appendFileSync(
				"log.txt",
				`Korisnik je pristupio /data u ${new Date().toLocaleTimeString()}`
			)
		);
	} else {
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("Page is unavailable...");
	}
};
