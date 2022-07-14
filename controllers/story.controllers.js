const storyModels = require("../models/story.models");

const createStory = async (req, res) => {
	const newStory = new storyModels({
		title: req.body.title,
		content: req.body.content,
		tags: req.body.tags,
		author: req.verifiedUser._id,
	});
	try {
		const savedStory = await newStory.save();
		return res.status(200).json(savedStory);
	} catch (err) {
		return res.status(500).json(err);
	}
};

const getStories = async (req, res) => {
	try {
		const stories = await storyModels.find();
		return res.status(200).json(stories);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const getStory = async (req, res) => {
	const story = req.story;

	try {
		return res.status(200).json(story);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const deleteStory = async (req, res) => {
	const id = req.story._id;
	try {
		const story = await storyModels.findByIdAndDelete(id);
		return res.status(200).json(story);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const updateStory = async (req, res) => {
	const id = req.story._id;
	try {
		const story = await storyModels.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		return res.status(200).json(story);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const publishStory = async (req, res) => {
	const id = req.story._id;
	try {
		const story = await storyModels.findByIdAndUpdate(
			id,
			{
				publishedAt: Date.now(),
				isDraft: false,
				blog: req.blog._id,
			},
			{
				new: true,
			}
		);
		return res.status(200).json(story);
	} catch (err) {
		return res.status(500).json(err);
	}
};
module.exports.createStory = createStory;
module.exports.getStories = getStories;
module.exports.getStory = getStory;
module.exports.deleteStory = deleteStory;
module.exports.updateStory = updateStory;
module.exports.publishStory = publishStory;
