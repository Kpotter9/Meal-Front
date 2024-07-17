import "./Nav.css"
import {Link} from "react-router-dom"
import React from 'react'

const Nav = () => {
  return (
    <div className="NavBar">
        <div className="links">
            <Link to="/">Home</Link>
            <Link to="/Calender">Calender</Link>
            <Link to="/Login">Login</Link>
        </div>
    </div>
  )
}

export default Nav