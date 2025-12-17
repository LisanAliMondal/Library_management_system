import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const MasterMovies = () => {
  const { books } = useData();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const moviesList = books.filter(b => b.type === 'movie');

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Master List of Movies</h2>
        <div className="flex gap-4">
          <Link to="/reports" className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 font-semibold">Reports</Link>
          <Link to={user?.role === 'admin' ? '/maintenance' : '/reports'} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-semibold">Home</Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 p-3 text-left">Serial No</th>
              <th className="border border-gray-300 p-3 text-left">Name of Book</th>
              <th className="border border-gray-300 p-3 text-left">Author Name</th>
              <th className="border border-gray-300 p-3 text-left">Category</th>
              <th className="border border-gray-300 p-3 text-left">Status</th>
              <th className="border border-gray-300 p-3 text-left">Cost</th>
              <th className="border border-gray-300 p-3 text-left">Procurement Date</th>
            </tr>
          </thead>
          <tbody>
            {moviesList.map((book, idx) => (
              <tr key={book._id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border border-gray-300 p-3">{book.serialNo}</td>
                <td className="border border-gray-300 p-3">{book.name}</td>
                <td className="border border-gray-300 p-3">{book.author}</td>
                <td className="border border-gray-300 p-3 capitalize">{book.category || 'General'}</td>
                <td className="border border-gray-300 p-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${book.available ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {book.available ? 'Available' : 'Issued'}
                  </span>
                </td>
                <td className="border border-gray-300 p-3">${book.cost || '0.00'}</td>
                <td className="border border-gray-300 p-3">{formatDate(book.procurementDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-6">
          <button onClick={handleLogout} className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 font-semibold shadow-lg">Log Out</button>
        </div>
      </div>
    </Layout>
  );
};

export default MasterMovies;
