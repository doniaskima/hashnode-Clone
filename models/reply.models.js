const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema(
	{
		content: { type: String },
		author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Reply", ReplySchema);
