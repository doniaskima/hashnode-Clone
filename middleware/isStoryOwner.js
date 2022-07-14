module.exports = function (req, res, next) {
	if (req.story.author.toString() === req.verifiedUser._id.toString()) {
		next();
	} else {
		return res.status(403).json("you are not an owner of this story");
	}
};
