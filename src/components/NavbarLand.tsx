import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure React Router is set up

const NavbarLand: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-bold">
          <Link to="/" className="hover:text-blue-300">
            StrokeCare
          </Link>
        </div>

        {/* Links for Larger Screens */}
        <div className="hidden md:flex space-x-6">
          {/* <Link to="/" className="hover:text-blue-300">
            Home
          </Link> */}
          <Link to="/signin" className="hover:text-blue-300">
            Sign In
          </Link>
          <Link to="/signup" className="hover:text-blue-300">
            Sign Up
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 text-white">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-blue-500"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/signin"
            className="block px-4 py-2 hover:bg-blue-500"
            onClick={toggleMenu}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="block px-4 py-2 hover:bg-blue-500"
            onClick={toggleMenu}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavbarLand;

