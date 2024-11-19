import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token');
    }
  }, [token]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Password strength validation (basic example)
    if (newPassword.length < 8) {
      setPasswordStrength('Password is too short');
    } else if (!/[A-Z]/.test(newPassword)) {
      setPasswordStrength('Password must contain at least one uppercase letter');
    } else if (!/[0-9]/.test(newPassword)) {
      setPasswordStrength('Password must contain at least one number');
    } else {
      setPasswordStrength('');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    // Check for password strength
    if (passwordStrength) {
      setError('Please ensure your password meets the required strength criteria');
      setIsSubmitting(false);
      return;
    }

    try {
      // Sending the password reset request to the backend API
      const response = await axios.post(`http://localhost:5000/resetpassword/${token}`, { newPassword: password });
      setIsSubmitting(false);
      if (response.status === 200) {
        setIsSuccess(true);
        // Optionally redirect user after success
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      }
    } catch (err) {
      setIsSubmitting(false);
      if (err) {
        // Backend error response
        setError('An error occurred. Please try again later.');
      } else {
        // Network or other errors
        setError('Network error. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Reset Your Password</h2>

        {isSuccess ? (
          <div className="text-center text-green-600">
            <h3 className="text-xl">Password Reset Successfully</h3>
            <p>You can now use your new password to log in.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
                className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter new password"
              />
              {passwordStrength && <p className="text-red-500 text-xs mt-1">{passwordStrength}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Confirm your new password"
              />
            </div>

            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-blue-600 text-white px-6 py-2 rounded-md font-semibold ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
              >
                {isSubmitting ? 'Submitting...' : 'Reset Password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;

