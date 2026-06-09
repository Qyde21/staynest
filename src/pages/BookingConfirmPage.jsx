import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { formatKES } from '../data/properties';
import './BookingConfirmPage.css';

function BookingConfirmPage() {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="confirm-page container">
        <h2>No booking found.</h2>
        <Link to="/">Go home</Link>
      </div>
    );
  }

  const { property, checkin, checkout, guests, nights, total, form, booking } = state;
  const bookingRef = booking?.booking_ref || `SN-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  return (
    <div className="confirm-page">
      <div className="confirm-page__inner container">
        <div className="confirm-success">
          <div className="confirm-success__icon">✓</div>
          <h1>You're booked!</h1>
          <p>A confirmation has been sent to <strong>{form.email}</strong></p>
          <span className="confirm-ref">Booking ref: {bookingRef}</span>
        </div>

        <div className="confirm-card">
          <div className="confirm-card__img">
            <img src={property.images[0]} alt={property.title} />
          </div>
          <div className="confirm-card__body">
            <p className="confirm-card__location">{property.location}</p>
            <h2 className="confirm-card__title">{property.title}</h2>
            <div className="confirm-card__details">
              <div><span>Check-in</span><strong>{checkin}</strong></div>
              <div><span>Check-out</span><strong>{checkout}</strong></div>
              <div><span>Guests</span><strong>{guests}</strong></div>
              <div><span>Nights</span><strong>{nights}</strong></div>
            </div>
            <div className="confirm-card__total">
              Total paid: <strong>{formatKES(total)}</strong>
            </div>
          </div>
        </div>

        <div className="confirm-actions">
          <Link to="/" className="confirm-home-btn">Back to Home</Link>
          <Link to="/listings" className="confirm-explore-btn">Explore more stays</Link>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmPage;