import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatKES } from '../../data/properties';
import './BookingWidget.css';

function BookingWidget({ property }) {
  const navigate = useNavigate();
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState(1);

  const nights = checkin && checkout
    ? Math.max(0, Math.round((new Date(checkout) - new Date(checkin)) / 86400000))
    : 0;

  const subtotal = nights * property.price;
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + serviceFee;

  const handleBook = () => {
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
          <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} />
        </div>
        <div className="booking-widget__field-divider" />
        <div className="booking-widget__field">
          <label>CHECK-OUT</label>
          <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} />
        </div>
      </div>

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
        disabled={!checkin || !checkout || nights <= 0}
      >
        Reserve
      </button>

      {nights > 0 && (
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

      {!nights && (
        <p className="booking-widget__hint">Select dates to see total price</p>
      )}
    </div>
  );
}

export default BookingWidget;
