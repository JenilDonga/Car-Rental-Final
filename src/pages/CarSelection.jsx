import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { DarkModeContext } from '../context/DarkModeContext';
import { motion } from 'framer-motion';
import luxuryCar from '../assets/Luxury.png';
import familyCar from '../assets/Family.png';
import compactCar from '../assets/Compact.png';

const CarSelection = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  const [username, setUsername] = useState('User');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    // Simulate loading delay for better UX
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const carTypes = [
    {
      id: 1,
      name: 'Luxury Cars',
      image: luxuryCar,
      route: '/luxury-cars',
      description: 'Premium comfort and performance for your distinguished travels',
      bgColor: darkMode ? 'from-gray-800 to-gray-900' : 'from-gray-200 to-gray-300',
    },
    {
      id: 2,
      name: 'Family Cars',
      image: familyCar,
      route: '/family-cars',
      description: 'Spacious and safe vehicles for your loved ones',
      bgColor: darkMode ? 'from-gray-800 to-gray-900' : 'from-gray-200 to-gray-300',
    },
    {
      id: 3,
      name: 'Compact Cars',
      image: compactCar,
      route: '/compact-cars',
      description: 'Efficient and agile for city driving',
      bgColor: darkMode ? 'from-gray-800 to-gray-900' : 'from-gray-200 to-gray-300',
    },
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
      <Navbar activePage="Cars" />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center flex-grow p-4 sm:p-8"
      >
        <div className="mb-8 text-center">
          <motion.h2 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-2 text-3xl font-bold sm:text-4xl"
          >
            Hello, {username}!
          </motion.h2>
          <motion.p 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl font-medium text-yellow-500 sm:text-2xl"
          >
            Choose your perfect ride
          </motion.p>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`h-1 mt-2 ${darkMode ? 'bg-yellow-600' : 'bg-yellow-400'} rounded-full`}
          />
        </div>

        <div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {carTypes.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(car.route)}
              className={`relative cursor-pointer rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br ${car.bgColor} ${darkMode ? 'border border-gray-700' : 'border border-gray-200'}`}
            >
              <div className="flex flex-col items-center p-6">
                <div className="relative w-full h-48 mb-4 sm:h-56 md:h-64">
                  <motion.img 
                    src={car.image} 
                    alt={car.name}
                    className="object-contain w-full h-full"
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
                <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  {car.name}
                </h3>
                <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  {car.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: darkMode ? '#D97706' : '#F59E0B' }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-full font-medium ${darkMode ? 'bg-yellow-600 text-white' : 'bg-yellow-500 text-gray-900'}`}
                >
                  Explore
                </motion.button>
              </div>
              <motion.div 
                className={`absolute bottom-0 left-0 right-0 h-1 ${darkMode ? 'bg-yellow-600' : 'bg-yellow-400'}`}
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.7 }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CarSelection;