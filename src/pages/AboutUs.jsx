// src/pages/AboutUs.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { DarkModeContext } from '../context/DarkModeContext';

// Import car images
import luxuryCar from '../assets/Luxury.png';
import familyCar from '../assets/Family.png';
import compactCar from '../assets/Compact.png';
import urus from '../assets/Urus.png';
import rollsRoyce from '../assets/RollsRoyce.png';
import maybach from '../assets/Maybach.png';
import ertigaImage from '../assets/Ertiga.png';
import crystaImage from '../assets/Crysta.png';
import urbaniaImage from '../assets/Urbania.png';
import cityImage from '../assets/HondaCity.png';

const carImages = [
  luxuryCar, familyCar, compactCar, urus, rollsRoyce,
  maybach, ertigaImage, crystaImage, urbaniaImage, cityImage,
];

const AboutUs = () => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useContext(DarkModeContext);
  const [typedText, setTypedText] = useState('');
  const description = `
  Welcome to Car Rental, your ultimate car rental destination. 
Our mission is to make car rentals easy, affordable, and convenient. 
With a wide selection of luxury, family, and compact cars, 
we cater to every journey. Whether you want to make an impression with a luxury car, 
enjoy a family trip with a spacious SUV, or cruise the city in a compact ride, we have you covered. 
Our user-friendly platform and professional service ensure a seamless rental experience. 
Join us at Car Rental and drive with confidence! `;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < description.length) {
        setTypedText((prev) => prev + description[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-50 to-gray-200 text-gray-900'} min-h-screen w-screen flex flex-col items-center justify-center transition-colors duration-500 p-6 overflow-hidden`}>
      {/* Navigation Controls */}
      <div className="absolute z-10 flex justify-between top-6 left-6 right-6">
        <button
          onClick={() => navigate('/landing')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-white hover:bg-gray-100 text-yellow-600'} shadow-md hover:shadow-lg`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </button>
        
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full flex items-center justify-center transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300' : 'bg-white hover:bg-gray-100 text-yellow-600'} shadow-md`}
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>

      <div className="flex flex-col items-center justify-center w-full max-w-6xl gap-12 mt-16 md:flex-row">
        {/* Car Carousel with Enhanced Styling */}
        <div className="relative w-full md:w-1/2 group">
          <div className={`absolute -inset-1 rounded-xl ${darkMode ? 'bg-gradient-to-r from-yellow-600 to-yellow-800' : 'bg-gradient-to-r from-yellow-400 to-yellow-600'} blur opacity-75 group-hover:opacity-100 transition duration-500`}></div>
          <div className="relative overflow-hidden rounded-xl">
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              showArrows={true}
              showIndicators={true}
              className="rounded-lg"
              interval={3000}
              stopOnHover={true}
              dynamicHeight={false}
              emulateTouch={true}
              swipeable={true}
            >
              {carImages.map((image, index) => (
                <div key={index} className="flex items-center justify-center h-96">
                  <img 
                    src={image} 
                    alt={`Car ${index + 1}`} 
                    className="object-contain w-full h-full rounded-xl" 
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>

        {/* Text with Enhanced Typography */}
        <div className="w-full px-4 md:w-1/2">
          <div className="relative">
            <h2 className={`mb-6 text-5xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'} tracking-tight`}>
              About Us
              <span className={`block w-20 h-1 mt-2 ${darkMode ? 'bg-yellow-500' : 'bg-yellow-400'}`}></span>
            </h2>
            
            <div className="relative">
              <div className={`absolute -inset-1 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}></div>
              <div className={`relative p-6 rounded-lg ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className="text-lg font-medium leading-relaxed">
                  {typedText}
                  <span className={`inline-block ml-1 w-2 h-6 ${darkMode ? 'bg-yellow-400' : 'bg-yellow-500'} animate-pulse`}></span>
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <div className={`flex-1 min-w-[200px] p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Our Mission</h3>
                <p className="text-sm">To provide exceptional car rental experiences with quality vehicles and outstanding service.</p>
              </div>
              <div className={`flex-1 min-w-[200px] p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Our Vision</h3>
                <p className="text-sm">To become the most trusted car rental service worldwide.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      {!darkMode && (
        <>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400 rounded-full filter blur-3xl opacity-20 -z-10"></div>
          <div className="absolute right-0 w-48 h-48 bg-yellow-300 rounded-full top-1/4 filter blur-3xl opacity-20 -z-10"></div>
        </>
      )}
    </div>
  );
};

export default AboutUs;