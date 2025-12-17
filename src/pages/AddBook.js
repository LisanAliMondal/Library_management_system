import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const AddBook = () => {
  const [type, setType] = useState('book');
  const [name, setName] = useState('');
  const [procurementDate, setProcurementDate] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [error, setError] = useState('');
  const { fetchBooks } = useData();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!type || !name || !procurementDate || !quantity) {
      setError('All fields are required to submit the form');
      return;
    }
    try {
      const qty = parseInt(quantity);
      for (let i = 1; i <= qty; i++) {
        const serialNo = `${type === 'book' ? 'B' : 'M'}${Date.now()}${i}`;
        const response = await fetch('http://localhost:5001/api/books', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            type, 
            name, 
            author: 'N/A', 
            serialNo, 
            category: 'General', 
            cost: '0', 
            procurementDate, 
            available: true 
          })
        });
        if (!response.ok) {
          setError('Failed to add book/movie');
          return;
        }
      }
      fetchBooks();
      navigate('/maintenance');
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
        <h2 className="text-3xl font-bold">Add Book/Movie</h2>
        <div className="flex gap-4">
          <button type="button" onClick={() => navigate('/maintenance')} className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 font-semibold">Chart</button>
          <button type="button" onClick={() => navigate('/maintenance')} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-semibold">Home</button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
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
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Quantity/Copies *</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-between items-center">
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Add</button>
          <button type="button" onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">Log Out</button>
        </div>
      </form>
    </Layout>
  );
};

export default AddBook;
