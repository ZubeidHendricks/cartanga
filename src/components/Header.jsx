import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-indigo-700">CarTanga</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">
              Home
            </Link>
            <Link to="/subscription-tiers" className="text-gray-700 hover:text-indigo-600 font-medium">
              Subscription Plans
            </Link>
            <Link to="/crowdfunding" className="text-gray-700 hover:text-indigo-600 font-medium">
              Crowdfunding
            </Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-indigo-600 font-medium">
              How It Works
            </Link>
            <Link to="/about-us" className="text-gray-700 hover:text-indigo-600 font-medium">
              About Us
            </Link>
          </nav>

          {/* Sign In / Sign Up - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-indigo-600 font-medium">
              Log In
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition duration-300"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-3 py-3">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-indigo-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/subscription-tiers" 
                className="text-gray-700 hover:text-indigo-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Subscription Plans
              </Link>
              <Link 
                to="/crowdfunding" 
                className="text-gray-700 hover:text-indigo-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Crowdfunding
              </Link>
              <Link 
                to="/how-it-works" 
                className="text-gray-700 hover:text-indigo-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                to="/about-us" 
                className="text-gray-700 hover:text-indigo-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <div className="pt-2 border-t border-gray-200 flex flex-col space-y-3">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-indigo-600 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition duration-300 inline-block text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;