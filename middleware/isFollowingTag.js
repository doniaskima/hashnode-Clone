const followModel = require("../models/follow.models");
module.exports = async function(req, res, next) {
    const isFollowing = await followModel.findOne({
        follower: req.verifiedUser._id,
        "following.entity": req.tag._id
    });

    if (isFollowing) {
        req.isFollowing = true;
    } else {
        req.isFollowing = false;
    }

    next();
}