const commentModel = require("../models/comment.models");
const router = require("express").Router();
const {
    // 	createReply,
    // 	getReply,
    // 	getReplies,
    // 	deleteReply,
    // 	updateReply,
    getComment,
    getComments,
    createComment,
    getCountComment
} = require("../controllers/comment.controllers");
router.param("comment", async(req, res, next, id) => {
    try {
        const comment = await commentModel.findById(id);

        if (!comment) {
            return res.status(404).json("comment not found");
        }
        req.comment = comment;
        next();
    } catch (err) {
        return res.status(500).json(err);
    }
});
router.param("comment", async(req, res, next, id) => {
    try {
        const comment = await commentModel.findById(id);

        if (!comment) {
            return res.status(404).json("comment not found");
        }
        req.comment = comment;
        next();
    } catch (err) {
        return res.status(500).json(err);
    }
});
// router.post("/:comment/replies", createReply);
// router.get("/:comment/replies", getReplies);
// router.delete("/:comment/replies/:reply", deleteReply);
router.get("/:comment", getComment);
router.get("/", getComments);
router.post("/", createComment);
router.get("/:story/countComments", getCountComment);

module.exports = router;