import React from 'react';
import './StaticPages.css';

export function PrivacyPage() {
  return (
    <div className="static-page">
      <div className="static-page__inner container">
        <div className="static-hero">
          <h1>Privacy Policy</h1>
          <p>Last updated: June 2026</p>
        </div>
        <div className="policy-content">
          <h2>Information We Collect</h2>
          <p>We collect information you provide when creating an account, making a booking, or contacting us. This includes your name, email address, phone number, and payment details.</p>

          <h2>How We Use Your Information</h2>
          <p>We use your information to process bookings, communicate with you about your reservations, improve our services, and send you relevant updates. We never sell your personal data to third parties.</p>

          <h2>Payment Information</h2>
          <p>Payment details are processed securely through Safaricom Daraja (M-Pesa) and our card payment provider. StayNest does not store your full payment details on our servers.</p>

          <h2>Cookies</h2>
          <p>We use cookies to keep you logged in and improve your browsing experience. You can disable cookies in your browser settings, though this may affect some features.</p>

          <h2>Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data at any time. Contact us at privacy@staynest.co.ke to make a request.</p>

          <h2>Contact</h2>
          <p>For privacy-related inquiries, email us at privacy@staynest.co.ke</p>
        </div>
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="static-page">
      <div className="static-page__inner container">
        <div className="static-hero">
          <h1>Terms of Service</h1>
          <p>Last updated: June 2026</p>
        </div>
        <div className="policy-content">
          <h2>Acceptance of Terms</h2>
          <p>By using StayNest, you agree to these terms. If you do not agree, please do not use our platform.</p>

          <h2>User Accounts</h2>
          <p>You must create an account to make bookings. You are responsible for maintaining the security of your account and all activity that occurs under it.</p>

          <h2>Bookings</h2>
          <p>All bookings are subject to availability and host approval. Prices are displayed in Kenyan Shillings (KES) and include all applicable fees.</p>

          <h2>Host Responsibilities</h2>
          <p>Hosts must ensure their listings are accurate, safe, and comply with local laws. StayNest reserves the right to remove listings that violate our standards.</p>

          <h2>Guest Responsibilities</h2>
          <p>Guests must treat properties with respect, follow house rules, and not exceed the stated maximum occupancy.</p>

          <h2>Liability</h2>
          <p>StayNest acts as a platform connecting hosts and guests. We are not liable for disputes between hosts and guests, though we will assist in mediation where possible.</p>

          <h2>Contact</h2>
          <p>For legal inquiries, email us at legal@staynest.co.ke</p>
        </div>
      </div>
    </div>
  );
}

export function CancellationPage() {
  return (
    <div className="static-page">
      <div className="static-page__inner container">
        <div className="static-hero">
          <h1>Cancellation Policy</h1>
          <p>Clear and fair cancellation terms for guests and hosts.</p>
        </div>
        <div className="policy-content">
          <div className="policy-cards">
            <div className="policy-card policy-card--green">
              <h3>Full Refund</h3>
              <p>Cancel 48+ hours before check-in and receive a 100% refund of the total booking amount.</p>
            </div>
            <div className="policy-card policy-card--yellow">
              <h3>Partial Refund</h3>
              <p>Cancel 24-48 hours before check-in and receive a 50% refund of the total booking amount.</p>
            </div>
            <div className="policy-card policy-card--red">
              <h3>No Refund</h3>
              <p>Cancellations made less than 24 hours before check-in are not eligible for a refund.</p>
            </div>
          </div>

          <h2>How to Cancel</h2>
          <p>Go to My Bookings in your profile, find the booking you wish to cancel, and click the Cancel button. Refunds are processed within 5-7 business days.</p>

          <h2>Host Cancellations</h2>
          <p>If a host cancels your booking, you will receive a full refund automatically. We take host cancellations seriously and may suspend hosts who cancel frequently.</p>

          <h2>Contact</h2>
          <p>For cancellation assistance, email support@staynest.co.ke</p>
        </div>
      </div>
    </div>
  );
}

export function SafetyPage() {
  return (
    <div className="static-page">
      <div className="static-page__inner container">
        <div className="static-hero">
          <h1>Safety at StayNest</h1>
          <p>Your safety is our top priority.</p>
        </div>
        <div className="policy-content">
          <div className="safety-tips">
            {[
              { icon: '✅', title: 'Verified Listings', text: 'All properties on StayNest are reviewed and verified by our team before going live.' },
              { icon: '🔐', title: 'Secure Payments', text: 'All payments are processed through secure, encrypted channels. Never pay outside the platform.' },
              { icon: '📞', title: '24/7 Support', text: 'Our support team is available around the clock for emergencies during your stay.' },
              { icon: '⭐', title: 'Guest Reviews', text: 'Read genuine reviews from past guests before booking to make informed decisions.' },
              { icon: '🆔', title: 'Identity Verification', text: 'All hosts and guests are required to verify their identity when registering.' },
              { icon: '🚨', title: 'Emergency Contacts', text: 'Keep local emergency contacts saved: Police 999, Ambulance 0800 723 000.' },
            ].map((tip) => (
              <div key={tip.title} className="safety-tip">
                <span>{tip.icon}</span>
                <div>
                  <h3>{tip.title}</h3>
                  <p>{tip.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}