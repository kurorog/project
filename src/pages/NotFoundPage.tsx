import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-9xl font-bold text-primary-900">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
          <Link to="/" className="btn-primary">
            Go to Homepage
          </Link>
          <Link to="/catalog" className="btn-secondary">
            Browse Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;