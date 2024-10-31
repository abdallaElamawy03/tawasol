import React, { useState } from "react"
import {useEffect} from "react"
import {Link} from "react-router-dom"
import{connect} from "react-redux"
import {getProfileImage} from "../utilis/index"
import userimage from "../Assests/user_Image.jpg"
import { getCurrentProfile } from "../Component/Redux/Modules/Profiles"
import Home from "./Home"
import Developers from "./Developers"


import { logout } from "./Redux/Modules/users"
function Sidebar({users:{user},logout}){

// const name = users.name

  
    return(
        <>
        <nav class="navbar  top">
        <div class="container-fluid">
          

          <a  class="d-block link-body-emphasis text-decoration-none " type="button"  data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
            <img src={userimage} alt="user image" width="50" height="50" class="rounded-circle"/>
          </a>
         
    
 

<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel "style={{width:"20%"}}>
  <div class="offcanvas-header" style={{width:"100%"}}>
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Setting</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
  <ul class="list-unstyled ps-0">
      <li class="mb-1">
        {/* <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
          Home
        </button> */}
        {
          user ? (
            <>
            <Link to={"/home"}>
             <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
          Home
        </button> 
            </Link>
            
            </>
          ):(
            <>
            <Link to ={"/login"}>
             <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
          Home
        </button> 
            </Link>
            </>
          )
        }
        <div class="collapse show" id="home-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><Link to={"/developers"}class="link-body-emphasis d-inline-flex text-decoration-none rounded">developers</Link></li>
            <li><Link to={"/Posts"} class="link-body-emphasis d-inline-flex text-decoration-none rounded">Posts</Link></li>
            {
              user? (
                  <>
                      <li><Link class="link-body-emphasis d-inline-flex text-decoration-none rounded "to={"/settings"}>Settings</Link></li>

                  </>
              ):                      <li><Link  class="link-body-emphasis d-inline-flex text-decoration-none rounded "to={"/login"}>Settings (only for users)</Link></li>
            }
          </ul>
        </div>
      </li>
    <hr/>
    <div class="dropdown" >
      <a href="#" class="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <img src={userimage } alt="" width="32" height="32" class="rounded-circle me-2"/>
        {
          user ? (
            <p>{user?.name}</p>
          ):(

            <>
            <p>tawasol</p>
            </>
          )
        }
      </a>
      <ul class="dropdown-menu text-small shadow" >
        
        {user?(

          <li><Link class="dropdown-item" to={"/"} onClick={logout} >Sign out</Link></li>
        ):(
          <li><Link class="dropdown-item" to={"/login"} >Sign out (only for users)</Link></li>
        )

        }
      </ul>
      
    </div>
    </ul>
    </div>
    </div>
    </div>
 
 </nav>
  
        </>
    )

}
const mapStateToProps=(state)=>(
  {
     
      users:state.users
  }
)




export default connect(mapStateToProps,{logout})(Sidebar)
