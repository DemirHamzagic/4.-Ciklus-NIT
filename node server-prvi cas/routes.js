// exports.handleRequest = (req, res) => {
// 	if (req.url === "/") {
// 		res.end("Pocetna stranica");
// 	} else if (req.url === "/about") {
// 		res.end("About stranica");
// 	} else if (req.url === "/contact") {
// 		res.end("Contact stranica");
// 	} else if (req.url === "/shop") {
// 		res.end("Shop stranica");
// 	} else if (req.url === "/profile") {
// 		res.end("Profile stranica");
// 	} else res.end("404 error");
// };
exports.handleRequest2 = (req, res) => {
	if (req.url === "/") {
		res.end("Pocetna stranica");
	} else if (req.url === "/date") {
		let date = new Date().toLocaleDateString();
		res.end(`Danas je ${date}`);
	} else if (req.url === "/time") {
		let time = new Date().toLocaleTimeString();
		res.end(`Trenutno je ${time} sati`);
	} else {
		res.StatusCode = 404;
		res.end("404 error");
	}
};

// function handleRequest(req, res) {
// 	if (req.url === "/") {
// 		res.end("Pocetna stranica");
// 	} else if (req.url === "/about") {
// 		res.end("About stranica");
// 	} else if (req.url === "/contact") {
// 		res.end("Contact stranica");
// 	} else if (req.url === "/shop") {
// 		res.end("Shop stranica");
// 	} else if (req.url === "/profile") {
// 		res.end("Profile stranica");
// 	} else res.end("404 error");
// }

// module.exports = handleRequest();
