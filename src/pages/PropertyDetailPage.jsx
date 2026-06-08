import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROPERTIES } from '../data/properties';
import BookingWidget from '../components/booking/BookingWidget';
import PropertyCard from '../components/property/PropertyCard';
import './PropertyDetailPage.css';

function PropertyDetailPage() {
  const { id } = useParams();
  const property = PROPERTIES.find((p) => p.id === Number(id));
  const [activeImg, setActiveImg] = useState(0);
  const similar = PROPERTIES.filter((p) => p.id !== property?.id && p.category === property?.category).slice(0, 3);

  if (!property) {
    return (
      <div className="detail-not-found container">
        <h2>Property not found</h2>
        <Link to="/listings">← Back to listings</Link>
      </div>
    );
  }

  return (
    <div className="detail-page">
      {/* Gallery */}
      <div className="detail-gallery container">
        <div className="detail-gallery__main" onClick={() => {}}>
          <img src={property.images[activeImg]} alt={property.title} />
        </div>
        <div className="detail-gallery__thumbs">
          {property.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`View ${i + 1}`}
              className={i === activeImg ? 'active' : ''}
              onClick={() => setActiveImg(i)}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="detail-content container">
        <div className="detail-main">
          {/* Header */}
          <div className="detail-header">
            <div>
              <p className="detail-location">{property.location}</p>
              <h1 className="detail-title">{property.title}</h1>
              <div className="detail-meta">
                <span>★ {property.rating}</span>
                <span>·</span>
                <span>{property.reviews} reviews</span>
                <span>·</span>
                <span>{property.beds} beds</span>
                <span>·</span>
                <span>{property.baths} baths</span>
                <span>·</span>
                <span>Up to {property.guests} guests</span>
              </div>
            </div>
          </div>

          {/* Host */}
          <div className="detail-host">
            <div className="detail-host__avatar">{property.host.avatar}</div>
            <div>
              <p className="detail-host__name">
                Hosted by {property.host.name}
                {property.host.superhost && <span className="detail-host__badge">Superhost</span>}
              </p>
              <p className="detail-host__joined">Member since {property.host.joined}</p>
            </div>
          </div>

          {/* Description */}
          <div className="detail-section">
            <h2>About this place</h2>
            <p>{property.description}</p>
          </div>

          {/* Amenities */}
          <div className="detail-section">
            <h2>What's included</h2>
            <div className="detail-amenities">
              {property.amenities.map((a) => (
                <div key={a} className="detail-amenity">
                  <span className="detail-amenity__check">✓</span>
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Widget */}
        <aside className="detail-sidebar">
          <BookingWidget property={property} />
        </aside>
      </div>

      {/* Similar */}
      {similar.length > 0 && (
        <div className="detail-similar container">
          <h2 className="section-title">More like this</h2>
          <div className="detail-similar__grid">
            {similar.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyDetailPage;
