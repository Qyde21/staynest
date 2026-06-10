import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPropertyById, getProperties } from '../services/api';
import BookingWidget from '../components/booking/BookingWidget';
import PropertyCard from '../components/property/PropertyCard';
import ReviewSection from '../components/property/ReviewSection';
import './PropertyDetailPage.css';

function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [activeImg, setActiveImg] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      const data = await getPropertyById(id);
      setProperty(data);
      if (data?.category) {
        const similarData = await getProperties({ category: data.category });
        setSimilar(similarData.filter((p) => p.id !== data.id).slice(0, 3));
      }
      setLoading(false);
    };
    fetchProperty();
  }, [id]);

  if (loading) return <div className="detail-not-found container">Loading...</div>;

  if (!property) {
    return (
      <div className="detail-not-found container">
        <h2>Property not found</h2>
        <Link to="/listings">← Back to listings</Link>
      </div>
    );
  }

  const p = {
    ...property,
    price: property.price_per_night,
    guests: property.max_guests,
    reviews: property.review_count,
  };

  return (
    <div className="detail-page">
      <div className="detail-gallery container">
        <div className="detail-gallery__main">
          <img src={p.images[activeImg]} alt={p.title} />
        </div>
        <div className="detail-gallery__thumbs">
          {p.images.map((img, i) => (
            <img key={i} src={img} alt={`View ${i + 1}`}
              className={i === activeImg ? 'active' : ''}
              onClick={() => setActiveImg(i)} />
          ))}
        </div>
      </div>

      <div className="detail-content container">
        <div className="detail-main">
          <div className="detail-header">
            <div>
              <p className="detail-location">{p.location}</p>
              <h1 className="detail-title">{p.title}</h1>
              <div className="detail-meta">
                <span>★ {p.rating}</span>
                <span>·</span>
                <span>{p.reviews} reviews</span>
                <span>·</span>
                <span>{p.beds} beds</span>
                <span>·</span>
                <span>{p.baths} baths</span>
                <span>·</span>
                <span>Up to {p.guests} guests</span>
              </div>
            </div>
          </div>

          {p.description && (
            <div className="detail-section">
              <h2>About this place</h2>
              <p>{p.description}</p>
            </div>
          )}

          <div className="detail-section">
            <h2>What's included</h2>
            <div className="detail-amenities">
              {p.amenities?.map((a) => (
                <div key={a} className="detail-amenity">
                  <span className="detail-amenity__check">✓</span>
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </div>

          <ReviewSection propertyId={p.id} />
        </div>

        <aside className="detail-sidebar">
          <BookingWidget property={p} />
        </aside>
      </div>

      {similar.length > 0 && (
        <div className="detail-similar container">
          <h2 className="section-title">More like this</h2>
          <div className="detail-similar__grid">
            {similar.map((s) => (
              <PropertyCard key={s.id} property={{
                ...s,
                price: s.price_per_night,
                guests: s.max_guests,
                reviews: s.review_count,
              }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyDetailPage;