import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const IssueRequests = () => {
  const [requests, setRequests] = useState([]);
  const { user, logout } = useAuth();
  const { fetchIssues, fetchBooks } = useData();
  const navigate = useNavigate();

  const fetchRequests = () => {
    fetch('http://localhost:5001/api/issues/pending')
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.error('Error fetching requests:', err));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/issues/${id}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        fetchRequests();
        fetchIssues();
        fetchBooks();
      }
    } catch (err) {
      console.error('Error approving request:', err);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/issues/${id}/reject`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        fetchRequests();
      }
    } catch (err) {
      console.error('Error rejecting request:', err);
    }
  };

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
        <h2 className="text-3xl font-bold">Issue Requests</h2>
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
              <th className="border border-gray-300 p-3 text-left">Membership Id</th>
              <th className="border border-gray-300 p-3 text-left">Name of Book/Movie</th>
              <th className="border border-gray-300 p-3 text-left">Requested Date</th>
              {user?.role === 'admin' && <th className="border border-gray-300 p-3 text-left">Action</th>}
            </tr>
          </thead>
          <tbody>
            {requests.map((request, idx) => (
              <tr key={request._id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border border-gray-300 p-3">{request.memberNo}</td>
                <td className="border border-gray-300 p-3">{request.bookName}</td>
                <td className="border border-gray-300 p-3">{formatDate(request.issueDate)}</td>
                {user?.role === 'admin' && (
                  <td className="border border-gray-300 p-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleApprove(request._id)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Approve</button>
                      <button onClick={() => handleReject(request._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Reject</button>
                    </div>
                  </td>
                )}
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

export default IssueRequests;
