import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BookGrid from '../components/books/BookGrid';
import { searchBooks } from '../services/bookService';
import { Book, SearchParams } from '../types';

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  
  const query = searchParams.get('q') || '';
  const searchBy = (searchParams.get('by') as 'title' | 'author' | 'genre' | 'all') || 'all';
  const minRating = searchParams.get('rating') ? Number(searchParams.get('rating')) : undefined;

  useEffect(() => {
    const performSearch = async () => {
      if (!query) {
        setBooks([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        const params: SearchParams = {
          query,
          by: searchBy,
          minRating,
        };
        
        const results = await searchBooks(params);
        setBooks(results);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    };
    
    performSearch();
  }, [query, searchBy, minRating]);

  return (
    <div className="page-container py-8">
      <div className="mb-8">
        <Link to="/catalog" className="inline-flex items-center text-primary-900 hover:text-primary-700">
          <ArrowLeft size={16} className="mr-1" />
          Back to Catalog
        </Link>
      </div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {query ? `Search Results for "${query}"` : 'Search Results'}
        </h1>
        
        {query && (
          <p className="mt-2 text-gray-600">
            {books.length} results found
            {searchBy !== 'all' && ` in ${searchBy}`}
            {minRating && ` with rating ${minRating}+ stars`}
          </p>
        )}
      </div>
      
      {!query ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">No search query provided</h2>
          <p className="text-gray-600 mb-8">Please enter a search term to find books.</p>
          <Link to="/catalog" className="btn-primary">
            Browse All Books
          </Link>
        </div>
      ) : (
        <BookGrid books={books} loading={loading} />
      )}
    </div>
  );
};

export default SearchResultsPage;