import React, { useState } from "react";
import { addComment } from "../Redux/Modules/posts";
import { connect } from "react-redux";

const CommentForm = ({  addComment ,postId}) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(postId, { text });
    setText("");
  };

  return (
    <>
    
       

      <form onSubmit={onSubmit}>
        <div className="col-md-10 mx-auto col-lg-5">
          <label htmlFor="comment-text ti-login">Add a comment</label>
          <div className="input-group mb-3">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="form-control"
              id="comment-text"
              placeholder="Write your comment"
              aria-label="Comment text"
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="submit">
                Comment
              </button>
            </div>
          </div>
        </div>
      </form>
    
    </>
  );
};


export default connect(null, { addComment })(CommentForm);