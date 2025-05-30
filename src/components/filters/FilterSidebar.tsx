import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FilterOptions } from '../../types';

interface FilterSidebarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    genre: true,
    price: true,
    rating: true,
  });

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Classic",
    "Fantasy",
    "Sci-Fi",
    "Mystery",
    "Thriller",
    "Romance",
    "Historical",
    "Young Adult",
    "Children",
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleGenreChange = (genre: string) => {
    onFilterChange({
      ...filters,
      genre: filters.genre === genre ? undefined : genre,
    });
  };

  const handlePriceChange = (min?: number, max?: number) => {
    onFilterChange({
      ...filters,
      minPrice: min,
      maxPrice: max,
    });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({
      ...filters,
      minRating: filters.minRating === rating ? undefined : rating,
    });
  };

  return (
    <aside className="w-full lg:w-64 bg-white p-5 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
      
      {/* Genre Filter */}
      <div className="mb-6">
        <button 
          className="flex items-center justify-between w-full text-left font-medium text-gray-800 mb-3"
          onClick={() => toggleSection('genre')}
        >
          <span>Genre</span>
          {expandedSections.genre ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.genre && (
          <div className="space-y-2 ml-1 transition-all duration-300">
            {genres.map(genre => (
              <label key={genre} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.genre === genre}
                  onChange={() => handleGenreChange(genre)}
                  className="rounded border-gray-300 text-primary-900 focus:ring-primary-900"
                />
                <span className="text-sm text-gray-700">{genre}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      {/* Price Filter */}
      <div className="mb-6">
        <button 
          className="flex items-center justify-between w-full text-left font-medium text-gray-800 mb-3"
          onClick={() => toggleSection('price')}
        >
          <span>Price</span>
          {expandedSections.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.price && (
          <div className="space-y-2 ml-1 transition-all duration-300">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                checked={!filters.minPrice && !filters.maxPrice}
                onChange={() => handlePriceChange(undefined, undefined)}
                className="rounded-full border-gray-300 text-primary-900 focus:ring-primary-900"
              />
              <span className="text-sm text-gray-700">All</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                checked={filters.maxPrice === 10}
                onChange={() => handlePriceChange(0, 10)}
                className="rounded-full border-gray-300 text-primary-900 focus:ring-primary-900"
              />
              <span className="text-sm text-gray-700">Under $10</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                checked={filters.minPrice === 10 && filters.maxPrice === 20}
                onChange={() => handlePriceChange(10, 20)}
                className="rounded-full border-gray-300 text-primary-900 focus:ring-primary-900"
              />
              <span className="text-sm text-gray-700">$10 - $20</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                checked={filters.minPrice === 20}
                onChange={() => handlePriceChange(20, undefined)}
                className="rounded-full border-gray-300 text-primary-900 focus:ring-primary-900"
              />
              <span className="text-sm text-gray-700">Over $20</span>
            </label>
          </div>
        )}
      </div>
      
      {/* Rating Filter */}
      <div className="mb-6">
        <button 
          className="flex items-center justify-between w-full text-left font-medium text-gray-800 mb-3"
          onClick={() => toggleSection('rating')}
        >
          <span>Rating</span>
          {expandedSections.rating ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.rating && (
          <div className="space-y-2 ml-1 transition-all duration-300">
            {[4, 3, 2, 1].map(rating => (
              <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  checked={filters.minRating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="rounded-full border-gray-300 text-primary-900 focus:ring-primary-900"
                />
                <span className="text-sm text-gray-700">{rating}+ Stars</span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      {/* Reset Filters */}
      <button
        onClick={() => onFilterChange({})}
        className="w-full py-2 text-sm font-medium text-primary-900 border border-primary-900 rounded hover:bg-primary-50 transition-colors duration-300"
      >
        Reset Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;