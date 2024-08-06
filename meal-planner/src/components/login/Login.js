import "./Login.css" 
import { Navigate, useNavigate } from "react-router-dom";
import {useRef,useState , useEffect, useContext} from "react";
import { Button } from "react-bootstrap";
import api from "../../api/axiosConfig";
import AuthContext from "../../context/AuthProvider";



import React from 'react'

const Login = () => {

const {setAuth,setIsLoggedIn}=useContext(AuthContext)
const navigate=useNavigate();
const userRef=useRef();
const errRef=useRef();

const [user,setUser] = useState("");
const [pwd,setPwd] = useState("");
const [errMsg,setErrMsg] = useState("");
const [success,setSuccess] = useState(false);

useEffect(() => {
  userRef.current.focus();
},[])

useEffect(() => {
  setErrMsg("")

},[user,pwd])

const handleSubmit = async(e) => {
  e.preventDefault();
  
  try{
    const response=await api.post(`/api/user/login`,

      JSON.stringify({username: user, password: pwd}),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    setAuth(user);
    setIsLoggedIn(true);
    setUser("")
    setPwd("")
    setSuccess(true);
    navigate("/")
  }
  catch(err){ 
    
    if(!err?.response){
      setErrMsg("Network Error");
    }
    else{
        setErrMsg("Username Or Password Incorrect")

   
      }
      errRef.current.focus();
      
  }
}

  return (
    <center>

<section className="login">
        <p ref={errRef} className={errMsg? "errmsg": "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Username:
            </label>
            <input 
            type="text" 
            id="username" 
            ref={userRef} 
            value={user}
             onChange={(e) => setUser(e.target.value)} 
             required />
          <label htmlFor="password">
            Password:
            </label>
            <input 
            type="password" 
            id="password" 
            ref={userRef} 
            value={pwd}
             onChange={(e) => setPwd(e.target.value)} 
             required />
             <Button type="submit" >Sign In</Button>
          

        </form>


      </section>
      
    </center>
  )
}

export default Login