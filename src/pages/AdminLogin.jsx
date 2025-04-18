import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  // Toggle between light and dark modes
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Handle Admin Login
  const handleAdminLogin = () => {
    // Static admin credentials
    const adminCredentials = {
      username: 'admin',
      password: 'admin'
    };

    if (username === adminCredentials.username && password === adminCredentials.password) {
      localStorage.setItem('username', 'admin');
      navigate('/admin');
    } else {
      setError('Invalid admin username or password');
    }
  };

  // Redirect to Login page
  const handleUserLogin = () => {
    navigate('/login');
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen w-screen flex flex-col items-center justify-center transition duration-500`}>

      {/* Navbar with Light/Dark Mode Toggle */}
      <div className={`${darkMode ? 'bg-yellow-600' : 'bg-yellow-400'} w-full py-4 px-8`}>
        <div className="container flex items-center justify-between mx-auto">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <button
            onClick={toggleTheme}
            className={`p-2 w-10 h-10 flex items-center justify-center rounded-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900'} transition duration-300`}
          >
            {darkMode ? '🌙' : '🌞'}
          </button>
        </div>
      </div>

      {/* Admin Login Form */}
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-md p-8 space-y-6 bg-opacity-50 shadow-lg rounded-xl">
        {/* Admin Icon */}
        <FaUserShield className="mb-4 text-8xl" />
        <h2 className="mb-4 text-4xl font-bold">Admin Login</h2>
        {error && <p className="mb-2 text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Admin Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-900'} w-full p-3 rounded-lg`}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-900'} w-full p-3 rounded-lg`}
        />
        <button
          onClick={handleAdminLogin}
          className={`${darkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-400 hover:bg-blue-500'} w-full py-3 rounded-lg text-lg font-semibold`}
        >
          Admin Login
        </button>

        {/* Back to User Login Link */}
        <div className="mt-4 text-lg">
          <p>
            Not an admin?{' '}
            <button
              onClick={handleUserLogin}
              className="text-yellow-500 underline hover:text-yellow-600"
              style={{ background: 'transparent' }}
            >
              User Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
