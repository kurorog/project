import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash, Plus, Minus } from 'lucide-react';
import { Book } from '../../types';

interface CartItemProps {
  book: Book;
  quantity: number;
  onUpdateQuantity: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  book,
  quantity,
  onUpdateQuantity,
  onRemove,
}) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(book.id, newQuantity);
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(book.id);
    }, 300);
  };

  return (
    <div 
      className={`flex flex-col sm:flex-row items-start sm:items-center py-6 border-b border-gray-200 transition-opacity duration-300 ${
        isRemoving ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex-shrink-0 w-full sm:w-20 h-24 mb-4 sm:mb-0 sm:mr-6">
        <Link to={`/book/${book.id}`}>
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover rounded"
          />
        </Link>
      </div>
      
      <div className="flex-grow">
        <Link to={`/book/${book.id}`} className="text-lg font-semibold text-gray-800 hover:text-primary-900">
          {book.title}
        </Link>
        <p className="text-sm text-gray-600">{book.author}</p>
        <p className="text-primary-900 font-medium mt-1">${book.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center mt-4 sm:mt-0">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
          >
            <Minus size={16} />
          </button>
          <span className="px-3 py-1 border-x border-gray-300">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
          >
            <Plus size={16} />
          </button>
        </div>
        <button
          onClick={handleRemove}
          className="ml-4 text-red-600 hover:text-red-800"
        >
          <Trash size={20} />
        </button>
      </div>
      
      <div className="font-semibold text-lg text-gray-800 ml-0 sm:ml-6 mt-4 sm:mt-0">
        ${(book.price * quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;