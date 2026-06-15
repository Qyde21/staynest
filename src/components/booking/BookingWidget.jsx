import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatKES } from '../../data/properties';
import { useAuth } from '../../context/AuthContext';
import { getPropertyAvailability } from '../../services/api';
import './BookingWidget.css';

function BookingWidget({ property }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState(1);
  const [bookedDates, setBookedDates] = useState([]);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const fetchAvailability = async () => {
      const data = await getPropertyAvailability(property.id);
      if (Array.isArray(data)) setBookedDates(data);
    };
    fetchAvailability();
  }, [property.id]);

  const isDateRangeAvailable = (checkinDate, checkoutDate) => {
    if (!checkinDate || !checkoutDate) return true;
    const start = new Date(checkinDate);
    const end = new Date(checkoutDate);
    return !bookedDates.some((booking) => {
      const bookedStart = new Date(booking.checkin_date);
      const bookedEnd = new Date(booking.checkout_date);
      return start < bookedEnd && end > bookedStart;
    });
  };

  const handleCheckinChange = (val) => {
    setCheckin(val);
    if (checkout) {
      setUnavailable(!isDateRangeAvailable(val, checkout));
    }
  };

  const handleCheckoutChange = (val) => {
    setCheckout(val);
    if (checkin) {
      setUnavailable(!isDateRangeAvailable(checkin, val));
    }
  };

  const nights = checkin && checkout
    ? Math.max(0, Math.round((new Date(checkout) - new Date(checkin)) / 86400000))
    : 0;

  const subtotal = nights * property.price;
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + serviceFee;
  const today = new Date().toISOString().split('T')[0];

  const handleBook = () => {
    if (!user) {
      navigate('/login', { state: { from: `/property/${property.id}` } });
      return;
    }
    navigate(`/book/${property.id}`, {
      state: { property, checkin, checkout, guests, nights, total }
    });
  };

  return (
    <div className="booking-widget">
      <div className="booking-widget__price">
        <span className="booking-widget__amount">{formatKES(property.price)}</span>
        <span className="booking-widget__per"> / night</span>
      </div>
      <div className="booking-widget__rating">
        <span>★ {property.rating}</span>
        <span className="booking-widget__reviews">({property.reviews} reviews)</span>
      </div>

      <div className="booking-widget__dates">
        <div className="booking-widget__field">
          <label>CHECK-IN</label>
          <input
            type="date"
            value={checkin}
            min={today}
            onChange={(e) => handleCheckinChange(e.target.value)}
          />
        </div>
        <div className="booking-widget__field-divider" />
        <div className="booking-widget__field">
          <label>CHECK-OUT</label>
          <input
            type="date"
            value={checkout}
            min={checkin || today}
            onChange={(e) => handleCheckoutChange(e.target.value)}
          />
        </div>
      </div>

      {unavailable && (
        <div className="booking-widget__unavailable">
          These dates are not available. Please choose different dates.
        </div>
      )}

      <div className="booking-widget__guests">
        <label>GUESTS</label>
        <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
          {Array.from({ length: property.guests }, (_, i) => i + 1).map(n => (
            <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      <button
        className="booking-widget__btn"
        onClick={handleBook}
        disabled={!checkin || !checkout || nights <= 0 || unavailable}
      >
        {user ? 'Reserve' : 'Sign in to Reserve'}
      </button>

      {nights > 0 && !unavailable && (
        <div className="booking-widget__breakdown">
          <div className="booking-widget__line">
            <span>{formatKES(property.price)} × {nights} nights</span>
            <span>{formatKES(subtotal)}</span>
          </div>
          <div className="booking-widget__line">
            <span>Service fee</span>
            <span>{formatKES(serviceFee)}</span>
          </div>
          <div className="booking-widget__line booking-widget__line--total">
            <span>Total</span>
            <span>{formatKES(total)}</span>
          </div>
        </div>
      )}

      {!nights && !unavailable && (
        <p className="booking-widget__hint">Select dates to see total price</p>
      )}

      {bookedDates.length > 0 && (
        <div className="booking-widget__booked">
          <p>Booked periods:</p>
          {bookedDates.map((b, i) => (
            <span key={i} className="booking-widget__booked-date">
              {new Date(b.checkin_date).toLocaleDateString('en-KE')} - {new Date(b.checkout_date).toLocaleDateString('en-KE')}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingWidget;