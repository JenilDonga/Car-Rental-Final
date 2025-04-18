// src/components/CarDetail.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../context/DarkModeContext'; // Use global dark mode context

const CarDetail = ({ carName, carImage, pricePerDay }) => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useContext(DarkModeContext); // Access global dark mode context
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [totalAmount, setTotalAmount] = useState(pricePerDay);

  // Calculate total amount when duration changes
  useEffect(() => {
    setTotalAmount(pricePerDay * selectedDuration);
  }, [selectedDuration, pricePerDay]);

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen w-screen flex flex-col items-center justify-center transition duration-500 p-6`}>
      
      {/* Light/Dark Mode Toggle */}
      <button
        onClick={toggleTheme}
        className={`p-2 w-10 h-10 absolute top-4 right-4 flex items-center justify-center rounded-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900'} transition duration-300`}
      >
        {darkMode ? '🌙' : '🌞'}
      </button>

      <div className="flex flex-col items-center justify-center w-full max-w-3xl gap-8">
        <h2 className="text-5xl font-bold text-yellow-500">{carName}</h2>
        <img src={carImage} alt={carName} className="object-contain rounded-md shadow-lg w-80 h-80" />

        {/* Duration Selection */}
        <div className="flex flex-col items-center">
          <p className="mb-2 text-xl font-semibold">Select Duration (Days)</p>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDuration(day)}
                className={`p-2 w-12 h-12 rounded-full ${selectedDuration === day ? 'bg-yellow-500 text-white' : 'bg-gray-700 text-gray-300'} transition duration-300`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing and Total Amount */}
        <div className="text-center">
          <p className="mt-4 text-2xl font-bold">₹{pricePerDay}/Day</p>
          <p className="mt-2 text-xl font-semibold">Total Amount: ₹{totalAmount}</p>
        </div>

        {/* Pay Now Button */}
        <button
          className="px-8 py-3 mt-6 font-semibold text-white transition duration-300 bg-yellow-500 rounded-md hover:bg-yellow-600"
          onClick={() => alert(`Booking ${carName} for ${selectedDuration} day(s) - ₹${totalAmount}`)}
        >
          Pay Now &rarr;
        </button>

        {/* Back Button */}
        <button
          className="mt-4 text-sm text-yellow-500 underline hover:text-yellow-600"
          onClick={() => navigate('/car-selection')}
        >
          Back to Car Selection
        </button>
      </div>
    </div>
  );
};

export default CarDetail;
