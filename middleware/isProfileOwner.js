module.exports = (req, res, next) => {
    if (req.user.profile.toString() === req.verifiedUser.profile) {
        next()
    } else {
        return res.status(403).json("not your profile");
    }
}