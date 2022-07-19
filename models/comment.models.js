const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
	{
		story: { type: mongoose.Schema.Types.ObjectId, ref: "Story" },
		content: { type: String },
		replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
		author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);
CommentSchema.methods.addReply = async function (id) {
	if (this.replies.indexOf(id) === -1) {
		this.replies.push(id);
	}
	return await this.save();
};
CommentSchema.methods.removeReply = async function (id) {
	if (this.replies.indexOf(id) !== -1) {
		this.replies = this.replies.filter((r) => {
			return r.toString() !== id.toString();
		});
	}
	return await this.save();
};
module.exports = mongoose.model("Comment", CommentSchema);
