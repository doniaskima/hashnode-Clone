const mongoose = require("mongoose");

const ReactionSchema = new mongoose.Schema(
	{
		emoji: { type: String },
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		story: { type: mongoose.Schema.Types.ObjectId, ref: "Story" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Reaction", ReactionSchema);
