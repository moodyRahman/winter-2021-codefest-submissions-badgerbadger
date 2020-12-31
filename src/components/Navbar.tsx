import React from 'react';
import "./Navbar.scss";

// const logo =  require("./../logo.png")

export default function Navbar() {
  return (
    <div className="navbar">
      <p className="logo">insert logo here</p>
      <div className="nav-buttons">
        <p>Dashboard</p>
        <p>Current</p>
        <p>Complete</p>
        <p>Log Out</p>
      </div>
    </div>
  )
}