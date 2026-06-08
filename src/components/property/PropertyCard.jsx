import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatKES } from '../../data/properties';
import './PropertyCard.css';

function PropertyCard({ property }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [saved, setSaved] = useState(false);

  return (
    <div className="property-card">
      <div className="property-card__image-wrap">
        <Link to={`/property/${property.id}`}>
          <img
            src={property.images[imgIndex]}
            alt={property.title}
            className="property-card__image"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'; }}
          />
        </Link>

        {property.highlight && (
          <span className="property-card__badge">{property.highlight}</span>
        )}

        <button
          className={`property-card__save ${saved ? 'saved' : ''}`}
          onClick={() => setSaved(!saved)}
          aria-label="Save property"
        >
          {saved ? '♥' : '♡'}
        </button>

        {property.images.length > 1 && (
          <div className="property-card__dots">
            {property.images.map((_, i) => (
              <button
                key={i}
                className={`property-card__dot ${i === imgIndex ? 'active' : ''}`}
                onClick={() => setImgIndex(i)}
              />
            ))}
          </div>
        )}
      </div>

      <Link to={`/property/${property.id}`} className="property-card__body">
        <div className="property-card__top">
          <p className="property-card__location">{property.location}</p>
          <div className="property-card__rating">
            <span>★</span> {property.rating}
          </div>
        </div>
        <h3 className="property-card__title">{property.title}</h3>
        <p className="property-card__meta">
          {property.beds} beds · {property.baths} baths · {property.guests} guests
        </p>
        <div className="property-card__price">
          <span className="property-card__amount">{formatKES(property.price)}</span>
          <span className="property-card__per"> / night</span>
        </div>
      </Link>
    </div>
  );
}

export default PropertyCard;
