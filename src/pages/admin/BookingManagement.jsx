import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../context/DarkModeContext';

const BookingManagement = () => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useContext(DarkModeContext);
  const [bookings, setBookings] = useState([]);
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [showAddBookingForm, setShowAddBookingForm] = useState(false);
  const [newBooking, setNewBooking] = useState({
    user: '',
    car: '',
    status: 'Pending',
    date: '',
  });

  useEffect(() => {
    // Fetch bookings from localStorage (dummy data for now)
    const fetchBookings = async () => {
      try {
        const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
        setBookings(storedBookings); // Set the bookings data from localStorage
        
        // Calculate the confirmed bookings count
        const confirmedBookings = storedBookings.filter((booking) => booking.status === 'Confirmed');
        setConfirmedCount(confirmedBookings.length); // Update confirmed bookings count
        
        // Also save the confirmed count to localStorage
        console.log("Updated total bookings:", confirmedBookings.length);
        localStorage.setItem('totalBookings', confirmedBookings.length);  // Update localStorage with total confirmed bookings
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [confirmedCount]); // Run when confirmedCount changes

  // Handle Confirm Booking Status
  const handleConfirmBooking = (id) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: 'Confirmed' } : booking
    );
    // Save updated bookings to localStorage
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);

    // Update the confirmed bookings count
    const confirmedBookings = updatedBookings.filter((booking) => booking.status === 'Confirmed');
    setConfirmedCount(confirmedBookings.length);

    // Update the confirmed count in localStorage
    localStorage.setItem('totalBookings', confirmedBookings.length);

    alert(`Booking #${id} confirmed`);
  };

  // Handle Cancel Booking Status
  const handleCancelBooking = (id) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: 'Cancelled' } : booking
    );
    // Save updated bookings to localStorage
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);

    // Update the confirmed bookings count
    const confirmedBookings = updatedBookings.filter((booking) => booking.status === 'Confirmed');
    setConfirmedCount(confirmedBookings.length);

    // Update the confirmed count in localStorage
    localStorage.setItem('totalBookings', confirmedBookings.length);

    alert(`Booking #${id} cancelled`);
  };

  // Add a new booking (this will be used to simulate the addition of bookings)
  const addBooking = () => {
    const newBookingData = {
      id: bookings.length, // The ID is now based on the current length of the bookings array, starting from 0
      user: newBooking.user,
      car: newBooking.car,
      status: newBooking.status,
      registered: new Date().toLocaleDateString(), // Current system date
      date: newBooking.date,
    };

    const updatedBookings = [...bookings, newBookingData];
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);

    // Update the confirmed bookings count (pending bookings won't be counted)
    const confirmedBookings = updatedBookings.filter((booking) => booking.status === 'Confirmed');
    setConfirmedCount(confirmedBookings.length);

    // Update the confirmed count in localStorage
    localStorage.setItem('totalBookings', confirmedBookings.length);

    alert('New booking added');
    setShowAddBookingForm(false); // Close the form after adding
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBooking({ ...newBooking, [name]: value });
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
        className="absolute px-4 py-2 text-lg font-semibold text-yellow-500 bg-transparent top-4 left-4 hover:underline"
      >
        &larr; Back
      </button>

      {/* Navbar-like Space */}
      <div className="h-16"></div>

      <h2 className="mb-6 text-4xl font-bold">Booking Management</h2>

      {/* Table showing bookings */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md dark:bg-gray-800">
          <thead>
            <tr>
              <th className="px-4 py-3 font-semibold text-left bg-gray-200 dark:bg-gray-700">Booking ID</th>
              <th className="px-4 py-3 font-semibold text-left bg-gray-200 dark:bg-gray-700">User</th>
              <th className="px-4 py-3 font-semibold text-left bg-gray-200 dark:bg-gray-700">Car</th>
              <th className="px-4 py-3 font-semibold text-left bg-gray-200 dark:bg-gray-700">Status</th>
              <th className="px-4 py-3 font-semibold text-left bg-gray-200 dark:bg-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-gray-300 dark:border-gray-700">
                <td className="px-4 py-3">{booking.id}</td>
                <td className="px-4 py-3">{booking.user}</td>
                <td className="px-4 py-3">{booking.car}</td>
                <td className={`py-3 px-4 font-semibold ${booking.status === 'Confirmed' ? 'text-green-500' : booking.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'}`}>
                  {booking.status}
                </td>
                <td className="px-4 py-3">
                  {booking.status === 'Pending' && (
                    <>
                      <button
                        className="px-3 py-1 mr-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                        onClick={() => handleConfirmBooking(booking.id)}
                      >
                        Confirm
                      </button>
                      <button
                        className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {booking.status === 'Confirmed' && (
                    <button
                      className="px-3 py-1 text-white bg-gray-500 rounded-md"
                      disabled
                    >
                      Already Confirmed
                    </button>
                  )}
                  {booking.status === 'Cancelled' && (
                    <button
                      className="px-3 py-1 text-white bg-gray-500 rounded-md"
                      disabled
                    >
                      Already Cancelled
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Booking Button */}
      <button
        onClick={() => setShowAddBookingForm(true)}
        className="px-8 py-3 mt-6 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Add New Booking
      </button>

      {/* Add Booking Form */}
      {showAddBookingForm && (
        <div className="p-6 mt-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="mb-4 text-2xl font-bold">Add New Booking</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label className="block mb-2 text-lg font-semibold">User Name</label>
              <input
                type="text"
                name="user"
                value={newBooking.user}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-lg font-semibold">Car</label>
              <input
                type="text"
                name="car"
                value={newBooking.car}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-lg font-semibold">Booking Date</label>
              <input
                type="date"
                name="date"
                value={newBooking.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <button
                onClick={addBooking}
                className="px-8 py-3 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
              >
                Add Booking
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-xl font-semibold">Confirmed Bookings: {confirmedCount}</h3>
      </div>
    </div>
  );
};

export default BookingManagement;
