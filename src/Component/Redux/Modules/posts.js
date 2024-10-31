import { showAlertMessage } from "./alerts";
import { api } from "../../../utilis";
export const get_Posts="posts/get_Posts"; //->
export const get_Post="posts/get_Post"//->
export const post_Error = "posts/post_Error"//->
export const update_Likes = "posts/update_Likes"//->
export const delete_Post = "posts/delete_Post"//->
export const add_Post="posts/add_Post"//->
export const add_Comment="posts/add_Comment" //=>
export const remove_Comment="posts/remove_Comment" //=>


export const getPosts=()=>async dispatch =>{
    try{
        const res = await api.get("/posts")
        dispatch({type:get_Posts,payload:res.data})


    }
    
    
    catch(error){
        dispatch({
            type:post_Error,
            payload:error?.msg
        })
        showAlertMessage(error,"error")

    }

}
export const getpost =(id)=>async dispatch =>{
    try{
        const res = await api.get(`posts/${id}`)
        dispatch({
            type:get_Post,
            payload:res.data
        })
        showAlertMessage("postgetted","success")


    }catch(error){
        dispatch({type:post_Error,payload:error?.msg})
        showAlertMessage(error,"error")
    }
    
}

export const addpost =(text)=>async dispatch=>{
    try{
        const res = await api.post("/posts",text)
        dispatch({
            type:add_Post,
            payload:res.data

        })
        showAlertMessage("post added","success")


    }catch(error){
        dispatch({
            type:post_Error,
            payload:error?.msg

        })
        showAlertMessage(error,"error")

    }

}
export const deletepost =(id)=>async dispatch =>{
    if(window.confirm("are you sure want to delete this post")){

        try{
            await api.delete(`/posts/${id}`)
            dispatch({
                type:delete_Post,
                payload:id
            })
            showAlertMessage("post has removed","success")
            
        }
        catch(error){
            dispatch({
                type:post_Error,
                payload:error?.msg
                
            })
            showAlertMessage(error,"error")
        }
    }
}


export const addLikes=  (id) =>async dispatch=>{
    try{
        const res = await api.put(`posts/like/${id}`)
        dispatch({
            type:update_Likes,
            payload:id
        })
        showAlertMessage("like is added","success")

    }catch(error){
        dispatch({
            type:post_Error,
            payload:error?.msg
        })
        showAlertMessage("failed to put the like retry again ","error")

        
    }



}
export const removelikes =(id)=>async dispatch=>{
    try{
        const res = await api.put(`posts/unlike/${id}`)
        dispatch({
            type:update_Likes,
            payload:res.data
        })

    }catch(error){
        dispatch({
            type:post_Error,
            payload:error?.msg

       })
        showAlertMessage(error,"error")

    }
}
export const addComment=(id,text)=>async dispatch =>{
    try{

        const res = await api.post(`/posts/comment/${id}`,text)
        dispatch({
            type:add_Comment,
            payload:res.data
        })
        showAlertMessage("Comment Added ","success")
    }catch(error){
        dispatch({
            type:post_Error,
            payload:error?.msg
        })
        showAlertMessage(error,"error")

    }



}
export const deleteComment=(pid,cid)=>async dispatch=>{
    try{
        const res = await api.delete(`posts/comment/${pid}/${cid}`)
        dispatch({
            type:remove_Comment,
            payload:res.data
        })
        showAlertMessage("Comment Removed ","sucsess")

    }catch(error){
        dispatch({
            type:post_Error,
            payload:error?.msg

        })
        showAlertMessage(error?.msg,"error")
    }
}

const initialState={
    posts:[],
    post:null,
    loading:true,
    error:{},
    likedposts:[]
    
    

}

export default function reducer (state=initialState,action){
    const{type,payload}=action
    switch(type){
        case get_Posts:
            return{
                ...state,
                posts:payload,
                loading:false

            };
        case get_Post:
            return{
                ...state,
                post:payload,
                loading:false
                
            }
        case post_Error:
            return{
                ...state,
                error:payload,
                loading:false
            }
        case update_Likes:
            
            return{
                ...state,
                likedPosts: [...state.likedPosts, action.payload.postId],
                posts: state.posts.map(post =>
                  post._id === action.payload.postId
                    ? { ...post, likes: [...post.likes, { userId: 'currentUserId' }] }
                    : post
                ),
              

            }
        case delete_Post:
            return{
                ...state,
                loading:false,
                posts:state.posts.filter(post=>post._id !== payload)

            }
        case add_Post:
            return{
                ...state,
                posts:[payload,...state.posts],
                loading:false

            }
        case add_Comment:
            return{
                ...state,
                post:{...state.post,comment:payload},
                loading:false
            }
        case remove_Comment:
            return{
                ...state,
                loading:false,
                post:{...state.post,comments:state.post.comments.filter(comment => comment._id != payload)},
            }
        default:
            return {
                ...state
            }

    }
}