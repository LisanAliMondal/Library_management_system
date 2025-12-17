import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const Maintenance = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/logout-confirmation');
  };

  const categories = [
    { codeFrom: 'SC(B/M)000001', codeTo: 'SC(B/M)000004', category: 'Science' },
    { codeFrom: 'EC(B/M)000001', codeTo: 'EC(B/M)000004', category: 'Economics' },
    { codeFrom: 'FC(B/M)000001', codeTo: 'FC(B/M)000004', category: 'Fiction' },
    { codeFrom: 'CH(B/M)000001', codeTo: 'CH(B/M)000004', category: 'Children' },
    { codeFrom: 'PD(B/M)000001', codeTo: 'PD(B/M)000004', category: 'Personal Development' }
  ];

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Home Page</h2>
        <Link to="/maintenance" className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 font-semibold">Back</Link>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <Link to="/maintenance" className="bg-blue-500 text-white p-4 rounded-lg text-center hover:bg-blue-600 shadow font-semibold">Maintenance</Link>
        <Link to="/reports" className="bg-green-500 text-white p-4 rounded-lg text-center hover:bg-green-600 shadow font-semibold">Reports</Link>
        <Link to="/transactions" className="bg-purple-500 text-white p-4 rounded-lg text-center hover:bg-purple-600 shadow font-semibold">Transactions</Link>
        <Link to="/product-details" className="bg-orange-500 text-white p-4 rounded-lg text-center hover:bg-orange-600 shadow font-semibold">Product Details</Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-bold mb-4">Book/Movie Management</h3>
        <div className="flex gap-4 mb-6">
          <Link to="/add-book" className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 font-semibold">Add Book/Movie</Link>
          <Link to="/update-book" className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 font-semibold">Update Book/Movie</Link>
        </div>
        <h3 className="text-xl font-bold mb-4 mt-6">Membership Management</h3>
        <div className="flex gap-4 mb-6">
          <Link to="/add-membership" className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 font-semibold">Add Membership</Link>
          <Link to="/update-membership" className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 font-semibold">Update Membership</Link>
        </div>
        <h3 className="text-xl font-bold mb-4 mt-6">User Management</h3>
        <div className="flex gap-4">
          <Link to="/user-management" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-semibold">Manage Users</Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Category Codes</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 p-3 text-left">Code No From</th>
              <th className="border border-gray-300 p-3 text-left">Code No To</th>
              <th className="border border-gray-300 p-3 text-left">Category</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border border-gray-300 p-3">{cat.codeFrom}</td>
                <td className="border border-gray-300 p-3">{cat.codeTo}</td>
                <td className="border border-gray-300 p-3 font-semibold">{cat.category}</td>
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

export default Maintenance;
