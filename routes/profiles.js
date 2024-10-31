const express = require("express")
const {auth,upload} = require("../utils/index");
const {check,validationResult}=require("express-validator")
const normalize=require("normalize-url");
const Profile = require("../schemaDb/Profile");
const User = require("../schemaDb/User");
const Post = require("../schemaDb/Posts");
const Posts = require("../schemaDb/Posts");
// routing the express
const router = express.Router();
router.post("/",auth,
    check("status","status is required").notEmpty(),//checking if the status is not empty or not 
    check("skills","skills is requires").notEmpty()//checking if the skills is not empty (Required in the mongo db schema ) this is a middleware of the express = validator


    ,async(req,res)=>{ // async req and res of the server
        const errors=validationResult(req) // validation is sending a request to get the validation 
        if(!errors.isEmpty()){ // if the errors is not empty responsing with json file of the errors type => Array
            return res.status(400).json({error:errors.array()})

        }
        const{website,skills,youtube,twitter,instagram,linkedin,facebook,github,...rest}=req.body;//rest is the rest of the objects == it is like importing this attributes to modify on them and putting some instructions for this attributes
        
        const profile={
            user: req.user.id,// requiring the user with the validation
            website:website && website !== "" ? normalize (website,{forceHttps:true}):"", // checking the website validation and it is not ampty String , if itis true normalize it 
            skills:Array.isArray(skills)?skills:skills.split(",").map(skill=>skill.trim()),...rest // skills is an array of skills if it is true split and trim it make every skills in seperate line


        }
        const socialfields={//social field is a variable contains this attributes from social entity in the schema of the profile
            youtube,twitter,instagram,linkedin,facebook,github

        }
        for(let key in socialfields){ // looping inside the social fields variable and check every social field if it contain a main value and not empty if is true normalize 

            const value = socialfields[key]
            if(value && value != ""){
                socialfields[key]=normalize(value,{forceHttps:true}

                )
            }

        }
        profile.social=socialfields // inserting the variable social method inside the profile in the social field array of object
        
          
          try { 
            const profileObject = await Profile.findOneAndUpdate( //intilaizing the variable profileobject = builtin method for the databse findoneandupdate
              { user: req.user.id }, // must use the user token to modify in the specific user , putting a user id in the profile collection
              {$set:profile}, // insert the values int he profile ? using the $set method
              { new: true ,upsert:true} // it is a new value ? , upsert => combination of an update and an insert operation.
            );
            return res.json(profileObject); // returning the response of a json file contains the data in the DB
          } catch (err) {//erroooor
            console.error(err.message)//console output
            return res.status(500).send(err.message)//response of the server
            // ... error handling
          }

    }
    ,)
    router.get("/me", auth, async (req, res) => {
      try {
        const profile = await Profile.findOne({
          user: req.user.id
        }).populate("user", ["name"]);
    
        if (!profile) {
          return res.status(404).json({ msg: "There is no profile for this user" }); // 404 for not found
        }
    
        res.json(profile);
      } catch (err) {
        console.error(err.message); // Log the error for debugging
        return res.status(500).json({ msg: "Internal Server Error" }); // Generic error for user
      }
    });
    router.get("/",auth,async (req,res)=>{
      try{
        const profiles=await Profile.find().populate("user",["name"])
        if(!profiles){
          return res.json({msg:"this is no any user with this id"})
        }
        res.json(profiles)
          
        

      }catch(err){
        console.error(err.message)
        return res.status(500).send(err.message)
      }
    })
    router.get("/user/:user_id",auth,async (req,res)=>{
      try{
        const profile=await Profile.findOne({
          user:req.params.user_id
        }).populate("user",["name"])
        if(!profile){
          return res.json({msg:"this is no any user with this id"})
        }
        res.json(profile)
          
        

      }catch(err){
        console.error(err.message)
        res.status(500).send(err.message)
      }
    })
    
    router.delete("/",auth,async(req,res)=>{
      try{
        
        const profile = Profile.findOne({user:req.user.id})
        // remove posts , profile , user
        await Promise.all([
        profile.deleteOne()
     

                


        
      ])
      res.json({msg:"user information is deleted successfully"})
    }catch(err){
      console.error(err.message)
      return res.status(500).send(err.message)
    }
    }),
    router.post("/upload",auth,async(req,res)=>{
      try{
          upload(req,res,async(err)=>{
            if(err){
              res.status(500).send(`server error : ${err}`)
            }else{
              res.status(200).send(req.user.id)

            }
          })
      }catch(err){
        console.error(err.message)
        res.status(500).send(err.message)

      }
    })
   
    router.put("/experience", auth,
      check("title", "title is required"),
      check("company", "company is required"),
      check("from", "from date is required").custom((value, { req }) => {
        if (!req.body.to) {
          return true; // 'to' is optional if not provided
        }
        return value < req.body.to; // Ensure 'from' is before 'to'
      }),
      async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        try {
          const profile = await Profile.findOne({ user: req.user.id });
    
          if (!profile) {
            return res.status(404).json({ msg: "Profile not found" });
          }
    
          // Efficiently modify the experience array
          profile.exprience.unshift(req.body);
          await profile.save();
    
          res.json(profile); // Send the updated profile
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error"); // Generic error message for security
        }
      }
    );
    router.put("/education", auth,
      check("school", "school is required"),
      check("degree", "degree is required"),
      check("fieldofstudy", "field of study is required"),
      check("from", "from date is required").custom((value, { req }) => {
        if (!req.body.to) {
          return true; // 'to' is optional if not provided
        }
        return value < req.body.to; // Ensure 'from' is before 'to'
      }),
      async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        try {
          // finding the profile 
          const profile = await Profile.findOne({ user: req.user.id });
    
          if (!profile) {
            return res.status(404).json({ msg: "Profile not found" });
          }
    
          // Efficiently modify the experience array
          profile.education.unshift(req.body);
          await profile.save();
    
          res.json(profile); // Send the updated profile
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error"); // Generic error message for security
        }
      }
    );
    router.delete('/del-experience/:exp_id', auth, async (req, res) => {
      try {
        // Get the ID from the request parameters
    
        const profile = await Profile.findOne({ user: req.user.id });
        profile.exprience = profile.exprience.filter(exp=>{
          return exp._id.toString() !== req.params.exp_id
        });

        if (!profile) {
          return res.status(404).json({
            status: "fail",
            message: "No experience found",
          });
        }
        if(!profile.exprience){
          return res.status(404).json({
            status:"fail",
            message:"Error finding the Experience "
          })
        }
    
        // Filter experience from the retrieved profile object
    
        await profile.save(); // Save the updated profile document
    
        return res.json(profile); // Return the updated profile
      } catch (error) {
        console.error(error.message);
        return res.status(500).json({
          status: "error",
          message: error.message,
        });
      }
    });
   
    router.delete('/del-education/:edu_id', auth, async (req, res) => {
      try {
        // Get the ID from the request parameters
        const id = req.params.edu_id
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education = profile.education.filter(edu=>{
          return edu._id.toString() !== req.params.edu_id
        });

        if (!profile) {
          return res.status(404).json({
            status: "fail",
            message: "No education found",
          });
        }
        if (!profile.education) {
          return res.status(404).json({
            status: "fail",
            message: "No education found",
          });
        }
    
        // Filter experience from the retrieved profile object
    
        await profile.save(); // Save the updated profile document
    
        return res.json(profile); // Return the updated profile
      } catch (error) {
        console.error(error.message);
        return res.status(500).json({
          status: "error",
          message: error.message,
        });
      }
    });
  
   

    





module.exports = router; // is useful to handle the routes of many routes of the API