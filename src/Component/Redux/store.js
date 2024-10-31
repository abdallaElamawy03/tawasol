// Building the redux store in the app 

import {applyMiddleware} from "redux"
import { legacy_createStore as createStore} from 'redux'
import {thunk} from "redux-thunk"
import {composeWithDevTools} from "@redux-devtools/extension"
import rootReducer from "./Modules"
import { setAuth } from "../../utilis"

const intitialState={};
const store = createStore(rootReducer,intitialState,composeWithDevTools(applyMiddleware(thunk)),)
let currentstate = store.getState()
store.subscribe(() => {
    const { users: { token: newToken } } = store.getState();
    if(newToken !== currentstate.users.token){

        setAuth(newToken);
        
    }
    
    

      
    
  });

export default store;


