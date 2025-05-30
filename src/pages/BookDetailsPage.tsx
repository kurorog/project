import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import { getBookById, getReviewsByBookId, addReview, deleteReview } from '../services/bookService';
import { useCart } from '../contexts/CartContext';
import { Book, Review } from '../types';
import ReviewList from '../components/reviews/ReviewList';
import ReviewForm from '../components/reviews/ReviewForm';
import BookGrid from '../components/books/BookGrid';
import { useAuth } from '../contexts/AuthContext';

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const bookId = parseInt(id || '0');
  const { addToCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [similarBooks, setSimilarBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadBookDetails = async () => {
      try {
        setLoading(true);
        
        if (bookId) {
          // Load book details
          const bookData = await getBookById(bookId);
          setBook(bookData);
          
          if (bookData) {
            // Load reviews
            const reviewsData = await getReviewsByBookId(bookId);
            setReviews(reviewsData);
            
            // Load similar books (in a real app, this would use a recommendation algorithm)
            // Here we'll just show books with the same primary genre
            const primaryGenre = bookData.genre[0];
            const result = await getBooks({ genre: primaryGenre }, undefined, 1, 4);
            // Filter out the current book
            setSimilarBooks(result.books.filter(b => b.id !== bookId));
          }
        }
      } catch (error) {
        console.error('Failed to load book details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadBookDetails();
  }, [bookId]);

  const handleAddToCart = () => {
    if (book) {
      addToCart(book, quantity);
    }
  };

  const handleReviewSubmit = async (rating: number, comment: string) => {
    if (!book || !isAuthenticated || !user) return;
    
    try {
      const newReview = await addReview({
        bookId: book.id,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userAvatar: user.avatar,
        rating,
        comment,
      });
      
      // Add the new review to the list
      setReviews(prevReviews => [newReview, ...prevReviews]);
    } catch (error) {
      console.error('Failed to submit review:', error);
      throw error;
    }
  };

  const handleReviewDelete = async (reviewId: number) => {
    try {
      await deleteReview(reviewId);
      setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-900"></div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="page-container">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the book you're looking for.
          </p>
          <Link to="/catalog" className="btn-primary">
            Return to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container py-8">
      <Link to="/catalog" className="inline-flex items-center text-primary-900 hover:text-primary-700 mb-6">
        <ArrowLeft size={16} className="mr-1" />
        Back to Catalog
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Book Cover */}
        <div className="md:col-span-1">
          <div className="aspect-[2/3] overflow-hidden rounded-lg shadow-lg">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Book Details */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
          <p className="text-xl text-gray-700 mb-4">by {book.author}</p>
          
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={`${
                    i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {book.rating.toFixed(1)} ({reviews.length} reviews)
            </span>
          </div>
          
          <div className="flex items-center mb-6">
            <span className="text-2xl font-bold text-primary-900">${book.price.toFixed(2)}</span>
            <span className="ml-4 text-sm px-2 py-1 bg-gray-100 rounded text-gray-700">
              ISBN: {book.isbn}
            </span>
          </div>
          
          <div className="mb-6">
            <p className="font-medium mb-2">Genre:</p>
            <div className="flex flex-wrap gap-2">
              {book.genre.map(g => (
                <Link
                  key={g}
                  to={`/catalog?genre=${g}`}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {g}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <p className="font-medium mb-2">Description:</p>
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          </div>
          
          <div className="mb-8">
            <p className="font-medium mb-2">Availability:</p>
            <p className={`${book.inStock ? 'text-green-600' : 'text-red-600'} font-medium`}>
              {book.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
          
          {book.inStock && (
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="flex-grow md:flex-grow-0 btn-primary flex items-center justify-center"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ReviewForm bookId={bookId} onSubmit={handleReviewSubmit} />
          </div>
          
          <div className="lg:col-span-2">
            <ReviewList reviews={reviews} onDelete={handleReviewDelete} />
          </div>
        </div>
      </div>
      
      {/* Similar Books Section */}
      {similarBooks.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <BookGrid books={similarBooks} />
        </div>
      )}
    </div>
  );
};

// Helper function to avoid circular dependency
async function getBooks(filters?: any, sort?: any, page?: any, limit?: any) {
  const { getBooks } = await import('../services/bookService');
  return getBooks(filters, sort, page, limit);
}

export default BookDetailsPage;