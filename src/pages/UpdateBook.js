import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const UpdateBook = () => {
  const [type, setType] = useState('book');
  const [selectedBook, setSelectedBook] = useState('');
  const [name, setName] = useState('');
  const [procurementDate, setProcurementDate] = useState('');
  const [error, setError] = useState('');
  const { books, fetchBooks } = useData();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleBookSelect = (id) => {
    setSelectedBook(id);
    const book = books.find(b => b._id === id);
    if (book) {
      setType(book.type);
      setName(book.name);
      setProcurementDate(book.procurementDate ? book.procurementDate.split('T')[0] : '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBook || !type || !name || !procurementDate) {
      setError('All fields are required');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5001/api/books/${selectedBook}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, name, procurementDate })
      });
      if (response.ok) {
        fetchBooks();
        navigate('/maintenance');
      } else {
        setError('Failed to update book/movie');
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
        <h2 className="text-3xl font-bold">Update Book/Movie</h2>
        <div className="flex gap-4">
          <button type="button" onClick={() => navigate('/maintenance')} className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 font-semibold">Chart</button>
          <button type="button" onClick={() => navigate('/maintenance')} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-semibold">Home</button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Select Book/Movie *</label>
          <select value={selectedBook} onChange={(e) => handleBookSelect(e.target.value)} className="w-full border p-2 rounded" required>
            <option value="">Select Book/Movie</option>
            {books.map(book => (
              <option key={book._id} value={book._id}>{book.name} ({book.type})</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Type *</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="book"
                checked={type === 'book'}
                onChange={(e) => setType(e.target.value)}
                className="mr-2"
                required
              />
              Book
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="movie"
                checked={type === 'movie'}
                onChange={(e) => setType(e.target.value)}
                className="mr-2"
              />
              Movie
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Book/Movie Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Date of Procurement *</label>
          <input
            type="date"
            value={procurementDate}
            onChange={(e) => setProcurementDate(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-between items-center">
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Update</button>
          <button type="button" onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">Log Out</button>
        </div>
      </form>
    </Layout>
  );
};

export default UpdateBook;
