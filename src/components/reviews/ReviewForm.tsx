import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ReviewFormProps {
  bookId: number;
  onSubmit: (rating: number, comment: string) => Promise<void>;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ bookId, onSubmit }) => {
  const { isAuthenticated, user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError('You must be logged in to leave a review');
      return;
    }
    
    if (rating < 1) {
      setError('Please select a rating');
      return;
    }
    
    if (comment.trim().length < 5) {
      setError('Please enter a comment (minimum 5 characters)');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await onSubmit(rating, comment);
      setComment('');
      setSuccess('Your review was submitted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-white p-5 rounded-lg shadow-md">
        <p className="text-center text-gray-700">
          Please <a href="/login\" className="text-primary-900 font-medium">sign in</a> to leave a review.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Write a Review</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Rating
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map(value => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoveredRating(value)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1 focus:outline-none"
              >
                <Star
                  size={24}
                  className={`${
                    (hoveredRating ? value <= hoveredRating : value <= rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  } transition-colors duration-150`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {rating} out of 5 stars
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review
          </label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="input-field"
            placeholder="Share your thoughts about this book..."
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;