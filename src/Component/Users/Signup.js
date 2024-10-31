import React,{useState,useEffect} from "react";
import { Link,useNavigate,Navigate } from "react-router-dom"
import Landingtitle from "../Landingtitle";
import { connect } from "react-redux";
import PropTypes from "prop-types"
import { register } from "../Redux/Modules/users";
import { showAlertMessage } from "../Redux/Modules/alerts";
import Navbar from "../Navbar";

const Signup=({isAuthenticated,register,showAlertMessage})=>{
  const [formData,setFormData]=useState({
    name:"",email:"",password:"",password2:""


  })
  const {name,email,Password,password2}=formData
  const onchange=(e)=>{
    return setFormData({...formData,[e.target.name]:e.target.value})
  }
  const navigate = useNavigate()

  
  
  

  const onSubmit = async(e)=>{
    let isValid=true
    //prevent the page from refreshing or reloading
    e.preventDefault();
    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#$%^&*])[^\s]{8,20}$/;
    // if (!passwordRegex.test(Password)) {
    //   showAlertMessage(
    //     "Password must be 8-20 characters long, contain at least one lowercase letter, uppercase letter, number, and special symbol (!@#$%^&*)",
    //     "error"
    //   );
    //   isValid = false; // Mark form as invalid
    // }
  
    // Password Match Validation
    if (Password !== password2) {
      showAlertMessage("Passwords do not match", "error");
      // isValid = false; // Mark form as invalid
    }
    
    // if(isValid){
      try{

        await register({name,email,Password})
        
       
        
      }catch(error){
        console.log("registration failed",error)
        showAlertMessage("registration failed please tryagain ","error")
      }
    // }
    
    
    
    
    
  }
  
  if(isAuthenticated){
    return <Navigate to={"/home"}/>
  }
 
  
 
 
    return(
        
        <>
            <Navbar></Navbar>

            
  <div class="container col-xl-10 col-xxl-8 px-4 py-5">
    <div class="row align-items-center g-lg-5 py-5" >
      <div class="col-lg-7 text-center text-lg-start" >
        <h1 class="display-4 fw-bold lh-1 text mb-3 ti-login"style={{overflow:"hidden"}}>Signup Page</h1>
        <p class="col-lg-10  ti-login media-1"><Landingtitle></Landingtitle></p>
      </div>
      <div class="col-md-10 mx-auto col-lg-5">
        <form class="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={onSubmit}>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" name="name" placeholder="Name" value={name} onChange={onchange} autoFocus/>
            <label for="floatingInput">User</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="email" placeholder="name@example.com"name="email" value={email} onChange={onchange}  />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="Password" value={Password} onChange={onchange} />
            <label for="floatingPassword">Password</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="checkpassword" placeholder="Password" name="password2" value={password2} onChange={onchange} />
            <label for="checkPassword">Confirm Password</label>
          </div>
          <div class="checkbox mb-3">
            <label className="lg-1">
              <input type="checkbox" value="remember-me"/> remember me
            </label>
            
          </div>
          <button class="w-100 btn btn-lg btn-primary" type="submit" >Signup</button>
          {isAuthenticated && <p>signup sucess </p>}
          
          <p> <Link to={"/login"} className="lg-i"> Already have an Account ? Login  </Link>   </p>          
          

          

          
        </form>
      </div>
    </div>
  </div>

        </>




        
    )
}
Signup.propTypes = {
  register: PropTypes.func.isRequired,
  showAlertMessage: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state)=>{
  return{
    isAuthenticated:state.users.isAuthenticated
  }
}

export default connect(mapStateToProps,{showAlertMessage,register})(Signup)
// show alertmessage , register, you must choose the creator action to make the function mapstatetoprop
