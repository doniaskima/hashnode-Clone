const followModels = require("../models/follow.models");


const followBlog = async(req, res) => {
    try {
        if (req.isFollowing) {
            return res.status(200).json(req.isFollowing);
        } else {
            const newfollow = new followModel({
                follower: req.verifiedUser._id,
                following: {
                    entity: req.blog._id,
                    model: "Blog"
                }
            });

            const savefollow = await newfollow.save();
            return res.status(200).json(savefollow);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
};

const followTag = async(req, res) => {
    try {
        if (req.isFollowing) {
            return res.status(200).json(req.isFollowing);
        } else {
            const newfollow = new followModel({
                follower: req.verifiedUser._id,
                following: {
                    entity: req.tag._id,
                    model: "Tag"
                }
            });

            const savefollow = await newfollow.save();
            return res.status(200).json(savefollow);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
};
const getFollows = async(req, res) => {
    try {
        const follows = await followModels.find();
        return res.status(200).json(follows);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const getFollow = async(req, res) => {
    const id = req.params.followId;

    try {
        const follow = await followModels.findById(id);
        return res.status(200).json(follow);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const deleteFollow = async(req, res) => {
    const id = req.params.followId;
    try {
        const follow = await followModels.findByIdAndDelete(id);
        return res.status(200).json(follow);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const updateFollow = async(req, res) => {
    const id = req.params.followId;
    try {
        const follow = await followModels.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return res.status(200).json(follow);
    } catch (err) {
        return res.status(500).json(err);
    }
};


module.exports.getFollows = getFollows;
module.exports.getFollow = getFollow;
module.exports.deleteFollow = deleteFollow;
module.exports.updateFollow = updateFollow;
module.exports.followBlog = followBlog;
module.exports.followTag = followTag;