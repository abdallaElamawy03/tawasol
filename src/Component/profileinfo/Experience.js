import React from "react";
import { formDate } from "../../utilis";
import { deleteExperience } from "../Redux/Modules/Profiles";
import moment from "moment";
import { Link } from "react-router-dom";
const Experience = ({profile,deleteExperience})=>{
    return (
      <>
      <div>
        {/* Mapping is to loop in the array of the object in education array  */}
        
        {profile?.exprience?.map(e=>(
          <>
          <h5 style={{overflow:"hidden"}}>{e.title}</h5>
            <div key={e._id} className="container">
              
              <p >
               {e.cureent ? "works " : "worked "} <b>{e.company} </b>in<b>{e.location} </b>

              </p>
              

{
  e.to && moment(e.to).isValid() ? (
    <p >
      from {moment(e.from).format('MMMM YYYY')} to {moment(e.to).format('MMMM YYYY')}
    </p>
  ) : (
    <p >
      from {moment(e.from).format('MMMM YYYY')} to present
    </p>
  )
}
    <p>{e.description}</p>
    <div className="text-end">
      {deleteExperience !== undefined ? (
       <>
        <a href="#!" onClick={()=>deleteExperience(e._id)}>
                <i class="fa fa-trash-o" style={{fontSize:"24px",color:"red"}}></i>
                </a>
       </> 
      ):
      <>
      </>}

    </div>

    
            <hr/>
            </div>
            
          </>
        )
          
      )}
      
          
      </div>
            </>
    )}

export default Experience