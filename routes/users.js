const express = require("express")
// routing the express
const router = express.Router();
const{check,validationResult}=require("express-validator");
const User = require("../schemaDb/User")
const bcrypt = require("bcryptjs")
const Jwt = require("jsonwebtoken")
const config = require("config")
const {auth}=require("../utils/index")// deconstraction



/* 
getting the request body 
validate to the request 
check if the user is existing , if yes retun error 
encrypt password ,
save data in DB
Using the jwt create token contains user id , return token .
*/
/* Path : POST / api / users / register 
*/










//Register Scenario 

router.post("/register",
    check("name","name is Required").notEmpty() ,
    check("email","Plz put an Email ").isEmail(),
    check("Password","PlZ choose a password with a least 6 character").isLength({min:6}),


    async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){//if the errors variable is not empty after sending the request and getting the respone from the server
            return res.status(400).json({errors:errors.array()})// returning an array of the errors {Status : 400 is the http = > Bad request}

        }
        const {name,email,Password}= req.body
        try{
            let user = await User.findOne({email})//you are using the unique attribute to search {object}
            if(user){

                return res.status(400).json({errors:[{msg:"user already exists"}]})
            }
            user = new User({
                name,email,Password
            } );
            const salt = await bcrypt.genSalt(10);
            user.Password=await bcrypt.hash(Password,salt)
            await user.save()
            const payload={
                user:{
                    id:user.id

                }
            }
            Jwt.sign(payload,config.get("jwtsecret"),{expiresIn:"5 days"},(err,token)=>{
                    
                if(err){
                    throw err
                }else{
                    res.json({token});
                    

                }
            })
                
            


        }catch(err){
            console.error(err.message)
            res.status(500).send(err.message) // internal server condition problem


        }


})
//Login Scenario 
router.post("/Login",
    //checking the inputs
    check("email","email is required").isEmail(),
    
    check("Password","PlZ choose a password with a least 8 character"),
    // async used to handle 
    async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const {email,Password}= req.body
        try{
            let user = await User.findOne({email})
            if(!user){
                return res.status(400).json({errors:[{msg:"invalid Credentials"}]})
            }
          
            const is_Match=await bcrypt.compare(Password,user.Password)
            if(!is_Match){
                return res.status(400).json({errors:[{msg:"invalid credientals"}]})
            }
            const payload={
                user:{
                    id:user.id

                }
            }
            //sign generating a new token = id 
            Jwt.sign(payload,config.get("jwtsecret"),{expiresIn:"5 days"},(err,token)=>{
                if(err){
                    throw err
                }else{
                    res.json({token});
                   

                }
            })
                
            


        }catch(err){
            console.error(err.message)
            res.status(500).send(err.message)


        }


})

//get/api/users
//private
//returns the user information
//token getting from the header

router.get("/",auth,async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-Password")// get all the data of this user except the password
        res.json(user)




    }catch(err){
        console.error(err.message)
        res.status(500).send(err.message)
    }
})
router.delete("/",auth,async(req,res)=>{
    try{
        const user = await User.findById(req.user.id)
      
      // remove posts , profile , user
      await Promise.all([
      user.deleteOne()
   

              


      
    ])
    res.json({msg:"user information is deleted successfully"})
  }catch(err){
    console.error(err.message)
    return res.status(500).send(err.message)
  }
  })
module.exports = router;



