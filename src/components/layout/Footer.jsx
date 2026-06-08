import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-mark">S</span>
            <span className="footer__logo-text">StayNest</span>
          </div>
          <p className="footer__tagline">
            Discover Kenya's most beautiful stays — from the coast to the savannah.
          </p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4>Explore</h4>
            <Link to="/listings">All Stays</Link>
            <Link to="/listings?category=beach">Beach Stays</Link>
            <Link to="/listings?category=safari">Safari Camps</Link>
            <Link to="/listings?category=mountain">Mountain Retreats</Link>
          </div>
          <div className="footer__col">
            <h4>Hosting</h4>
            <a href="#">Become a Host</a>
            <a href="#">Host Resources</a>
            <a href="#">Responsible Hosting</a>
          </div>
          <div className="footer__col">
            <h4>Support</h4>
            <a href="#">Help Centre</a>
            <a href="#">Cancellation Policy</a>
            <a href="#">Safety</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>© {new Date().getFullYear()} StayNest Kenya. All rights reserved.</p>
        <div className="footer__bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
