import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const TransactionConfirmation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message || 'Transaction completed successfully.';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Confirmation</h2>
        <div className="flex gap-4">
          <button type="button" onClick={() => navigate('/transactions')} className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 font-semibold">Chart</button>
          <button type="button" onClick={() => navigate(user?.role === 'admin' ? '/maintenance' : '/reports')} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-semibold">Home</button>
        </div>
      </div>

      <div className="bg-white p-12 rounded-lg shadow-lg text-center">
        <div className="text-6xl mb-6">✓</div>
        <h3 className="text-2xl font-bold text-green-600 mb-8">{message}</h3>
        <button onClick={handleLogout} className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 font-semibold shadow-lg">Log Out</button>
      </div>
    </Layout>
  );
};

export default TransactionConfirmation;
