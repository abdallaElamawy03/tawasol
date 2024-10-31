import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import {  useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import Login from "./Users/Login";
const Private = ({ component: Component,users:{isAuthenticated} }) => {
  let navigate = useNavigate();
    
    
    
  return (
    <>
      <Fragment>
        {!isAuthenticated ? (
          <Spinner />
        ) : isAuthenticated ?(
          <Fragment>
            <Sidebar />
            <Component />
          </Fragment>
        ):(
          navigate("/login")
          
        )}
      </Fragment>
    </>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps)(Private);