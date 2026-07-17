const postModel = require("../model/post.model");
const fs = require("fs");
const path = require("path");
class PostService {

    addPost = async (req) => {
        const { title, description } = req.body;
        if (!title || !description) {
            throw new Error("Title and Description are required");
        }
        if (!req.file) {
            throw new Error("Please upload an image");
        }
        const post = await postModel.create({
            title,
            description,
            image: req.file.path,
            userId: req.user.id
        });
        return post;
    };
    getPosts = async (req) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const search = req.query.search || "";
        const matchStage = {};
        if (search) {
            matchStage.title = {
                $regex: search,
                $options: "i",
            };
        }
        const posts = await postModel.aggregate([
            {
                $match: matchStage,
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userId",
                },
            },
            {
                $unwind: "$userId",
            },
            {
                $project: {
                    title: 1,
                    description: 1,
                    image: 1,
                    createdAt: 1,
                    "userId._id": 1,
                    "userId.username": 1,
                    "userId.email": 1,
                },
            },
            {
                $sort: {
                    createdAt: -1,
                },
            },
            {
                $skip: (page - 1) * limit,
            },
            {
                $limit: limit,
            },
        ]);
        const totalPosts = await postModel.countDocuments(matchStage);
        return {
            posts,
            currentPage: page,
            totalPages: Math.ceil(totalPosts / limit),
        };
    };
    updatePost = async (req) => {
        const post = await postModel.findById(req.params.id);
        if (!post) {
            throw new Error("Post not found");
        }
        if (post.userId.toString() !== req.user.id) {
            throw new Error("You are not authorized to update this post");
        }
        const updateData = {
            title: req.body.title,
            description: req.body.description,
        };
        if (req.file) {
            if (post.image) {
                const imagePath = path.join(__dirname, "..", post.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            updateData.image = req.file.path;
        }
        return await postModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );
    };
    deletePost = async (req) => {
        if (post.image) {
            const imagePath = path.join(__dirname, "..", post.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        const post = await postModel.findById(req.params.id);
        if (!post) {
            throw new Error("Post not found");
        }
        if (post.userId.toString() !== req.user.id) {
            throw new Error("You are not authorized to delete this post");
        }
        await postModel.findByIdAndDelete(req.params.id);
        return {
            message: "Post Deleted Successfully"
        };
    };
};

module.exports = new PostService();