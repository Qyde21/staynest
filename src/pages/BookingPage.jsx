import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatKES } from '../data/properties';
import { createBooking } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './BookingPage.css';

function BookingPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    paymentMethod: 'mpesa', mpesaNumber: '', cardNumber: '',
    cardExpiry: '', cardCVC: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!state) {
    navigate('/listings');
    return null;
  }

  const { property, checkin, checkout, guests, nights, total } = state;
  const serviceFee = Math.round(nights * property.price * 0.12);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleConfirm = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await createBooking({
        propertyId: property.id,
        checkinDate: checkin,
        checkoutDate: checkout,
        guests,
        paymentMethod: form.paymentMethod,
      }, token);

      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      navigate('/confirm', { state: { ...state, form, booking: data.booking } });
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="booking-page">
      <div className="booking-page__inner container">
        <div className="booking-page__main">
          {/* Steps */}
          <div className="booking-steps">
            {['Your details', 'Payment', 'Review'].map((label, i) => (
              <div key={label} className={`booking-step ${step === i + 1 ? 'active' : ''} ${step > i + 1 ? 'done' : ''}`}>
                <div className="booking-step__num">{step > i + 1 ? '✓' : i + 1}</div>
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="booking-form fade-up">
              <h2>Your details</h2>
              <div className="booking-form__row">
                <div className="booking-form__field">
                  <label>First name</label>
                  <input value={form.firstName} onChange={(e) => update('firstName', e.target.value)} placeholder="Wanjiku" />
                </div>
                <div className="booking-form__field">
                  <label>Last name</label>
                  <input value={form.lastName} onChange={(e) => update('lastName', e.target.value)} placeholder="Kamau" />
                </div>
              </div>
              <div className="booking-form__field">
                <label>Email address</label>
                <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="wanjiku@email.com" />
              </div>
              <div className="booking-form__field">
                <label>Phone number</label>
                <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+254 700 000 000" />
              </div>
              <button
                className="booking-form__next"
                onClick={() => setStep(2)}
                disabled={!form.firstName || !form.lastName || !form.email}
              >
                Continue to payment →
              </button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="booking-form fade-up">
              <h2>Payment</h2>
              <div className="booking-payment-tabs">
                <button
                  className={form.paymentMethod === 'mpesa' ? 'active' : ''}
                  onClick={() => update('paymentMethod', 'mpesa')}
                >
                  📱 M-Pesa
                </button>
                <button
                  className={form.paymentMethod === 'card' ? 'active' : ''}
                  onClick={() => update('paymentMethod', 'card')}
                >
                  💳 Card
                </button>
              </div>

              {form.paymentMethod === 'mpesa' ? (
                <div className="booking-form__field">
                  <label>M-Pesa number</label>
                  <input
                    type="tel"
                    value={form.mpesaNumber}
                    onChange={(e) => update('mpesaNumber', e.target.value)}
                    placeholder="0712 345 678"
                  />
                  <p className="booking-form__hint">You'll receive an STK push to complete payment.</p>
                </div>
              ) : (
                <>
                  <div className="booking-form__field">
                    <label>Card number</label>
                    <input
                      value={form.cardNumber}
                      onChange={(e) => update('cardNumber', e.target.value)}
                      placeholder="4242 4242 4242 4242"
                      maxLength="19"
                    />
                  </div>
                  <div className="booking-form__row">
                    <div className="booking-form__field">
                      <label>Expiry</label>
                      <input value={form.cardExpiry} onChange={(e) => update('cardExpiry', e.target.value)} placeholder="MM/YY" />
                    </div>
                    <div className="booking-form__field">
                      <label>CVC</label>
                      <input value={form.cardCVC} onChange={(e) => update('cardCVC', e.target.value)} placeholder="123" maxLength="4" />
                    </div>
                  </div>
                </>
              )}

              <div className="booking-form__actions">
                <button className="booking-form__back" onClick={() => setStep(1)}>← Back</button>
                <button className="booking-form__next" onClick={() => setStep(3)}>Review booking →</button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="booking-form fade-up">
              <h2>Review & confirm</h2>
              <div className="booking-review">
                <div className="booking-review__row"><span>Guest</span><span>{form.firstName} {form.lastName}</span></div>
                <div className="booking-review__row"><span>Email</span><span>{form.email}</span></div>
                <div className="booking-review__row"><span>Phone</span><span>{form.phone}</span></div>
                <div className="booking-review__row"><span>Check-in</span><span>{checkin}</span></div>
                <div className="booking-review__row"><span>Check-out</span><span>{checkout}</span></div>
                <div className="booking-review__row"><span>Guests</span><span>{guests}</span></div>
                <div className="booking-review__row"><span>Nights</span><span>{nights}</span></div>
                <div className="booking-review__row"><span>Payment</span><span>{form.paymentMethod === 'mpesa' ? `M-Pesa (${form.mpesaNumber})` : 'Card'}</span></div>
                <div className="booking-review__row booking-review__row--total"><span>Total</span><span>{formatKES(total)}</span></div>
              </div>
              {error && <div style={{ color: '#dc2626', fontSize: '0.88rem', margin: '12px 0' }}>{error}</div>}
              <p className="booking-form__legal">
                By confirming, you agree to StayNest's <span>Terms of Service</span> and <span>Cancellation Policy</span>.
              </p>
              <div className="booking-form__actions">
                <button className="booking-form__back" onClick={() => setStep(2)}>← Back</button>
                <button className="booking-form__confirm" onClick={handleConfirm} disabled={loading}>
                  {loading ? 'Confirming...' : `Confirm & Pay ${formatKES(total)}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <aside className="booking-summary">
          <div className="booking-summary__img">
            <img src={property.images[0]} alt={property.title} />
          </div>
          <div className="booking-summary__body">
            <p className="booking-summary__location">{property.location}</p>
            <h3 className="booking-summary__title">{property.title}</h3>
            <div className="booking-summary__rating">★ {property.rating} · {property.reviews} reviews</div>
            <hr />
            <div className="booking-summary__lines">
              <div><span>{formatKES(property.price)} × {nights} nights</span><span>{formatKES(nights * property.price)}</span></div>
              <div><span>Service fee</span><span>{formatKES(serviceFee)}</span></div>
              <div className="booking-summary__total"><span>Total</span><span>{formatKES(total)}</span></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default BookingPage;