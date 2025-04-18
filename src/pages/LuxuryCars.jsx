import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../context/DarkModeContext';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSun, FiMoon } from 'react-icons/fi';

// Import local images from assets
import urus from '../assets/Urus.png';
import rollsRoyce from '../assets/RollsRoyce.png';
import maybach from '../assets/Maybach.png';

const LuxuryCars = () => {
  const { darkMode, toggleTheme } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('User');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const luxuryCars = [
    {
      id: 1,
      name: 'Urus',
      image: urus,
      route: '/cars/urus-detail',
      mileage: '8KM',
      price: '₹10,000/Day',
      features: ['4.0L V8 Engine', '650 HP', '0-100km/h in 3.6s']
    },
    {
      id: 2,
      name: 'Rolls-Royce',
      image: rollsRoyce,
      route: '/cars/rollsroyce-detail',
      mileage: '8KM',
      price: '₹15,000/Day',
      features: ['6.75L V12 Engine', '563 HP', 'Handcrafted Luxury']
    },
    {
      id: 3,
      name: 'Maybach',
      image: maybach,
      route: '/cars/maybach-detail',
      mileage: '8KM',
      price: '₹12,000/Day',
      features: ['4.0L V8 Biturbo', '496 HP', 'Executive Seating']
    }
  ];

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className={`w-16 h-16 border-4 ${darkMode ? 'border-yellow-500' : 'border-yellow-400'} border-t-transparent rounded-full`}
        />
      </div>
    );
  }

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen w-screen flex flex-col transition-colors duration-500`}>
      {/* Header with Back Button and Theme Toggle */}
      <header className="relative p-6">
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/car-selection')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} transition-colors`}
        >
          <FiArrowLeft className="text-yellow-500" size={20} />
          <span className="font-medium">Back</span>
        </motion.button>

        <motion.button
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={toggleTheme}
          className={`p-2 absolute top-6 right-6 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
        >
          {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon />}
        </motion.button>
      </header>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center flex-grow p-4 sm:p-8"
      >
        <div className="max-w-2xl mb-8 text-center">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-2 text-3xl font-bold sm:text-4xl"
          >
            Hello, {username}
          </motion.h1>
          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-xl font-medium text-yellow-500 sm:text-2xl"
          >
            Experience Unmatched Luxury
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.5 }}
            className={`h-1 ${darkMode ? 'bg-yellow-600' : 'bg-yellow-400'} rounded-full`}
          />
        </div>

        <div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {luxuryCars.map((car) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(car.route)}
              className={`relative cursor-pointer rounded-2xl overflow-hidden shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className="flex flex-col items-center p-6">
                {/* Mileage Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-yellow-100 text-yellow-800'}`}>
                  {car.mileage}
                </div>

                {/* Car Image */}
                <div className="relative w-full h-48 mb-6 sm:h-56 md:h-64">
                  <motion.img
                    src={car.image}
                    alt={car.name}
                    className="object-contain w-full h-full"
                    whileHover={{ scale: 1.05 }}
                  />
                </div>

                {/* Car Details */}
                <div className="w-full text-center">
                  <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-yellow-400' : 'text-gray-800'}`}>
                    {car.name}
                  </h3>
                  <p className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {car.price}
                  </p>
                  
                  {/* Features List */}
                  <ul className="mb-6 text-left">
                    {car.features.map((feature, i) => (
                      <li key={i} className={`flex items-center mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${darkMode ? 'bg-yellow-500' : 'bg-yellow-400'}`}></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Explore Button */}
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: darkMode ? '#D97706' : '#F59E0B' }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-lg font-medium ${darkMode ? 'bg-yellow-600 text-white' : 'bg-yellow-500 text-gray-900'} mt-auto`}
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        
      </motion.main>
    </div>
  );
};

export default LuxuryCars;
