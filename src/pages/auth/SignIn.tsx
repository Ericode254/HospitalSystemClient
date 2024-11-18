import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure you're using React Router
import axios from 'axios';
import toast from 'react-hot-toast';

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.error('Please enter both username and password');
      return;
    }

    setIsLoading(true);

    // Simulate loading delay for user feedback
    setTimeout(async () => {
      try {
        const response = await axios.post('/login', formData);
        toast.success(response.data.message || 'Login successful!');
      } catch (error) {
        console.log(error);
        toast.error("Invalid username or password");
      } finally {
        setIsLoading(false);
      }
    }, 1000); // Simulate 1-second delay
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          {/* Hospital SVG Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-16 h-16 mb-4 text-blue-600">
            <path d="M14 2H10V7H5v6h5v5h4v-5h5V7h-5z" />
          </svg>
          <h1 className="text-2xl font-bold text-blue-600 mb-4">Sign In</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className={`w-full bg-blue-950 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 mr-3 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z" />
              </svg>
            ) : null}
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        {/* Links for Forgot Password and Sign Up */}
        <div className="text-center mt-4">
          <Link to="/forgotpassword" className="text-blue-600 hover:underline text-sm block">
            Forgot Password?
          </Link>
          <Link to="/signup" className="text-blue-600 hover:underline text-sm block">
            Don’t have an account? Create one
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

