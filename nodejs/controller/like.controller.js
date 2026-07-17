const likeService = require("../service/like.service");
class LikeController {
    reactPost = async (req, res) => {
        try {
            const data = await likeService.reactPost(req);
            res.json({
                status: true,
                data,
            });
        } catch (err) {
            res.status(400).json({
                status: false,
                message: err.message,
            });
        }
    };
    getReactions = async (req, res) => {
        try {
            const data = await likeService.getReactions(req);
            res.json({
                status: true,
                data,
            });
        } catch (err) {
            res.status(400).json({
                status: false,
                message: err.message,
            });
        }
    };
}
module.exports = new LikeController();