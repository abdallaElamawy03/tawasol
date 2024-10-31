const { default: mongoose, Schema } = require("mongoose")
const { schema } = require("./Profile")
const Profile = require("./Profile")
const objectid = mongoose.Schema.Types.ObjectId

const Postschema = new mongoose.Schema({
    user:{
        type:objectid
        

        
    },
    text:{
        type:String,
        required:true

    },
    name:{
        type:String,

    },
    likes:[
        {
            user:{
                type:objectid
            }
        }
    ],
    comments:[
        {
            user:{
                type:objectid
            },
            text:{
                type:String,
                required:true

            },
            name:{
                type:String
            },
            date:{
                type:Date,
                default:Date.now
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }

    
        

        
    
})
module.exports = mongoose.model("post",Postschema)