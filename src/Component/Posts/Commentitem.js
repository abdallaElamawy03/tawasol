import React from "react";
import { connect } from "react-redux";
import { formDate } from "../../utilis";
import { deleteComment } from "../Redux/Modules/posts";

const Commentitem=({comment:{text, name,_id,date,user},users,deleteComment})=>{
    

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
    {
        user ==users?.user?._id&&(
            <button onClick={()=>deleteComment(_id)} className="btn btn-light" style={{marginTop:"5px", marginInlineStart:"5px"}}><i class="fa fa-trash-o"></i>
</button>
        )
    }
    
    </div>
    </div>
    </div>
     

}
const mapStateToProps=(state)=>({
    users:state.users,
    
})
export default connect(mapStateToProps,{deleteComment})(Commentitem)