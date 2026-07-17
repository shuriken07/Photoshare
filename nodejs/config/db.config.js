const mongoose=require("mongoose")

const connectionDB=async()=>{
    try{
        await mongoose.connect(process.env.DB + process.env.DB_NAME)
        console.log("DAtabase connected")
    }catch(error){
        console.log(error.message)
    }
}
module.exports=connectionDB