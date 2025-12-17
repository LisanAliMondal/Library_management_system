import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const ActiveIssues = () => {
  const { issuedBooks } = useData();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
        <h2 className="text-3xl font-bold">Active Issues</h2>
        <div className="flex gap-4">
          <Link to="/reports" className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 font-semibold">Chart</Link>
          <Link to="/reports" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 font-semibold">Reports</Link>
          <Link to={user?.role === 'admin' ? '/maintenance' : '/reports'} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-semibold">Home</Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 p-3 text-left">Serial No Book/Movie</th>
              <th className="border border-gray-300 p-3 text-left">Name of Book/Movie</th>
              <th className="border border-gray-300 p-3 text-left">Membership Id</th>
              <th className="border border-gray-300 p-3 text-left">Date of Issue</th>
              <th className="border border-gray-300 p-3 text-left">Date of return</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.map((issue, idx) => (
              <tr key={issue._id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border border-gray-300 p-3">{issue.serialNo}</td>
                <td className="border border-gray-300 p-3">{issue.bookName}</td>
                <td className="border border-gray-300 p-3">{issue.memberNo}</td>
                <td className="border border-gray-300 p-3">{formatDate(issue.issueDate)}</td>
                <td className="border border-gray-300 p-3">{formatDate(issue.returnDate)}</td>
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

export default ActiveIssues;
