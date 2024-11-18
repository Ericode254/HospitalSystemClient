import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavbarHome: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-blue-700 p-4 shadow-md fixed w-full z-50 top-0 left-0 transition-all ease-in-out duration-300">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-white font-semibold text-2xl tracking-wide">
          <Link to="/home" onClick={closeMobileMenu} className="hover:text-blue-300">
            StrokeCare
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6 text-white font-medium">
          <Link to="/home" className="hover:text-blue-200 transition duration-200">Home</Link>
          <Link to="/contact" className="hover:text-blue-200 transition duration-200">Contact</Link>
          <Link to="/details" className="hover:text-blue-200 transition duration-200">Details</Link>
          <Link to="/logout" className="flex items-center space-x-2 hover:text-blue-200 transition duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7" />
            </svg>
            <span>Logout</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Links */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-blue-700 text-white space-y-4 p-4 mt-4 rounded-md shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/home" className="block hover:text-blue-200 transition duration-200" onClick={closeMobileMenu}>Home</Link>
          <Link to="/contact" className="block hover:text-blue-200 transition duration-200" onClick={closeMobileMenu}>Contact</Link>
          <Link to="/details" className="block hover:text-blue-200 transition duration-200" onClick={closeMobileMenu}>Details</Link>
          <Link to="/logout" className="flex items-center space-x-2 hover:text-blue-200 transition duration-200" onClick={closeMobileMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7" />
            </svg>
            <span>Logout</span>
          </Link>
        </motion.div>
      )}
    </nav>
  );
};

export default NavbarHome;

