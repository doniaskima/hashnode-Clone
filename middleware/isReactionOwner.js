module.exports = (req, res, next) => {
    if (req.reaction.author.toString() === req.verifiedUser._id) {
        next()
    } else {
        return res.status(403).json("not your reaction");
    }
}