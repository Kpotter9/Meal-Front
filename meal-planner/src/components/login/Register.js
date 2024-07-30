import "./Login.css"
import { useRef,useState, useEffect} from "react"
import {faCheck,faTimes,faInfoCircle}  from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button} from "react-bootstrap"
import api from "../../api/axiosConfig"

import React from 'react'

const USR_Req =/^[a-zA-z][a-zA-Z0-9-_]{3,23}$/;
const PWD_Req =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EML_Req =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    
const Register = () => {
    const userRef=useRef();
    const errRef=useRef();

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false);

    const [pwd,setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false);

    const [pwdMatch, setPwdMatch] = useState("");
    const [pwdConfirm, setValidMatch] = useState(false);
    const [pwdConfirmFocus, setPwdConfirmFocus] = useState(false);

    const [eml, setEml] = useState("");
    const [validEml, setValidEml] = useState(false)
    const [emlFocus, setEmlFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() =>{
        userRef.current.focus()

    },[]);
    useEffect(() =>{
        const result=USR_Req.test(user);
        
        setValidName(result);
    },[user])
    useEffect(() =>{
        const result=PWD_Req.test(pwd);
       
        setValidPwd(result);
        const match=pwd ===pwdMatch;
        
        setValidMatch(match);
    },[pwd,pwdMatch]);
    useEffect(() =>{
        const result=EML_Req.test(eml);
        
        setValidEml(result);
    },[eml])

    useEffect(()=>{
        setErrMsg("");

    },[user,eml,pwd,pwdMatch]);

    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(!validName ||!validPwd ||!pwdConfirm ||!validEml){
            setErrMsg("Please fill out all fields correctly");
            return;
        }
        try{
            const response = await api.post("/api/user/register",

            JSON.stringify({username: user, password: pwd, email:eml}),
            {

                headers: {'Content-Type': 'application/json'}
                
            }
        )

            setSuccess(true);
        }catch(error){
           setErrMsg("Username or Password Taken")
        }

    }



  return (
    <center>
    {success? (
        <section>
            <h1> Success!</h1>
                <p>
                <Button variant='outline-info' href="/login" className="me-2">Login</Button>

                </p>

            

        </section>


    ):(





    


    <section>
        <p ref={errRef} className={errMsg? "errmsg": "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:
            <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck}/>
            </span>
            <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes}/>

            </span>




            </label>
            <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e)=> setUser(e.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={()=> setUserFocus(true)}
                onBlur={()=> setUserFocus(false)}
                /><p id="uidnote" className={userFocus&& user && !validName? "instructions": "offscreen"}>
                <FontAwesomeIcon className="info" icon={faInfoCircle}/> 
                4 to 24 charachters.<br/>
                Letters , numbers , underscores , hyphens allowed.
            </p>


            <label htmlFor="email">Email:
            <span className={validEml ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck}/>
            </span>
            <span className={validEml || !eml ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes}/>

            </span>
            </label>
            <input
                type="text"
                id="email"
                
                autoComplete="off"
                onChange={(e)=> setEml(e.target.value)}
                required
                aria-invalid={validEml ? "false" : "true"}
                aria-describedby="emlnote"
                onFocus={()=> setEmlFocus(true)}
                onBlur={()=> setEmlFocus(false)}
                />
                    <p id="emlnote" className={emlFocus&& eml && !validEml? "instructions": "offscreen"}>
                    <FontAwesomeIcon className="info" icon={faInfoCircle}/>                     Must be a valid email address
                    
                </p>
            <label htmlFor="password">Password:
            <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck}/>
            </span>
            <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes}/>

            </span>
            </label>
            <input
                type="password"
                id="password"
                onChange={(e)=> setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={()=> setPwdFocus(true)}
                onBlur={()=> setPwdFocus(false)}
                /><p id="pwdnote" className={pwdFocus&& pwd && !validPwd? "instructions": "offscreen"}>
                <FontAwesomeIcon className="info" icon={faInfoCircle}/> 
                8 to 24 charachters.<br/>
                Must include uppercase and lowercase letters, a number and a 
                special character.<br/>
                Allowed charachters: <span aria-label="exlclamation mark">!</span>
                <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span> <span aria-label="percent sign">%</span>
            </p>


            <label htmlFor="Confirm_password">Confirm Password:

            <span className={pwdConfirm && pwdMatch ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck}/>
            </span>
            <span className={pwdConfirm || !pwdMatch ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes}/>

            </span>
            </label>  <input
                type="password"
                id="Confirm_password"
                onChange={(e)=> setPwdMatch(e.target.value)}
                required
                aria-invalid={pwdConfirm ? "false" : "true"}
                aria-describedby="pwdMatchnote"
                onFocus={()=> setPwdConfirmFocus(true)}
                onBlur={()=> setPwdConfirmFocus(false)}
                /><p id="pwdMatchnote" className={pwdConfirmFocus&& pwdMatch && !pwdConfirm? "instructions": "offscreen"}>
                <FontAwesomeIcon className="info" icon={faInfoCircle}/>   8 to 24 charachters.<br/>
                Must include uppercase and lowercase letters, a number and a 
                special character.<br/>
                Allowed charachters: <span aria-label="exlclamation mark">!</span>
                <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span> <span aria-label="percent sign">%</span>
            </p>
            <Button type="submit"disabled={!validName || !validEml||!validPwd||!pwdConfirm} >Sign Up</Button>

        </form>
    </section>)}</center>
  )
}

export default Register