const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 1000,
	message: {
		status: "error",
		message: "Previse pokusaja, probaj ponovo posle 15min",
	},
	standardHeaders: true,
	legacyHeaders: false,
});

const loginLimiter = rateLimit({
	windowMs: 60 * 1000,
	max: 5,
	message: {
		status: "error",
		message: "Previse pokusaja, probaj ponovo posle 1min",
	},
	standardHeaders: true,
	legacyHeaders: false,
	skipSuccessfulRequests: true,
});

module.exports = { rateLimiter, loginLimiter };
