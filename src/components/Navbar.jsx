import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { DarkModeContext } from '../context/DarkModeContext';

const Navbar = ({ activePage }) => {
  const { darkMode, toggleTheme } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Check if the user is logged in on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  // Handle Click Outside to Close Dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle Dropdown Visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('username');
    setLoggedIn(false);
    setUsername('');
    setShowDropdown(false);
    navigate('/landing');
  };

  return (
    <div className={`${darkMode ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600' : 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600'} w-full py-4 px-8 shadow-lg`}>
      <div className="container flex items-center justify-between mx-auto">
        <h1 className={`text-3xl font-extrabold ${darkMode ? 'text-yellow-300' : 'text-white'} transition duration-300 ease-in-out`}>Car Rental</h1>

        {/* Navbar Links */}
        <div className="flex items-center space-x-8 text-lg">
          <nav className="hidden space-x-6 md:flex">
            <span
              className={`${activePage === 'Home' ? 'font-bold text-yellow-500' : 'text-white'} cursor-pointer hover:text-yellow-500 transition-all duration-300`}
              onClick={() => navigate('/landing')}
            >
              Home
            </span>
            <span
              className={`${activePage === 'Cars' ? 'font-bold text-yellow-500' : 'text-white'} cursor-pointer hover:text-yellow-500 transition-all duration-300`}
              onClick={() => navigate('/car-selection')}
            >
              Cars
            </span>
            <span
              className={`${activePage === 'About Us' ? 'font-bold text-yellow-500' : 'text-white'} cursor-pointer hover:text-yellow-500 transition-all duration-300`}
              onClick={() => navigate('/about-us')}
            >
              About Us
            </span>
          </nav>

          {/* Profile Icon with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className={`p-1 text-3xl transition duration-300 transform rounded-full 
                ${darkMode ? 'text-yellow-300 bg-gray-700' : 'text-gray-900 bg-gray-300'} 
                hover:scale-110 hover:bg-gray-200`}
            >
              <FaUserCircle />
            </button>
            {showDropdown && (
              <div className={`absolute right-0 mt-2 py-2 w-48 rounded-lg shadow-lg transition-all duration-300 
                ${darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-gray-200 text-gray-900'}`}>
                {loggedIn ? (
                  <>
                    <div className={`px-4 py-2 text-lg font-semibold ${darkMode ? 'text-yellow-300' : 'text-gray-900'}`}>
                      {username}
                    </div>
                    <button
                      onClick={handleLogout}
                      className={`w-full px-4 py-2 text-left transition duration-200 
                        ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'} 
                        ${darkMode ? 'text-yellow-300' : 'text-gray-900'} 
                        flex items-center justify-center rounded-md`}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigate('/login');
                        setShowDropdown(false);
                      }}
                      className={`w-full px-4 py-2 text-left transition duration-200 
                        ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'} 
                        ${darkMode ? 'text-yellow-300' : 'text-gray-900'} 
                        flex items-center justify-center rounded-md`}
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        navigate('/register');
                        setShowDropdown(false);
                      }}
                      className={`w-full px-4 py-2 text-left transition duration-200 
                        ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'} 
                        ${darkMode ? 'text-yellow-300' : 'text-gray-900'} 
                        flex items-center justify-center rounded-md`}
                    >
                      Signup
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Light/Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 w-10 h-10 flex items-center justify-center rounded-full 
              ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-300 text-gray-900'} transition duration-300 transform hover:scale-110`}
          >
            {darkMode ? '🌙' : '🌞'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
