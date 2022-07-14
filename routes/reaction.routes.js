const {
    createReaction,
    getReaction,
    getReactions,
    updateReaction,
    deleteReaction,
    getCountReaction
} = require("../controllers/reaction.controllers");
const reactionModel = require("../models/reaction.models");
const router = require("express").Router();

router.param("reaction", async(req, res, next, id) => {
    try {
        const reaction = await reactionModel.findById(id);

        if (!reaction) {
            return res.status(404).json("reaction not found");
        }

        req.reaction = reaction;
        next();
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.post("/", createReaction);
router.get("/", getReactions);
router.get("/:reaction", getReaction);
router.put("/:reaction", updateReaction);
router.delete("/:reaction", deleteReaction);
router.get("/:story/countReactions", getCountReaction);

module.exports = router;