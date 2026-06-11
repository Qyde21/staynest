import React, { useState } from 'react';
import './StaticPages.css';

const FAQS = [
  {
    category: 'Bookings',
    questions: [
      { q: 'How do I make a booking?', a: 'Browse our listings, select your property, choose your dates and number of guests, then click Reserve. Follow the booking steps and confirm payment via M-Pesa or card.' },
      { q: 'Can I cancel my booking?', a: 'Yes. Go to My Bookings in your profile dropdown and cancel from there. Cancellations made 48 hours before check-in receive a full refund. Later cancellations may incur a fee.' },
      { q: 'How do I get my booking confirmation?', a: 'After confirming payment, you will receive a booking reference number on screen. A confirmation is also sent to your registered email address.' },
    ]
  },
  {
    category: 'Payments',
    questions: [
      { q: 'What payment methods are accepted?', a: 'We accept M-Pesa (STK Push), Visa, and Mastercard. All transactions are in Kenyan Shillings (KES).' },
      { q: 'Is my payment secure?', a: 'Yes. M-Pesa payments go through Safaricom\'s secure Daraja API. Card payments are processed through our secure payment gateway with full encryption.' },
      { q: 'When am I charged?', a: 'Payment is collected at the time of booking confirmation. You will not be charged until you confirm the reservation.' },
    ]
  },
  {
    category: 'Hosting',
    questions: [
      { q: 'How do I become a host?', a: 'Click Become a Host in the footer or navigation menu, fill in your property details and submit your application. Our team reviews all applications within 2-3 business days.' },
      { q: 'How much does it cost to list my property?', a: 'Listing on StayNest is completely free. We charge a small service fee on each booking to cover platform costs.' },
      { q: 'How do I receive payments as a host?', a: 'Host payouts are processed via M-Pesa or bank transfer within 24 hours of guest check-in.' },
    ]
  },
];

function HelpPage() {
  const [openItem, setOpenItem] = useState(null);

  return (
    <div className="static-page">
      <div className="static-page__inner container">
        <div className="static-hero">
          <h1>Help Centre</h1>
          <p>Find answers to common questions about StayNest.</p>
        </div>

        <div className="faq-list">
          {FAQS.map((section) => (
            <div key={section.category} className="faq-section">
              <h2>{section.category}</h2>
              {section.questions.map((item, i) => {
                const key = `${section.category}-${i}`;
                return (
                  <div key={key} className={`faq-item ${openItem === key ? 'open' : ''}`}>
                    <button className="faq-question" onClick={() => setOpenItem(openItem === key ? null : key)}>
                      <span>{item.q}</span>
                      <span className="faq-icon">{openItem === key ? '−' : '+'}</span>
                    </button>
                    {openItem === key && <p className="faq-answer">{item.a}</p>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="help-contact">
          <h2>Still need help?</h2>
          <p>Our support team is available Monday to Friday, 8am to 6pm EAT.</p>
          <a href="mailto:support@staynest.co.ke" className="static-btn">Email Support</a>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;