import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

function SearchBar({ variant = 'hero' }) {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (checkin) params.set('checkin', checkin);
    if (checkout) params.set('checkout', checkout);
    params.set('guests', guests);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div className={`search-bar search-bar--${variant}`}>
      <div className="search-bar__field">
        <label>Where</label>
        <input
          type="text"
          placeholder="Nairobi, Diani, Maasai Mara..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="search-bar__divider" />
      <div className="search-bar__field">
        <label>Check in</label>
        <input
          type="date"
          value={checkin}
          onChange={(e) => setCheckin(e.target.value)}
        />
      </div>
      <div className="search-bar__divider" />
      <div className="search-bar__field">
        <label>Check out</label>
        <input
          type="date"
          value={checkout}
          onChange={(e) => setCheckout(e.target.value)}
        />
      </div>
      <div className="search-bar__divider" />
      <div className="search-bar__field">
        <label>Guests</label>
        <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
          {[1,2,3,4,5,6,7,8].map(n => (
            <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>
      <button className="search-bar__btn" onClick={handleSearch}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
