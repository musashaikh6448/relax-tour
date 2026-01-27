
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plane, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-orange-600 p-2 rounded-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                Relax <span className="text-orange-600">Tours</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`${isActive('/') ? 'text-orange-600' : 'text-gray-600'} hover:text-orange-600 font-medium transition-colors`}
            >
              Home
            </Link>
            <Link 
              to="/destinations" 
              className={`${isActive('/destinations') ? 'text-orange-600' : 'text-gray-600'} hover:text-orange-600 font-medium transition-colors`}
            >
              All Destinations
            </Link>
            <Link 
              to="/about" 
              className={`${isActive('/about') ? 'text-orange-600' : 'text-gray-600'} hover:text-orange-600 font-medium transition-colors`}
            >
              About Us
            </Link>
            <Link 
              to="/admin/login" 
              className="flex items-center space-x-2 bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all font-medium"
            >
              <User size={18} />
              <span>Admin Access</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 shadow-xl">
          <Link 
            to="/" 
            className="block text-gray-700 hover:text-orange-600 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/tours" 
            className="block text-gray-700 hover:text-orange-600 font-medium"
            onClick={() => setIsOpen(false)}
          >
            All Destinations
          </Link>
          <Link 
            to="/admin/login" 
            className="block bg-orange-600 text-white px-4 py-2 rounded-lg text-center font-medium"
            onClick={() => setIsOpen(false)}
          >
            Admin Access
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
