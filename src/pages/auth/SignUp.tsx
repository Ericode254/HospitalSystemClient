import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Ensure you're using React Router
import axios from 'axios';
import toast from 'react-hot-toast';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    username: '',
    password: '',
    //role: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.phoneNumber || !formData.username || !formData.password || !formData.email) {
      toast.error('All fields are required');
      return;
    }

    setIsLoading(true);

    setTimeout(async () => {
      try {
        const response = await axios.post('http://localhost:5000/register', formData, { withCredentials: true });
        toast.success(response.data.message || 'Registration successful!');
        navigate('/signin');
      } catch (error) {
        console.log(error);
        toast.error('Error registering user');
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          {/* Hospital SVG Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-16 h-16 mb-4 text-blue-600">
            <path d="M14 2H10V7H5v6h5v5h4v-5h5V7h-5z" />
          </svg>
          <h1 className="text-2xl font-bold text-blue-600 mb-4">Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name and Last Name */}
          <div className="flex space-x-2">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-1/2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-1/2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />


          {/* Other Fields */}
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
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
          {/*
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          /> */}
          <button
            type="submit"
            className={`w-full bg-blue-950 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        {/* Links for Already Registered */}
        <div className="text-center mt-4">
          <Link to="/signin" className="text-blue-600 hover:underline text-sm block">
            Already registered? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

