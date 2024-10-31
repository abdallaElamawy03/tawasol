// alert module or alert component
/*
define actions -> to initialize the actions
Action creator function 
reducer function 

*/
//init actions 
//1 action => show the alert 
const SHOW_ALERT_MESSAGE = "alerts/SHOW_ALERT_MESSAGE" //our main function 
//Action creator
export function showAlertMessage(msg,type="info"){
    return function showAlertMessageThunk(dispatch){
        dispatch({
            type:SHOW_ALERT_MESSAGE,
            payload:{
                show:true,msg,type,
            }
        })
    }


}

const intitialState={
    show:false ,
    msg:"",
    type:"info"
}
export default function reducer (state=intitialState,action){
    switch(action.type){
        case SHOW_ALERT_MESSAGE:
            return{
                
                show:true,
                msg:action.payload.msg,
                type:action.payload.type
            }
        default:
                return state
                

            
    }
}