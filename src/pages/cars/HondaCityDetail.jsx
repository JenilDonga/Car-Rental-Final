// src/pages/cars/HondaCityDetail.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../context/DarkModeContext';

import hondaCityImage from '../../assets/HondaCity.png';

const carDescription = `
The Honda City is a premium sedan known for its sleek design, 
smooth handling, and fuel efficiency. An excellent choice for both 
city commuting and long-distance journeys.
`;

const HondaCityDetail = () => {
  const { darkMode, toggleTheme } = useContext(DarkModeContext); 
  const navigate = useNavigate();
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [totalAmount, setTotalAmount] = useState(7000);
  const [typedText, setTypedText] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);

  // Update total amount when the duration changes
  useEffect(() => {
    setTotalAmount(7000 * selectedDuration);
  }, [selectedDuration]);

  // Typing animation for car description
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < carDescription.length) {
        setTypedText(carDescription.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  // Navigate to the payment page with car details
  const handlePayment = () => {
    navigate('/payment', {
      state: {
        carName: 'Honda City',
        totalAmount: totalAmount,
        carImage: hondaCityImage,
      },
    });
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen w-screen flex flex-col items-center justify-center transition duration-500 p-6`}>      

      {/* Light/Dark Mode Toggle */}
      <button
        onClick={toggleTheme}
        className={`p-2 w-12 h-12 absolute top-6 right-6 flex items-center justify-center rounded-full ${darkMode ? 'bg-gray-800 text-amber-400 hover:bg-gray-700' : 'bg-white text-amber-600 hover:bg-gray-100'} transition-all duration-300 shadow-lg z-10`}
      >
        {darkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path fillRule="evenodd" d="M20.354 15.354A9 9 0 018.646 3.646A9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      {/* Back Button */}
      <button
        className={`absolute px-5 py-2.5 text-lg font-semibold ${darkMode ? 'text-amber-400 hover:text-amber-300' : 'text-amber-600 hover:text-amber-700'} bg-transparent top-6 left-6 transition-all duration-300 flex items-center group z-10`}
        onClick={() => navigate('/compact-cars')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Compact Cars
      </button>

      <div className="relative z-0 flex flex-col w-full gap-8 lg:flex-row max-w-7xl lg:gap-16">
        {/* Left Side - Details */}
        <div className="flex flex-col items-start justify-center w-full px-4 space-y-6 lg:w-1/2 lg:px-0">
          <h1 className="text-5xl font-bold text-transparent lg:text-6xl bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text">
            Honda City
          </h1>

          {/* Key Specs */}
          <div className="grid w-full grid-cols-2 gap-4 mt-4">
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <p className="text-sm font-medium text-gray-500">Engine</p>
              <p className="text-xl font-bold">1.5L i-VTEC</p>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <p className="text-sm font-medium text-gray-500">Horsepower</p>
              <p className="text-xl font-bold">119 HP</p>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <p className="text-sm font-medium text-gray-500">0-100 km/h</p>
              <p className="text-xl font-bold">10.5s</p>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <p className="text-sm font-medium text-gray-500">Top Speed</p>
              <p className="text-xl font-bold">185 km/h</p>
            </div>
          </div>

          {/* Duration Selection */}
          <div className="w-full mt-6">
            <p className="mb-3 text-xl font-semibold">Select Rental Duration</p>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDuration(day)}
                  className={`px-5 py-2.5 rounded-lg transition-all duration-300 ${selectedDuration === day 
                    ? 'bg-amber-500 text-white shadow-lg' 
                    : darkMode 
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'} shadow-md`}
                >
                  {day} {day === 1 ? 'Day' : 'Days'}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing and Total Amount */}
          <div className={`p-6 rounded-xl w-full mt-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-lg font-medium">Daily Rate</p>
              <p className="text-xl font-bold">₹7,000/Day</p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-300/30">
              <p className="text-xl font-bold">Total Amount</p>
              <p className="text-2xl font-extrabold text-amber-500">₹{totalAmount.toLocaleString()}</p>
            </div>
          </div>

          {/* Book Now Button */}
          <button
            className={`w-full px-8 py-4 mt-4 text-xl font-bold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95`}
            onClick={handlePayment}
          >
            Book Now
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Right Side - Car Image and Description */}
        <div className="flex flex-col items-center justify-center w-full mt-8 lg:w-1/2 lg:mt-0">
          <div className={`relative w-full max-w-2xl h-96 lg:h-[550px] transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <img 
              src={hondaCityImage} 
              alt="Honda City" 
              className="object-contain w-full h-full"
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-xl"></div>
            )}
          </div>
          
          <div className={`mt-6 p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg w-full`}>
            <h3 className="mb-4 text-2xl font-bold text-amber-500">About This Vehicle</h3>
            <p className="text-lg leading-relaxed">
              {typedText}
              {typedText.length < carDescription.length && (
                <span className="inline-block w-2 h-6 ml-1 bg-amber-500 animate-pulse"></span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HondaCityDetail;
