import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../context/DarkModeContext';
import { motion } from 'framer-motion';

// Import local images from assets
import ertigaImage from '../assets/Ertiga.png';
import crystaImage from '../assets/Crysta.png';
import urbaniaImage from '../assets/Urbania.png';

const FamilyCars = () => {
  const { darkMode, toggleTheme } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('User');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const carCardVariants = {
    hover: {
      y: -10,
      boxShadow: darkMode 
        ? "0 10px 25px rgba(234, 179, 8, 0.3)" 
        : "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen w-screen flex flex-col transition-colors duration-500`}
    >
      {/* Header with back button and theme toggle */}
      <header className="relative flex items-center justify-between w-full px-4 py-6 sm:px-8">
        <motion.button
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 text-lg font-semibold text-yellow-500 bg-transparent hover:underline"
          onClick={() => navigate('/car-selection')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className={`p-2 w-10 h-10 flex items-center justify-center rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-yellow-600'} transition-colors duration-300 shadow-md`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          )}
        </motion.button>
      </header>

      {/* Main Content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center flex-grow px-4 py-8 sm:px-8"
      >
        <motion.div variants={itemVariants} className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold sm:text-4xl">Hello {username},</h2>
          <p className="text-xl font-medium text-yellow-500 sm:text-2xl">
            Spend Quality Time with Your Family
          </p>
          {/* Added Underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.5 }}
            className={`h-1 ${darkMode ? 'bg-yellow-600' : 'bg-yellow-400'} rounded-full mt-2`}
          />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-3"
        >
          {/* Ertiga */}
          <motion.div 
            variants={itemVariants}
            whileHover="hover"
            variants={carCardVariants}
            onClick={() => navigate('/cars/ertiga-detail')}
            className={`flex flex-col items-center cursor-pointer ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-2xl border-2 ${darkMode ? 'border-yellow-500' : 'border-yellow-400'} transition-all duration-300 shadow-lg`}
          >
            <div className="flex justify-between w-full mb-4">
              <span className="px-3 py-1 text-sm font-medium text-gray-900 bg-yellow-500 rounded-full">
                10KM/L
              </span>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                Family
              </span>
            </div>
            <img 
              src={ertigaImage} 
              alt="Ertiga" 
              className="object-contain w-full h-64 transition-transform duration-500 hover:scale-110" 
            />
            <div className="w-full mt-6 text-center">
              <h3 className="text-2xl font-bold">Ertiga</h3>
              <p className="mt-2 font-semibold text-yellow-500">₹10,000 <span className="text-sm">/ day</span></p>
              <button className="px-6 py-2 mt-4 font-medium text-gray-900 transition-colors duration-300 bg-yellow-500 rounded-full hover:bg-yellow-600">
                View Details
              </button>
            </div>
          </motion.div>

          {/* Crysta */}
          <motion.div 
            variants={itemVariants}
            whileHover="hover"
            variants={carCardVariants}
            onClick={() => navigate('/cars/crysta-detail')}
            className={`flex flex-col items-center cursor-pointer ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-2xl border-2 ${darkMode ? 'border-yellow-500' : 'border-yellow-400'} transition-all duration-300 shadow-lg`}
          >
            <div className="flex justify-between w-full mb-4">
              <span className="px-3 py-1 text-sm font-medium text-gray-900 bg-yellow-500 rounded-full">
                8KM/L
              </span>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                Luxury
              </span>
            </div>
            <img 
              src={crystaImage} 
              alt="Crysta" 
              className="object-contain w-full h-64 transition-transform duration-500 hover:scale-110" 
            />
            <div className="w-full mt-6 text-center">
              <h3 className="text-2xl font-bold">Crysta</h3>
              <p className="mt-2 font-semibold text-yellow-500">₹12,000 <span className="text-sm">/ day</span></p>
              <button className="px-6 py-2 mt-4 font-medium text-gray-900 transition-colors duration-300 bg-yellow-500 rounded-full hover:bg-yellow-600">
                View Details
              </button>
            </div>
          </motion.div>

          {/* Urbania */}
          <motion.div 
            variants={itemVariants}
            whileHover="hover"
            variants={carCardVariants}
            onClick={() => navigate('/cars/urbania-detail')}
            className={`flex flex-col items-center cursor-pointer ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-2xl border-2 ${darkMode ? 'border-yellow-500' : 'border-yellow-400'} transition-all duration-300 shadow-lg`}
          >
            <div className="flex justify-between w-full mb-4">
              <span className="px-3 py-1 text-sm font-medium text-gray-900 bg-yellow-500 rounded-full">
                7KM/L
              </span>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                Premium
              </span>
            </div>
            <img 
              src={urbaniaImage} 
              alt="Urbania" 
              className="object-contain w-full h-64 transition-transform duration-500 hover:scale-110" 
            />
            <div className="w-full mt-6 text-center">
              <h3 className="text-2xl font-bold">Urbania</h3>
              <p className="mt-2 font-semibold text-yellow-500">₹15,000 <span className="text-sm">/ day</span></p>
              <button className="px-6 py-2 mt-4 font-medium text-gray-900 transition-colors duration-300 bg-yellow-500 rounded-full hover:bg-yellow-600">
                View Details
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.main>
    </motion.div>
  );
};

export default FamilyCars;
