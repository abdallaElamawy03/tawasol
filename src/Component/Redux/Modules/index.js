import { combineReducers } from "redux";
import users from "./users"
import alerts from "./alerts"
import posts from"./posts"
import profiles from"./Profiles"
export default combineReducers({
    users,alerts,profiles,posts
});


//reducer is the function making update to the users,alerts,profiles,posts
// if the app is simple use {reducer} to use only one attribute
