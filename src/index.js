import React, { Fragment, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,createBrowserRouter,Route,Routes}from 'react-router-dom'
import App from './App';
import reportWebVitals from './reportWebVitals'
import Landing from './Component/Landing';
import Navbar from './Component/Navbar';
import "./App.css"
import Login from "./Component/Users/Login.js";
// import Footer from './Component/Footer';
import Signup from './Component/Users/Signup.js';
import {Provider} from "react-redux"
import store from "./Component/Redux/store.js"
import Footer from './Component/Footer.js';
import {transitions,positions,Provider as AlertProvider} from "react-alert"
import AlertTemplate from "react-alert-template-basic"
import Alert from "./Component/Alert"
import Home from './Component/Home.js';
import Private from './Component/Private.js';
import ProfileForm from './Component/profileForms/ProfileForm.js';
import { addEducation, addExperience } from './Component/Redux/Modules/Profiles.js';
import AddEducation from './Component/profileForms/AddEducation.js';
import AddExperience from './Component/profileForms/AddExperience.js';
import Developers from './Component/Developers.js';
import Profile from './Component/Profile.js';
import Settings from "./Component/Settings.js"
import Spinner from './Component/Spinner.js';
import { loadUser } from './Component/Redux/Modules/users.js';
import { setAuth } from './utilis/index.js';
import Posts from './Component/Posts/Posts.js';
import post from './Component/Posts/post.js';
function Token_func() {
  useEffect(()=>{
    
      setAuth(localStorage.token)

    
    store.dispatch(loadUser())
  },)}
const options={
  positions:positions.BOTTOM_CENTER,
  timeout:5000,
  offset:"30px",
  transitions:transitions.SCALE
}
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  
    <>
  <Token_func></Token_func>

    
    <Provider store={store}>
  <React.StrictMode>

    <AlertProvider template={AlertTemplate}{...options}> 

    <BrowserRouter>
      
    <Alert/>
    
    
    <Fragment>
    
    <Routes>
      <Route  path="/" element={<App/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Signup/>}></Route>

      <Route path='/home' element={<Private component={Home} />} ></Route>
      <Route path='/create-profile' element={<Private component={ProfileForm} />} ></Route>
      <Route path='/add-education' element={<Private component={AddEducation} />} ></Route>
      <Route path='/add-experience' element={<Private component={AddExperience} />} ></Route>
      <Route path='/developers' element={<Private component={Developers} />} ></Route>
      <Route path='/profile/:id' element={<Private component={Profile} />} ></Route>
      <Route path='/settings' element={<Private component={Settings} />} ></Route>
      <Route path='/update-profile' element={<Private component={ProfileForm} />} ></Route>
      <Route path='/Posts' element={<Private component={Posts} />} ></Route>
      <Route path="/posts/:id" element={<Private component={post} />} ></Route>

      

      
    </Routes>
    </Fragment>
    <br></br>
    <br></br>
    <br></br>
    
    <Footer></Footer>
    
    
    </BrowserRouter>
    </AlertProvider>
    
  </React.StrictMode>
    </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
