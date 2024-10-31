import React ,{Fragment,useState,useEffect}from "react";
import { Link, Navigate } from "react-router-dom";
import { checkPropTypes } from "prop-types";
import { connect } from "react-redux";
import {
    createProfile,getCurrentProfile,uploadProfileImage
} from "../../Component/Redux/Modules/Profiles"
import { showAlertMessage } from "../Redux/Modules/alerts";
// the initial state is the predicted data that the user will send
const initialstate = {
    company:"",
    website:"",
    location:"",
    country:"",
    status:"",
    skills: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin:""
    ,youtube:"",
    instagram:"",
    github:""
}
const ProfileForm=({
    profiles:{profile,loading},
    createProfile,
    getCurrentProfile,
    uploadProfileImage,
    history,
    users:{user}


})=>{
    const [formdata,setformdata]=useState(initialstate)
    const [displaysocialinputs,togglesocialinputs]=useState(false)
    useEffect(()=>{
        if(!profile){
            getCurrentProfile()

        }
        if(profile && !loading){
            const profiledata = {...initialstate}
            //TODO

            setformdata(profiledata)

        }
    },[loading,getCurrentProfile,profile])
    const {company
        ,website
        ,location
        ,country
        ,status,
        skills,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube
        ,instagram
        ,github}=formdata
        
        const onChange=(e)=>{
            return setformdata({...formdata,[e.target.name]:e.target.value})
          }
          // using the form data , then sending the name, sending the value

    const onSubmit=async (e)=>{
        e.preventDefault()
        
          // ... other code ...
          try {
            await createProfile(formdata, history, profile ? true : false);
            if(profile){
              return <Navigate to={"/home"}/>
            }else{
              
              return <Navigate to={"/home"}/>
            }
          } catch (error) {
            // ... error handling ...
            history?.push("/home");
          }}
        
    const onFileChange = (e) => {
        const data = new FormData();
        data.append("file", e.target.files[0]);
        uploadProfileImage(data);
      };
    
    return(

        <>
                              
  <div class="px-4 pt-5 my-5 text-center  ">
    
    <br/>
    <div class="col-lg-6 mx-auto">
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
      <div class="col-md-7 col-lg-8">
        {
          user && profile !== null ? (

            <h4 class="mb-3 ti-login">Update Profile</h4>
          ):

        <h4 class="mb-3 ti-login">Create your profile</h4>
        }
        <form class="form1  p-md-5 border rounded-3 bg-body-tertiary" onSubmit={onSubmit}>
          <div class="row g-3">
            <div className="form-group" >
            <select class="form-select" style={{textAlign:"center"}}aria-label="Default select example" value={status} onChange={onChange}  name={"status"}>
            <option value="">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Intern">Intern</option>
            <option value="Instructor">Instructor </option>
            <option value="Manager">Manager</option>
            <option value="Business Man">Business Man</option>
            <option value="Doctor">Doctor</option>
            <option value="Entrepreneur">Entrepreneur</option>
            <option value="Other">Other</option>
            </select>
            <div class="mb-3">
  <br/>
  <input class="form-control form-control-sm" id="formFileSm" type="file" onChange={onFileChange}/>
</div>
<div class="form-floating mb-3">
  <input type="text" class="form-control" id="floatingInput" placeholder="company" onChange={onChange} value={company} name={"company"}/>
  <label for="floatingInput">Company</label>
</div>
<div class="form-floating mb-3">
  <input type="text" class="form-control" id="floatingInput" placeholder="website" onChange={onChange} value={website} name={"website"}/>
  <label for="floatingInput">website</label>
</div>
<div class="form-floating mb-3">
  <input type="text" class="form-control" id="floatingInput" placeholder="Location" onChange={onChange} value={location} name={"location"}/>
  <label for="floatingInput">Location</label>
</div>
<div class="form-floating mb-3">
  <input type="text" class="form-control" id="floatingInput" placeholder="Country" onChange={onChange} value={country} name={"country"}/>
  <label for="floatingInput">Country</label>
</div>
<div class="form-floating mb-3">
  <input type="text" class="form-control" id="floatingInput" placeholder="Skills" onChange={onChange} value={skills} name={"skills"}/>
  <label for="floatingInput">Skills</label>
</div>
<div class="form-floating">
<textarea
  class="form-control"
  placeholder="Set your bio"
  id="floatingTextarea2"
  value={bio}
  name="bio"
  maxLength={60}
  onChange={onChange}
/>
{bio.length == 60 && (
    <p className="text-danger">Bio cannot exceed 180 characters.</p>
)}
<div>
  <button type="button" className="btn btn-secondary" onClick={()=>togglesocialinputs(!displaysocialinputs)} style={{marginTop:10}}>Social Networks</button>
</div>
  {displaysocialinputs ? (
    <Fragment >
      <div class="form-floating mb-3" style={{marginTop:10}}>
  <input type="text" class="form-control" id="floatingInput" placeholder="twitter" onChange={onChange} value={twitter} name={"twitter"}/>
  <label for="floatingInput">Twitter</label>
</div>
      <div class="form-floating mb-3" style={{marginTop:10}}>
  <input type="text" class="form-control" id="floatingInput" placeholder="Facebook" onChange={onChange} value={facebook} name={"facebook"}/>
  <label for="floatingInput">Facebook</label>
</div>
      <div class="form-floating mb-3" style={{marginTop:10}}>
  <input type="text" class="form-control" id="floatingInput" placeholder="linkedin" onChange={onChange} value={linkedin} name={"linkedin"}/>
  <label for="floatingInput">LinkedIn</label>
</div>
      <div class="form-floating mb-3" style={{marginTop:10}}>
  <input type="text" class="form-control" id="floatingInput" placeholder="youtube" onChange={onChange} value={youtube} name={"youtube"}/>
  <label for="floatingInput">Youtube</label>
</div>
      <div class="form-floating mb-3" style={{marginTop:10}}>
  <input type="text" class="form-control" id="floatingInput" placeholder="instagram" onChange={onChange} value={instagram} name={"instagram"}/>
  <label for="floatingInput">Instagram</label>
</div>
      <div class="form-floating mb-3" style={{marginTop:10}}>
  <input type="text" class="form-control" id="floatingInput" placeholder="github" onChange={onChange} value={github} name={"github"}/>
  <label for="floatingInput">GitHub</label>
</div>

    </Fragment>
  ):<Fragment/>}
  <label for="floatingTextarea2">Set your bio</label>
</div>
<input type="submit" className="btn btn-success" style={{marginTop:10}} />

            </div>
           
              </div>
              </form>



              
              </div>
              </div>
              </div>
              </div>
              

        
                    </>

            



        
        
        
        

    )



}
ProfileForm.checkPropTypes={
    createProfile:checkPropTypes.func,
    getCurrentProfile:checkPropTypes.func,
    uploadProfileImage:checkPropTypes.func,
    profile:checkPropTypes.object

}
const mapStateToProps=(state)=>({
    profiles:state.profiles,
    users:state.users
})

export default connect(mapStateToProps,{createProfile,getCurrentProfile,uploadProfileImage})(ProfileForm)