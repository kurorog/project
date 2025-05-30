import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary-900">BookHaven</span>
            </Link>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary-900 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/catalog" className="text-gray-700 hover:text-primary-900 px-3 py-2 rounded-md text-sm font-medium">
                Catalog
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center">
            <form onSubmit={handleSearch} className="relative mr-4 hidden md:block">
              <input
                type="text"
                placeholder="Search books..."
                className="pl-10 pr-4 py-2 w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute left-3 top-2.5 text-gray-400">
                <Search size={18} />
              </button>
            </form>
            
            <Link to="/cart" className="ml-4 relative p-2 text-gray-700 hover:text-primary-900">
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-accent-500 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="ml-4 relative">
                <Link to="/profile" className="p-2 text-gray-700 hover:text-primary-900 flex items-center">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Profile" className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <User size={24} />
                  )}
                </Link>
              </div>
            ) : (
              <Link to="/login" className="ml-4 btn-primary">
                Sign In
              </Link>
            )}
            
            <button onClick={toggleMenu} className="ml-4 md:hidden">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-slide-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-900 hover:bg-gray-50">
              Home
            </Link>
            <Link to="/catalog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-900 hover:bg-gray-50">
              Catalog
            </Link>
            <form onSubmit={handleSearch} className="px-3 py-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search books..."
                  className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute left-3 top-2.5 text-gray-400">
                  <Search size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;