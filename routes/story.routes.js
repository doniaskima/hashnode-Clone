const {
	createStory,
	getStory,
	getStories,
	updateStory,
	deleteStory,
} = require("../controllers/story.controllers");
const {
	createComment,
	getComment,
	getComments,
	deleteComment,
	updateComment,
} = require("../controllers/comment.controllers");
const {
	createReaction,
	getReaction,
	getReactions,
	updateReaction,
	deleteReaction,
} = require("../controllers/reaction.controllers");
const storyModel = require("../models/story.models");
const commentModel = require("../models/comment.models");
const reactionModel = require("../models/reaction.models");
const verifyToken = require("../middleware/verifyToken");
const router = require("express").Router();

router.param("story", async (req, res, next, id) => {
	try {
		const story = await storyModel.findById(id);
		console.log(story);
		if (!story) {
			return res.status(404).json("story not found");
		}

		req.story = story;
		next();
	} catch (err) {
		return res.status(500).json(err);
	}
});
router.param("reaction", async (req, res, next, id) => {
	try {
		const reaction = await reactionModel.findById(id);

		if (!reaction) {
			return res.status(404).json("reaction not found");
		}

		req.reaction = reaction;
		next();
	} catch (err) {
		return res.status(500).json(err);
	}
});

router.param("comment", async (req, res, next, id) => {
	try {
		const comment = await commentModel.findById(id);

		if (!comment) {
			return res.status(404).json("comment not found");
		}
		req.comment = comment;
		next();
	} catch (err) {
		return res.status(500).json(err);
	}
});

router.post("/", verifyToken, createStory);
router.get("/", getStories);
router.get("/:story", getStory);
router.put("/:story", updateStory);
router.delete("/:story", deleteStory);

router.post("/:story/comments", verifyToken, createComment);
router.post("/:story/comments/:comment", createComment);
router.get("/:story/comments", getComments);
router.get("/:story/comments/:comment", getComment);
router.put("/:story/comments/:comment", updateComment);
router.delete("/:story/comments/:comment", deleteComment);

router.post("/:story/reactions", createReaction);
router.get("/:story/reactions", getReactions);
router.get("/:story/reactions/:reaction", getReaction);
router.put("/:story/reactions/:reaction", updateReaction);
router.delete("/:story/reactions/:reaction", deleteReaction);
module.exports = router;
