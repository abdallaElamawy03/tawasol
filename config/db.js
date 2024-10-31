//=> Database connect File


// Connection to the type of the database
const mongoose = require("mongoose");
// config is a library installed using the npm 
const config = require("config")
// here is the config you get from the databse intialize 

const db = config.get("mongoConnectionString");
// connection to database 
//the attribute inside the function we get it from the default.json file in the same folder


// we are using the async method to handle the connection of the databse 

const connectdb= async() =>{
    try{
        await mongoose.connect(db);
        console.log(" Connected to Mongo DB ")
        
    }catch(err){
        console.log(err.message);
        process.exit(1)// here is to handle the process if there is an error to get out and stop retrying to connect to the DB

    }
    

}
module.exports=connectdb