import React, { useState } from "react"
import {useEffect} from "react"
import {Link,useParams} from "react-router-dom"
import{connect} from "react-redux"
import { getprofilebyid } from "./Redux/Modules/Profiles"
import {getProfileImage} from "../utilis/index"
import userimage from "../Assests/user_Image.jpg"
import BasicInfo from "./profileinfo/Basicinfo"
import Sidebar from "./Sidebar"
import Education from "./profileinfo/Education"
import Experience from "./profileinfo/Experience"
const Profile =({getprofilebyid,profiles:{profiles},users:{user}})=>{
const [image,setImage]= useState("")
const[name , setname]=useState("")
const [errored,setErrored]= useState(false)

let {id} = useParams()
    useEffect(()=>{
        getprofilebyid(id)
        


    },[getprofilebyid,id])
    function onError(){
        if(!errored){
            setErrored(true)
            setImage(userimage)
        }

    }
    
    return (
        

        <>
        
    
            {
                (

                    <>
                        
                   
                                        
                                        <div class="card mb-3 cardofp" >
  <div class="row g-0">
    <div class="col-md-4">
      <img src={userimage} class="img-fluid rounded-start" alt="userimage" onError={onError}/>
    </div>
    <div class="col-md-8">  
      <div class="card-body">
        <h5 class="card-title" style={{overflow:"hidden"}}>{profiles?.user?.name||"error"}</h5>
        {profiles?.bio ?(
            <>
            <p>{profiles?.bio}</p>
            </>
        ):(
            <>
            <p>Bio</p>
            </>
        )}
        <p>{profiles?.status}</p>
        <div className="home-column">
    <BasicInfo profile={profiles}>
        <div className="social">
            {
                profiles?.social ?
                Object.keys(profiles?.social)
                .filter(media => profiles.social[media] !== "")
                .map(media => {
                    return (
                        <>
                        <a key={media} rel="no refrence" target="_blank" href={profiles.social[media]}>
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

<div class="row">
<div class="col-sm-6 mb-3 mb-sm-0">
<div class="card text-bg-light mb-3 cardofp" >
  <div class="card-header">Education</div>
  <div class="card-body">
    
    
    <Education profile={profiles} />
    
    <div className="home-column">
              
            </div>
            
            </div>
            
            
            </div>
  </div>
<div class="col-sm-6 mb-3 mb-sm-0">
<div class="card text-bg-light mb-3 cardofp" >
  <div class="card-header">Experience</div>
  <div class="card-body">
    
    
    <Experience profile={profiles}  />
    
    <div className="home-column">
              
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



export default connect(mapStateToProps,{getprofilebyid})(Profile)

