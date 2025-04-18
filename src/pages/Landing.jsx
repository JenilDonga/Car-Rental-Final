// src/pages/Landing.jsx
import React, { useContext, useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaArrowRight } from 'react-icons/fa';
import { BsCamera, BsArrowRight } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import { DarkModeContext } from '../context/DarkModeContext';
import carImage from '../assets/Gwagon.png';

const Landing = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

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

  const handleLogin = () => {
    setLoggedIn(true);
    setShowDropdown(false);
    navigate('/login');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setProfilePic(null);
    setShowDropdown(false);
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} flex flex-col min-h-screen w-full transition-colors duration-300`}>
      
      <Navbar activePage="Home" />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-grow w-full px-4 md:flex-row md:px-8 lg:px-16 xl:px-32">
        <div className="w-full p-6 text-center md:w-1/2 md:text-left md:p-10 lg:p-12">
          <p className="mb-2 text-lg font-semibold text-yellow-500 md:text-xl lg:text-2xl">
            Premium Car Rental Service
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl xl:text-7xl">
            Drive Your Dream <span className="text-yellow-500">Car</span> Today
          </h1>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-300 md:text-xl lg:max-w-2xl">
            Experience luxury and performance with our premium fleet. Rent the perfect car for your journey with just a few clicks.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <button 
              className="flex items-center justify-center px-8 py-3 text-lg font-semibold text-white transition-all duration-300 transform bg-yellow-500 rounded-lg hover:bg-yellow-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
              onClick={() => navigate('/car-selection')}
            >
              Get Started <BsArrowRight className="ml-2" />
            </button>
          </div>
        </div>
        
        <div className="relative w-full mt-12 md:w-1/2 md:mt-0">
          <img 
            src={carImage} 
            alt="Luxury Car" 
            className="w-full max-w-lg mx-auto transition-all duration-500 transform hover:scale-105" 
          />
          <div className={`absolute -bottom-6 -left-6 w-32 h-32 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl flex items-center justify-center z-0`}>
            <span className="text-xs font-semibold text-yellow-500">FROM ₹7000/DAY</span>
          </div>
          <div className={`absolute -top-6 -right-6 w-40 h-40 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl flex items-center justify-center z-0`}>
            <span className="text-sm font-bold text-yellow-500">PREMIUM FLEET</span>
          </div>
        </div>
      </section>

      {/* User Dropdown Menu */}
      {showDropdown && (
        <div 
          ref={dropdownRef} 
          className={`absolute z-50 rounded-lg shadow-xl top-16 right-10 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} overflow-hidden transition-all duration-200`}
        >
          <div className="flex items-center p-4 space-x-3 border-b border-gray-200 dark:border-gray-700">
            <FaUserCircle size={32} className="text-yellow-500" />
            <div>
              <p className="font-medium">{loggedIn ? 'Welcome Back' : 'Guest User'}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {loggedIn ? 'Premium Member' : 'Sign in for more features'}
              </p>
            </div>
          </div>
          <button
            onClick={loggedIn ? handleLogout : handleLogin}
            className="flex items-center w-full px-4 py-3 text-left transition-colors duration-200 hover:bg-yellow-500 hover:bg-opacity-20"
          >
            <span className="flex-grow">{loggedIn ? 'Logout' : 'Login'}</span>
            <FaArrowRight className="text-yellow-500" />
          </button>
          {loggedIn && (
            <>
              <button className="flex items-center w-full px-4 py-3 text-left transition-colors duration-200 hover:bg-yellow-500 hover:bg-opacity-20">
                My Bookings
              </button>
              <button className="flex items-center w-full px-4 py-3 text-left transition-colors duration-200 hover:bg-yellow-500 hover:bg-opacity-20">
                Account Settings
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Landing;