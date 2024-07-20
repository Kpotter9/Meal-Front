import {NavLink} from "react-router-dom"
import React from 'react'
import "./Header.css"
import { Container ,Nav,Navbar,Button} from "react-bootstrap"


const Header = () => {
  return (
    <Navbar className="navbar"  variant="dark" expands="lg" >
    <Container fluid>
        
        <Navbar.Toggle aria-controls="basicScroll" />
        <Navbar.Collapse >
            <Nav className="me-auto my-2 my-lg-0" style={{maxHeight:"100px"}}
                 navbarScroll>
                <NavLink className="nav-link" to="/">Home</NavLink>
                <NavLink  className="nav-link" to="/calender">Week</NavLink>


            </Nav>
            <Button variant='outline-info' href="/login" className="me-2">Login</Button>
            <Button variant='outline-info' href="/register">Register</Button>

        </Navbar.Collapse>
    </Container>
   </Navbar>
  )
}

export default Header