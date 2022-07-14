const profileModels = require("../models/profile.models");

const createProfile = async(req, res) => {
    const newProfile = new profileModels({
        avatar: req.body.avatar,
        AboutMe: req.body.AboutMe,
        MyTechStack: req.body.MyTechStack,
        Iam_available_for: req.body.Iam_available_for
    });
    try {
        const savedProfile = await newProfile.save();
        return res.status(200).json(savedProfile);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const getProfiles = async(req, res) => {
    try {
        const stories = await profileModels.find();
        return res.status(200).json(stories);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const getProfile = async(req, res) => {
    const profile = req.profile;

    try {
        return res.status(200).json(profile);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const deleteProfile = async(req, res) => {
    const id = req.profile._id;
    try {
        const profile = await profileModels.findByIdAndDelete(id);
        return res.status(200).json(profile);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const updateProfile = async(req, res) => {
    const id = req.profile._id;
    try {
        const profile = await profileModels.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        return res.status(200).json(profile);
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports.createProfile = createProfile;
module.exports.getProfiles = getProfiles;
module.exports.getProfile = getProfile;
module.exports.deleteProfile = deleteProfile;
module.exports.updateProfile = updateProfile;