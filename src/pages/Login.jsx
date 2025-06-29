import React from 'react'
import Template from '../components/Template'
// import frameImg from "../assets/frame.png"
// import loginImg from "../assets/login.webp"
import {AiOutlineEyeInvisible ,AiOutlineEye} from "react-icons/ai"

const Login = () => {
  return (

    <Template
    title="The Future of Messaging"  
    desc1="AI-Powered. Lightning Fast. Always Connected."  
    desc2="Experience the Next-Gen Chat Revolution."  
    //image={loginImg}
    formType="login"
    />
  )
}

export default Login