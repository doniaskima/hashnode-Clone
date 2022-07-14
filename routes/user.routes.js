const {
	createUser,
	getUser,
	getUsers,
	updateUser,
	deleteUser,
} = require("../controllers/user.controllers");
const userModel = require("../models/user.models");
const router = require("express").Router();

router.param("user", async (req, res, next, id) => {
	try {
		const user = await userModel.findById(id);

		if (!user) {
			return res.status(404).json("user not found");
		}

		req.user = user;
		next();
	} catch (err) {
		return res.status(500).json(err);
	}
});

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:user", getUser);
router.put("/:user", updateUser);
router.delete("/:user", deleteUser);

module.exports = router;
