import React, { useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import "./Navbar.scss";
import {TokenContext} from "../context/TokenContext"

// const logo =  require("./../logo.png")

export default function Navbar() {
  let history = useHistory();
  const {token, setToken} = useContext(TokenContext);
  
  return (
    <div className="navbar">
      <p className="logo">insert logo here</p>
      <div className="nav-buttons">
        <Link to="/search"> <p>Dashboard</p></Link>
        <p>Current</p>
        <p>Complete</p>
        <p>Log Out</p>
        <p>{token.substring(0, 7)}</p> {/* dont flood the display with the token, but let me know it's there */}
      </div>
    </div>
  )
}
