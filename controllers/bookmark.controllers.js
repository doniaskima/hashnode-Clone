const bookmarkModels = require("../models/bookmark.models");
const mongoose = require("mongoose");
const bookmarkStory = async (req, res) => {
	try {
		let isStoryBookmarked = null;
		isStoryBookmarked = await bookmarkModels.findOne({
			story: req.story._id,
			user: req.verifiedUser._id,
		});
		if (!isStoryBookmarked) {
			isStoryBookmarked = new bookmarkModels({
				user: req.verifiedUser._id,
				story: req.story._id,
			});
			await isStoryBookmarked.save();
		}
		return res.status(201).json({ message: `${req.story.title} bookmarked` });
	} catch (err) {
		return res.status(500).json(err);
	}
};

const unbookmarkStory = async (req, res) => {
	try {
		await bookmarkModels.deleteOne({
			user: req.verifiedUser._id,
			story: req.story._id,
		});
		return res.status(204).json();
	} catch (err) {
		return res.status(500).json(err);
	}
};

const getBookmarkedStories = async (req, res) => {
	try {
		const bookmarks = await bookmarkModels.aggregate([
			{
				$match: { user: mongoose.Types.ObjectId(req.verifiedUser._id) },
			},
			{
				$lookup: {
					from: "stories",
					localField: "story",
					foreignField: "_id",
					as: "story",
				},
			},
			{ $unwind: "$story" },
			{
				$project: {
					story: 1,
				},
			},
		]);
		return res.status(200).json(bookmarks);
	} catch (err) {
		return res.status(500).json(err);
	}
};

module.exports.bookmarkStory = bookmarkStory;
module.exports.unbookmarkStory = unbookmarkStory;
module.exports.getBookmarkedStories = getBookmarkedStories;
