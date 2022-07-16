const tagModels = require("../models/tag.models");
const mongoose = require("mongoose");
const createTag = async (req, res) => {
	const newTag = new tagModels({
		name: req.body.name,
		owners: req.body.icon,
	});
	try {
		const savedTag = await newTag.save();
		return res.status(200).json(savedTag);
	} catch (err) {
		return res.status(500).json(err);
	}
};

const getTags = async (req, res) => {
	try {
		const tags = await tagModels.find();
		return res.status(200).json(tags);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const getTag = async (req, res) => {
	try {
		const tag = await tagModels.aggregate([
			{
				$match: { _id: mongoose.Types.ObjectId(req.tag._id) },
			},
			{
				$lookup: {
					from: "follows",
					let: {
						tagId: "$_id",
					},
					pipeline: [
						{
							$match: {
								$expr: {
									$and: {
										$eq: ["$$tagId", "$following.entity"],
										$eq: ["$following.model", "Tag"],
									},
								},
							},
						},
					],

					as: "followers",
				},
			},
			{
				$addFields: { followers: { $size: "$followers" } },
			},

			{
				$lookup: {
					from: "stories",
					localField: "_id",
					foreignField: "tags",
					as: "stories",
				},
			},
			{
				$addFields: { stories: { $size: "$stories" } },
			},
		]);
		return res.status(200).json(tag);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const deleteTag = async (req, res) => {
	const id = req.params.tagId;
	try {
		const tag = await tagModels.findByIdAndDelete(id);
		return res.status(200).json(tag);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const updateTag = async (req, res) => {
	const id = req.params.tagId;
	try {
		const tag = await tagModels.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		return res.status(200).json(tag);
	} catch (err) {
		return res.status(500).json(err);
	}
};

module.exports.createTag = createTag;
module.exports.getTags = getTags;
module.exports.getTag = getTag;
module.exports.deleteTag = deleteTag;
module.exports.updateTag = updateTag;
