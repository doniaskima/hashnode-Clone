const {
	getBlogs,
	getBlog,
	deleteBlog,
	createBlog,
	updateBlog,
	getOwnedBlogs,
	addOwnerToBlog,
	removeOwnerFromBlog,
	getBlogStories,
} = require("../controllers/blog.controllers");
const blogModels = require("../models/blog.models");
const storyModel = require("../models/story.models");
const verifyToken = require("../middleware/verifyToken");
const isBlogOwner = require("../middleware/isBlogOwner");
const { publishStory } = require("../controllers/story.controllers");
const isStoryOwner = require("../middleware/isStoryOwner");
const { followBlog } = require("../controllers/follow.controllers");
const isTokenExist = require("../middleware/isTokenExist");
const router = require("express").Router();

router.param("blog", async (req, res, next, id) => {
	try {
		const blog = await blogModels.findById(id);

		if (!blog) return res.status(404).json("blog not found");
		req.blog = blog;
		next();
	} catch (err) {
		return res.status(500).json(err);
	}
});
router.param("story", async (req, res, next, id) => {
	try {
		const story = await storyModel.findById(id);

		if (!story) {
			return res.status(404).json("story not found");
		}
		req.story = story;
		next();
	} catch (err) {
		return res.status(500).json(err);
	}
});
router.get("/", getBlogs);
router.get("/me", verifyToken, getOwnedBlogs);
router.get("/:blog",isTokenExist, getBlog);
router.post("/:blog/owners", verifyToken, isBlogOwner, addOwnerToBlog);
router.patch("/:blog/owners", verifyToken, isBlogOwner, removeOwnerFromBlog);
router.post("/", verifyToken, createBlog);
router.put("/:blog", verifyToken, isBlogOwner, updateBlog);
router.delete("/:blog", verifyToken, isBlogOwner, deleteBlog);
router.patch(
	"/:blog/stories/:story/publish",
	verifyToken,
	isStoryOwner,
	publishStory
);
router.post("/:blog/follow");
router.get("/:blog/stories", getBlogStories);
router.get("/:blog/follow", verifyToken, followBlog);
module.exports = router;
