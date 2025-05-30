import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BookGrid from '../components/books/BookGrid';
import { getBooks } from '../services/bookService';
import { Book } from '../types';

const HomePage: React.FC = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [newReleases, setNewReleases] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        
        // Get highly rated books for featured section
        const featuredResult = await getBooks({ minRating: 4.5 }, 'rating-desc', 1, 4);
        setFeaturedBooks(featuredResult.books);
        
        // Get newest books for new releases section
        const newReleasesResult = await getBooks(undefined, 'newest', 1, 4);
        setNewReleases(newReleasesResult.books);
      } catch (error) {
        console.error('Failed to load books:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadBooks();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="lg:order-1 animate-slide-up">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Discover Your Next Favorite Book
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Browse our collection of bestsellers, classics, and hidden gems. Find the perfect book for every moment.
              </p>
              <div className="flex space-x-4">
                <Link to="/catalog" className="btn-accent">
                  Browse Catalog
                </Link>
                <Link to="/login" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-900 font-semibold py-2 px-4 rounded transition-colors duration-300">
                  Sign In
                </Link>
              </div>
            </div>
            <div className="lg:order-2 flex justify-center lg:justify-end">
              <img 
                src="https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Book collection" 
                className="rounded-lg shadow-2xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Books Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Books</h2>
            <Link to="/catalog" className="flex items-center text-primary-900 hover:text-primary-700 font-medium">
              View All
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <BookGrid books={featuredBooks} loading={loading} />
        </div>
      </section>
      
      {/* New Releases Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">New Releases</h2>
            <Link to="/catalog?sort=newest" className="flex items-center text-primary-900 hover:text-primary-700 font-medium">
              View All
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <BookGrid books={newReleases} loading={loading} />
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-accent-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated with New Releases
            </h2>
            <p className="text-white/80 mb-8">
              Subscribe to our newsletter and be the first to know about new books, exclusive offers, and literary events.
            </p>
            <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="input-field flex-grow focus:ring-white"
              />
              <button
                type="submit"
                className="bg-white text-accent-600 hover:bg-gray-100 font-semibold py-2 px-6 rounded transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;