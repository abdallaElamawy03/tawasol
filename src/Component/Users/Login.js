import React, { useState,useEffect } from "react";
import { Link ,Navigate} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { u_Login } from "../Redux/Modules/users";
import Navbar from "../Navbar";

const Login = ({ u_Login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [token, setToken] = useState(null);

 
  
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => { 
    e.preventDefault(); // Prevent page refresh

    // Add password validation here (e.g., minimum length, complexity)
    

    await u_Login(email, password); // Dispatch login action using redux
  };

  // Function to validate password (replace with your desired validation logic)
  if(isAuthenticated){
    return <Navigate to={"/home"}/>
  }

  return (
    <>
    <Navbar/>
      <div className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-7 text-center text-lg-start">
            <h1 className="display-4 fw-bold   ti-login"style={{overflow:"hidden"}} >
              Login Page
            </h1>
            <br/>
            <p className="col-lg-10 ti-login media-1">
              You're the best cause you are with us
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={onSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                  autoFocus
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={onChange}
                  name="password"
                  value={password}
                  required
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="checkbox mb-3">
                <label style={{color:"black"}}>
                  <input type="checkbox" value="remember-me" />
                  Remember me
                </label>
              </div>
              <button className="w-100 btn btn-lg btn-primary" type="submit" value={u_Login} >
                Login
              </button>
              {/* Conditionally display a message based on authentication state */}
              {isAuthenticated && <p style={{color:"red"}}>Login successful!</p>}
              <p className="nav-link">
                <Link className="ti-login nav-item lg-i" to={"/signup"}>
                  Forgotten password?
                </Link>
              </p>
              <hr className="my-4 ti-login" />
              <div className="container c3 op-sign">
                <div className="sign-1">
                  <Link to={"/register"}>
                    <button type="button" className="btn ti-login sign-1">
                      Create new account
                    </button>
                  </Link>
                  </div>
                  
                  </div>
                  </form>
                  </div>
                  </div>
                  </div>
                  
                  

    
        </>
    )
    



}



const mapStateToProps = (state)=>{
  return{
    isAuthenticated:state.users.isAuthenticated
  }
}
Login.propTypes = {
  
  
  u_Login: PropTypes.func.isRequired,
  
};
export default connect(mapStateToProps,{u_Login})(Login)