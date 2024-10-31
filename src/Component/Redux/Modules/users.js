import {api,setAuth} from "../../../utilis"
import { showAlertMessage } from "./alerts"


//Actions for signup
const Register_Success="user/Register_Success"
const Register_fail = "user/Register_fail"
const user_Load = "user/user_Load"
const user_Error = "user/user_Error"
const LOGIN_SUCCESS = "user/LOGIN_SUCCESS"
const LOGIN_FAIL = "user/LOGIN_FAIL"
const LOGOUT = "user/LOGOUT"


export const loadUser =()=> async (dispatch)=>{
    try{
        const res = await api.get("/users")
        dispatch({
            type:user_Load,
            payload:res.data,
            

        })
    }catch(err){
        dispatch({
            type:user_Error
        })
    }
}

export function register(formData){
    return async function registerThunk(dispatch){
        
        try{
            //call Api /user/register => using the axios 
            const res = await api.post("/users/register",formData)
            dispatch({
                type:Register_Success,
                payload:res.data
            
            })
            dispatch(loadUser())
        }catch(error) {
            if(typeof error !== 'undefined' ){

                const errors = error?.response?.data?.errors; // Assuming error object has a response with data and errors
                if (errors) {
                    errors.forEach(error => {
                        dispatch(showAlertMessage(error?.msg), "error");
                    });
                }
                
            }
             
            dispatch({
                type:Register_fail
            })

        }

    }
}



export function u_Login(email,Password){
    return async function loginThunk(dispatch){
        
        try{
            //call Api /user/register => using the axios 
            const res = await api.post("/users/login",{email,Password})
            dispatch({
                type:LOGIN_SUCCESS,
                payload:res.data
            
            })
            dispatch(loadUser())
        }catch(error) {
            if (error && error?.response && error?.response.data && error?.response.data.errors) {
                // ... proceed with error handling
              }
             
            dispatch({
                type:LOGIN_FAIL
            })

        }

    }
}
export const logout =()=>(dispatch)=>{
    dispatch({type: LOGOUT})

}
const intitialState={
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('token') ? true : false, // 
     
    loading:true,
    user:null
}
export default function reducer(state = intitialState,action){
    const {type,payload}=action 
    switch(type){
        case user_Load:
            localStorage.getItem("token",payload.token)
            window.sessionStorage.getItem("token",payload.token)
           

            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:payload

            }
        case Register_Success:

            setAuth(payload.token)
            localStorage.getItem("token",payload.token)

            



            return {
                ...state,
               
                isAuthenticated:true,
                loading:false
                }
        case LOGIN_SUCCESS:
            setAuth(payload.token)
                localStorage.getItem("token",payload.token)
                



            return {
               
                ...state,
                
                
                
                isAuthenticated:true,
                loading:false
                }
            
        case Register_fail:
        case LOGIN_FAIL:
            localStorage.setItem("token",null)
                setAuth(null)
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false,
                
            }

        // case LOGIN_FAIL:
        //     localStorage.setItem("token",null)
        //         setAuth(null)
        //     return{
        //         ...state,
        //         token:null,
        //         isAuthenticated:false,
        //         loading:false,
                
        //     }
        
            case user_Error:
                localStorage.setItem("token",null)
                setAuth(null)
                return{
                    ...state,
                    token:null,isAuthenticated:false,loading:false,user:null

                }
            case LOGOUT:
                localStorage.setItem("token",null)
                setAuth(null)
                return{
                    ...state,
                    token:null,isAuthenticated:false,loading:false,user:null

                }
            
        default:
            return state

    }


}