import React, { useEffect, useState, useRef } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // New state for dropdown
  const menuRef = useRef(null); // Ref for closing menu on outside click

  // Default avatar image
  const defaultAvatar = "https://www.svgrepo.com/show/232666/tiger.svg";

  useEffect(() => {
    // 1. Firebase Auth Listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // 2. Click Outside Listener for closing the menu
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsMenuOpen(false); // Close menu after logout
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <div className="logo">
          ETHIO<span className="blue"> DRIVE TRACK</span>
        </div>
      </Link>

      <ul className="nav-links">
        <Link to="/why"><li>Advantages</li></Link>
        <Link to="/pricing"><li>Pricing</li></Link>
        <Link to="/about"><li>About us</li></Link>
        <Link to="/contact"><li>Contact us</li></Link>
      </ul>

      <div className="nav-buttons">
        {user ? (
          <div className="profile-section" ref={menuRef}>
            <img
              src={user?.photoURL || defaultAvatar}
              alt="Profile"
              className="profile-pic"
              onClick={toggleMenu} // Toggles the menu visibility
              title="Profile Menu"
            />
            
            {/* Conditional Dropdown Menu */}
            {isMenuOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                    Logged in as: <strong>{user.email || "User"}</strong>
                </div>
                {/* Add other menu items here if needed */}
                <hr />
                <button 
                  onClick={handleLogout} 
                  className="dropdown-item logout-btn"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/register">
            <button className="signup">Sign Up</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;