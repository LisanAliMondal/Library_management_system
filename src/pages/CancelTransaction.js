import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const CancelTransaction = () => {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { fetchBooks, fetchIssues } = useData();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5001/api/issues')
      .then(res => res.json())
      .then(data => setIssues(data))
      .catch(err => console.error('Error fetching issues:', err));
  }, []);

  const handleCancel = async (e) => {
    e.preventDefault();
    if (!selectedIssue) {
      setError('Please select a transaction to cancel');
      return;
    }

    try {
      const issue = issues.find(i => i._id === selectedIssue);
      const response = await fetch(`http://localhost:5001/api/issues/${selectedIssue}/return`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          actualReturnDate: new Date(),
          fine: 0,
          finePaid: true,
          remarks: 'Transaction cancelled'
        })
      });

      if (response.ok) {
        setSuccess('Transaction cancelled');
        fetchBooks();
        fetchIssues();
        setSelectedIssue('');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Failed to cancel transaction');
      }
    } catch (err) {
      setError('Error connecting to server');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Cancel Transaction</h2>
        <div className="flex gap-4">
          <button type="button" onClick={() => navigate('/transactions')} className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 font-semibold">Chart</button>
          <button type="button" onClick={() => navigate(user?.role === 'admin' ? '/maintenance' : '/reports')} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-semibold">Home</button>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        {success && (
          <div className="mb-4 p-4 bg-green-100 border-2 border-green-400 text-green-700 rounded-lg font-semibold text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleCancel}>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Select Transaction to Cancel *</label>
            <select
              value={selectedIssue}
              onChange={(e) => setSelectedIssue(e.target.value)}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Transaction</option>
              {issues.map(issue => (
                <option key={issue._id} value={issue._id}>
                  {issue.bookName} - {issue.memberNo} (Issued: {new Date(issue.issueDate).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="flex justify-between items-center">
            <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">Cancel Transaction</button>
            <button type="button" onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">Log Out</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CancelTransaction;
