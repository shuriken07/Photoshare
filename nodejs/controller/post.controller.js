const postService = require("../service/post.service");
class PostController {
    addPost = async (req, res) => {
        try {
            const data = await postService.addPost(req);
            res.status(201).json({
                status: true,
                message: "Post Created Successfully",
                data
            });
        } catch (err) {
            res.status(400).json({
                status: false,
                message: err.message
            });
        }
    };
    getPosts = async (req, res) => {
        try {
            const data = await postService.getPosts(req);
            res.json({
                status: true,
                data: data.posts,
                totalPages: data.totalPages,
                currentPage: data.currentPage
            });
        } catch (err) {
            res.status(500).json({
                status: false,
                message: err.message
            });
        }
    };
    getPostById = async (req, res) => {
        try {
            const data = await postService.getPostById(req);
            res.json({
                status: true,
                data
            });
        } catch (err) {
            res.status(500).json({
                status: false,
                message: err.message
            });
        }
    };
    updatePost = async (req, res) => {
        try {
            const data = await postService.updatePost(req);
            res.json({
                status: true,
                message: "Post Updated Successfully",
                data
            });
        } catch (err) {
            res.status(400).json({
                status: false,
                message: err.message
            });
        }
    };
    deletePost = async (req, res) => {
        try {
            const data = await postService.deletePost(req);
            res.json({
                status: true,
                message: data.message
            });
        } catch (err) {
            res.status(400).json({
                status: false,
                message: err.message
            });
        }
    };
    searchPosts = async (req, res) => {
        try {
            const data = await postService.searchPosts(req);
            res.json({
                status: true,
                data
            });
        } catch (err) {
            res.status(500).json({
                status: false,
                message: err.message
            });
        }
    };
}
module.exports = new PostController();