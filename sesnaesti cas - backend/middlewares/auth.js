const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
	const header = req.headers.authorization;
	console.log(header);
	if (!header || !header.startsWith("Bearer "))
		return res.status(401).json({ message: "Token nije validan" });

	const token = header.split(" ")[1];
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		return res
			.status(401)
			.json({ message: "Token nije validan", error: err.message });
	}
};
