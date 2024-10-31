import React, { useState } from "react"
import {useEffect} from "react"
import {Link} from "react-router-dom"
import{connect} from "react-redux"
import { deleteEducation, deleteExperience, getCurrentProfile } from "./Redux/Modules/Profiles"
import {getProfileImage} from "../utilis/index"
import userimage from "../Assests/user_Image.jpg"
import BasicInfo from "./profileinfo/Basicinfo"
import Sidebar from "./Sidebar"
import Education from "./profileinfo/Education"
import Experience from "./profileinfo/Experience"
const Home =({getCurrentProfile,profiles:{profile},users:{user},deleteEducation,deleteExperience})=>{
const [image,setImage]= useState("")
const[name , setname]=useState("")
const [errored,setErrored]= useState(false)

    useEffect(()=>{
        getCurrentProfile()
        if(user){
            setImage(getProfileImage(user._id))
            

        }
        


    },[getCurrentProfile,user])
    function onError(){
        if(!errored){
            setErrored(true)
            setImage(userimage)
        }

    }
    
    return (
        

        <>
        
    
            {
                profile === null ?(
                    <>
                    
                    
                    <div>

                      
                        
  <div class="px-4 pt-5 my-5 text-center ">
    <h1 class="display-4 fw-bold ti-login">Hello , new User</h1>
    <br/>
    <div class="col-lg-6 mx-auto">
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
       <Link to={"/create-profile"}>
        <button type="button" class="btn btn-primary btn-lg px-4 me-sm-3">Create your Profile</button>
       </Link>
        <button type="button" class="btn btn-secondary btn-lg px-4">skip</button>
      </div>
    </div>
                    </div>
                    </div>
                    
                    </>
                ):(

                    <>
                        
                   
                                        
                                        <div class="card mb-3 cardofp" >
  <div class="row g-0">
    <div class="col-md-4">
      <img src={userimage} class="img-fluid rounded-start" alt="userimage" onError={onError}/>
    </div>
    <div class="col-md-8">  
      <div class="card-body">
        <h5 class="card-title" style={{overflow:"hidden"}}>{user?.name}</h5>
        {profile.bio ?(
            <>
            <p>{profile.bio}</p>
            </>
        ):(
            <>
            <p>Bio</p>
            </>
        )}
        <p>{profile.status}</p>
        <div className="home-column">
    <BasicInfo profile={profile}>
        <div className="social">
            {
                profile.social ?
                Object.keys(profile.social)
                .filter(media => profile.social[media] !== "")
                .map(media => {
                    return (
                        <>
                        <a key={media} rel="no refrence" target="_blank" href={profile.social[media]}>
                            <i className={`fab fa-${media} fa-2x`}></i>
                        </a>
                        </>
                    )
                })
                :null



            }
        </div>
    </BasicInfo>
</div>

       
      </div>
      
    </div>
    
  </div>
  
</div>
{/* <div className="home-row">
    <div className="home-column">
        <div className="home-row">
            <div className="home-column">
                <h3 className="ti-login">Education`</h3>
            </div>
            <div className="home-column">
                <Link to={"/add-education"} className="add-button">
                <i className="fa fa-plus-circle fa-2x"/>
                </Link>
            </div>
        </div>
        <Education profile={profile} deleteEducation={deleteEducation}/>
    </div>
</div> */}
<div class="row">
<div class="col-sm-6 mb-3 mb-sm-0">
<div class="card text-bg-light mb-3 cardofp" >
  <div class="card-header">Education</div>
  <div class="card-body">
    
    
    <Education profile={profile} deleteEducation={deleteEducation} />
    
    <div className="home-column">
                <Link to={"/add-education"} className="add-button">
                <i className="fa fa-plus-circle fa-2x"/>
                </Link>
            </div>
            
            </div>
            
            
            </div>
  </div>
<div class="col-sm-6 mb-3 mb-sm-0">
<div class="card text-bg-light mb-3 cardofp" >
  <div class="card-header">Experience</div>
  <div class="card-body">
    
    
    <Experience profile={profile} deleteExperience={deleteExperience} />
    
    <div className="home-column">
                <Link to={"/add-experience"} className="add-button">
                <i className="fa fa-plus-circle fa-2x"/>
                </Link>
            </div>
            
            </div>
            
            
            </div>
  </div>
 
            
            
  
</div>





       
    

                    
                    </>
                )
            }


        
        </>
    )
}
const mapStateToProps=(state)=>(
    {
        profiles :state.profiles
        ,users:state.users
    }
)



export default connect(mapStateToProps,{getCurrentProfile,deleteEducation,deleteExperience})(Home)

