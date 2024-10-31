import React, { Fragment } from "react"
// import '../App.css';
// import "./Navbar.css"
import { Link } from "react-router-dom"
import App from "../App"
const Navbar=()=>{
    return(
        <>
        
        
        <div class="container c1">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item"><Link class="nav-link h1-login" to={"/"}>Home</Link></li>
        <li class="nav-item"><Link class="nav-link h1-login" to={"/login"}>Login</Link></li>
        
      </ul>
    </header>
  </div>
  
        </>
        
    
    )

}
export default Navbar