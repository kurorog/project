import { Book, FilterOptions, Review, SortOption, SearchParams } from '../types';
import { mockBooks, mockReviews } from '../data/mockData';

export const getBooks = async (
  filters?: FilterOptions,
  sort?: SortOption,
  page: number = 1,
  limit: number = 12
): Promise<{ books: Book[]; total: number }> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filteredBooks = [...mockBooks];
  
  // Apply filters
  if (filters) {
    if (filters.genre) {
      filteredBooks = filteredBooks.filter(book => 
        book.genre.some(g => g.toLowerCase() === filters.genre?.toLowerCase())
      );
    }
    
    if (filters.minPrice !== undefined) {
      filteredBooks = filteredBooks.filter(book => book.price >= filters.minPrice!);
    }
    
    if (filters.maxPrice !== undefined) {
      filteredBooks = filteredBooks.filter(book => book.price <= filters.maxPrice!);
    }
    
    if (filters.minRating !== undefined) {
      filteredBooks = filteredBooks.filter(book => book.rating >= filters.minRating!);
    }
  }
  
  // Apply sorting
  if (sort) {
    switch (sort) {
      case 'price-asc':
        filteredBooks.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredBooks.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        filteredBooks.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filteredBooks.sort((a, b) => 
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );
        break;
    }
  }
  
  const total = filteredBooks.length;
  
  // Apply pagination
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedBooks = filteredBooks.slice(start, end);
  
  return { books: paginatedBooks, total };
};

export const getBookById = async (id: number): Promise<Book | null> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return mockBooks.find(book => book.id === id) || null;
};

export const searchBooks = async (params: SearchParams): Promise<Book[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const { query, by = 'all', minRating } = params;
  const searchTerm = query.toLowerCase();
  
  let results = mockBooks;
  
  // Filter by search field
  if (by === 'title') {
    results = results.filter(book => book.title.toLowerCase().includes(searchTerm));
  } else if (by === 'author') {
    results = results.filter(book => book.author.toLowerCase().includes(searchTerm));
  } else if (by === 'genre') {
    results = results.filter(book => 
      book.genre.some(g => g.toLowerCase().includes(searchTerm))
    );
  } else {
    // Search in all fields
    results = results.filter(book => 
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.genre.some(g => g.toLowerCase().includes(searchTerm)) ||
      book.description.toLowerCase().includes(searchTerm)
    );
  }
  
  // Filter by rating if specified
  if (minRating !== undefined) {
    results = results.filter(book => book.rating >= minRating);
  }
  
  return results;
};

export const getReviewsByBookId = async (bookId: number): Promise<Review[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockReviews.filter(review => review.bookId === bookId);
};

export const addReview = async (review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newReview: Review = {
    ...review,
    id: mockReviews.length + 1,
    createdAt: new Date().toISOString(),
  };
  
  // In a real app, we would save this to the database
  // For the demo, we're just returning the new review
  
  return newReview;
};

export const updateReview = async (reviewId: number, data: Partial<Review>): Promise<Review> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const reviewIndex = mockReviews.findIndex(r => r.id === reviewId);
  
  if (reviewIndex === -1) {
    throw new Error('Review not found');
  }
  
  // In a real app, we would update the database
  // For the demo, we're just returning a modified review
  
  const updatedReview: Review = {
    ...mockReviews[reviewIndex],
    ...data,
  };
  
  return updatedReview;
};

export const deleteReview = async (reviewId: number): Promise<boolean> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // In a real app, we would delete from the database
  // For the demo, we're just returning success
  
  return true;
};