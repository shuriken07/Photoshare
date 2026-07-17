const mongoose=require("mongoose");
const postSchema=new mongoose.Schema({
title:String,
description:String,
image:String,
userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"user"
}
},{
timestamps:true
});
module.exports=postSchema;