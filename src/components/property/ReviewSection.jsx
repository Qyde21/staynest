import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getReviews, createReview } from '../../services/api';
import './ReviewSection.css';

function StarRating({ value, onChange, readonly }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`star ${star <= value ? 'active' : ''}`}
          onClick={() => !readonly && onChange && onChange(star)}
          disabled={readonly}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function ReviewSection({ propertyId }) {
  const { user, token } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getReviews(propertyId);
      setReviews(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    fetchReviews();
  }, [propertyId]);

  const handleSubmit = async () => {
    if (!rating) { setError('Please select a rating'); return; }
    setSubmitting(true);
    setError('');
    try {
      const data = await createReview({ propertyId, rating, comment }, token);
      if (data.error) {
        setError(data.error);
      } else {
        setReviews([data, ...reviews]);
        setShowForm(false);
        setComment('');
        setRating(5);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
    setSubmitting(false);
  };

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2)
    : null;

  return (
    <div className="review-section">
      <div className="review-section__header">
        <h2>
          {avgRating && <span className="review-section__avg">★ {avgRating}</span>}
          Reviews {reviews.length > 0 && <span className="review-section__count">({reviews.length})</span>}
        </h2>
        {user && !showForm && (
          <button className="review-section__write-btn" onClick={() => setShowForm(true)}>
            Write a review
          </button>
        )}
      </div>

      {success && (
        <div className="review-section__success">✓ Your review has been posted!</div>
      )}

      {showForm && (
        <div className="review-form">
          <h3>Your review</h3>
          <div className="review-form__rating">
            <label>Rating</label>
            <StarRating value={rating} onChange={setRating} />
          </div>
          <div className="review-form__field">
            <label>Comment (optional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              rows={4}
            />
          </div>
          {error && <p className="review-form__error">{error}</p>}
          <div className="review-form__actions">
            <button className="review-form__cancel" onClick={() => setShowForm(false)}>Cancel</button>
            <button className="review-form__submit" onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Posting...' : 'Post review'}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="review-section__loading">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <div className="review-section__empty">
          <p>No reviews yet. Be the first to review this property!</p>
        </div>
      ) : (
        <div className="review-section__list">
          {reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="review-item__header">
                <div className="review-item__avatar">
                  {review.reviewer_name?.charAt(0)}
                </div>
                <div>
                  <p className="review-item__name">{review.reviewer_name}</p>
                  <p className="review-item__date">
                    {new Date(review.created_at).toLocaleDateString('en-KE', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <StarRating value={review.rating} readonly />
              </div>
              {review.comment && (
                <p className="review-item__comment">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewSection;