const mongoose = require("mongoose");
const slug = require("slug");
const commentModels = require("./comment.models");
const reactionModels = require("./reaction.models");
const StorySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			minlength: 4,
			maxlength: 512,
			required: true,
			lowercase: true,
		},
		slug: { type: String, maxlength: 1024, unique: true, index: true },
		content: { type: String },
		publishedAt: { type: Date },
		readTime: { type: Number, default: 1 },
		tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
		author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
		isDraft: { type: Boolean, default: true },
	},
	{ timestamps: true }
);
StorySchema.pre("findOneAndDelete", async function (next) {
	await commentModels.deleteMany({ story: this.getQuery()["_id"] });
	await reactionModels.deleteMany({ story: this.getQuery()["_id"] });
	next();
});
StorySchema.pre("validate", function (next) {
	
	if (this.title) {
		this.slugify(this.title);
	}
	next();
});
StorySchema.methods.slugify = function (text) {
	this.slug =
		slug(text) + "-" + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};
StorySchema.methods.calculateReadTime = function () {
	const wordsPerMinute = 200;
	const noOfWords = this.content.split(/\s/g).length;
	const minutes = noOfWords / wordsPerMinute;
	const readTime = Math.ceil(minutes);
	this.readTime = readTime;
};
module.exports = mongoose.model("Story", StorySchema);
