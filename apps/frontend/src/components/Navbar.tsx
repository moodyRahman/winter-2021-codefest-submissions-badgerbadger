import React, { useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
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
          <Link to="/search"> <p>Dashboard</p></Link>
          <p>Current</p>
          <p>Complete</p>
          <Link to="/" onClick={()=>{setToken(""); setLoggedin("")}}> <p>Log Out</p></Link>
          
          {/* redundant ternary statement for a sanity check */}
          <p>{token ? ("current token: " + token.substring(0, 7)) : "no token in context"}</p> {/* dont flood the display with the token, but let me know it's there */} 
        </div>
      </div>
    )
  }

  return (
    <div className="navbar">
      <Link to="/"><p className="logo">insert logo here </p></Link>

      
      <div className="nav-buttons">
        <Link to="/login"> <p>Login</p></Link>
        <Link to="/register"> <p>Register</p></Link>
        {/* redundant ternary statement for a sanity check */}
        <p>{token ? ("current token: " + token.substring(0, 7)) : "no token in context"}</p> {/* dont flood the display with the token, but let me know it's there */}
      </div>
    </div>
  )

  
}
