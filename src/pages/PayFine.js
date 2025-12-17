import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const PayFine = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fetchBooks, fetchIssues } = useData();
  const { user, logout } = useAuth();
  const bookData = location.state || {};
  
  const [bookName, setBookName] = useState(bookData.bookName || '');
  const [author, setAuthor] = useState(bookData.author || '');
  const [serialNo, setSerialNo] = useState(bookData.serialNo || '');
  const [issueDate, setIssueDate] = useState(bookData.issueDate || '');
  const [returnDate, setReturnDate] = useState(bookData.returnDate || '');
  const [actualReturnDate, setActualReturnDate] = useState(new Date().toISOString().split('T')[0]);
  const [fine, setFine] = useState(0);
  const [finePaid, setFinePaid] = useState(false);
  const [remarks, setRemarks] = useState(bookData.remarks || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (returnDate && actualReturnDate) {
      const expectedReturn = new Date(returnDate);
      const actualReturn = new Date(actualReturnDate);
      const diffDays = Math.floor((actualReturn - expectedReturn) / (1000 * 60 * 60 * 24));
      if (diffDays > 0) {
        setFine(diffDays * 5);
      } else {
        setFine(0);
      }
    }
  }, [returnDate, actualReturnDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fine > 0 && !finePaid) {
      setError('Please pay the fine before completing the return');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5001/api/issues/${bookData.issueId}/return`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actualReturnDate, fine, finePaid, remarks })
      });
      if (response.ok) {
        fetchBooks();
        fetchIssues();
        navigate('/transaction-confirmation', { state: { message: 'Transaction completed successfully.' } });
      } else {
        setError('Failed to return book');
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
        <h2 className="text-3xl font-bold">Pay Fine</h2>
        <div className="flex gap-4">
          <Link to="/transactions" className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600">Transactions</Link>
          <Link to={user?.role === 'admin' ? '/maintenance' : '/reports'} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Home</Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Enter Book Name</label>
            <input type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none" />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Enter Author</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none" />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Serial No</label>
            <input type="text" value={serialNo} onChange={(e) => setSerialNo(e.target.value)} className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none" />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Issue Date</label>
            <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none" />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Return Date</label>
            <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none" />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Actual Return Date</label>
            <input type="date" value={actualReturnDate} onChange={(e) => setActualReturnDate(e.target.value)} className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none" />
          </div>
        </div>

        <div className="mt-6 p-6 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
          <div className="grid grid-cols-2 gap-6 items-center">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Fine Calculated</label>
              <div className="flex items-center">
                <span className="text-3xl font-bold text-red-600">${fine}</span>
                {fine === 0 && <span className="ml-3 text-green-600 font-semibold">✓ No Fine</span>}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <label className="flex items-center cursor-pointer bg-white p-4 rounded-lg border-2 border-gray-300 hover:border-green-500 transition">
                <input
                  type="checkbox"
                  checked={finePaid}
                  onChange={(e) => setFinePaid(e.target.checked)}
                  className="mr-3 w-5 h-5"
                />
                <span className="font-semibold text-lg">Fine Paid</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="block mb-2 font-semibold text-gray-700">Remarks <span className="text-gray-500 text-sm font-normal">(Non Mandatory)</span></label>
          <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none" rows="3" placeholder="Enter any additional remarks..."></textarea>
        </div>

        {error && <div className="mt-4 p-4 bg-red-100 border-2 border-red-400 text-red-700 rounded-lg font-semibold">{error}</div>}

        <div className="flex justify-between items-center mt-8">
          <button type="submit" className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-semibold text-lg shadow-lg transform hover:scale-105 transition">Confirm</button>
          <button type="button" onClick={handleLogout} className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 font-semibold text-lg shadow-lg transform hover:scale-105 transition">Log Out</button>
        </div>
      </form>
    </Layout>
  );
};

export default PayFine;
