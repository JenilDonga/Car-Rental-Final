// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Import the DarkModeProvider from context
import { DarkModeProvider } from './context/DarkModeContext';

// Import pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import CarSelection from './pages/CarSelection';
import LuxuryCars from './pages/LuxuryCars';
import FamilyCars from './pages/FamilyCars';
import CompactCars from './pages/CompactCars';
import AboutUs from './pages/AboutUs';
import PaymentPage from './pages/PaymentPage';

// Import admin panel pages
import AdminPanel from './pages/admin/AdminPanel';
import Dashboard from './pages/admin/Dashboard';
import CarManagement from './pages/admin/CarManagement';
import BookingManagement from './pages/admin/BookingManagement';
import UserManagement from './pages/admin/UserManagement';
import PaymentManagement from './pages/admin/PaymentManagement';
import AdminLogin from './pages/AdminLogin'; // Import AdminLogin

// Import car detail pages from cars folder
import UrusDetail from './pages/cars/UrusDetail';
import RollsRoyceDetail from './pages/cars/RollsRoyceDetail';
import MaybachDetail from './pages/cars/MaybachDetail';
import ErtigaDetail from './pages/cars/ErtigaDetail';
import CrystaDetail from './pages/cars/CrystaDetail';
import UrbaniaDetail from './pages/cars/UrbaniaDetail';
import FronxDetail from './pages/cars/FronxDetail';
import SwiftDetail from './pages/cars/SwiftDetail';
import HondaCityDetail from './pages/cars/HondaCityDetail';

// Import the global Tailwind CSS file
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirect root path to Landing page */}
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/car-selection" element={<CarSelection />} />
          <Route path="/luxury-cars" element={<LuxuryCars />} />
          <Route path="/family-cars" element={<FamilyCars />} />
          <Route path="/compact-cars" element={<CompactCars />} />
          <Route path="/about-us" element={<AboutUs />} />

          {/* Car Detail Pages */}
          <Route path="/cars/urus-detail" element={<UrusDetail />} />
          <Route path="/cars/rollsroyce-detail" element={<RollsRoyceDetail />} />
          <Route path="/cars/maybach-detail" element={<MaybachDetail />} />
          <Route path="/cars/ertiga-detail" element={<ErtigaDetail />} />
          <Route path="/cars/crysta-detail" element={<CrystaDetail />} />
          <Route path="/cars/urbania-detail" element={<UrbaniaDetail />} />
          <Route path="/cars/fronx-detail" element={<FronxDetail />} />
          <Route path="/cars/swift-detail" element={<SwiftDetail />} />
          <Route path="/cars/hondacity-detail" element={<HondaCityDetail />} />

          {/* Payment Page Route */}
          <Route path="/payment" element={<PaymentPage />} />

          {/* Admin Panel Routes */}
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/cars" element={<CarManagement />} />
          <Route path="/admin/bookings" element={<BookingManagement />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/payments" element={<PaymentManagement />} />
          <Route path="/adminlogin" element={<AdminLogin />} /> {/* Admin Login Page */}

          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<Navigate to="/landing" replace />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  </React.StrictMode>
);
