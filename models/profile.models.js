const mongoose = require("mongoose");
const ProfileSchema = new mongoose.Schema({
    avatar: { type: String },
    AboutMe: { type: String },
    MyTechStack: { type: String },
    Iam_available_for: { type: String },
}, { timestamps: true });
module.exports = mongoose.model("Profile", ProfileSchema);