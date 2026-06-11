import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './StaticPages.css';

function BecomeHostPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    propertyName: '', propertyType: 'beach', location: '',
    description: '', phone: ''
  });

  const handleSubmit = () => {
    if (!user) { navigate('/register'); return; }
    setSubmitted(true);
  };

  if (submitted) return (
    <div className="static-page">
      <div className="static-page__inner container">
        <div className="host-success">
          <div className="host-success__icon">🏡</div>
          <h1>Application Received!</h1>
          <p>Thank you for your interest in hosting on StayNest. Our team will review your application and get back to you within 2-3 business days.</p>
          <button onClick={() => navigate('/')} className="static-btn">Back to Home</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="static-page">
      <div className="static-page__inner container">
        <div className="static-hero">
          <h1>Become a StayNest Host</h1>
          <p>Share your space, earn extra income, and connect travellers with Kenya's most beautiful places.</p>
        </div>

        <div className="host-benefits">
          {[
            { icon: '💰', title: 'Earn Extra Income', text: 'Set your own price and earn money from your property when you are not using it.' },
            { icon: '🛡️', title: 'Host Protection', text: 'Every booking is covered by our host guarantee and 24/7 support team.' },
            { icon: '📱', title: 'Easy Management', text: 'Manage bookings, communicate with guests, and track earnings from your dashboard.' },
          ].map((b) => (
            <div key={b.title} className="host-benefit">
              <span>{b.icon}</span>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </div>
          ))}
        </div>

        <div className="host-form">
          <h2>Tell us about your property</h2>
          <div className="host-form__field">
            <label>Property name</label>
            <input value={form.propertyName} onChange={(e) => setForm({...form, propertyName: e.target.value})} placeholder="Diani Beach Villa" />
          </div>
          <div className="host-form__field">
            <label>Property type</label>
            <select value={form.propertyType} onChange={(e) => setForm({...form, propertyType: e.target.value})}>
              <option value="beach">Beach</option>
              <option value="safari">Safari</option>
              <option value="mountain">Mountain</option>
              <option value="city">City</option>
              <option value="lakeside">Lakeside</option>
              <option value="farm">Farm Stay</option>
            </select>
          </div>
          <div className="host-form__field">
            <label>Location</label>
            <input value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} placeholder="Diani Beach, Kwale County" />
          </div>
          <div className="host-form__field">
            <label>Description</label>
            <textarea rows={4} value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} placeholder="Tell us about your property..." />
          </div>
          <div className="host-form__field">
            <label>Phone number</label>
            <input value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} placeholder="+254 700 000 000" />
          </div>
          <button className="static-btn" onClick={handleSubmit}>
            {user ? 'Submit Application' : 'Sign up to Apply'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BecomeHostPage;