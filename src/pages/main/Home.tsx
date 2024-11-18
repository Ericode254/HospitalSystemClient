import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavbarHome from '../../components/NavbarHome';

const Home: React.FC = () => {
  const words = [
    "Your one-stop solution for stroke care",
    "Your partner in streamlining patient management",
    "Predicting stroke risks with advanced algorithms"
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [isTextLoading, setIsTextLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for popup state
    const popupClosed = localStorage.getItem('popupClosed');
    if (popupClosed === 'true') {
      setIsPopupVisible(false); // Do not show the popup if it was closed previously
    }

    // Auto-change words every 3 seconds
    const interval = setInterval(() => {
      setIsTextLoading(true); // Start loading animation for new text
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [words.length]);

  useEffect(() => {
    // After a delay, stop the loading animation
    const timeout = setTimeout(() => {
      setIsTextLoading(false);
    }, 500); // Animation delay for the fade-in effect

    return () => clearTimeout(timeout);
  }, [currentWordIndex]);

  const closePopup = () => {
    setIsPopupVisible(false);
    localStorage.setItem('popupClosed', 'true'); // Store popup state in localStorage
  };

  return (
    <div>
      <NavbarHome /> {/* Add the Navbar at the top */}

      {/* Pop-up */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-11/12 max-w-lg text-center">
            <h2 className="text-xl font-semibold mb-4">We'd Love to Know More About You!</h2>
            <p className="mb-6">Please fill out a form with more information about yourself.</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-600"
                onClick={closePopup}
              >
                Close
              </button>
              <Link
                to="/details"
                className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-800"
              >
                Fill Out Form
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section with Carousel of Words */}
      <section
        className="bg-cover bg-center text-white h-screen flex flex-col justify-center items-center text-center relative"
        style={{
          backgroundImage: "url('/homeDoctors.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 blur-sm"></div>
        <h1 className="text-4xl font-bold mb-4 z-10">Welcome to StrokeCare</h1> {/* Constant heading */}

        {/* Word Carousel with Animation */}
        <motion.h2
          className="text-4xl font-bold mb-4 z-10"
          key={currentWordIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isTextLoading ? 0 : 1, scale: isTextLoading ? 0.8 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {words[currentWordIndex]}
        </motion.h2>

        <p className="text-lg mb-6 z-10">Your partner in streamlining patient management and predicting stroke risks.</p>
        <Link
          to="/details"
          className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-md font-semibold mb-4 z-10"
        >
          Get Started
        </Link>

        {/* Circular Indicators */}
        <div className="flex space-x-2 z-10">
          {words.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full border-2 ${index === currentWordIndex
                ? 'bg-white border-white'
                : 'border-white opacity-50'
                }`}
            ></div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

