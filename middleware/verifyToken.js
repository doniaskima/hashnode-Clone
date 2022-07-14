const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
	const token = req.header("Authorization");
	if (!token) {
		return res.status(401).json("No token provided");
	}

	try {
		const verifiedUser = jwt.verify(token, process.env.TOKEN_KEY);
		req.verifiedUser = verifiedUser;
		next();
	} catch (err) {
		return res.status(403).json("Invalid token");
	}
};
