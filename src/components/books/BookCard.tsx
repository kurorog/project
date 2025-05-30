import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Book } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book);
  };

  return (
    <div className="card group animate-fade-in">
      <Link to={`/book/${book.id}`} className="block relative">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {!book.inStock && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              Out of Stock
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{book.title}</h3>
          <p className="text-sm text-gray-600">{book.author}</p>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 fill-current" />
              <span className="ml-1 text-sm font-medium">{book.rating.toFixed(1)}</span>
            </div>
            <div className="ml-auto font-semibold text-primary-900">${book.price.toFixed(2)}</div>
          </div>
          <div className="mt-3 flex justify-between">
            <button 
              onClick={handleAddToCart}
              disabled={!book.inStock}
              className={`flex items-center justify-center rounded-full w-full py-2 text-sm font-medium transition-colors duration-300 ${
                book.inStock 
                  ? 'bg-primary-900 text-white hover:bg-primary-800' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart size={16} className="mr-1" />
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;