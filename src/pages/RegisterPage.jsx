import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

function RegisterPage() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError('Please fill in all required fields'); return;
    }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    setError('');
    try {
      const data = await register(form);
      if (data.error) { setError(data.error); }
      else { loginUser(data.user, data.token); navigate('/'); }
    } catch (err) { setError('Something went wrong. Please try again.'); }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-logo">
          <span className="auth-logo__mark">S</span>
          <span className="auth-logo__text">StayNest</span>
        </Link>
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Join StayNest and discover Kenya's finest stays</p>
        {error && <div className="auth-error">{error}</div>}
        <div className="auth-form">
          <div className="auth-row">
            <div className="auth-field">
              <label>First name *</label>
              <input value={form.firstName} onChange={(e) => update('firstName', e.target.value)} placeholder="Wanjiku" />
            </div>
            <div className="auth-field">
              <label>Last name *</label>
              <input value={form.lastName} onChange={(e) => update('lastName', e.target.value)} placeholder="Kamau" />
            </div>
          </div>
          <div className="auth-field">
            <label>Email address *</label>
            <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="wanjiku@email.com" />
          </div>
          <div className="auth-field">
            <label>Phone number</label>
            <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+254 700 000 000" />
          </div>
          <div className="auth-field">
            <label>Password *</label>
            <input type="password" value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="At least 6 characters" />
          </div>
          <div className="auth-field">
            <label>Confirm password *</label>
            <input type="password" value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} placeholder="••••••••" onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} />
          </div>
          <button className="auth-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </div>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;