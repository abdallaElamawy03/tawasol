import React from "react"

const BasicInfo=({profile})=>{
    return(

        <>
        <div >
            
            <div className="container">
                <p>&#127759; Lives in <b>{profile?.location}</b></p>
            </div>
            <div className="container">
                <p>&#127968; from <b>{profile?.country}</b></p>
            </div>
            <div class="container">
  <p>&#10004;Skills:</p>
  <ul>
    {profile?.skills?.map((skill, index) => (
      <li key={index}>{skill}</li>
    ))}
  </ul>
</div>
            


        </div>
        </>
    )
}
export default BasicInfo;
// &#10004; => skills emoji
