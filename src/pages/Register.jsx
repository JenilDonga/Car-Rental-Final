import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Toggle between light and dark modes
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters long.';
    }

    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email address.';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/api/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });

        if (response.status === 201) {
          setSuccessMessage('Registration successful!');
          setFormData({ username: '', email: '', password: '', confirmPassword: '' }); // Reset the form
          setTimeout(() => {
            navigate('/login');
          }, 1000); // Navigate to login after 1 second
        } else {
          setErrors({ general: 'Registration failed. Please try again.' });
        }
      } catch (error) {
        console.error('Error during registration:', error);

        if (error.response && error.response.data && error.response.data.error) {
          setErrors({ general: error.response.data.error });
        } else {
          setErrors({ general: 'Error registering. Please try again later.' });
        }
      }
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen w-screen flex items-center justify-center transition duration-500`}>
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className={`p-2 w-10 h-10 flex items-center justify-center rounded-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900'} transition duration-300`}
        >
          {darkMode ? '🌙' : '🌞'}
        </button>
      </div>
      <div className={`flex flex-col items-center justify-center w-full max-w-md p-8 rounded-md shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="mb-6 text-3xl font-bold text-center">Register</h2>

        {successMessage && <p className="mb-4 text-green-500">{successMessage}</p>}
        {errors.general && <p className="mb-4 text-red-500">{errors.general}</p>}

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'} focus:ring-yellow-500`}
              placeholder="Enter your username"
            />
            {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'} focus:ring-yellow-500`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'} focus:ring-yellow-500`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'} focus:ring-yellow-500`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className={`w-full py-2 mt-4 ${darkMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-yellow-400 hover:bg-yellow-500'} text-white font-semibold rounded-md transition duration-300`}
          >
            Register
          </button>
        </form>

        <p className="mt-4">
          Already have an account?{' '}
          <span
            className="text-yellow-500 cursor-pointer hover:underline"
            onClick={() => navigate('/login')}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
