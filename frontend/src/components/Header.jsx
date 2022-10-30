import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icon-left-font.svg";

function Header() {
  const navigate = useNavigate()
  function handleLogout(e) {
  	e.preventDefault();
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("userId");
    localStorage.removeItem("admin");
    navigate('/login')
    
  }
  return (
    <header>
      <div className="logoHeader">
        <Link to="/">
        	<img src={logo} alt="Logo de Groupamania" className="logo"/>
        </Link>
      </div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
        <Link to="/login">Signin</Link>
        <Link to="/signup">Signup</Link>
        <a href="#" onClick={handleLogout}>Logout</a>
      </nav>
    </header>
  )
}
export default Header;