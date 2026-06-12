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
            <Link to="/become-a-host">Become a Host</Link>
            <Link to="/help">Host Resources</Link>
            <Link to="/safety">Responsible Hosting</Link>
          </div>
          <div className="footer__col">
            <h4>Support</h4>
            <Link to="/help">Help Centre</Link>
            <Link to="/cancellation-policy">Cancellation Policy</Link>
            <Link to="/safety">Safety</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>&copy; {new Date().getFullYear()} StayNest Kenya. All rights reserved.</p>
        <div className="footer__bottom-links">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;