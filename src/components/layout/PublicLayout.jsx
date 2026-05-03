import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

const PublicHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="public-header">
      <h1 className="logo">HealthCare+</h1>

      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/contact">Contact Us</NavLink>
      </nav>

      <div className="auth-buttons">
        <button className="login-btn" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="signup-btn" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default PublicHeader;
