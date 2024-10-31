import { showAlertMessage } from "./alerts";
import { api,setAuth } from "../../../utilis"


// THIS IS THE ACTIONS FOR THE REDUX STATE(MANAGER)
export const GET_PROFILE = "profile/GET_PROFILE"
export const UPDATE_PROFILE = "profile/UPDATE_PROFILE"
export const PROFILE_ERROR = "profile/PROFILE_ERROR"
export const UPLOAD_PROFILE_IMAGE = "profile/UPLOAD_PROFILE_IMAGE"
export const GET_PROFILES = "profile/GET_PROFILES"
export const CLEAR_PROFILE = "profile/CLEAR_PROFILE"



export const getCurrentProfile=()=>async(dispatch)=>{
    // calling the api  
    try {
        const res = await api.get("/profiles/me");
        dispatch({ type: GET_PROFILE, payload: res.data });
      } catch (error) {
        dispatch({type:PROFILE_ERROR,payload:{msg:error?.response?.statusText,status:error?.response?.status}})
      }


    }
//create or update profile
export const createProfile =(formdata,history,edit=false)=>async(dispatch)=>{
    try{
        const res = await api.post("/profiles",formdata)
        dispatch({
            type:UPDATE_PROFILE
            ,payload:res.data
        })
        
        dispatch(showAlertMessage(edit ? "profile updated":"profile created","success"))
        if(!edit){
            history.push("/home")
           
        }else{

          history.push('/home')
        }

    }
    
        // Code that might throw an error
        catch(err){
          dispatch({
              type:PROFILE_ERROR,
              payload:{msg:err?.response?.statusText , status: err?.response?.status}
              
          })
      }
        

    }
export const deleteAccount=()=>async(dispatch)=>{
  if(window.confirm("Are you sure this will delete your account")){
    try{
      await api.delete(`/profiles`)
      await api.delete(`/users`)
      
      dispatch({type:CLEAR_PROFILE})
      

      dispatch(showAlertMessage("your profile is deleted successfully","success"))
    }catch(err){
      dispatch({
          type:PROFILE_ERROR,
          payload:{msg:err?.response?.statusText , status: err?.response?.status}
          
      })
    }
}



}
    




export const uploadProfileImage=data=>async (dispatch)=>{
    try{
        const res = await api.post("/profiles/upload",data,{
            headers:{
                "Content-Type":"multipart/form-data",

            }
        })
        dispatch({
            type:UPLOAD_PROFILE_IMAGE,
            payload:res.data

        })
    }catch(err){
        console.log(err)
    }

}
const initialState={
    profile:null,
    profiles:[], 
    loading:true,
    error:{},
    image:null,
    token : localStorage.getItem("token"),
    isAuthenticated:localStorage.getItem('token')?true: false

}
export const addExperience=(formdata,history) => async (dispatch)=>{
  try{
    const response = await api.put("/profiles/experience",formdata)
    dispatch({
      type:UPDATE_PROFILE,
      payload:response.data

    })
    dispatch(showAlertMessage("Experience Added","success"))
    history.push("/home")
  }catch(err){
    dispatch({
        type:PROFILE_ERROR,
        payload:{msg:err?.response?.statusText , status: err?.response?.status}
        
    })
    
}}
export const addEducation=(formdata,history) => async (dispatch)=>{
  try{
    const response = await api.put("/profiles/education",formdata)
    dispatch({
      type:UPDATE_PROFILE,
      payload:response.data

    })
    dispatch(showAlertMessage("Education Added","success"))
    history.push("/home")
  }catch(error){
    const errors = error?.response?.data?.errors
    if(errors){
      errors.forEach((error)=>dispatch(showAlertMessage(error.msg,"error")))
    }else{
      showAlertMessage("error in the data","error")
    }
    dispatch({
      type:PROFILE_ERROR,
      payload:{msg:error?.response?.statusText,status:error?.response?.status}
      
    })
    
  }}

export const deleteExperience =(id)=>async (dispatch) =>{
    try{
        const res = await api.delete(`/profiles/del-experience/${id}`)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data

        })
        dispatch(showAlertMessage("Experirnce removed","success"))
    }catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err?.response?.statusText , status: err?.response?.status}
            
        })
    }
}
export const deleteEducation =(id)=>async (dispatch) =>{
    try{
        const res = await api.delete(`/profiles/del-education/${id}`)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data

        })
        dispatch(showAlertMessage("Education removed","success"))
    }catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText , status: err.response.status}
            

        })
    }
}
export const getprofiles = ()=>async (dispatch)=>{
  
  try{
    console.log("profiles has been fetched")
    const res = await api.get("/profiles")
    dispatch({
      type:GET_PROFILES,
      payload:res.data,
      

    })
    dispatch(showAlertMessage("Profiles data fetched","success"))
  }catch(err){
    dispatch({
        type:PROFILE_ERROR,
        payload:{msg:err.response.statusText , status: err.response.status}

    })
}
}
export const getprofilebyid=(user_id)=>async(dispatch)=>{
  try{
    const res = await api.get(`/profiles/user/${user_id}`)
    dispatch({
      type:GET_PROFILES,
      payload:res.data
    })
    
  }catch(err){
    dispatch({
      type:PROFILE_ERROR,
      payload:{msg:err.response.statusText,status:err.response.status}
    })
  }
}
export default function reducer(state=initialState,action){
    const {type,payload}=action
    

    switch(type){
        case GET_PROFILE:
        case UPDATE_PROFILE:
          localStorage.getItem(payload.token)
          

            return{
                ...state,
                profile:payload,
                loading:false,
                isAuthenticated:true
               

            }
        case GET_PROFILES:
          localStorage.getItem(payload.token)
          
            return{
                ...state,
                profiles:payload,
                loading:false,isAuthenticated:true
               

            }
        case PROFILE_ERROR:
          localStorage.getItem(payload.token)
            return{
                ...state,
                profile:null,
                loading:false,
                error:payload

            }
        case UPLOAD_PROFILE_IMAGE:
            return{
                ...state,
                image:payload,


            }
          case CLEAR_PROFILE:
            localStorage.setItem("token",null)
            window.sessionStorage.setItem("token",null)
            setAuth(null)
            
                return {
                  ...state,
                  profile:null,
                  repos:[],
                  
                  
      
                }
        default:
            return state;



    }
}
