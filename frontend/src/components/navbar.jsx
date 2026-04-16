import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const navLinks = ["Home", "About Us", "What We Do", "Help Center", "Contact"];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="navbar"
    >
      <div className="navbar-container">
        <h1 className="logo">JalRakshak</h1>

        <ul className="nav-links">
          {navLinks.map(link => (
            <li key={link}>
              <a href={`#${link.replace(/\s+/g, "").toLowerCase()}`}>
                {link}
              </a>
            </li>
          ))}
        </ul>

        <button className="auth-btn" onClick={() => navigate(user ? "/home" : "/login")}>
          {user ? "Dashboard" : "Login / Sign Up"}
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
