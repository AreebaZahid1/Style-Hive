import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ShoppingBag,User,LogOut,Menu,X,Settings} from "lucide-react";

import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* Logo */}

      <Link to="/" className="navbar-brand">
        STYLE<span>HIVE</span>
      </Link>


      {/* Links */}

      <div className={`navbar-links ${menuOpen ? "mobile-open" : ""}`}>

        <Link to="/">Home</Link>

        <Link to="/products">Shop</Link>

        <Link to="/category">Categories</Link>

        {/* <Link to="/cart">Cart</Link> */}

        {/* Admin only

        {token && role === "admin" && 
        (
          <Link to="/admin"> Admin </Link>
        )} */}

      </div>

      <div className="navbar-actions">

        {!token ? (

          <>
            <Link to="/login"className="login-btn">Login</Link>

            <Link to="/signup"className="signup-btn">Get Started</Link>
          </>

        ) : (

            <>

            <Link to="/profile" className="profile-btn">
              <User size={18} />
              Profile
            </Link>

            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={18} />
              Logout
            </button>

          </>

        )}

        <Link to="/cart"className="cart-icon">
          <ShoppingBag size={21} />
        </Link>

      </div>

      <button className="mobile-menu-btn"onClick={() => setMenuOpen(!menuOpen)}>

        {menuOpen
          ? <X size={24} />
          : <Menu size={24} />
        }

      </button>

    </nav>
  );
}

export default Navbar;