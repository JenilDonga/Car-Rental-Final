import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../context/DarkModeContext';
import axios from 'axios'; // Import axios for API requests

const UserManagement = () => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useContext(DarkModeContext); // Use global dark mode context
  const [users, setUsers] = useState([]); // State to store users
  const [totalUsers, setTotalUsers] = useState(0); // State to store total users
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Fetch user data from the server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Making API call to get all users from backend
        const response = await axios.get('http://localhost:5000/api/users');
        console.log(response.data); // Debugging log

        setUsers(response.data); // Set the users data to state
        const totalUsersCount = response.data.length; // The total users count is the length of the response data
        setTotalUsers(totalUsersCount); // Update total users count
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); // Run only once when the component is mounted

  // Filtered users based on search query
  const filteredUsers = users.filter((user) => {
    // Safely check the fields before calling toLowerCase
    const username = user.username ? user.username.toLowerCase() : '';
    const email = user.email ? user.email.toLowerCase() : '';
    const role = user.role ? user.role.toLowerCase() : '';
    const registered = user.registered ? new Date(user.registered).toLocaleDateString() : '';

    return (
      username.includes(searchQuery.toLowerCase()) ||
      email.includes(searchQuery.toLowerCase()) ||
      role.includes(searchQuery.toLowerCase()) ||
      registered.includes(searchQuery.toLowerCase())
    );
  });

  // Add user (with default role "User" and system date for "registered")
  const addUser = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        ...userData,
        role: 'User', // Set default role as "User"
        registered: new Date().toISOString(), // Set registered date to current date
      });
      setUsers((prevUsers) => [...prevUsers, response.data]); // Add the new user to the list

      // Update the total number of users
      setTotalUsers((prevTotal) => prevTotal + 1); // Increment total users count
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen w-screen p-8`}>
      {/* Light/Dark Mode Toggle */}
      <button
        onClick={toggleTheme}
        className={`p-2 w-10 h-10 absolute top-4 right-4 flex items-center justify-center rounded-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900'} transition duration-300`}
      >
        {darkMode ? '🌙' : '🌞'}
      </button>

      {/* Back Button */}
      <button
        onClick={() => navigate('/admin')}
        className="absolute px-4 py-2 text-lg font-semibold text-yellow-500 bg-gray-800 rounded-md top-4 left-4 hover:bg-gray-700"
      >
        &larr; Back
      </button>

      {/* Navbar-like Space */}
      <div className="h-16"></div>

      <h2 className="mb-6 text-4xl font-bold">User Management</h2>

      {/* Total Users Count */}
      <div className="mb-6">
        <p className="text-xl font-semibold">Total Users: {totalUsers}</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md dark:border-gray-700 focus:outline-none"
        />
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border dark:border-gray-700">ID</th>
              <th className="px-4 py-2 border dark:border-gray-700">Name</th>
              <th className="px-4 py-2 border dark:border-gray-700">Email</th>
              <th className="px-4 py-2 border dark:border-gray-700">Role</th>
              <th className="px-4 py-2 border dark:border-gray-700">Registered</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-200 dark:hover:bg-gray-800">
                  <td className="px-4 py-2 border dark:border-gray-700">{user.id}</td>
                  <td className="px-4 py-2 border dark:border-gray-700">{user.username}</td>
                  <td className="px-4 py-2 border dark:border-gray-700">{user.email}</td>
                  <td
                    className={`px-4 py-2 border dark:border-gray-700 ${
                      user.role === 'Admin' ? 'text-yellow-500' : 'text-blue-500'
                    }`}
                  >
                    {user.role}
                  </td>
                  <td className="px-4 py-2 border dark:border-gray-700">
                    {new Date(user.registered).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center dark:border-gray-700">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
