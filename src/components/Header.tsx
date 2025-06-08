
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="border-b border-gray-200 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="text-gray-600">
              Breaking: Latest updates from Toronto and across Canada
            </div>
            <div className="text-gray-600">
              {new Date().toLocaleDateString('en-CA', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-3xl font-bold text-red-600">
              AtlasHype
              <span className="text-sm text-gray-600 block">Toronto & Canadian News</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Home
              </Link>
              <Link to="/local" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Local
              </Link>
              <Link to="/canada" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Canada
              </Link>
              <Link to="/world" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                World
              </Link>
              <Link to="/opinion" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Opinion
              </Link>
              <Link to="/events" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Events
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-red-600 transition-colors">
                <Search size={20} />
              </button>
              <Link 
                to="/admin" 
                className="hidden md:block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Admin
              </Link>
              <button 
                className="md:hidden text-gray-600"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-red-600 font-medium">
                Home
              </Link>
              <Link to="/local" className="text-gray-700 hover:text-red-600 font-medium">
                Local
              </Link>
              <Link to="/canada" className="text-gray-700 hover:text-red-600 font-medium">
                Canada
              </Link>
              <Link to="/world" className="text-gray-700 hover:text-red-600 font-medium">
                World
              </Link>
              <Link to="/opinion" className="text-gray-700 hover:text-red-600 font-medium">
                Opinion
              </Link>
              <Link to="/events" className="text-gray-700 hover:text-red-600 font-medium">
                Events
              </Link>
              <Link to="/admin" className="text-red-600 font-medium">
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
