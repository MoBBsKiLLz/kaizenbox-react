import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LeftAlignedNavbar.css';
import { logout } from '../services/authService'
import logo from '../assets/logo.png';

const LeftAlignedNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  return (
    <Nav className="left-aligned-navbar flex-column shadow-lg">
      {/* Logo at the top of the navbar */}
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      {/* Navbar links */}
      <Nav.Link as={Link} to="/facilities">
        Facilities
      </Nav.Link>
      <Nav.Link onClick={handleLogout}>
        Logout
      </Nav.Link>
    </Nav>
  );
};

export default LeftAlignedNavbar;
