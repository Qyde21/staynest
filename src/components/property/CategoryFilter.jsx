import React from 'react';
import { CATEGORIES } from '../../data/properties';
import './CategoryFilter.css';

function CategoryFilter({ active, onChange }) {
  return (
    <div className="category-filter">
      <div className="category-filter__scroll">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`category-filter__item ${active === cat.id ? 'active' : ''}`}
            onClick={() => onChange(cat.id)}
          >
            <span className="category-filter__icon">{cat.icon}</span>
            <span className="category-filter__label">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
