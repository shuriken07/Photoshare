const mongoose = require("mongoose");
const commentSchema = require("../schema/comment.schema");
const commentModel = mongoose.model("comments", commentSchema);
module.exports = commentModel;