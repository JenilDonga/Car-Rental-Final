import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../context/DarkModeContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useContext(DarkModeContext);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalCars: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        const totalBookings = localStorage.getItem('totalBookings') || 0;
        const lastUserID = localStorage.getItem('lastUserID') || 0;
        const savedCars = localStorage.getItem('totalCars') || 9;
        const savedUsers = localStorage.getItem('totalUsers') || 17;

        const response = {
          totalBookings: parseInt(totalBookings),
          totalCars: parseInt(savedCars),
          totalUsers: parseInt(savedUsers),
          totalRevenue: 79000,
        };
        setStats(response);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatNumber = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const handleEdit = (field) => {
    const newValue = prompt(`Enter new value for ${field === 'totalCars' ? 'Total Cars' : 'Total Users'}`, stats[field]);
    if (newValue && !isNaN(newValue)) {
      const updatedStats = { ...stats, [field]: parseInt(newValue) };
      setStats(updatedStats);
      localStorage.setItem(field, newValue);
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen w-screen transition-colors duration-300`}>
      {/* Light/Dark Toggle */}
      <div className="flex justify-end w-full pt-3 pr-4">
        <button
          onClick={toggleTheme}
          className={`p-2 w-10 h-10 flex items-center justify-center rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? '🌙' : '🌞'}
        </button>
      </div>

      <div className="w-full px-4 py-2 md:px-8">
        {/* Header Section */}
        <header className="flex flex-col items-start justify-between mb-8 md:flex-row md:items-center">
          <div>
            <button
              onClick={() => navigate('/admin')}
              className={`px-4 py-2 text-lg font-semibold rounded-md flex items-center gap-2 mb-4 md:mb-0 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Admin
            </button>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Admin Dashboard</h2>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid w-full grid-cols-1 gap-6 mb-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Total Bookings', value: stats.totalBookings, color: 'bg-gradient-to-r from-yellow-400 to-yellow-500', icon: '📅' },
            {
              title: 'Total Cars', value: stats.totalCars, color: 'bg-gradient-to-r from-green-400 to-green-500', icon: '🚗',
              editable: true, field: 'totalCars'
            },
            {
              title: 'Total Users', value: stats.totalUsers, color: 'bg-gradient-to-r from-blue-400 to-blue-500', icon: '👥',
              editable: true, field: 'totalUsers'
            },
            { title: 'Total Revenue', value: `₹${formatNumber(stats.totalRevenue)}`, color: 'bg-gradient-to-r from-red-400 to-red-500', icon: '💰' },
          ].map((stat, index) => (
            <div
              key={index}
              className={`${stat.color} rounded-xl shadow-lg p-6 text-white transform hover:scale-[1.02] transition-transform duration-300`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold opacity-90">{stat.title}</h3>
                  {loading ? (
                    <div className="w-24 h-8 mt-4 bg-white rounded bg-opacity-20 animate-pulse"></div>
                  ) : (
                    <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                  )}
                </div>
                <span className="text-3xl opacity-80">{stat.icon}</span>
              </div>
              <div className={`h-1 mt-4 ${darkMode ? 'bg-black bg-opacity-20' : 'bg-white bg-opacity-30'} rounded-full`}>
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: `${loading ? '0%' : '100%'}`, transition: 'width 0.6s ease-out' }}
                ></div>
              </div>
              {/* Edit Button */}
              {stat.editable && (
                <button
                  onClick={() => handleEdit(stat.field)}
                  className="mt-4 text-sm underline hover:opacity-90"
                >
                  Edit
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="w-full">
          <h3 className="mb-4 text-xl font-semibold">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Manage Bookings', path: '/admin/bookings', color: 'bg-yellow-500 hover:bg-yellow-600', icon: '📅' },
              { title: 'Manage Cars', path: '/admin/cars', color: 'bg-green-500 hover:bg-green-600', icon: '🚗' },
              { title: 'Manage Users', path: '/admin/users', color: 'bg-blue-500 hover:bg-blue-600', icon: '👥' },
              { title: 'View Payments', path: '/admin/payments', color: 'bg-red-500 hover:bg-red-600', icon: '💰' },
            ].map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className={`${action.color} text-white rounded-lg p-4 flex items-center justify-between transition-colors duration-200 shadow-md hover:shadow-lg`}
              >
                <span className="font-medium">{action.title}</span>
                <span className="text-xl">{action.icon}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
