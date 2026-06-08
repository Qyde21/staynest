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
            Discover Kenya's most beautiful stays - from the coast to the savannah.
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
            <button>Become a Host</button>
            <button>Host Resources</button>
            <button>Responsible Hosting</button>
          </div>
          <div className="footer__col">
            <h4>Support</h4>
            <button>Help Centre</button>
            <button>Cancellation Policy</button>
            <button>Safety</button>
            <button>Contact Us</button>
          </div>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>&copy; {new Date().getFullYear()} StayNest Kenya. All rights reserved.</p>
        <div className="footer__bottom-links">
          <button>Privacy</button>
          <button>Terms</button>
          <button>Sitemap</button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;