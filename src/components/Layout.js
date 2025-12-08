import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Library Management System</h1>
          {user && (
            <div className="flex gap-4 items-center">
              <span>Welcome, {user.username} ({user.role})</span>
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
            </div>
          )}
        </div>
      </nav>
      {user && (
        <div className="bg-blue-500 text-white">
          <div className="container mx-auto flex gap-4 p-2">
            <Link to={user.role === 'admin' ? '/maintenance' : '/reports'} className="hover:underline font-semibold">Home</Link>
            {user.role === 'admin' && (
              <>
                <Link to="/maintenance" className="hover:underline">Maintenance</Link>
                <Link to="/product-details" className="hover:underline">Product Details</Link>
                <Link to="/reports" className="hover:underline">Reports</Link>
                <Link to="/transactions" className="hover:underline">Transactions</Link>
              </>
            )}
            {user.role === 'user' && (
              <>
                <Link to="/reports" className="hover:underline">Reports</Link>
                <Link to="/transactions" className="hover:underline">Transactions</Link>
                <Link to="/product-details" className="hover:underline">Product Details</Link>
              </>
            )}
          </div>
        </div>
      )}
      <div className="container mx-auto p-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
