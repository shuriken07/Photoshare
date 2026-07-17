const likeModel = require("../model/like.model");

class LikeService {
    reactPost = async (req) => {
        const postId = req.params.postId;
        const userId = req.user.id;
        const { reaction } = req.body;
        if (!["like", "dislike"].includes(reaction)) {
            throw new Error("Invalid Reaction");
        }
        let existing = await likeModel.findOne({
            userId,
            postId,
        });
        if (!existing) {
            existing = await likeModel.create({
                userId,
                postId,
                reaction,
            });
        } else {
            if (existing.reaction === reaction) {
                await likeModel.deleteOne({
                    _id: existing._id,
                });
            } else {
                existing.reaction = reaction;
                await existing.save();
            }
        }
        return await this.getReactions(req);
    };
    getReactions = async (req) => {
        const postId = req.params.postId;
        const userId = req.user.id;
        const likes = await likeModel.countDocuments({
            postId,
            reaction: "like",
        });
        const dislikes = await likeModel.countDocuments({
            postId,
            reaction: "dislike",
        });
        const mine = await likeModel.findOne({
            postId,
            userId,
        });
        return {
            likes,
            dislikes,
            myReaction: mine ? mine.reaction : null,
        };
    };
}
module.exports = new LikeService();