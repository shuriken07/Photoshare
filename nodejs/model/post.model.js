const mongoose = require("mongoose");
const postSchema = require("../schema/post.schema");
const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;