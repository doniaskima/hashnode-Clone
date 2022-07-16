const mongoose = require("mongoose");
const ProfileSchema = new mongoose.Schema({
    avatar: { type: String },
    AboutMe: { type: String },
    myTechStack: { type: String },
    availableFor: { type: String },
}, { timestamps: true });
module.exports = mongoose.model("Profile", ProfileSchema);