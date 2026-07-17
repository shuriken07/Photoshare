const mongoose = require("mongoose");
const likeSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: true,
    },
    reaction: {
        type: String,
        enum: ["like", "dislike"],
        required: true,
    },
},
{
    timestamps: true,
});
module.exports = likeSchema;