// import logo from './logo.svg';
// import './App.css';
import React, { useEffect } from "react"
import Landing from "./Component/Landing"
import { loadUser } from "./Component/Redux/Modules/users";
import store from "./Component/Redux/store";
import Private from "./Component/Private";
import Home from "./Component/Home";
import { setAuth } from "./utilis";



function App() {
 

  
  return (
    <>
    

   
    <Landing></Landing>
    
   </>

  );
}

export default App;
