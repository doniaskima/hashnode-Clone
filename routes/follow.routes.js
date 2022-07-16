const {
	getFollow,
	getFollows,
	updateFollow,
	deleteFollow,
} = require("../controllers/follow.controllers");
const followModel = require("../models/follow.models");
const router = require("express").Router();

router.param("follow", async (req, res, next, id) => {
	try {
		const follow = await followModel.findById(id);

		if (!follow) {
			return res.status(404).json("follow not found");
		}

		req.follow = follow;
		next();
	} catch (err) {
		return res.status(500).json(err);
	}
});
router.get("/", getFollows);
router.get("/:follow", getFollow);
router.put("/:follow", updateFollow);
router.delete("/:follow", deleteFollow);

module.exports = router;
