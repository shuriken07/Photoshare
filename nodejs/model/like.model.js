const mongoose = require("mongoose");
const likeSchema = require("../schema/like.schema");
module.exports = mongoose.model("likes", likeSchema);