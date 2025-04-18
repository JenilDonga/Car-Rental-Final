import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../context/DarkModeContext';
import {
  FiArrowLeft, FiSearch, FiSun, FiMoon, FiDownload,
  FiRefreshCw, FiChevronDown, FiChevronUp
} from 'react-icons/fi';

const PaymentManagement = () => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useContext(DarkModeContext);

  const [payments, setPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [newPayment, setNewPayment] = useState({
    name: '', method: 'UPI', amount: '', status: 'Success', date: ''
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      const response = [
        { id: 1, name: 'Jenil Donga', method: 'UPI', amount: 10000, status: 'Success', date: '2025-04-01' },
        { id: 2, name: 'Kunj Patel', method: 'PayPal', amount: 7000, status: 'Pending', date: '2025-04-02' },
        { id: 3, name: 'Deep Nimbark', method: 'Card', amount: 5000, status: 'Failed', date: '2025-04-03' },
        { id: 4, name: 'Dipesh Suliya', method: 'UPI', amount: 12000, status: 'Success', date: '2025-04-04' },
        { id: 5, name: 'Meet Patoliya', method: 'UPI', amount: 15000, status: 'Success', date: '2025-04-05' },
        { id: 6, name: 'Ansh Sojitra', method: 'PayPal', amount: 8000, status: 'Pending', date: '2025-04-06' },
        { id: 7, name: 'Kuldip Zarmariya', method: 'Card', amount: 13000, status: 'Failed', date: '2025-04-07' },
        { id: 8, name: 'Sahil Bedi', method: 'UPI', amount: 9000, status: 'Success', date: '2025-04-08' },
      ];
      setPayments(response);
      setIsLoading(false);
    };
    fetchPayments();
  }, []);

  const requestSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const sortedPayments = [...payments].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredPayments = sortedPayments.filter(
    (p) =>
      (p.id.toString().includes(searchQuery) ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.date.includes(searchQuery)) &&
      (filter === 'all' || p.status.toLowerCase() === filter.toLowerCase())
  );

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Method', 'Amount (₹)', 'Status', 'Date'];
    const csv = [
      headers.join(','),
      ...filteredPayments.map(p => `${p.id},"${p.name}",${p.method},${p.amount},${p.status},${p.date}`)
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `payments_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const formatDate = (date) => new Date(date).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  const getStatusBadge = (status) => {
    const base = 'px-2 py-1 rounded-full text-xs font-semibold';
    const map = {
      success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return `${base} ${map[status.toLowerCase()] || 'bg-gray-200 text-gray-800'}`;
  };

  const handleAddPayment = () => {
    const newId = payments.length + 1;
    setPayments([
      ...payments,
      {
        id: newId,
        ...newPayment,
        amount: parseInt(newPayment.amount),
        date: newPayment.date || new Date().toISOString().slice(0, 10)
      }
    ]);
    setShowModal(false);
    setNewPayment({ name: '', method: 'UPI', amount: '', status: 'Success', date: '' });
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'} min-h-screen w-screen overflow-x-hidden`}>
      <div className="w-full px-4 py-4">
        {/* Back + Title */}
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/admin')}
              className={`flex items-center gap-2 p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
            >
              <FiArrowLeft />
              <span>Back</span>
            </button>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
          </div>
          <h2 className="text-2xl font-bold">Payment Management</h2>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3 mb-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-1/2">
            <FiSearch className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search payments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                darkMode ? 'bg-gray-800 border-gray-700 focus:ring-blue-500' : 'bg-white border-gray-300 focus:ring-blue-400'
              }`}
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={`rounded-lg border px-3 py-2 text-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
            >
              <option value="all">All</option>
              <option value="success">Success</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>

            <button
              onClick={refreshData}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg border text-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
            >
              <FiRefreshCw className={isLoading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1 px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              <span className="text-lg">➕</span>
              <span>Add Payment</span>
            </button>

            <button
              onClick={exportToCSV}
              className="flex items-center gap-1 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              disabled={!filteredPayments.length}
            >
              <FiDownload />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-100'}>
              <tr>
                <Th title="ID" sortKey="id" {...{ sortConfig, requestSort, darkMode }} />
                <Th title="Name" sortKey="name" {...{ sortConfig, requestSort, darkMode }} />
                <Th title="Method" sortKey="method" {...{ sortConfig, requestSort, darkMode }} />
                <Th title="Amount" sortKey="amount" align="right" {...{ sortConfig, requestSort, darkMode }} />
                <Th title="Status" sortKey="status" {...{ sortConfig, requestSort, darkMode }} />
                <Th title="Date" sortKey="date" {...{ sortConfig, requestSort, darkMode }} />
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center">
                    <div className="w-8 h-8 mx-auto border-4 border-blue-500 rounded-full border-t-transparent animate-spin" />
                  </td>
                </tr>
              ) : filteredPayments.length ? (
                filteredPayments.map(payment => (
                  <tr key={payment.id} className={darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}>
                    <td className="px-4 py-3">#{payment.id}</td>
                    <td className="px-4 py-3">{payment.name}</td>
                    <td className="px-4 py-3">{payment.method}</td>
                    <td className="px-4 py-3 text-right">₹{payment.amount.toLocaleString()}</td>
                    <td className="px-4 py-3"><span className={getStatusBadge(payment.status)}>{payment.status}</span></td>
                    <td className="px-4 py-3">{formatDate(payment.date)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center">No payments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className={`rounded-lg shadow-lg w-full max-w-md p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <h3 className="mb-4 text-xl font-semibold">Add Payment</h3>
            <div className="space-y-3">
              <input type="text" placeholder="Name" value={newPayment.name} onChange={(e) => setNewPayment({ ...newPayment, name: e.target.value })} className="w-full p-2 border rounded" />
              <input type="number" placeholder="Amount" value={newPayment.amount} onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })} className="w-full p-2 border rounded" />
              <select value={newPayment.method} onChange={(e) => setNewPayment({ ...newPayment, method: e.target.value })} className="w-full p-2 border rounded">
                <option value="UPI">UPI</option>
                <option value="PayPal">PayPal</option>
                <option value="Card">Card</option>
              </select>
              <select value={newPayment.status} onChange={(e) => setNewPayment({ ...newPayment, status: e.target.value })} className="w-full p-2 border rounded">
                <option value="Success">Success</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
              <input type="date" value={newPayment.date} onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })} className="w-full p-2 border rounded" />
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-white bg-gray-400 rounded hover:bg-gray-500">Cancel</button>
                <button onClick={handleAddPayment} className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700">Add</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable <th> Component
const Th = ({ title, sortKey, sortConfig, requestSort, darkMode, align = 'left' }) => {
  const isActive = sortConfig.key === sortKey;
  const icon = isActive && sortConfig.direction === 'asc' ? <FiChevronUp /> : <FiChevronDown />;
  return (
    <th
      className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-${align} ${darkMode ? 'text-gray-300' : 'text-gray-600'} cursor-pointer`}
      onClick={() => requestSort(sortKey)}
    >
      <div className={`flex items-center ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
        {title}
        <span className="ml-2">{icon}</span>
      </div>
    </th>
  );
};

export default PaymentManagement;
