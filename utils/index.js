// function we can use in many files and programs


/* 
first : 
*/
const Jwt = require("jsonwebtoken")
const config = require("config")
const multer = require("multer")
const auth = (req,res,next)=>{     //this is a middle ware function
    //Get the token from the request header
    console.log("in auth ")
    const token = req.header("x-auth-token") // the name of the attribute
    console.log(token)
    if(!token){
        //401 means => unauthorize http language
        return res.status(401).json({msg:"token is not available , auth denied"})
    }
    try{
        Jwt.verify(token,config.get("jwtsecret"),(error,decoded)=>{
            if(error){
                return res.status(401).json({msg:"token is not valid"})

           }
           else{
            req.user=decoded.user
            next();
            

           }
        })
    }catch(err){
        console.error(err.message)
        res.status(500).json({msg:"error in the validation "})//server error
    }
}
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public_image")
    },
    filename:(req,file,cb)=>{
        cb(null,`${req.user.id}`)
    }
})
const upload = multer({storage:storage}).single("file");


module.exports={auth,upload};




// put the function inside an object to put more than one function 
