import React, { useContext } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import "./Navbar.scss";
import {TokenContext} from "../context/TokenContext"

// const logo =  require("./../logo.png")

export default function Navbar() {
  let history = useHistory();
  const { loggedinUser, setLoggedin, token, setToken } = useContext(TokenContext);
  
  if (token) {
    return (
      <div className="navbar">
        <p className="logo">insert logo here</p>
        <div className="nav-buttons">
          
          <NavLink to="/search" activeClassName="selected"> 
            <p>Dashboard</p>
          </NavLink>
          
          <p>Current</p>
          <p>Complete</p>
          
          <NavLink to="/" exact={true} activeClassName="selected" onClick={()=>{setToken(""); setLoggedin("")}}> 
            <p>Log Out</p>
          </NavLink>
          
          {/* redundant ternary statement for a sanity check */}
          <p>{token ? ("current token: " + token.substring(0, 7)) : "no token in context"}</p> 
          {/* dont flood the display with the token, but let me know it's there */} 
        
        </div>
      </div>
    )
  }

  return (
    <div className="navbar">
      <NavLink to="/"><p className="logo">insert logo here </p></NavLink>

      <div className="nav-buttons">
      
        <NavLink to="/login" activeClassName="selected"> <p>Login</p></NavLink>
        <NavLink to="/register" activeClassName="selected"> <p>Register</p></NavLink>
        {/* redundant ternary statement for a sanity check */}
        <p>{token ? ("current token: " + token.substring(0, 7)) : "no token in context"}</p> {/* dont flood the display with the token, but let me know it's there */}
      </div>
    </div>
  )

  
}
