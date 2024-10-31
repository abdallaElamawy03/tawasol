import React from "react"
// import '../App.css';
// import '../Component/Landing.css'
import { Link } from "react-router-dom"
const Footer=()=>{

    return(
        <>

        
<div class="container">
  <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <p class="col-md-4 mb-0 text-body-secondary ti-login">&copy; Tawasol</p>

    <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
    </a>

    <ul class="nav col-md-4 justify-content-end">
      <li class="nav-item"><Link to={"/"} className="nav-link px-2 ti-login">Home</Link></li>
      
    </ul>
  </footer>
</div>
        </>

    )
}

export default Footer
