import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../context/DarkModeContext';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useContext(DarkModeContext);

  const adminOptions = [
    { title: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { title: 'Car Management', path: '/admin/cars', icon: '🚗' },
    { title: 'Booking Management', path: '/admin/bookings', icon: '📅' },
    { title: 'User Management', path: '/admin/users', icon: '👥' },
    { title: 'Payment Management', path: '/admin/payments', icon: '💳' },
    { title: 'Home', path: '/landing', icon: '🏠' }
  ];

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} min-h-screen w-screen flex flex-col transition-colors duration-300`}>
      
      {/* Header */}
      <header className={`w-full relative px-4 py-4 flex items-center ${darkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
  {/* Back Button */}
  <button
    onClick={() => navigate('/landing')}
    className={`flex items-center px-4 py-2 rounded-lg transition ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
  >
    <span className="mr-2 text-xl">←</span>
    <span className="font-medium">Back to Landing</span>
  </button>

  {/* Admin Panel Title - Centered */}
  <h1 className="absolute text-3xl font-bold text-center transform -translate-x-1/2 left-1/2 whitespace-nowrap">
    <span className="text-yellow-500">Admin</span> Panel
  </h1>

  {/* Theme Toggle Button */}
  <div className="ml-auto">
    <button
      onClick={toggleTheme}
      className={`p-2 w-10 h-10 flex items-center justify-center rounded-full transition ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
    >
      {darkMode ? '🌙' : '🌞'}
    </button>
  </div>
</header>

      {/* Main */}
      <main className="flex-grow w-full px-4 py-8">
        <div className="grid grid-cols-1 gap-6 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-3">
          {adminOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => navigate(option.path)}
              className={`flex flex-col items-center p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-md hover:shadow-lg`}
            >
              <span className="mb-3 text-4xl">{option.icon}</span>
              <h2 className="mb-1 text-xl font-semibold">{option.title}</h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Click to manage</p>
              <div className={`w-16 h-1 rounded-full mt-3 ${darkMode ? 'bg-yellow-500' : 'bg-yellow-400'}`}></div>
            </button>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-4 py-6 mt-auto text-center">
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Admin Panel © {new Date().getFullYear()} – All rights reserved
        </p>
      </footer>
    </div>
  );
};

export default AdminPanel;
