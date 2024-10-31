import React, { useEffect } from "react";
import { Link ,useParams} from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "./Redux/Modules/Profiles";
import { deleteAccount } from "./Redux/Modules/Profiles";
import { deleteAccount1 } from "./Redux/Modules/users";


const Settings =({users:{user},deleteAccount})=>{


    return(
        <>

        { user !== null&&(

            <section class="py-5 text-center container">
    <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        
        <h2 className="fw-light ti-login fw-bold">Edit profile </h2>
        <p>
          <Link to={"/update-profile"} className="btn btn-primary my-2">Edit profile</Link>
          
        </p>
        <h2 className="fw-light fw-bold text-white">Delete Account</h2>
        <p>
            <Link className="btn btn-danger" onClick={()=>deleteAccount()}>Delete Account</Link>

        </p>
      </div>
    </div>
  </section>

)}




        </>
    )
}
const mapStateToProps=(state)=>(
    {
       
        users:state.users,
        
    }
  )
export default connect(mapStateToProps,{deleteAccount})(Settings)