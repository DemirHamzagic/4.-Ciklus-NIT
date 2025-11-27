module.exports = function authorize(...roles) {
	return (req, res, next) => {
		if (!roles.includes(req.user.roles))
			return res.status(403).json({ message: "Pristup odbijen" });
		next();
	};
};
