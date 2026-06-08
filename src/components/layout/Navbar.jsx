import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        </div>

        <div className="navbar__actions">
          <button className="navbar__host-btn">Become a Host</button>
          <button
            className="navbar__menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
