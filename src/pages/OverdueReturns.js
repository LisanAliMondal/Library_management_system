import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const OverdueReturns = () => {
  const [overdueIssues, setOverdueIssues] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5001/api/issues/overdue')
      .then(res => res.json())
      .then(data => setOverdueIssues(data))
      .catch(err => console.error('Error fetching overdue issues:', err));
  }, []);

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  const calculateFine = (returnDate) => {
    const today = new Date();
    const expectedReturn = new Date(returnDate);
    const diffDays = Math.floor((today - expectedReturn) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays * 5 : 0;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Overdue Returns</h2>
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
              <th className="border border-gray-300 p-3 text-left">Serial No Book</th>
              <th className="border border-gray-300 p-3 text-left">Name of Book</th>
              <th className="border border-gray-300 p-3 text-left">Membership Id</th>
              <th className="border border-gray-300 p-3 text-left">Date of Issue</th>
              <th className="border border-gray-300 p-3 text-left">Date of return</th>
              <th className="border border-gray-300 p-3 text-left">Fine Calculations</th>
            </tr>
          </thead>
          <tbody>
            {overdueIssues.map((issue, idx) => (
              <tr key={issue._id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border border-gray-300 p-3">{issue.serialNo}</td>
                <td className="border border-gray-300 p-3">{issue.bookName}</td>
                <td className="border border-gray-300 p-3">{issue.memberNo}</td>
                <td className="border border-gray-300 p-3">{formatDate(issue.issueDate)}</td>
                <td className="border border-gray-300 p-3">{formatDate(issue.returnDate)}</td>
                <td className="border border-gray-300 p-3">
                  <span className="text-red-600 font-bold">${calculateFine(issue.returnDate)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-6">
          <button onClick={handleLogout} className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 font-semibold shadow-lg">Log out</button>
        </div>
      </div>
    </Layout>
  );
};

export default OverdueReturns;
