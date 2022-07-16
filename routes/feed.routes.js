const { getBookmarkedStories } = require("../controllers/bookmark.controllers");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

router.get("/bookmarks", verifyToken, getBookmarkedStories);

module.exports = router;
