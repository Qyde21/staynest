import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryFilter from '../components/property/CategoryFilter';
import PropertyCard from '../components/property/PropertyCard';
import { PROPERTIES } from '../data/properties';
import './ListingsPage.css';

function ListingsPage() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('default');

  const filtered = useMemo(() => {
    let list = activeCategory === 'all'
      ? PROPERTIES
      : PROPERTIES.filter((p) => p.category === activeCategory);

    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [activeCategory, sortBy]);

  return (
    <div className="listings-page">
      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

      <div className="listings-page__content container">
        <div className="listings-page__header">
          <p className="listings-page__count">
            <strong>{filtered.length}</strong> stays in Kenya
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

        {filtered.length > 0 ? (
          <div className="listings-page__grid">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} />
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
