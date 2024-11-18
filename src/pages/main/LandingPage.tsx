import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // Import react-hot-toast for notifications
import { motion } from 'framer-motion'; // Import framer-motion for animations
import NavbarLand from '../../components/NavbarLand';

const LandingPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // Simulate loading when a button is clicked
  const handleSignUpClick = () => {
    setLoading(true);
    toast.loading('Processing...', {
      duration: 500, // Duration for the loading toast
    });

    setTimeout(() => {
      setLoading(false);
      toast.success('Register');
    }, 500); // Simulate loading time
  };

  return (
    <>
      <NavbarLand />
      <motion.div
        className="bg-gray-100 text-gray-900"
        initial={{ opacity: 0 }} // Start with opacity 0
        animate={{ opacity: 1 }} // Fade in to opacity 1
        transition={{ duration: 2 }} // Duration of 2 seconds
      >
        {/* Hero Section */}
        <div className="bg-cover bg-center h-screen text-white py-16 relative" style={{ backgroundImage: "url('/doctors.jpg')" }}>
          {/* Adding a blur overlay to the background */}
          <div className="absolute inset-0 bg-black opacity-50 blur-sm"></div>

          <div className="container mx-auto px-4 flex flex-col items-center text-center relative z-10">
            <img
              src="/StrokeCare.png" // Hospital logo
              alt="Hospital Logo"
              className="w-32 h-32 mb-6"
            />
            <motion.h1
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }} // Delay of 0.5 seconds
            >
              Welcome to StrokeCare
            </motion.h1>
            <motion.p
              className="text-lg mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }} // Delay of 1 second
            >
              Streamline patient management and predict stroke risks with ease.
            </motion.p>
            <div className="space-x-4">
              <Link
                to="/signin"
                className="bg-white text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-blue-100 transform hover:scale-105 transition duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={handleSignUpClick} // Trigger loading animation
                className="bg-blue-700 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-800 transform hover:scale-105 transition duration-300"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="150" strokeDashoffset="100" />
                  </svg>
                ) : (
                  'Sign Up'
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose StrokeCare?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transform hover:scale-105 hover:shadow-xl transition duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }} // Delay for feature 1
            >
              <img
                src="/data.jpg" // Patient management image
                alt="Patient Management"
                className="w-30 h-30 mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Efficient Patient Management</h3>
              <p>
                Manage patient data, appointments, and records all in one place with ease.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transform hover:scale-105 hover:shadow-xl transition duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }} // Delay for feature 2
            >
              <img
                src="/algorithms.jpg" // AI prediction image
                alt="Accurate Predictions"
                className="w-30 h-30 mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Accurate Predictions</h3>
              <p>
                Leverage advanced algorithms to predict stroke risks based on patient data.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transform hover:scale-105 hover:shadow-xl transition duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }} // Delay for feature 3
            >
              <img
                src="/security.jpg" // Security image
                alt="Secure System"
                className="w-30 h-30 mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Secure and Reliable</h3>
              <p>
                Built with top-notch security measures to protect sensitive patient information.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-blue-50 py-16">
          <div className="container mx-auto px-4 flex flex-col items-center text-center">
            {/* Medicine-related SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-32 h-32 mb-6 text-blue-600 transform hover:scale-105 transition duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 14.4V10a8 8 0 0 0-16 0v4.4a4.8 4.8 0 0 0 1.515 3.515A6.015 6.015 0 0 0 12 21a6.015 6.015 0 0 0 7.485-2.085A4.8 4.8 0 0 0 21 14.4zM12 17a3 3 0 1 1 3-3 3 3 0 0 1-3 3z"
              />
            </svg>
            <h2 className="text-3xl font-bold mb-4">Get Started Today</h2>
            <p className="text-lg mb-6">
              Join thousands of healthcare providers using StrokeCare to transform patient care.
            </p>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transform hover:scale-105 transition duration-300"
            >
              Sign Up Now
            </Link>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} StrokeCare. All Rights Reserved.</p>
            <div className="space-x-4 mt-2">
              <Link to="/" className="hover:text-blue-400">
                Home
              </Link>
              <Link to="/signin" className="hover:text-blue-400">
                Sign In
              </Link>
              <Link to="/signup" className="hover:text-blue-400">
                Sign Up
              </Link>
            </div>
          </div>
        </footer>
      </motion.div>
    </>
  );
};

export default LandingPage;

