import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Plane, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  // 🔥 GET USER FROM LOCAL STORAGE
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* LOGO */}
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

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`${isActive('/') ? 'text-orange-600' : 'text-gray-600'} hover:text-orange-600 font-medium`}
            >
              Home
            </Link>

            <Link
              to="/destinations"
              className={`${isActive('/destinations') ? 'text-orange-600' : 'text-gray-600'} hover:text-orange-600 font-medium`}
            >
              All Destinations
            </Link>

            <Link
              to="/about"
              className={`${isActive('/about') ? 'text-orange-600' : 'text-gray-600'} hover:text-orange-600 font-medium`}
            >
              About Us
            </Link>

            {/* 🔥 USER LOGIC */}
            {user ? (
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-700">
                  Hi, {user.name}
                </span>

                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-full font-medium"
                >
                  <User size={16} />
                  Profile
                </button>

                <button
                  onClick={logout}
                  className="text-sm text-red-500 font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="flex items-center space-x-2 bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-gray-800 font-medium"
              >
                <User size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-t py-4 px-4 space-y-4 shadow-xl">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/destinations" onClick={() => setIsOpen(false)}>All Destinations</Link>

          {user ? (
            <>
              <button
                onClick={() => {
                  navigate('/profile');
                  setIsOpen(false);
                }}
                className="block w-full text-left font-medium text-orange-600"
              >
                My Profile
              </button>

              <button
                onClick={logout}
                className="block w-full text-left font-medium text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/admin/login"
              onClick={() => setIsOpen(false)}
              className="block bg-orange-600 text-white px-4 py-2 rounded-lg text-center font-medium"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;