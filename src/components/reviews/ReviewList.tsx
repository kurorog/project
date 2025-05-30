import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Review } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface ReviewListProps {
  reviews: Review[];
  onDelete?: (reviewId: number) => Promise<void>;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, onDelete }) => {
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const { user } = useAuth();
  
  const filteredReviews = filterRating 
    ? reviews.filter(review => review.rating >= filterRating) 
    : reviews;

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (rating: number | null) => {
    setFilterRating(rating);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No reviews yet. Be the first to leave a review!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Customer Reviews ({reviews.length})
        </h3>
        
        <button 
          onClick={toggleFilters}
          className="flex items-center text-sm font-medium text-primary-900 mt-2 sm:mt-0"
        >
          Filter Reviews
          {showFilters ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
        </button>
      </div>
      
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-md mb-4 animate-slide-down">
          <p className="text-sm font-medium text-gray-700 mb-2">Filter by rating:</p>
          <div className="flex space-x-4">
            <button
              onClick={() => handleFilterChange(null)}
              className={`px-3 py-1 text-sm rounded-full ${
                filterRating === null 
                  ? 'bg-primary-900 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors`}
            >
              All
            </button>
            {[5, 4, 3, 2, 1].map(rating => (
              <button
                key={rating}
                onClick={() => handleFilterChange(rating)}
                className={`flex items-center px-3 py-1 text-sm rounded-full ${
                  filterRating === rating 
                    ? 'bg-primary-900 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors`}
              >
                {rating}+
                <Star size={12} className="ml-1" />
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="space-y-6">
        {filteredReviews.map(review => (
          <div key={review.id} className="bg-white p-5 rounded-lg shadow-md">
            <div className="flex justify-between">
              <div className="flex items-center">
                {review.userAvatar ? (
                  <img 
                    src={review.userAvatar} 
                    alt={review.userName} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600 font-medium">
                      {review.userName.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="ml-3">
                  <p className="font-medium text-gray-800">{review.userName}</p>
                  <p className="text-xs text-gray-500">{formatDate(review.createdAt)}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <p className="mt-3 text-gray-700">{review.comment}</p>
            
            {user && user.id === review.userId && onDelete && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => onDelete(review.id)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Delete review
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;