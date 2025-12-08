import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';

const UpdateBook = () => {
  const [type, setType] = useState('book');
  const [selectedBook, setSelectedBook] = useState('');
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [serialNo, setSerialNo] = useState('');
  const [category, setCategory] = useState('');
  const [cost, setCost] = useState('');
  const [procurementDate, setProcurementDate] = useState('');
  const [error, setError] = useState('');
  const { books, updateBook } = useData();
  const navigate = useNavigate();

  const handleBookSelect = (id) => {
    setSelectedBook(id);
    const book = books.find(b => b.id === parseInt(id));
    if (book) {
      setType(book.type);
      setName(book.name);
      setAuthor(book.author);
      setSerialNo(book.serialNo);
      setCategory(book.category || '');
      setCost(book.cost || '');
      setProcurementDate(book.procurementDate || '');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBook || !name || !author || !serialNo || !category || !cost || !procurementDate) {
      setError('All fields are mandatory');
      return;
    }
    updateBook(parseInt(selectedBook), { type, name, author, serialNo, category, cost, procurementDate });
    navigate('/maintenance');
  };

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6">Update Book</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block mb-2">Select Book *</label>
          <select value={selectedBook} onChange={(e) => handleBookSelect(e.target.value)} className="w-full border p-2 rounded" required>
            <option value="">Select Book</option>
            {books.map(book => (
              <option key={book.id} value={book.id}>{book.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Type *</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="book"
                checked={type === 'book'}
                onChange={(e) => setType(e.target.value)}
                className="mr-2"
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
          <label className="block mb-2">Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Author/Director *</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Serial No *</label>
          <input
            type="text"
            value={serialNo}
            onChange={(e) => setSerialNo(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category *</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Cost *</label>
          <input
            type="number"
            step="0.01"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Procurement Date *</label>
          <input
            type="date"
            value={procurementDate}
            onChange={(e) => setProcurementDate(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Update</button>
      </form>
    </Layout>
  );
};

export default UpdateBook;
