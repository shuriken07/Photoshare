const commentService = require("../service/comment.service");
class CommentController {
    addComment = async (req, res) => {
        try {
            const data = await commentService.addComment(req);
            res.json({
                status: true,
                data,
            });
        } catch (err) {
            res.json({
                status: false,
                message: err.message,
            });
        }
    };
    getComments = async (req, res) => {
        try {
            const data = await commentService.getComments(req);
            res.json({
                status: true,
                data,
            });
        } catch (err) {
            res.json({
                status: false,
                message: err.message,
            });
        }
    };
    updateComment = async (req, res) => {
        try {
            const data = await commentService.updateComment(req);

            res.json({
                status: true,
                message: "Comment updated successfully",
                data,
            });
        } catch (err) {
            res.json({
                status: false,
                message: err.message,
            });
        }
    };
    deleteComment = async (req, res) => {
        try {
            const data = await commentService.deleteComment(req);
            res.json({
                status: true,
                message: data.message,
            });
        } catch (err) {
            res.json({
                status: false,
                message: err.message,
            });
        }
    };
}
module.exports = new CommentController();