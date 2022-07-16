const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		story: { type: mongoose.Schema.Types.ObjectId, ref: "Story" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Bookmark", BookmarkSchema);
