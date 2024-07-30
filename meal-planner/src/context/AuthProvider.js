import { createContext, useState } from "react";
import React from 'react'
const AuthContext=createContext();

export function useAuth() {
    return React.useContext(AuthContext);
}

export function AuthProvider(props){
    const [auth, setAuth]= useState(null);
    const [isLoggedIn, setIsLoggedIn]= useState(false)
    const value ={auth,setAuth,isLoggedIn,setIsLoggedIn}
  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}
export default AuthContext;
