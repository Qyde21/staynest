import React, { useState } from 'react';
import './StaticPages.css';

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  if (submitted) return (
    <div className="static-page">
      <div className="static-page__inner container">
        <div className="host-success">
          <div className="host-success__icon">✉️</div>
          <h1>Message Sent!</h1>
          <p>Thank you for reaching out. Our support team will get back to you within 24 hours.</p>
          <button onClick={() => setSubmitted(false)} className="static-btn">Send Another</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="static-page">
      <div className="static-page__inner container">
        <div className="static-hero">
          <h1>Contact Us</h1>
          <p>Have a question or need help? We would love to hear from you.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-info__item">
              <span>📧</span>
              <div>
                <h3>Email</h3>
                <p>support@staynest.co.ke</p>
              </div>
            </div>
            <div className="contact-info__item">
              <span>📱</span>
              <div>
                <h3>Phone</h3>
                <p>+254 700 000 000</p>
              </div>
            </div>
            <div className="contact-info__item">
              <span>📍</span>
              <div>
                <h3>Office</h3>
                <p>Westlands, Nairobi, Kenya</p>
              </div>
            </div>
            <div className="contact-info__item">
              <span>🕐</span>
              <div>
                <h3>Hours</h3>
                <p>Mon - Fri, 8am - 6pm EAT</p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <div className="host-form__field">
              <label>Your name</label>
              <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Wanjiku Kamau" />
            </div>
            <div className="host-form__field">
              <label>Email address</label>
              <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="wanjiku@email.com" />
            </div>
            <div className="host-form__field">
              <label>Subject</label>
              <input value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} placeholder="Booking inquiry" />
            </div>
            <div className="host-form__field">
              <label>Message</label>
              <textarea rows={5} value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} placeholder="How can we help you?" />
            </div>
            <button className="static-btn" onClick={handleSubmit}>Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;