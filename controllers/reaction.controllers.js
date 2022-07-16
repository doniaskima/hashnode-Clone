const reactionModels = require("../models/reaction.models");

const createReaction = async (req, res) => {
	const newReaction = new reactionModels({
		emoji: req.body.emoji,
		user: req.verifiedUser._id,
		story: req.story._id,
	});
	try {
		const savedReaction = await newReaction.save();
		return res.status(200).json(savedReaction);
	} catch (err) {
		return res.status(500).json(err);
	}
};

const getReactions = async (req, res) => {
	try {
		const reactions = await reactionModels.find({ story: req.story._id });
		return res.status(200).json(reactions);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const getReaction = async (req, res) => {
	const id = req.params.reaction;

	try {
		const reaction = await reactionModels.findById(id);
		return res.status(200).json(reaction);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const deleteReaction = async (req, res) => {
	const id = req.params.reaction;
	try {
		const reaction = await reactionModels.findByIdAndDelete(id);
		return res.status(200).json(reaction);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const updateReaction = async (req, res) => {
	const id = req.params.reaction;
	try {
		const reaction = await reactionModels.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		return res.status(200).json(reaction);
	} catch (err) {
		return res.status(500).json(err);
	}
};

module.exports.createReaction = createReaction;
module.exports.getReactions = getReactions;
module.exports.getReaction = getReaction;
module.exports.deleteReaction = deleteReaction;
module.exports.updateReaction = updateReaction;
