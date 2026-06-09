import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from || '/';
  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async () => {
    if (!form.email || !form.password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    setError('');
    try {
      const data = await login(form);
      if (data.error) { setError(data.error); }
      else { loginUser(data.user, data.token); navigate(from, { replace: true }); }
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
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Sign in to your StayNest account</p>
        {error && <div className="auth-error">{error}</div>}
        <div className="auth-form">
          <div className="auth-field">
            <label>Email address</label>
            <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="wanjiku@email.com" onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input type="password" value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="••••••••" onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} />
          </div>
          <button className="auth-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
        <p className="auth-switch">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;