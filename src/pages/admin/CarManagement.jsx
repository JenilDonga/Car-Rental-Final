import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../context/DarkModeContext';

const CarManagement = () => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useContext(DarkModeContext);
  const [cars, setCars] = useState([]);
  const [carData, setCarData] = useState({
    id: '',
    name: '',
    type: '',
    price: '',
    image: '',
  });
  const [errors, setErrors] = useState({});
  const [showAddCarModal, setShowAddCarModal] = useState(false);

  useEffect(() => {
    const fetchCars = () => {
      const storedCars = JSON.parse(localStorage.getItem('cars')) || [];
      setCars(storedCars);
    };

    fetchCars();
  }, []);

  const handleAddCar = () => {
    if (validateCarData()) {
      const newCar = { ...carData, id: Date.now() }; 
      const updatedCars = [...cars, newCar];

      localStorage.setItem('cars', JSON.stringify(updatedCars));
      setCars(updatedCars);
      setCarData({ id: '', name: '', type: '', price: '', image: '' });
      setShowAddCarModal(false);
    }
  };

  const validateCarData = () => {
    const newErrors = {};

    if (carData.name.trim().length < 3) {
      newErrors.name = 'Car name must be at least 3 characters long.';
    }

    if (carData.price <= 0) {
      newErrors.price = 'Price must be a positive number.';
    }

    if (carData.type.trim().length < 3) {
      newErrors.type = 'Car type must be at least 3 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditCar = (id) => {
    const carToEdit = cars.find((car) => car.id === id);
    setCarData(carToEdit);
    setShowAddCarModal(true);
  };

  const handleDeleteCar = (id) => {
    const updatedCars = cars.filter((car) => car.id !== id);
    localStorage.setItem('cars', JSON.stringify(updatedCars));
    setCars(updatedCars);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/png') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCarData((prevState) => ({ ...prevState, image: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      alert('Only PNG images are allowed!');
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
        className="absolute px-4 py-2 text-lg font-semibold text-yellow-500 bg-transparent top-4 left-4 hover:underline"
      >
        &larr; Back
      </button>

      {/* Navbar-like Space */}
      <div className="h-16"></div>

      <h2 className="mb-6 text-4xl font-bold text-center">Car Management</h2>

      {/* Add New Car Button */}
      <div className="mb-6 text-center">
        <button
          onClick={() => setShowAddCarModal(true)}
          className="px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
        >
          Add New Car
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md dark:bg-gray-800">
          <thead>
            <tr>
              <th className="px-4 py-3 font-semibold text-left bg-gray-200 dark:bg-gray-700">Car ID</th>
              <th className="px-4 py-3 font-semibold text-left bg-gray-200 dark:bg-gray-700">Car Name</th>
              <th className="px-4 py-3 font-semibold text-left bg-gray-200 dark:bg-gray-700">Type</th>
              <th className="px-4 py-3 font-semibold text-left bg-gray-200 dark:bg-gray-700">Price/Day (₹)</th>
              <th className="px-4 py-3 font-semibold text-left bg-gray-200 dark:bg-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id} className="border-b border-gray-300 dark:border-gray-700">
                <td className="px-4 py-3">{car.id}</td>
                <td className="px-4 py-3">{car.name}</td>
                <td className="px-4 py-3">{car.type}</td>
                <td className="px-4 py-3">₹{car.price}</td>
                <td className="px-4 py-3">
                  <button
                    className="px-3 py-1 mr-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                    onClick={() => handleEditCar(car.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
                    onClick={() => handleDeleteCar(car.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit Car */}
      {showAddCarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="p-8 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-2xl font-bold">{carData.id ? 'Edit Car' : 'Add New Car'}</h2>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block mb-1">Car Name</label>
                <input
                  type="text"
                  value={carData.name}
                  onChange={(e) => setCarData({ ...carData, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Car name"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="mb-4">
                <label className="block mb-1">Car Type</label>
                <input
                  type="text"
                  value={carData.type}
                  onChange={(e) => setCarData({ ...carData, type: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Car type (e.g., Luxury, Family)"
                />
                {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
              </div>

              <div className="mb-4">
                <label className="block mb-1">Price/Day (₹)</label>
                <input
                  type="number"
                  value={carData.price}
                  onChange={(e) => setCarData({ ...carData, price: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Price per day"
                />
                {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
              </div>

              <div className="mb-4">
                <label className="block mb-1">Car Photo (PNG only)</label>
                <input
                  type="file"
                  accept="image/png"
                  onChange={handleImageUpload}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {carData.image && <img src={carData.image} alt="Car" className="w-32 mt-2" />}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowAddCarModal(false)}
                  className="px-4 py-2 text-white bg-gray-500 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddCar}
                  className="px-4 py-2 text-white bg-blue-500 rounded-md"
                >
                  {carData.id ? 'Update Car' : 'Add Car'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarManagement;
