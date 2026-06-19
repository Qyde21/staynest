import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SearchBar from '../components/ui/SearchBar';
import PropertyCard from '../components/property/PropertyCard';
import { PROPERTIES } from '../data/properties';
import './HomePage.css';

const FEATURED = PROPERTIES.slice(0, 4);
const REGIONS = [
  { name: 'Nairobi', tag: 'city', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80', desc: '20+ stays' },
  { name: 'Diani Beach', tag: 'beach', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', desc: '15+ stays' },
  { name: 'Maasai Mara', tag: 'safari', img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80', desc: '12+ stays' },
  { name: 'Lake Naivasha', tag: 'lakeside', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80', desc: '8+ stays' },
];

function HomePage() {
  return (
    <div className="home">
      <SEO />

      {/* Hero */}
      <section className="hero">
        <div className="hero__bg">
          <img src="https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=1400&q=80" alt="Kenya landscape" />
          <div className="hero__overlay" />
        </div>
        <div className="hero__content container">
          <h1 className="hero__title">
            Find your perfect
            <em> Kenya escape</em>
          </h1>
          <p className="hero__subtitle">
            From Diani's white sands to the Mara at dawn — discover extraordinary stays across Kenya.
          </p>
          <SearchBar variant="hero" />
        </div>
      </section>

      {/* Regions */}
      <section className="regions container">
        <h2 className="section-title">Explore by Region</h2>
        <div className="regions__grid">
          {REGIONS.map((r) => (
            <Link key={r.name} to={`/listings?category=${r.tag}`} className="region-card">
              <img src={r.img} alt={r.name} />
              <div className="region-card__overlay" />
              <div className="region-card__info">
                <h3>{r.name}</h3>
                <span>{r.desc}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="featured container">
        <div className="featured__header">
          <h2 className="section-title">Featured Stays</h2>
          <Link to="/listings" className="featured__see-all">See all →</Link>
        </div>
        <div className="featured__grid">
          {FEATURED.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      {/* Why StayNest */}
      <section className="why">
        <div className="why__inner container">
          <h2 className="section-title" style={{ color: 'var(--white)' }}>Why StayNest?</h2>
          <div className="why__grid">
            {[
              { icon: '🛡️', title: 'Verified Listings', text: 'Every property is personally vetted for quality and accuracy.' },
              { icon: '💳', title: 'M-Pesa & Cards', text: 'Pay securely via M-Pesa, Visa, or Mastercard in Kenyan Shillings.' },
              { icon: '🧭', title: 'Local Expertise', text: 'Curated by Kenyans, for travellers who want the real Kenya.' },
              { icon: '🌍', title: 'Eco Certified', text: 'We partner with lodges committed to sustainable tourism.' },
            ].map((item) => (
              <div key={item.title} className="why-card">
                <span className="why-card__icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;