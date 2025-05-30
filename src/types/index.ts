// Book related types
export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  description: string;
  genre: string[];
  publishDate: string;
  isbn: string;
  rating: number;
  inStock: boolean;
}

// User related types
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  country?: string;
  city?: string;
  age?: number;
}

// Review related types
export interface Review {
  id: number;
  bookId: number;
  userId: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Filter and Sort Options
export interface FilterOptions {
  genre?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | 'newest';

// Search Parameters
export interface SearchParams {
  query: string;
  by?: 'title' | 'author' | 'genre' | 'all';
  minRating?: number;
}