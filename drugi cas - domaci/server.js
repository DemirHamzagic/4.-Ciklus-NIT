const http = require("http");
const routes = require("./routes");

const server1 = http.createServer(routes.handleRequest1);

server1.listen(3000, () => {
	console.log("Server jedan je pokrenut na linku http://localhost:3000");
});

const server2 = http.createServer(routes.handleRequest2);

server2.listen(3001, () => {
	console.log("Server jedan je pokrenut na linku http://localhost:3001");
});
const server3 = http.createServer(routes.handleRequest3);

server3.listen(3002, () => {
	console.log("Server jedan je pokrenut na linku http://localhost:3002");
});
