import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const LogoutConfirmation = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Logout</h2>
        <div className="flex gap-4">
          <button type="button" onClick={() => navigate('/')} className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 font-semibold">Chart</button>
          <button type="button" onClick={() => navigate('/')} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-semibold">Login</button>
        </div>
      </div>

      <div className="bg-white p-12 rounded-lg shadow-lg text-center">
        <div className="text-6xl mb-6">👋</div>
        <h3 className="text-2xl font-bold text-blue-600 mb-8">You have successfully logged out.</h3>
      </div>
    </Layout>
  );
};

export default LogoutConfirmation;
