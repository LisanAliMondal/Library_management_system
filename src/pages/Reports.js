import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const Reports = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/logout-confirmation');
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Available Reports</h2>
        <div className="flex gap-4">
          <Link to={user?.role === 'admin' ? '/maintenance' : '/reports'} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-semibold">Home</Link>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 gap-6">
          <Link to="/master-books" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-lg transform hover:scale-105 transition">
            <div className="flex items-center">
              <div className="text-4xl mr-4">📚</div>
              <div>
                <div className="text-xl font-bold">Master List of Books</div>
                <div className="text-sm opacity-90 mt-1">View all books in library</div>
              </div>
            </div>
          </Link>

          <Link to="/master-movies" className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg hover:from-purple-600 hover:to-purple-700 shadow-lg transform hover:scale-105 transition">
            <div className="flex items-center">
              <div className="text-4xl mr-4">🎬</div>
              <div>
                <div className="text-xl font-bold">Master List of Movies</div>
                <div className="text-sm opacity-90 mt-1">View all movies in library</div>
              </div>
            </div>
          </Link>

          <Link to="/master-memberships" className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg hover:from-green-600 hover:to-green-700 shadow-lg transform hover:scale-105 transition">
            <div className="flex items-center">
              <div className="text-4xl mr-4">👥</div>
              <div>
                <div className="text-xl font-bold">Master List of Memberships</div>
                <div className="text-sm opacity-90 mt-1">View all members</div>
              </div>
            </div>
          </Link>

          <Link to="/active-issues" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg hover:from-orange-600 hover:to-orange-700 shadow-lg transform hover:scale-105 transition">
            <div className="flex items-center">
              <div className="text-4xl mr-4">📖</div>
              <div>
                <div className="text-xl font-bold">Active Issues</div>
                <div className="text-sm opacity-90 mt-1">Currently issued books</div>
              </div>
            </div>
          </Link>

          <Link to="/overdue-returns" className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg hover:from-red-600 hover:to-red-700 shadow-lg transform hover:scale-105 transition">
            <div className="flex items-center">
              <div className="text-4xl mr-4">⚠️</div>
              <div>
                <div className="text-xl font-bold">Overdue Returns</div>
                <div className="text-sm opacity-90 mt-1">Books past return date</div>
              </div>
            </div>
          </Link>

          <Link to="/pending-requests" className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-lg hover:from-yellow-600 hover:to-yellow-700 shadow-lg transform hover:scale-105 transition">
            <div className="flex items-center">
              <div className="text-4xl mr-4">📝</div>
              <div>
                <div className="text-xl font-bold">Pending Issue Requests</div>
                <div className="text-sm opacity-90 mt-1">Requests awaiting approval</div>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex justify-end mt-8">
          <button onClick={handleLogout} className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 font-semibold text-lg shadow-lg transform hover:scale-105 transition">Log Out</button>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
