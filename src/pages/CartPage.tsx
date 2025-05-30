import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  
  const handleCheckout = () => {
    // In a real application, this would redirect to a checkout page
    alert('This would proceed to checkout in a real application');
  };

  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="page-container py-8">
      <div className="mb-8">
        <Link to="/catalog" className="inline-flex items-center text-primary-900 hover:text-primary-700">
          <ArrowLeft size={16} className="mr-1" />
          Continue Shopping
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
      
      {isCartEmpty ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <ShoppingBag size={64} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any books to your cart yet.</p>
          <Link to="/catalog" className="btn-primary">
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flow-root">
                {cartItems.map(item => (
                  <CartItem
                    key={item.book.id}
                    book={item.book}
                    quantity={item.quantity}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="flow-root">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-medium">${getCartTotal().toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <p className="text-gray-600">Shipping</p>
                  <p className="font-medium">Free</p>
                </div>
                
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <p className="text-gray-600">Tax</p>
                  <p className="font-medium">${(getCartTotal() * 0.08).toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between py-4 font-semibold text-lg">
                  <p>Total</p>
                  <p>${(getCartTotal() * 1.08).toFixed(2)}</p>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full btn-primary mt-4"
              >
                {isAuthenticated ? 'Proceed to Checkout' : 'Sign In to Checkout'}
              </button>
              
              {!isAuthenticated && (
                <div className="mt-4 text-center text-sm text-gray-600">
                  <Link to="/login" className="text-primary-900 hover:underline">
                    Sign in
                  </Link>
                  {' or '}
                  <Link to="/register" className="text-primary-900 hover:underline">
                    create an account
                  </Link>
                  {' to checkout'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;