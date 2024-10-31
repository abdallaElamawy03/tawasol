import { connect } from 'react-redux';
import React, { useState } from 'react';
import { addpost } from '../Redux/Modules/posts';

const Postform = ({ addpost }) => {
  const [text, setText] = useState(''); // Initialize text state to an empty string

  const onSubmit = (e) => {
    e.preventDefault();
  
 
  
    addpost({ text });
    setText('');
  };

  return (
    <>
      <div className="col-md-10 mx-auto col-lg-5">
        <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={onSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              value={text}
              onChange={(e) => setText(e.target.value)} // Update text on input change
              required // Set required attribute for validation
              autoFocus // Set autofocus for convenience
            />
            <label htmlFor="floatingInput">Post</label>
          </div>
          <input type="submit" value="Post" className="btn btn-primary" />
        </form>
      </div>
    </>
  );
};

export default connect(null,{addpost})(Postform);