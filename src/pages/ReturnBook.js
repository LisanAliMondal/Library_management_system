import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const ReturnBook = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [serialNo, setSerialNo] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState('');
  const { issuedBooks } = useData();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleBookChange = (issueId) => {
    const issued = issuedBooks.find(b => b._id === issueId);
    if (issued) {
      setSelectedIssue(issued);
      setBookName(issued.bookName);
      setAuthor(issued.author);
      setSerialNo(issued.serialNo);
      setIssueDate(new Date(issued.issueDate).toISOString().split('T')[0]);
      setReturnDate(new Date(issued.returnDate).toISOString().split('T')[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedIssue || !returnDate) {
      setError('Please fill all required fields');
      return;
    }
    navigate('/pay-fine', { state: { issueId: selectedIssue._id, bookName, author, serialNo, issueDate, returnDate, remarks } });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Return Book</h2>
        <div className="flex gap-4">
          <Link to="/transactions" className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600">Transactions</Link>
          <Link to={user?.role === 'admin' ? '/maintenance' : '/reports'} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Home</Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Enter Book Name</label>
          <select onChange={(e) => handleBookChange(e.target.value)} className="w-full border p-2 rounded" required>
            <option value="">Select Book</option>
            {issuedBooks.map((issue) => (
              <option key={issue._id} value={issue._id}>{issue.bookName}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Enter Author</label>
          <textarea value={author} readOnly className="w-full border p-2 rounded bg-gray-100" rows="2"></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Serial No</label>
          <input type="text" value={serialNo} readOnly className="w-full border p-2 rounded bg-gray-100" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Issue Date</label>
          <input type="text" value={issueDate} readOnly className="w-full border p-2 rounded bg-gray-100" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Return Date</label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Remarks <span className="text-gray-500 text-sm">(Non Mandatory)</span></label>
          <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} className="w-full border p-2 rounded" rows="3"></textarea>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-between items-center">
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Confirm</button>
          <button type="button" onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">Log Out</button>
        </div>
      </form>
    </Layout>
  );
};

export default ReturnBook;
