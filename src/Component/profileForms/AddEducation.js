import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { addEducation } from "../Redux/Modules/Profiles";

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    cureent: false,
  });

  const { school, degree, fieldofstudy, from, to, cureent } = formData;
  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit =async (e) => {
    
      e.preventDefault();
      try{

        
       const success= await addEducation(formData, history);
       if(success){
        history?.push('/home')
       }else{
        history?.push('/home')
       }
        
      }catch(error){
        history?.push('/home')
      }
    }
    
  

  return (
    <>
      <div className="px-4 pt-5 my-5 text-center">
        <br />
        <div className="col-lg-6 mx-auto">
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <div className="col-md-7 col-lg-8">
              <form
                className="form1 p-md-5 border rounded-3 bg-body-tertiary"
                onSubmit={onSubmit}
                
              >

                
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="School"
                    onChange={onChange}
                    value={school}
                    name="school"
                  />
                  {school == "" ? (
                                      <label for="floatingInput" style={{color:"red"}}>school is Required(!) </label>

                  ):

                  <label for="floatingInput">School</label>
                  }
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Degree or Certificates"
                    onChange={onChange}
                    value={degree}
                    name="degree"
                  />
                  {degree == "" ? (
                    <label for="floatingInput" style={{color:"red"}}>Degree or Certificate is Required (!)</label>
                  ):
                  
                  
                  <label for="floatingInput">Degree or Certificate</label>
                  }
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Fieldofstudy"
                    onChange={onChange}
                    value={fieldofstudy}
                    name="fieldofstudy"
                  />
                  {fieldofstudy == "" ?(

                  <label for="floatingInput"style={{color:"red"}}>Fieldofstudy is Required (!)</label>
                  ):
                  <label for="floatingInput">Fieldofstudy</label>
                  }
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="date"
                    className="form-control"
                    id="floatingInput"
                    placeholder="From"
                    onChange={onChange}
                    value={from}
                    name="from"
                    
                  />
                  {from == "" ?(
                    
                    <label for="floatingInput" style={{color:"red"}}>From Date</label>

                  ):
                  <label for="floatingInput">From Date</label>
                  }
                </div>

                <div>
                  <p style={{ marginLeft: 110, textAlign: "left", marginBottom: 20 }}>
                    <input
                      type="checkbox"
                      name="current"
                      value={cureent}
                      checked={cureent}
                      onChange={() => setFormData({ cureent: !cureent })}
                    />
                    Current School
                  </p>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="date"
                    className="form-control"
                    id="floatingInput"
                    placeholder="To Date"
                    onChange={onChange}
                    value={to}
                    name="to"
                    disabled={cureent}
                  />
                  <label for="floatingInput">To Date</label>
                </div>
                <div>
                  
                  
                  <input type="submit" className="btn btn-primary" style={{ margin: 10 }} onClick={onSubmit}  />
                  
                  <Link to={"/home"} className="btn btn-light">Go Back</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { addEducation })(AddEducation);   