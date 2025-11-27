const data = require("./data");

exports.handleRequest = (req, res) => {
	if (req.url === "/" && req.method === "GET") {
		res.writeHead(200, { "Content-Type": "text/plain" });
		res.end("Pocetna stranica");
	} else if (req.url === "/shop" && req.method === "GET") {
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(data));
	} else {
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("Page not available...");
	}
};
