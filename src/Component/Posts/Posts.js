import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../Redux/Modules/posts";
import { Link } from "react-router-dom";
import Postform from "./Postform";
import Postitem from "./Postitem";
import Commentform from "./Commentform";


function Posts({ getPosts, posts }) {

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <>
    <div style={{scrollBehavior:"smooth"}}>

      <Postform />

      {posts?.length > 0 ? (
          posts?.map((post) => (
            <>
              <Postitem key={post?._id} post={post} />
              
              

            </>
            ))
        ) : (
            <p>No posts found.</p>
        )}
        {
          

        }
        </div>

        
    </>
  );
}

const mapStateToProps = (state) => ({
  posts: state?.posts.posts, // Assuming posts are stored in the 'posts' property of the state
});

export default connect(mapStateToProps, { getPosts })(Posts);