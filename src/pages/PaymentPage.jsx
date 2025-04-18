import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../context/DarkModeContext';

// Import payment logos
import razorpayLogo from '../assets/razorpay.png';
import cardLogo from '../assets/card.png';
import paypalLogo from '../assets/paypal.png';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useContext(DarkModeContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [carImage, setCarImage] = useState('');
  const [carName, setCarName] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(null);

  useEffect(() => {
    if (location.state) {
      setTotalPrice(location.state.totalAmount);
      setCarImage(location.state.carImage);
      setCarName(location.state.carName);
    }
  }, [location.state]);

  const handlePayment = (method) => {
    setSelectedMethod(method);
    
    if (method === 'Razorpay') {
      const createRazorpayOrder = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/payment/order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: totalPrice,
            }),
          });
          
          const data = await response.json();
          
          const options = {
            key: 'rzp_test_EKXAy1wyaoJmfK',
            amount: data.amount,
            currency: data.currency,
            order_id: data.id,
            handler: function (response) {
              alert('Payment successful!');
              console.log(response);
            },
            prefill: {
              name: 'Test User',
              email: 'testuser@example.com',
              contact: '9876543210',
            },
            theme: {
              color: '#F37254',
            },
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        } catch (error) {
          alert('Error creating Razorpay order');
          console.error(error);
        }
      };

      createRazorpayOrder();
    } else {
      alert(`Payment through ${method} is currently being processed.`);
    }
  };

  const handleContinue = () => {
    const newBooking = {
      id: Date.now(),
      user: localStorage.getItem('username'),
      car: carName,
      status: 'Pending',
      totalPrice: totalPrice,
    };

    const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    existingBookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));

    navigate('/admin/booking-management');
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen w-screen flex flex-col items-center justify-center transition-colors duration-300 p-4 md:p-6`}>
      {/* Header with navigation */}
      <header className="flex items-center justify-between w-full mb-8 max-w-7xl">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-100'} shadow-md transition-all duration-300`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        
        <h1 className="text-2xl font-bold text-center md:text-3xl">
          <span className="text-yellow-500">Car</span> Rental Payment
        </h1>
        
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-white text-gray-800 hover:bg-gray-100'} transition-colors duration-300`}
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
      </header>

      <div className="flex flex-col items-center justify-center w-full gap-8 lg:flex-row max-w-7xl">
        {/* Payment Section */}
        <div className={`w-full lg:w-1/2 p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl transition-colors duration-300`}>
          <h2 className="mb-6 text-3xl font-bold text-yellow-500">Payment Details</h2>
          
          {/* Payment Methods */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold">Select Payment Method</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <button
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 ${selectedMethod === 'Razorpay' ? 'border-yellow-500 bg-yellow-50 dark:bg-gray-700' : 'border-gray-300 dark:border-gray-600'} transition-all duration-200 hover:border-yellow-400`}
                onClick={() => handlePayment('Razorpay')}
              >
                <img src={razorpayLogo} alt="Razorpay" className="h-10 mb-2" />
                <span className="text-sm font-medium">Razorpay</span>
              </button>
              
              <button
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 ${selectedMethod === 'Card' ? 'border-yellow-500 bg-yellow-50 dark:bg-gray-700' : 'border-gray-300 dark:border-gray-600'} transition-all duration-200 hover:border-yellow-400`}
                onClick={() => handlePayment('Card')}
              >
                <img src={cardLogo} alt="Card" className="h-10 mb-2" />
                <span className="text-sm font-medium">Credit/Debit Card</span>
              </button>
              
              <button
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 ${selectedMethod === 'PayPal' ? 'border-yellow-500 bg-yellow-50 dark:bg-gray-700' : 'border-gray-300 dark:border-gray-600'} transition-all duration-200 hover:border-yellow-400`}
                onClick={() => handlePayment('PayPal')}
              >
                <img src={paypalLogo} alt="PayPal" className="h-10 mb-2" />
                <span className="text-sm font-medium">PayPal</span>
              </button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex justify-between mb-2">
                <span>Vehicle:</span>
                <span className="font-medium">{carName}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes:</span>
                <span>₹0</span>
              </div>
              <div className="my-3 border-t border-gray-400 dark:border-gray-500"></div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-yellow-500">₹{totalPrice}</span>
              </div>
            </div>
          </div>
          
          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="flex items-center justify-center w-full py-3 font-bold text-white transition-all duration-300 bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600"
          >
            Complete Payment
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Car Display Section */}
        <div className="flex flex-col items-center justify-center w-full p-6 lg:w-1/2">
          <div className={`relative w-full max-w-md rounded-2xl overflow-hidden shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
            <img 
              src={carImage} 
              alt={carName} 
              className="object-cover w-full h-64 transition-transform duration-500 md:h-80 hover:scale-105" 
            />
            <div className={`absolute bottom-0 left-0 right-0 p-4 ${darkMode ? 'bg-gray-900 bg-opacity-80' : 'bg-white bg-opacity-90'}`}>
              <h3 className="text-xl font-bold">{carName}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Your selected vehicle</span>
                <span className="text-lg font-bold text-yellow-500">₹{totalPrice}</span>
              </div>
            </div>
          </div>
          
          {/* Secure Payment Info */}
          <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md w-full max-w-md`}>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="font-medium">Secure Payment</span>
            </div>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Your payment information is processed securely. We do not store your credit card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;