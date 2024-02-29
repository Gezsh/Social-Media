import {  useContext, useRef, useState } from 'react';
import './login.css'
import {loginApi} from '../../api/userApi'
import { useNavigate } from 'react-router-dom';
import { loginCalls } from '../../apiCalls';
import { CircularProgress } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
export default function Login() {
    // const [email,setEmail]=useState();
    // const [password,setPassword]=useState();
    // const navigate=useNavigate()
    // const loginFun=(e)=>{
    //     e.preventDefault();
    //     loginApi({email,password}).then(({data})=>{
    //         navigate('/')
    //         console.log(data.token)
    //         // window.localStorage.setItem("token",data.token)
    //     }).catch((error)=>console.log(error))
    // }

     const {user,isFetching,error,dispatch}=useContext(AuthContext)

    const email=useRef()
    const password=useRef()
   
    const handleClick=(e)=>{
        e.preventDefault()
      
        loginCalls({email:email.current.value,password:password.current.value},dispatch)
    }
    console.log(user)

  return (
      <div  className="login">
         <div className="loginWrapper">
            <div className="loginLeft">
               <h3 className="loginLogo">facebook</h3>
               <span className="loginDesc">connect with friends and world around you in facebook!</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input 
                    placeholder="Email" 
                    className="loginInput" 
                    required
                    ref={email}
              
                    />
                    <input 
                    type="password" 
                    placeholder="Password" 
                    required
                    minLength="3"
                    className="loginInput" 
                    ref={password}
                  
                    />
                    <button className="loginButton" type="submit" disabled={isFetching} >{isFetching ? <CircularProgress style={{color:"white",size:"15px"}}/> : "Login"}</button>
                    <span className="loginForgot">Forgot Password</span>
                    <button className="loginRegisterButton">{isFetching ? <CircularProgress style={{color:"white",size:"15px"}}/> : "Create a new account"}</button>
                </form>
            </div>
         </div>
      </div>
  )
}
