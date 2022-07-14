module.exports = (req, res, next) => {
    if (
        req.follow.follower.toString() === req.verifiedUser._id ||
        req.follow.following.toString() === req.verifiedUser._id
    ) {
        next();
    } else {
        return res.status(403).json("not your follower");
    }
};