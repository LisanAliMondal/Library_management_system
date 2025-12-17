import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const BookIssue = () => {
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [serialNo, setSerialNo] = useState('');
  const [type, setType] = useState('');
  const [memberNo, setMemberNo] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState('');
  const { books, fetchBooks, fetchIssues } = useData();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleBookChange = (name) => {
    setBookName(name);
    const book = books.find(b => b.name === name && b.available);
    if (book) {
      setAuthor(book.author);
      setSerialNo(book.serialNo);
      setType(book.type);
    }
  };

  const handleIssueDateChange = (date) => {
    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
      setError('Issue date cannot be earlier than today');
      return;
    }
    setError('');
    setIssueDate(date);
    const returnDt = new Date(date);
    returnDt.setDate(returnDt.getDate() + 15);
    setReturnDate(returnDt.toISOString().split('T')[0]);
  };

  const handleReturnDateChange = (date) => {
    const maxDate = new Date(issueDate);
    maxDate.setDate(maxDate.getDate() + 15);
    if (date > maxDate.toISOString().split('T')[0]) {
      setError('Return date cannot be more than 15 days from issue date');
      return;
    }
    setError('');
    setReturnDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookName || !memberNo || !issueDate || !returnDate) {
      setError('Please fill all required fields');
      return;
    }
    try {
      const response = await fetch('http://localhost:5001/api/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookName, author, serialNo, type, memberNo, issueDate, returnDate, remarks, status: 'pending' })
      });
      if (response.ok) {
        navigate('/transaction-confirmation', { state: { message: 'Book issue request submitted successfully. Awaiting admin approval.' } });
      } else {
        setError('Failed to submit request');
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
        <h2 className="text-3xl font-bold">Book Issue</h2>
        <div className="flex gap-4">
          <Link to="/transactions" className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600">Transactions</Link>
          <Link to={user?.role === 'admin' ? '/maintenance' : '/reports'} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Home</Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Enter Book Name</label>
          <select value={bookName} onChange={(e) => handleBookChange(e.target.value)} className="w-full border p-2 rounded" required>
            <option value="">Select Book</option>
            {books.filter(b => b.available).map(book => (
              <option key={book._id} value={book.name}>{book.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Enter Author</label>
          <input type="text" value={author} readOnly className="w-full border p-2 rounded bg-gray-100" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Membership Number *</label>
          <input type="text" value={memberNo} onChange={(e) => setMemberNo(e.target.value)} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Issue Date</label>
          <input
            type="date"
            value={issueDate}
            onChange={(e) => handleIssueDateChange(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Return Date</label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => handleReturnDateChange(e.target.value)}
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
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Issue Book</button>
          <button type="button" onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">Log Out</button>
        </div>
      </form>
    </Layout>
  );
};

export default BookIssue;
