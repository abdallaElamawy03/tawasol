import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { removelikes,addLikes,deletepost } from "../Redux/Modules/posts";
import { formDate,getProfileImage } from "../../utilis";
import { Link } from "react-router-dom";
import { showAlertMessage } from "../Redux/Modules/alerts";

const Postitem=({addLikes,removelikes,deletepost,users,post:{_id,text,name,user,likes,comments,date},posts,showActions})=>{
  const [liked,setliked]=useState(false)
  const handleclick=()=>{
    if(!liked){
      setliked(true)
      addLikes(_id)
      
    }else{
      setliked(false)
      
    }

  }
  
   return(
    <>
    {
      posts ? (

    
      
      <div className="col-md-10 mx-auto col-lg-5">
          <div class="card"style={{marginTop:"10px"}}>
  <div class="card-header">
    user : {name} 
    <div style={{display:"inline-block",float:"right"}}>
        <small style={{color:"grey"}}>Posted in {formDate(date)}</small>
    </div>
  </div>
  <div class="card-body">
    
    <p class="card-text">{text}</p>
    {showActions && (
      
      
      
      <div  >
            <button style={{marginInlineEnd:"10px"}} className="btn btn-light" onClick={handleclick}>{liked ? "liked":"like"}<i class="fa fa-thumbs-up" ><small style={{marginInlineStart:"5px"}}>{likes.length}</small> </i></button>
            
            <button style={{marginInlineEnd:"px"}} className="btn btn-light" onClick={()=>removelikes(_id)}>Dislike<i class="fa fa-thumbs-up" ><small style={{marginInlineStart:"5px"}}></small> </i></button>
            
            
            </div>
    ) }
    
    <Link to={`/posts/${_id}`} className="btn btn-primary" style={{marginTop:"5px"}}>Comment {comments.length>0 && (
      <span className="comment-count">{comments.length}</span>
      )}</Link>
    {
      user ==users?.user?._id&&(
        <button onClick={()=>deletepost(_id)} className="btn btn-light" style={{marginTop:"5px", marginInlineStart:"5px"}}><i class="fa fa-trash-o"></i>
</button>
        )
    }
  </div>
</div>
  </div>
      ):showAlertMessage("There is an Error ","error")
    }
    
    </>
   )
}
Postitem.defaultProps = {
    showActions:true
}
const mapStateToProps=(state)=>({
    users:state.users,
    posts:state.posts
})

export default connect(mapStateToProps,{addLikes,removelikes,deletepost})(Postitem)