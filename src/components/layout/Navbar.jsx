import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const isHome = location.pathname === "/";
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logoutUser();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className={`navbar ${scrolled || !isHome || mobileMenuOpen ? "navbar--solid" : "navbar--transparent"}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-mark">S</span>
          <span className="navbar__logo-text">StayNest</span>
        </Link>

        <div className="navbar__links">
          <Link to="/listings" className="navbar__link">Explore</Link>
          <Link to="/listings?category=safari" className="navbar__link">Safaris</Link>
          <Link to="/listings?category=beach" className="navbar__link">Beaches</Link>
          <Link to="/map" className="navbar__link">Map</Link>
        </div>

        <div className="navbar__actions">
          {user ? (
            <div className="navbar__profile" ref={dropdownRef}>
              <button
                className="navbar__profile-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="navbar__avatar">
                  {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                </div>
                <span className="navbar__username">{user.firstName}</span>
                <span className="navbar__chevron">{dropdownOpen ? "\u25B2" : "\u25BC"}</span>
              </button>

              {dropdownOpen && (
                <div className="navbar__dropdown">
                  <div className="navbar__dropdown-header">
                    <p className="navbar__dropdown-name">{user.firstName} {user.lastName}</p>
                    <p className="navbar__dropdown-email">{user.email}</p>
                  </div>
                  <div className="navbar__dropdown-divider" />
                  <Link to="/my-bookings" className="navbar__dropdown-item" onClick={() => setDropdownOpen(false)}>
                    My Bookings
                  </Link>
                  {(user.isHost || user.isAdmin) && (
                    <Link to="/host" className="navbar__dropdown-item" onClick={() => setDropdownOpen(false)}>
                      Host Dashboard
                    </Link>
                  )}
                  {user.isAdmin && (
                    <Link to="/admin" className="navbar__dropdown-item" onClick={() => setDropdownOpen(false)}>
                      Admin Dashboard
                    </Link>
                  )}
                  <Link to="/become-a-host" className="navbar__dropdown-item" onClick={() => setDropdownOpen(false)}>
                    Become a Host
                  </Link>
                  <div className="navbar__dropdown-divider" />
                  <button className="navbar__dropdown-item navbar__dropdown-item--logout" onClick={handleLogout}>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar__auth-desktop">
              <Link to="/login" className="navbar__login-btn">Sign in</Link>
              <Link to="/register" className="navbar__register-btn">Sign up</Link>
            </div>
          )}

          <button
            className="navbar__menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span style={mobileMenuOpen ? { transform: "rotate(45deg) translate(5px, 5px)" } : {}} />
            <span style={mobileMenuOpen ? { opacity: 0 } : {}} />
            <span style={mobileMenuOpen ? { transform: "rotate(-45deg) translate(5px, -5px)" } : {}} />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="navbar__mobile-menu">
          <Link to="/listings" className="navbar__mobile-link" onClick={() => setMobileMenuOpen(false)}>Explore</Link>
          <Link to="/listings?category=safari" className="navbar__mobile-link" onClick={() => setMobileMenuOpen(false)}>Safaris</Link>
          <Link to="/listings?category=beach" className="navbar__mobile-link" onClick={() => setMobileMenuOpen(false)}>Beaches</Link>
          <Link to="/map" className="navbar__mobile-link" onClick={() => setMobileMenuOpen(false)}>Map</Link>
          <div className="navbar__mobile-divider" />
          {user ? (
            <>
              <Link to="/my-bookings" className="navbar__mobile-link" onClick={() => setMobileMenuOpen(false)}>My Bookings</Link>
              {(user.isHost || user.isAdmin) && (
                <Link to="/host" className="navbar__mobile-link" onClick={() => setMobileMenuOpen(false)}>Host Dashboard</Link>
              )}
              {user.isAdmin && (
                <Link to="/admin" className="navbar__mobile-link" onClick={() => setMobileMenuOpen(false)}>Admin Dashboard</Link>
              )}
              <Link to="/become-a-host" className="navbar__mobile-link" onClick={() => setMobileMenuOpen(false)}>Become a Host</Link>
              <button className="navbar__mobile-link navbar__mobile-link--logout" onClick={handleLogout}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar__mobile-link" onClick={() => setMobileMenuOpen(false)}>Sign in</Link>
              <Link to="/register" className="navbar__mobile-link navbar__mobile-link--signup" onClick={() => setMobileMenuOpen(false)}>Sign up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;