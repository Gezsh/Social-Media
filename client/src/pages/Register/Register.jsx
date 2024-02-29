import { useRef } from "react";
import "./register.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function Register() {
  const username =useRef()
  const email =useRef()
  const password =useRef()
  const confirm =useRef()
  const navigate=useNavigate()
  const handleClick=async(e)=>{
    e.preventDefault()
   
    if(confirm.current.value !== password.current.value ){
      confirm.current.setCustomValidity("password doesn't match!")
    }else{
        const user ={
             username:username.current.value,
             email:email.current.value,
             password:password.current.value
        }
        try{

             await axios.post('http://localhost:8800/api/user/register',user)
             navigate('/login')
        }catch(error){
             console.log(error)
        }
    }

  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">facebook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on facebook.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBoxs" onSubmit={handleClick}>
            <input 
            placeholder="Username" 
            className="loginInput" 
            type="text"
            ref={username}
            required
            />
            <input 
            placeholder="Email" 
            className="loginInput"
            type="email"
            ref={email}
            required
            />
            <input 
            placeholder="Password" 
            className="loginInput" 
            type="password"
            minLength="6"
            ref={password}
            required
            />
            <input 
            placeholder="Confirm" 
            className="loginInput" 
            type="password"
            ref={confirm}
            required
            />
            <button className="loginButton" type="submit">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
