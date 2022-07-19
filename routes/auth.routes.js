const {
	register,
	login,
	emailVerification,
	forgotPassword,
	resetPassword,
} = require("../controllers/auth.controllers");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", emailVerification);
router.post("/forgot", forgotPassword);
router.post("/reset", resetPassword);
module.exports = router;
