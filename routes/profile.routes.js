const {
    createProfile,
    getProfile,
    getProfiles,
    updateProfile,
    deleteProfile,

} = require("../controllers/profile.controllers");
const profileModel = require("../models/profile.models");
const router = require("express").Router();

router.param("profile", async(req, res, next, id) => {
    try {
        const profile = await profileModel.findById(id);

        if (!profile) {
            return res.status(404).json("profile not found");
        }

        req.profile = profile;
        next();
    } catch (err) {
        return res.status(500).json(err);
    }
});
router.post("/", createProfile);
router.get("/", getProfiles);
router.get("/:profile", getProfile);
router.put("/:profile", updateProfile);
router.delete("/:profile", deleteProfile);

module.exports = router