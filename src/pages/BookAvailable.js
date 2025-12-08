import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const BookAvailable = () => {
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const { books } = useData();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const uniqueBookNames = [...new Set(books.map(b => b.name))];
  const uniqueAuthors = [...new Set(books.map(b => b.author))];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!bookName && !author) {
      setError('Please select at least one search criteria');
      return;
    }
    setError('');
    const filtered = books.filter(book => {
      const matchName = !bookName || book.name === bookName;
      const matchAuthor = !author || book.author === author;
      return matchName && matchAuthor;
    });
    setResults(filtered);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Book Availability</h2>
        <div className="flex gap-4">
          <Link to="/transactions" className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600">Transactions</Link>
          <Link to={user?.role === 'admin' ? '/maintenance' : '/reports'} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Home</Link>
        </div>
      </div>

      <form onSubmit={handleSearch} className="bg-white p-6 rounded shadow mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 font-semibold">Enter Book Name</label>
            <select value={bookName} onChange={(e) => setBookName(e.target.value)} className="w-full border p-2 rounded">
              <option value="">Select Book Name</option>
              {uniqueBookNames.map((name, idx) => (
                <option key={idx} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold">Enter Author</label>
            <select value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full border p-2 rounded">
              <option value="">Select Author</option>
              {uniqueAuthors.map((auth, idx) => (
                <option key={idx} value={auth}>{auth}</option>
              ))}
            </select>
          </div>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-between items-center">
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Search</button>
          <button type="button" onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">Log Out</button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="bg-white p-6 rounded shadow">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Book Availability</h3>
            <div className="flex gap-4">
              <Link to="/transactions" className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600">Transactions</Link>
              <Link to={user?.role === 'admin' ? '/maintenance' : '/reports'} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Home</Link>
            </div>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3 text-left">Book Name</th>
                <th className="border p-3 text-left">Author Name</th>
                <th className="border p-3 text-left">Serial Number</th>
                <th className="border p-3 text-left">Available</th>
                <th className="border p-3 text-left">Select to issue the book</th>
              </tr>
            </thead>
            <tbody>
              {results.map(book => (
                <tr key={book.id} className="hover:bg-gray-50">
                  <td className="border p-3">{book.name}</td>
                  <td className="border p-3">{book.author}</td>
                  <td className="border p-3">{book.serialNo}</td>
                  <td className="border p-3">{book.available ? 'Y' : 'N'}</td>
                  <td className="border p-3 text-center">
                    {book.available ? (
                      <input
                        type="radio"
                        name="selectedBook"
                        checked={selectedBook === book.id}
                        onChange={() => setSelectedBook(book.id)}
                      />
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mt-6">
            <button type="button" onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">Log Out</button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default BookAvailable;
