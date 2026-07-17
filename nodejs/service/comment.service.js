const commentModel = require("../model/comment.model");

class CommentService {
    addComment = async (req) => {
        const { comment, postId } = req.body;
        if (!comment) {
            throw new Error("Comment is required");
        }
        return await commentModel.create({
            comment,
            postId,
            userId: req.user.id,
        });
    };
    getComments = async (req) => {
        return await commentModel
            .find({ postId: req.params.postId })
            .populate("userId", "username")
            .populate({
                path: "postId",
                select: "userId",
            })
            .sort({ createdAt: -1 });
    };
    updateComment = async (req) => {
        const comment = await commentModel
            .findById(req.params.id)
            .populate("postId");
        if (!comment) {
            throw new Error("Comment not found");
        }
        const isCommentOwner =
            comment.userId.toString() === req.user.id;
        const isPostOwner =
            comment.postId.userId.toString() === req.user.id;
        if (!isCommentOwner && !isPostOwner) {
            throw new Error("Unauthorized");
        }
        comment.comment = req.body.comment;
        await comment.save();
        return comment;
    };
    deleteComment = async (req) => {
        const comment = await commentModel
            .findById(req.params.id)
            .populate("postId");
        if (!comment) {
            throw new Error("Comment not found");
        }
        const isCommentOwner =
            comment.userId.toString() === req.user.id;
        const isPostOwner =
            comment.postId.userId.toString() === req.user.id;
        if (!isCommentOwner && !isPostOwner) {
            throw new Error("Unauthorized");
        }
        await comment.deleteOne();
        return {
            message: "Comment deleted successfully",
        };
    };
}
module.exports = new CommentService();