// Primer slanja header-a za /protected rutu na backendu

fetch("/protected", {
	method: "GET",
	headers: {
		"x-api-key": "tajna123",
	},
})
	.then((response) => {
		if (!response.ok) {
			throw new Error("Niste autorizovani");
		}
		return response.text();
	})
	.then((data) => {
		console.log(data); // Ispisuje: imate pristup!
	})
	.catch((error) => {
		console.error("Greska:", error.message);
	});

fetch("/register", {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		"X-Student": "Edin",
	},
	body: JSON.stringify({
		username: "EdinM",
		email: "edin@example.com",
		password: "123456",
	}),
})
	.then((res) => res.json())
	.then(console.log);
