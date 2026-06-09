import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryFilter from '../components/property/CategoryFilter';
import PropertyCard from '../components/property/PropertyCard';
import { getProperties } from '../services/api';
import './ListingsPage.css';

function ListingsPage() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('default');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const params = {};
      if (activeCategory !== 'all') params.category = activeCategory;
      if (sortBy !== 'default') params.sort = sortBy;
      const data = await getProperties(params);
      setProperties(data);
      setLoading(false);
    };
    fetchProperties();
  }, [activeCategory, sortBy]);

  return (
    <div className="listings-page">
      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      <div className="listings-page__content container">
        <div className="listings-page__header">
          <p className="listings-page__count">
            <strong>{properties.length}</strong> stays in Kenya
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
            <p>No stays found for this category yet.</p>
            <button onClick={() => setActiveCategory('all')}>View all stays</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListingsPage;