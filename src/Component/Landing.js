import React from "react"
// import '../App.css';
// import '../Component/Landing.css'
import { Link } from "react-router-dom"
import Landingtitle from "./Landingtitle"
import Navbar from "./Navbar"
const Landing=()=>{
    
    return(
        
       <>
           <Navbar></Navbar>

       <div class="px-4 py-5 my-5 text-center">
    <h1 class="display-5 fw-bold text " style={{color:"white"}}> Tawasol</h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4 welcome"><Landingtitle></Landingtitle></p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Link to={"/register"}><button type="button" class="btn btn-primary btn-lg px-4 gap-3">Signup </button></Link>
        <Link to={"/login"}><button type="button" class="btn btn-outline-secondary btn-lg px-4 lg-1 ">Login</button></Link>
      </div>
     
    </div>
  </div>

      
       
 

      


       

        




            


        
            
                    
       
       
       
       </>
        
    )
}


export default Landing