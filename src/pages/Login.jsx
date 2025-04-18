import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Import eye icons for show/hide password

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  // Toggle between light and dark modes
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Handle Login
  const handleLogin = async () => {
    try {
      // Make a POST request to backend for login using username and password
      const response = await axios.post('http://localhost:5000/api/login', {
        username: username,  // Send username to backend (not email)
        password: password,  // Send password to backend
      });

      // On success, store the JWT token and username in localStorage
      localStorage.setItem('authToken', response.data.token);  // Save JWT token
      localStorage.setItem('username', username);  // Save username in localStorage

      navigate('/landing');  // Redirect to the landing page after successful login
    } catch (err) {
      console.error('Error during login:', err);
      setError('Invalid username or password');  // Display error message
    }
  };

  // Redirect to Sign Up page
  const handleSignUp = () => {
    navigate('/register');
  };

  // Redirect to Admin Login page
  const handleAdminLogin = () => {
    navigate('/adminlogin');
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen w-screen flex flex-col items-center justify-center transition duration-500`}>
      {/* Navbar with Light/Dark Mode Toggle */}
      <div className={`${darkMode ? 'bg-yellow-600' : 'bg-yellow-400'} w-full py-4 px-8`}>
        <div className="container flex items-center justify-between mx-auto">
          <h1 className="text-2xl font-bold">Car Rental</h1>
          <button
            onClick={toggleTheme}
            className={`p-2 w-10 h-10 flex items-center justify-center rounded-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900'} transition duration-300`}
          >
            {darkMode ? '🌙' : '🌞'}
          </button>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-md p-8 space-y-6 bg-opacity-50 shadow-lg rounded-xl">
        <FaUserCircle className="mb-4 text-8xl" />
        <h2 className="mb-4 text-4xl font-bold">Login</h2>
        {error && <p className="mb-2 text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-900'} w-full p-3 rounded-lg`}
        />
        
        {/* Password Input with Show/Hide functionality */}
        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'}  // Toggle between 'text' and 'password'
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-900'} w-full p-3 rounded-lg`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            className="absolute p-0 text-xl text-gray-400 transform -translate-y-1/2 bg-transparent right-3 top-1/2"
          >
              {showPassword ? <FaEyeSlash /> : <FaEye />}  {/* Show/Hide icon */}
          </button>

        </div>

        <button
          onClick={handleLogin}
          className={`${darkMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-yellow-400 hover:bg-yellow-500'} w-full py-3 rounded-lg text-lg font-semibold`}
        >
          Login
        </button>

        {/* Sign Up and Admin Login Links */}
        <div className="mt-4 text-lg">
          <p>
            Don't have an account?{' '}
            <button
              onClick={handleSignUp}
              className="text-yellow-500 underline hover:text-yellow-600"
              style={{ background: 'transparent' }}
            >
              Sign Up
            </button>
          </p>
          <p className="mt-2">
            Are you Admin? Login Here..{' '}
            <button
              onClick={handleAdminLogin}
              className="text-blue-500 underline hover:text-blue-600"
              style={{ background: 'transparent' }}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
