const blogModels = require("../models/blog.models");
const userModels = require("../models/user.models");
const storyModels = require("../models/story.models");
const followModels = require("../models/follow.models");
const { default: mongoose } = require("mongoose");
const createBlog = async(req, res) => {
    const newBlog = new blogModels({
        name: req.body.name,
        owners: [req.verifiedUser._id],
    });
    try {
        const savedBlog = await newBlog.save();
        return res.status(200).json(savedBlog);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const getBlogs = async(req, res) => {
    try {
        const blogs = await blogModels.find();
        return res.status(200).json(blogs);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const getBlog = async(req, res) => {
    const blog = await blogModels.aggregate([{
            $match: { _id: mongoose.Types.ObjectId(req.blog._id) },
            //Filters the documents to pass only the documents that match the specified condition(s) to the next pipeline stage.
        },
        {
            //To perform an equality match between a field from the input documents with a field from the documents of the  
            //"joined" collection, the $lookup stage has this syntax:
            $lookup: {
                from: "users",
                localField: "owners", //localField: the field we want to join by in the local collection (the collection we are running the query on) 
                foreignField: "_id", //foreignField: the field we want to join by in the foreign collection (the collection we want to join with)
                as: "owners", // as: the name of the output array for the results.
            },
        },
        {
            $unwind: "$owners",
            //Deconstructs an array field from the input documents to output a document for each element .
            //Each output document is the input document with the value of the array field replaced by the element.  
        },
        {
            $project: {
                "owners.password": 0,
            },
            //The $project takes a document that can specify the inclusion of fields, the suppression of the _id field, the addition of new fields, and the resetting of the values of existing fields. Alternatively
            // Alternatively, you may specify the exclusion of fields.
        },
        {
            $lookup: {
                from: "follows",
                let: {
                    blogId: "$_id",
                },
                pipeline: [{
                    $match: {
                        $expr: {
                            $and: {
                                $eq: [
                                    "$follower",
                                    mongoose.Types.ObjectId(req.verifiedUser._id),
                                ],
                                $eq: ["$$blogId", "$following.entity"],
                                $eq: ["$following.model", "Blog"],
                            },
                        },
                    },
                }, ],
                as: "followers",
            },
        },
        {
            $addFields: {
                followers: { $size: "$followers" },
            },
        },
        {
            $addFields: {
                canFollow: {
                    $switch: { //Evaluates a series of case expressions. When it finds an expression which evaluates to true, $switch executes a specified expression and breaks out of the control flow.
                        branches: [
                            { case: { $eq: ["$followers", 1] }, then: false },
                            { case: { $eq: ["$followers", 0] }, then: true },
                        ],
                    },
                },
            },
        },
        {
            $unset: "followers",
        },
    ]);
    try {
        return res.status(200).json(blog[0]);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const deleteBlog = async(req, res) => {
    const id = req.blog._id;
    try {
        const blog = await blogModels.findByIdAndDelete(id);
        return res.status(200).json(blog);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const updateBlog = async(req, res) => {
    const id = req.blog._id;
    try {
        const blog = await blogModels.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return res.status(200).json(blog);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const getOwnedBlogs = async(req, res) => {
    try {
        const blogs = await blogModels.find({
            owners: { $in: [req.verifiedUser._id] },
        });
        return res.status(200).json(blogs);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const addOwnerToBlog = async(req, res) => {
    const blog = req.blog;

    try {
        const existUser = await userModels.findOne({ email: req.body.email });
        if (!existUser) {
            const newUser = new userModels({
                email: req.body.email,
            });
            const savedUser = await newUser.save();
            await blog.addOwner(savedUser._id);
        } else {
            await blog.addOwner(existUser._id);
        }
        await blog.populate({
            path: "owners",
            select: "email firstName lastName username avatar",
        });
        return res.status(200).json(blog);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const removeOwnerFromBlog = async(req, res) => {
    const blog = req.blog;

    try {
        const existUser = await userModels.findOne({ email: req.body.email });
        if (!existUser) {
            return res.status(400).json("User is not a member of this blog");
        } else {
            await blog.removeOwner(existUser._id);
        }
        await blog.populate({
            path: "owners",
            select: "email firstName lastName username avatar",
        });
        return res.status(200).json(blog);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const getBlogStories = async(req, res) => {
    const blog = req.blog;
    try {
        const stories = await storyModels.find({
            blog: blog._id,
        });
        return res.status(200).json(stories);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const addView = async(req, res, next) => {
    try {
        await blogModels.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        });
        res.status(200).json("The view has been increased.");
    } catch (err) {
        return res.status(500).json(err);
    }

};

module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.getBlog = getBlog;
module.exports.deleteBlog = deleteBlog;
module.exports.updateBlog = updateBlog;
module.exports.getOwnedBlogs = getOwnedBlogs;
module.exports.addOwnerToBlog = addOwnerToBlog;
module.exports.removeOwnerFromBlog = removeOwnerFromBlog;
module.exports.addView = addView;