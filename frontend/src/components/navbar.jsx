import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/authcontext.jsx';

const Navbar = () => {
  const { admin, logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">EN</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Every Nation Church</h1>
              <p className="text-sm text-gray-600">Nairobi</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium ${
                isActive('/') ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-600 hover:text-blue-900'
              } transition duration-300`}
            >
              Home
            </Link>
            <Link 
              to="/mission" 
              className={`font-medium ${
                isActive('/mission') ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-600 hover:text-blue-900'
              } transition duration-300`}
            >
              Mission
            </Link>
            <Link 
              to="/members-leaders" 
              className={`font-medium ${
                isActive('/members-leaders') ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-600 hover:text-blue-900'
              } transition duration-300`}
            >
              Members & Leaders
            </Link>
            <Link 
              to="/about" 
              className={`font-medium ${
                isActive('/about') ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-600 hover:text-blue-900'
              } transition duration-300`}
            >
              About Us
            </Link>
            <Link 
              to="/register" 
              className={`font-medium ${
                isActive('/register') ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-600 hover:text-blue-900'
              } transition duration-300`}
            >
              Join Us
            </Link>
            {admin ? (
              <>
                <Link 
                  to="/admin" 
                  className="font-medium text-green-600 hover:text-green-700 transition duration-300"
                >
                  Admin Panel
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition duration-300"
              >
                Admin Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden">
            <span className="text-2xl">☰</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;