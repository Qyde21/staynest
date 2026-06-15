import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const isHome = location.pathname === '/';
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled || !isHome ? 'navbar--solid' : 'navbar--transparent'}`}>
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
                <span className="navbar__chevron">{dropdownOpen ? '▲' : '▼'}</span>
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
            <>
              <Link to="/login" className="navbar__login-btn">Sign in</Link>
              <Link to="/register" className="navbar__register-btn">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;