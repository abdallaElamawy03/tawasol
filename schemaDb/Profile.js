const mongoose = require("mongoose")
const ProfileSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    company:{
        type:String
    },
    
    website:{
        type:String

    },
    country:{
        type:String
    },
    location:{
        type:String

    },status:{
        type:String
    },
    skills:{
        type:[String],
        require:true ,
    }, 
    bio:{
        type:String
    },
    exprience:[
        {
            title:{
                type:String,
                required:true
            },company:{
                type:String,
                required:true

            },location:{
                type:String
            },from:{
                type:Date,
                required:true
            },to:{
                type:Date

            },cureent:{
                type:Boolean,
                default:false
            },
            description:{
                type:String
            }
        }
    ],education:[{
        school:{
            type:String,
            required:true
        },degree:{
            type:String,
            required:true
        },fieldofstudy:{
            type:String,required:true
        },from:{
            type:Date,
            required:true
        },to:{
            type:Date,
            
        },current:{
            type:Boolean,
            default:false

        
        },description:{
            type:String

        }
    }],Social:{
        youtube:{
            type:String

        },twitter:{
            type:String
        },facebook:{
            type:String
        },linkedin:{
            type:String
        },instagram:{
            type:String
        },
        github:{
            type:String
        },
        
    },


date:{
    type:Date,
    default:Date.now

},
    
    


})
module.exports=mongoose.model("profile",ProfileSchema)
