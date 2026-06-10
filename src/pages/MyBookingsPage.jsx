import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMyBookings } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { formatKES } from '../data/properties';
import './MyBookingsPage.css';

function MyBookingsPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    const fetchBookings = async () => {
      const data = await getMyBookings(token);
      setBookings(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    fetchBookings();
  }, [user, token, navigate]);

  const getStatusColor = (status) => {
    if (status === 'paid') return 'status--paid';
    if (status === 'cancelled') return 'status--cancelled';
    return 'status--confirmed';
  };

  if (loading) return (
    <div className="my-bookings-page">
      <div className="container">
        <p className="my-bookings__loading">Loading your bookings...</p>
      </div>
    </div>
  );

  return (
    <div className="my-bookings-page">
      <div className="my-bookings__inner container">
        <div className="my-bookings__header">
          <h1 className="my-bookings__title">My Bookings</h1>
          <p className="my-bookings__subtitle">
            {bookings.length} booking{bookings.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="my-bookings__empty">
            <span className="my-bookings__empty-icon">🏡</span>
            <h2>No bookings yet</h2>
            <p>You haven't made any bookings yet. Start exploring Kenya's finest stays!</p>
            <Link to="/listings" className="my-bookings__explore-btn">Explore stays</Link>
          </div>
        ) : (
          <div className="my-bookings__list">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-item">
                <div className="booking-item__img">
                  <img
                    src={booking.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80'}
                    alt={booking.title}
                  />
                </div>
                <div className="booking-item__body">
                  <div className="booking-item__top">
                    <div>
                      <p className="booking-item__location">{booking.location}</p>
                      <h3 className="booking-item__title">{booking.title}</h3>
                    </div>
                    <span className={`booking-item__status ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="booking-item__details">
                    <div className="booking-item__detail">
                      <span>Check-in</span>
                      <strong>{new Date(booking.checkin_date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
                    </div>
                    <div className="booking-item__detail">
                      <span>Check-out</span>
                      <strong>{new Date(booking.checkout_date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
                    </div>
                    <div className="booking-item__detail">
                      <span>Guests</span>
                      <strong>{booking.guests}</strong>
                    </div>
                    <div className="booking-item__detail">
                      <span>Nights</span>
                      <strong>{booking.nights}</strong>
                    </div>
                  </div>

                  <div className="booking-item__footer">
                    <div className="booking-item__ref">
                      Ref: <strong>{booking.booking_ref}</strong>
                    </div>
                    <div className="booking-item__total">
                      {formatKES(booking.total_amount)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookingsPage;