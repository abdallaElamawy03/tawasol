
// cors is to use the utitlities globally 

const cors = require("cors")
//require the express to connect it and to to start implementing the back-End


const express = require("express")

// here we are getting the the db file 
const connectdb = require("./config/db")

//connect to the express 
const app = express()
app.use(express.json());
app.use(cors())
//connect to the DB
app.use("/api/users",require("./routes/users"));
app.use("/api/profiles",require("./routes/profiles"));
app.use("/api/posts",require("./routes/posts"));
connectdb()
// Simple api 
app.get("/",(req,res)=>res.send("server is working  run server"))
app.use(express.static(__dirname+'/public'))

// process.env.port = there is an intialized variable in 
// in heroku the process.env.port or if it is not existing it will be 5000 even you open it in localhost

const PORT = process.env.PORT || 5000; 
// by Default you are puuting the applisteon to get the connection to the server
app.listen(PORT,()=>{
    console.log(`server has started on port ${PORT}`)

})
