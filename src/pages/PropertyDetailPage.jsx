import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getPropertyById, getProperties } from '../services/api';
import BookingWidget from '../components/booking/BookingWidget';
import PropertyCard from '../components/property/PropertyCard';
import ReviewSection from '../components/property/ReviewSection';
import { formatKES } from '../data/properties';
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

  const getWhatsAppLink = () => {
    if (!p.host_phone) return null;
    let phone = p.host_phone.replace(/[^0-9+]/g, '');
    if (phone.startsWith('0')) phone = '254' + phone.slice(1);
    if (phone.startsWith('+')) phone = phone.slice(1);
    const message = `Hi! I'm interested in "${p.title}" in ${p.location} on StayNest. Is it available?`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const whatsappLink = getWhatsAppLink();

  return (
    <div className="detail-page">
      <SEO
        title={`${p.title} - ${p.location}`}
        description={`${p.highlight ? p.highlight + '. ' : ''}${p.beds} beds, ${p.baths} baths, sleeps up to ${p.guests} guests. From ${formatKES(p.price)}/night. ${p.description ? p.description.slice(0, 100) : ''}`}
        image={p.images?.[0]}
      />

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

          {p.host_first_name && (
            <div className="detail-host">
              <div className="detail-host__info">
                <div className="detail-host__avatar">
                  {p.host_first_name?.charAt(0)}{p.host_last_name?.charAt(0)}
                </div>
                <div>
                  <p className="detail-host__label">Hosted by</p>
                  <p className="detail-host__name">{p.host_first_name} {p.host_last_name}</p>
                </div>
              </div>
              {whatsappLink && (
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="detail-host__whatsapp">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.15.345-.388.515-.583.169-.195.224-.335.336-.557.112-.222.022-.345-.024-.484-.048-.139-.587-1.413-.805-1.937-.218-.524-.444-.453-.61-.461-.16-.008-.343-.008-.526-.008-.183 0-.479.069-.73.343-.25.275-.957.937-.957 2.282 0 1.346.984 2.646 1.121 2.83.137.183 1.913 2.91 4.637 3.965 2.724 1.054 2.724.703 3.215.659.49-.044 1.586-.65 1.808-1.277.224-.628.224-1.166.157-1.277-.067-.111-.247-.177-.518-.31z"/>
                    <path d="M12.04 0C5.396 0 0 5.396 0 12.04c0 2.124.555 4.118 1.527 5.85L0 24l6.305-1.654a11.92 11.92 0 005.735 1.466h.005c6.644 0 12.04-5.396 12.04-12.04C24.085 5.396 18.69 0 12.04 0zm0 21.866a9.78 9.78 0 01-4.998-1.366l-.358-.213-3.74.98.998-3.646-.234-.374a9.785 9.785 0 01-1.5-5.207c0-5.405 4.398-9.803 9.835-9.803 5.405 0 9.803 4.398 9.803 9.803 0 5.437-4.398 9.826-9.806 9.826z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              )}
            </div>
          )}

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