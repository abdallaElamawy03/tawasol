import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addEducation, addExperience } from "../Redux/Modules/Profiles";

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    cureent: false,
    description:""
  });

  const { title, company, location, from, to, cureent,description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history);
  };

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
                    placeholder="Title"
                    onChange={onChange}
                    value={title}
                    name="title"
                  />
                  <label for="floatingInput">Title</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Company"
                    onChange={onChange}
                    value={company}
                    name="company"
                  />
                  <label for="floatingInput">Company </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="location"
                    onChange={onChange}
                    value={location}
                    name="location"
                  />
                  <label for="floatingInput">Location</label>
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
                  <label for="floatingInput">From Date</label>
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
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="description"
                    onChange={onChange}
                    value={description}
                    name="description"
                  />
                  <label for="floatingInput">Description</label>
                </div>
                <div>
                  <input type="submit" className="btn btn-primary" style={{ margin: 10 }} />
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

export default connect(null, { addExperience })(AddExperience);   