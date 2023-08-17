import React from 'react'
import loading from "../assets/loading.gif"

function LoadingSpinner() {
  return (
    <div style={{backgroundColor:"#ffffff", position:"absolute", top:"0px", left:"0px", width:"100%", height:"100%",
    display:"flex", justifyContent:"center", alignItems:"center", zIndex:"10"}}>
      <img src={loading} alt="" style={{width:"200px", height:"200px"}}/>
    </div>
  )
}

export default LoadingSpinner