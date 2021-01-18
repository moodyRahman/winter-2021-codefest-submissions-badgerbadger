import React, { useContext } from 'react';
import "./Navbar.scss";
import {TokenContext} from "../context/TokenContext"

// const logo =  require("./../logo.png")

export default function Navbar() {
  const {token, setToken} = useContext(TokenContext);
  return (
    <div className="navbar">
      <p className="logo">insert logo here</p>
      <div className="nav-buttons">
        <p>Dashboard</p>
        <p>Current</p>
        <p>Complete</p>
        <p>Log Out</p>
        <p>{token}</p>
      </div>
    </div>
  )
}
