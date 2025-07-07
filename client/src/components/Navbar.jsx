import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Store/auth";
import "./Navbar.css"

const Navbar = () => {

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const goToProfile = () => {
    navigate("/user-profile");
    setShowProfileMenu(false);
  };

  const {logOutUser} = useAuth()

  const logOut=()=>{
    navigate("/");
    logOutUser()
    setShowProfileMenu(false);
  }

  const openContact=()=>{
    navigate("/contact-us");
    setShowProfileMenu(false);
  }

  return (
    <header className="navbar">
      <h1 >
        <NavLink to="/home-page">
        <div className="logo">
            Adventure
        </div>
        </NavLink>
      </h1>
      <nav className="nav-links">
        <NavLink to="/home-page" className="navlink">
          <i className="fas fa-home"></i> <span className="link-text">Home</span>
        </NavLink>
        <NavLink to="/peoples" className="navlink">
          <i className="fas fa-user"></i> <span className="link-text">Peoples</span>
        </NavLink>
        <NavLink to="/upload-section" className="navlink">
          <i className="fas fa-pen"></i> <span className="link-text">Create</span>
        </NavLink>
        <NavLink to="/notifications" className="navlink">
          <i className="fas fa-bell"></i> <span className="link-text">Notification</span>
        </NavLink>
        <button className="profile-btn" onClick={handleProfileClick}>
          <i className="fa-solid fa-user-tie"></i>
        </button>
      </nav>

      {showProfileMenu && (
        <div className="profile-menu">
          <div className="profile-header">
            <div className="profile-info">
              <i className="fas fa-user-circle profile-icon"></i>
              <div>
                <div className="profile-name">Agniv Das</div>
                <div className="profile-role">Admin <span className="profile-role-icon">🧑‍💼</span></div>
              </div>
            </div>
            <button className="close-btn" onClick={() => setShowProfileMenu(false)}>✕</button>
          </div>
          <div className="profile-item" onClick={goToProfile}>
            My Profile <i className="fas fa-user"></i>
          </div>
          <div className="profile-item">
            Settings <i className="fas fa-cog"></i>
          </div>
          <div className="profile-item" onClick={openContact}>
            Contact <i className="fas fa-envelope"></i>
          </div>
          <div className="profile-item" onClick={logOut}>
            Log Out <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
