const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    firstName: { type: String, maxlength: 128 },
    lastName: { type: String, maxlength: 128 },
    avatar: { type: String },
    bio: {
        type: String,
        maxlength: 1024,
    },
    linkedin: {
        type: String,
    },
    instagram: {
        type: String,
    },
    facebook: {
        type: String,
    },
    github: {
        type: String,
    },
});
module.exports = mongoose.model("Profile", ProfileSchema);