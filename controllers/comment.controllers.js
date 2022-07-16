const commentModels = require("../models/comment.models");

const createComment = async (req, res) => {
	const newComment = new commentModels({
		story: req.story._id,
		content: req.body.content,
		author: req.verifiedUser._id,
	});
	let savedComment = null;
	try {
		if (req.params.comment) {
			await req.params.comment.addReply(newComment._id);
			savedComment = req.params.comment;
		} else {
			savedComment = await newComment.save();
		}

		return res.status(200).json(savedComment);
	} catch (err) {
		return res.status(500).json(err);
	}
};

const getComments = async (req, res) => {
	try {
		const comments = await commentModels.find();
		return res.status(200).json(comments);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const getComment = async (req, res) => {
	const id = req.params.commentId;

	try {
		const comment = await commentModels.findById(id);
		return res.status(200).json(comment);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const deleteComment = async (req, res) => {
	const id = req.params.commentId;
	try {
		const comment = await commentModels.findByIdAndDelete(id);
		return res.status(200).json(comment);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const updateComment = async (req, res) => {
	const id = req.params.commentId;
	try {
		const comment = await commentModels.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		return res.status(200).json(comment);
	} catch (err) {
		return res.status(500).json(err);
	}
};

module.exports.createComment = createComment;
module.exports.getComments = getComments;
module.exports.getComment = getComment;
module.exports.deleteComment = deleteComment;
module.exports.updateComment = updateComment;
