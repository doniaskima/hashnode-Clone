const {
    createTag,
    getTag,
    getTags,
    updateTag,
    deleteTag,
    getByTag,
  
} = require("../controllers/tag.controllers");
const tagModel = require("../models/tag.models");
const router = require("express").Router();

router.param("tag", async(req, res, next, id) => {
    try {
        const tag = await tagModel.findById(id);

        if (!tag) {
            return res.status(404).json("tag not found");
        }

        req.tag = tag;
        next();
    } catch (err) {
        return res.status(500).json(err);
    }
});


router.post("/", createTag);
router.get("/", getTags);
router.get("/:tag", getTag);
router.put("/:tag", updateTag);
router.delete("/:tag", deleteTag);

module.exports = router;