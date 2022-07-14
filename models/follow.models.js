const mongoose = require("mongoose");

const FollowSchema = new mongoose.Schema(
	{
		follower: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		following: {
			entity: {
				type: mongoose.Schema.Types.ObjectId,
				refPath: "followingModel",
			},
			model: {
				type: String,
				required: true,
				enum: ["Tag", "Blog"],
			},
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Follow", FollowSchema);
