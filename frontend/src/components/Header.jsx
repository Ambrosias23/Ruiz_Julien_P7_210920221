import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/icon-left-font.svg';

function Header() {
  const navigate = useNavigate();

  const token = localStorage.getItem('TOKEN');
  const isLoggedIn = token === null ? false : true;

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('userId');
    localStorage.removeItem('admin');
    navigate('/login');
  }
  return (
    <header>
      <div className="logoHeader">
        <Link to="/">
          <img src={logo} alt="Logo de Groupamania" className="logo" />
        </Link>
      </div>
      <nav className="nav">
        {isLoggedIn && token && <Link to="/">Home</Link>}
        {isLoggedIn && token && <Link to="/create">Create</Link>}
        {isLoggedIn === false && <Link to="/login">Signin</Link>}
        {isLoggedIn === false && <Link to="/signup">Signup</Link>}
        {isLoggedIn && token !== 'undefined' && (
          <a href="/login" onClick={handleLogout}>
            Logout
          </a>
        )}
      </nav>
    </header>
  );
}
export default Header;
