const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,required:true,Unique:true
    },
    Password:{
        type:String,
        required:true,


    },
    Date:{
        type:Date,
        default:Date.now

    }

});
module.exports=mongoose.model("user",UserSchema)
