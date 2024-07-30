import {NavLink} from "react-router-dom"
import { useContext } from "react"
import React from 'react'
import "./Header.css"
import { Container ,Nav,Navbar,Button} from "react-bootstrap"
import AuthContext from "../../context/AuthProvider";


const Header = () => {
  const { auth,isLoggedIn } = useContext(AuthContext);
  return (
    <Navbar className="navbar"  variant="dark" expands="lg" >
    <Container fluid>
        
        <Navbar.Toggle aria-controls="basicScroll" />
        <Navbar.Collapse >
       
            <Nav className="me-auto my-2 my-lg-0" style={{maxHeight:"100px"}}
                 navbarScroll> 

                <NavLink className="nav-link" to="/">Home</NavLink>
                  
                <NavLink  className="nav-link" to="/calender">Week
                </NavLink>


            </Nav>
            {isLoggedIn? <div className="user"><NavLink  className="nav-link" to="/User">
{auth}              </NavLink></div>:<>
            <Button variant='outline-info' href="/login" className="me-2">Login</Button>
            <Button variant='outline-info' href="/register">Register</Button></>}

        </Navbar.Collapse>
    </Container>
   </Navbar>
  )
}

export default Header