import axios from "axios"
import cookies from 'js-cookie'
const serverUrl = "http://localhost:5000"
export const api = axios.create({
    baseURL:`${serverUrl}/api`,
    headers:{
        'Content-Type':'application/json'
        
    }
})
export const setAuth = (token) => {
    if (token) {
      api.defaults.headers.common["x-auth-token"] = token;
      localStorage.setItem("token", token);
      
    } else {
      delete api.defaults.headers.common["x-auth-token"];
      localStorage.removeItem("token");
      
    }
  };
// we will gonna save the image into serverurl inside folder image and saving the image with the user id
export const getProfileImage = userId =>(`${serverUrl}/images/${userId}`)

export function formDate(date) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    
  };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
}