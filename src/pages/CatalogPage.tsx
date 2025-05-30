import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookGrid from '../components/books/BookGrid';
import FilterSidebar from '../components/filters/FilterSidebar';
import { getBooks } from '../services/bookService';
import { Book, FilterOptions, SortOption } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalBooks, setTotalBooks] = useState(0);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sort, setSort] = useState<SortOption>('rating-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;

  useEffect(() => {
    // Parse URL parameters
    const genre = searchParams.get('genre') || undefined;
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const minRating = searchParams.get('minRating') ? Number(searchParams.get('minRating')) : undefined;
    const sortParam = searchParams.get('sort') as SortOption || 'rating-desc';
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    
    setFilters({ genre, minPrice, maxPrice, minRating });
    setSort(sortParam);
    setCurrentPage(page);
  }, [searchParams]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const result = await getBooks(filters, sort, currentPage, booksPerPage);
        setBooks(result.books);
        setTotalBooks(result.total);
      } catch (error) {
        console.error('Failed to load books:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadBooks();
  }, [filters, sort, currentPage]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    // Update the URL with new filters
    const params = new URLSearchParams(searchParams);
    
    // Reset page when filters change
    params.set('page', '1');
    
    // Handle genre
    if (newFilters.genre) {
      params.set('genre', newFilters.genre);
    } else {
      params.delete('genre');
    }
    
    // Handle price range
    if (newFilters.minPrice !== undefined) {
      params.set('minPrice', newFilters.minPrice.toString());
    } else {
      params.delete('minPrice');
    }
    
    if (newFilters.maxPrice !== undefined) {
      params.set('maxPrice', newFilters.maxPrice.toString());
    } else {
      params.delete('maxPrice');
    }
    
    // Handle rating
    if (newFilters.minRating !== undefined) {
      params.set('minRating', newFilters.minRating.toString());
    } else {
      params.delete('minRating');
    }
    
    setSearchParams(params);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value as SortOption;
    const params = new URLSearchParams(searchParams);
    params.set('sort', newSort);
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(totalBooks / booksPerPage);

  return (
    <div className="page-container py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Book Catalog</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-64">
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
        </div>
        
        {/* Main Content */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {loading ? 'Loading...' : `Showing ${books.length} of ${totalBooks} books`}
            </p>
            
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-sm text-gray-700">
                Sort by:
              </label>
              <select
                id="sort"
                value={sort}
                onChange={handleSortChange}
                className="select-field w-44"
              >
                <option value="rating-desc">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
          
          <BookGrid books={books} loading={loading} />
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className={`mx-1 p-2 rounded-md ${
                    currentPage <= 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  const isCurrentPage = page === currentPage;
                  
                  // Show limited page numbers
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`mx-1 px-3 py-1 rounded-md ${
                          isCurrentPage
                            ? 'bg-primary-900 text-white'
                            : 'text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                  
                  // Show ellipsis
                  if (
                    (page === 2 && currentPage > 3) ||
                    (page === totalPages - 1 && currentPage < totalPages - 2)
                  ) {
                    return <span key={page} className="mx-1">...</span>;
                  }
                  
                  return null;
                })}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className={`mx-1 p-2 rounded-md ${
                    currentPage >= totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;