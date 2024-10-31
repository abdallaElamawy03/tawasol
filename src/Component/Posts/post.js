import React,{useEffect} from "react";
import { useParams } from "react-router-dom";
import { deleteComment, getpost } from "../Redux/Modules/posts";
import Postitem from "./Postitem";
import { connect } from "react-redux";
import Commentitem from "./Commentitem";
import Commentform from "./Commentform";
import { formDate } from "../../utilis";


const Post=({getpost,posts:{post,loading},users,user,deleteComment})=>{
    
    let {id}=useParams()
    useEffect(()=>{
        getpost(id)

    },[getpost,id])
    return (
        <>
        <div>
            <div>
                {
                    post ? (
                            <>
                        <Postitem post={post}/> 
                        <Commentform postId={post?._id}/>
                        
                            </>
                        

                    ):<h2>there is an error fetching the data</h2>
                }
                

            </div>
            {
                post?.comments.map((comment)=>{
                    return(
                        <>
                         
 

                         <div className="col-md-10 mx-auto col-lg-5">
          <div class="card"style={{marginTop:"10px"}}>
  <div class="card-header">
    user : {comment.name} 
    <div style={{display:"inline-block",float:"right"}}>
        <small style={{color:"grey"}}>Posted in {formDate(post.date)}</small>
    </div>
  </div>
  <div class="card-body">
    
    <p class="card-text">{comment.text}</p>
    {
        users.user &&(
            <button onClick={()=>deleteComment(post?._id,comment?._id)} className="btn btn-light" style={{marginTop:"5px", marginInlineStart:"5px"}}><i class="fa fa-trash-o"></i>
</button>
        )
    }
    
    </div>
    </div>
    </div>
     
      
                        </>
                    )
                })
            }
        </div>

        
        
        </>
    )
}
const mapStateToProps=(state)=>({
    posts:state.posts,
    users:state.users
    
})

export default connect(mapStateToProps,{getpost,deleteComment})(Post)