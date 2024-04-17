import React from 'react'
// import LoginButton from '@/components/modules/LoginButton'
import LoginForm from '@/components/modules/LoginForm'
import image from "assets/login.png"
import '@/styles/Login.scss'
function Login() {
  return (
    <div className='wrap-login'>
    
    {/* <LoginButton/> */}
    <LoginForm/>
    <img src={image} alt='login form'/>
    </div>
  )
}

export default Login