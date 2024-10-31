import React, { useEffect, useState } from "react";
const titles=[" Connect with people in your Field","Connect in a safe place","in the Correct place"]
const Landingtitle =()=>{
const[titleIndex,settitle_INdex]=useState(0)
const[fadeIn,usefade_In]=useState(true)
useEffect(()=>{
    let timeout=null;
    let titleinterval = null 
    titleinterval=setInterval(()=>{
        const index =[titleIndex +1 ] %titles.length
        // useState({titleIndex,fadeIn:true});
        settitle_INdex(index);
        usefade_In(true)

        timeout=setTimeout(()=>{
            usefade_In(false)
        },2000)
    },4000)
    timeout=setTimeout(()=>{
        usefade_In(false)

    },2000)
    return function cleanup(){
        clearInterval(titleinterval)
        clearTimeout(timeout)

    }
},[titleIndex])
   
        return(
            <p className={fadeIn ? "title-fade-in plz-s":"title-fade-out plz-s"}> {titles[titleIndex]}</p>

        )

    }
export default Landingtitle
