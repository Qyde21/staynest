import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryFilter from '../components/property/CategoryFilter';
import PropertyCard from '../components/property/PropertyCard';
import { getProperties } from '../services/api';
import './ListingsPage.css';

function ListingsPage() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialLocation = searchParams.get('location') || '';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('default');
  const [location, setLocation] = useState(initialLocation);
  const [locationInput, setLocationInput] = useState(initialLocation);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [guests, setGuests] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const params = {};
      if (activeCategory !== 'all') params.category = activeCategory;
      if (sortBy !== 'default') params.sort = sortBy;
      if (location) params.location = location;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (guests) params.guests = guests;
      const data = await getProperties(params);
      setProperties(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    fetchProperties();
  }, [activeCategory, sortBy, location, minPrice, maxPrice, guests]);

  const handleSearch = () => {
    setLocation(locationInput);
  };

  const handleClearFilters = () => {
    setLocation('');
    setLocationInput('');
    setMinPrice('');
    setMaxPrice('');
    setGuests('');
    setActiveCategory('all');
    setSortBy('default');
  };

  const hasFilters = location || minPrice || maxPrice || guests || activeCategory !== 'all';

  return (
    <div className="listings-page">
      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

      <div className="listings-page__content container">
        {/* Search & Filter Bar */}
        <div className="listings-search">
          <div className="listings-search__input">
            <input
              type="text"
              placeholder="Search by location or name..."
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <button
            className={`listings-filter-btn ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters {hasFilters && <span className="listings-filter-dot" />}
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="listings-filters">
            <div className="listings-filters__field">
              <label>Min Price (KES)</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="listings-filters__field">
              <label>Max Price (KES)</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="50000"
              />
            </div>
            <div className="listings-filters__field">
              <label>Guests</label>
              <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                <option value="">Any</option>
                {[1,2,3,4,5,6,7,8].map(n => (
                  <option key={n} value={n}>{n}+</option>
                ))}
              </select>
            </div>
            {hasFilters && (
              <button className="listings-filters__clear" onClick={handleClearFilters}>
                Clear all
              </button>
            )}
          </div>
        )}

        <div className="listings-page__header">
          <p className="listings-page__count">
            <strong>{properties.length}</strong> stays in Kenya
            {location && <span> matching "{location}"</span>}
          </p>
          <select
            className="listings-page__sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {loading ? (
          <div className="listings-page__loading">Loading stays...</div>
        ) : properties.length > 0 ? (
          <div className="listings-page__grid">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={{
                ...p,
                price: p.price_per_night,
                guests: p.max_guests,
                reviews: p.review_count,
              }} />
            ))}
          </div>
        ) : (
          <div className="listings-page__empty">
            <p>No stays found{location ? ` for "${location}"` : ''}.</p>
            <button onClick={handleClearFilters}>Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListingsPage;