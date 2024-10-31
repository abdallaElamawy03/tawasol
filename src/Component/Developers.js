import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getprofiles } from "./Redux/Modules/Profiles";
import { getProfileImage } from "../utilis";
import userimage from "../Assests/user_Image.jpg";

function Developers({ user, getprofiles, profiles: { profiles } }) {
  // Use effect to fetch profiles on component mount
  useEffect(() => {
    getprofiles();
  }, []);
  const [image,setImage]= useState("")
const [errored,setErrored]= useState(false)

    
    function onError(){
        if(!errored){
            setErrored(true)
            setImage(userimage)
        }

    }

  const filteredProfiles = user && profiles.length > 0 ? profiles.filter(profile => profile.user?._id !== user._id) : [];
  // the last array is for to return the values is Array 
  // and this is the initialized variable 


  return (
    <>
      {user||profiles?(

      

        
        <div class="container marketing">

<div class="row">
  
    {filteredProfiles.map(profile=>(
      <>
      <div class="col-lg-4 ti-login" style={{overflow:"hidden"}} >
        <img src={userimage}class="bd-placeholder-img rounded-circle" style={{width:"140px" ,height:"140px"}}/> 
        <h2 class="fw-normal"style={{overflow:"hidden"}}>{profile.user?.name || `"{error} no name"`}</h2>
        <p>{profile?.status || "this user have no status"}</p>
        <p><Link className="btn btn-secondary" to={`/profile/${profile.user?._id}`}>
        view profile &raquo;
        </Link>
        </p>
      </div>
      
      </>
    )
    
  )}
    </div>
    </div>
  ):null
}    
   
    </>
  );
}



const mapStateToProps = (state) => ({
  profiles: state.profiles,
  user: state.users.user,
});

export default connect(mapStateToProps, { getprofiles })(Developers);