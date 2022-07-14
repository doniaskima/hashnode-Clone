const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		firstName: { type: String, maxlength: 128 },
		lastName: { type: String, maxlength: 128 },
		email: {
			type: String,
			required: true,
			unique: true,
			index: true,
			lowercase: true,
		},
		username: {
			type: String,
			unique: true,
			lowercase: true,
			index: true,
			maxlength: 256,
		},
		avatar: { type: String },
		bio: {
			type: String,
			maxlength: 1024,
		},
		password: { type: String, required: true, maxlength: 4096 },
		lastLogin: { type: Date, default: Date.now },
		isAdmin: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
