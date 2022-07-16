const storyModels = require("../models/story.models");
const mongoose = require("mongoose");
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
	try {
		await req.story.updateOne({ $inc: { views: 1 } });
		const story = await storyModels.aggregate([
			{
				$match: { _id: mongoose.Types.ObjectId(req.story._id) },
			},
			{
				$lookup: {
					from: "users",
					localField: "author",
					foreignField: "_id",
					as: "author",
				},
			},
			{ $unwind: "$author" },

			{
				$lookup: {
					from: "tags",
					localField: "tags",
					foreignField: "_id",
					as: "tags",
				},
			},
			{
				$lookup: {
					from: "blogs",
					localField: "blog",
					foreignField: "_id",
					as: "blog",
				},
			},
			{ $unwind: "$blog" },
			{
				$project: {
					"author.password": 0,
					"blog.owners": 0,
				},
			},
			{
				$lookup: {
					from: "reactions",
					let: {
						storyId: "$_id",
					},
					pipeline: [
						{
							$match: {
								$expr: {
									$eq: ["$$storyId", "$story"],
								},
							},
						},
						{
							$group: {
								_id: "$emoji",

								count: { $sum: 1 },
							},
						},
					],
					as: "reactions",
				},
			},

			// {
			// 	$lookup: {
			// 		from: "bookmarks",
			// 		let: {
			// 			storyId: "$_id",
			// 		},
			// 		pipeline: [
			// 			{
			// 				$match: {
			// 					$expr: {
			// 						$and: {
			// 							$eq: ["$user", mongoose.Types.ObjectId(req.verifiedUser._id)],
			// 							$eq: ["$$storyId", "$story"],
			// 						},
			// 					},
			// 				},
			// 			},
			// 		],

			// 		as: "bookmarked",
			// 	},
			// },
		]);

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
