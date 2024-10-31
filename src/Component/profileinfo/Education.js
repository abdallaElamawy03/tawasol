import React, { useEffect } from "react";
import { formDate } from "../../utilis";
import { deleteEducation } from "../Redux/Modules/Profiles"; // Assuming this dispatches an action
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'; // Assuming you're using react-redux

const Education = ({ profile, deleteEducation }) => {
 
  return (
    <>
      <div>
        {/* Mapping is to loop in the array of the object in education array */}
        {profile?.education?.map((e) => (
          <>
            <h5 style={{ overflow: "hidden" }}>{e.degree}</h5>
            <div key={e._id} className="container">
            <p >
               {e.cureent ? "studies " : "studied "} <b>{e.degree} </b>in<b>{e.school} </b>

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
              <div class="text-end">
              {deleteEducation !== undefined ? (
       <>
        <a href="#!" onClick={()=>deleteEducation(e._id)}>
                <i class="fa fa-trash-o" style={{fontSize:"24px",color:"red"}}></i>
                </a>
       </> 
      ) : null}
              </div>
              <hr />
            </div>
          </>
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  // Map any state data you need from Redux store to props
});



export default connect(mapStateToProps)(Education);