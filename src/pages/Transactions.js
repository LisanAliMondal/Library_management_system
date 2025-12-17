import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Transactions = () => {
  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-8 text-center">Transactions</h2>
      <div className="grid grid-cols-2 gap-6">
        <Link to="/book-available" className="bg-green-500 text-white p-8 rounded-lg text-center hover:bg-green-600 shadow-lg transform hover:scale-105 transition">
          <div className="text-5xl mb-3">📚</div>
          <div className="text-xl font-bold">Is Book Available?</div>
          <div className="text-sm mt-2 opacity-90">Search for available books</div>
        </Link>
        <Link to="/book-issue" className="bg-blue-500 text-white p-8 rounded-lg text-center hover:bg-blue-600 shadow-lg transform hover:scale-105 transition">
          <div className="text-5xl mb-3">📖</div>
          <div className="text-xl font-bold">Issue Book</div>
          <div className="text-sm mt-2 opacity-90">Issue a book to member</div>
        </Link>
        <Link to="/return-book" className="bg-orange-500 text-white p-8 rounded-lg text-center hover:bg-orange-600 shadow-lg transform hover:scale-105 transition">
          <div className="text-5xl mb-3">↩️</div>
          <div className="text-xl font-bold">Return Book</div>
          <div className="text-sm mt-2 opacity-90">Return issued book</div>
        </Link>
        <Link to="/pay-fine" className="bg-red-500 text-white p-8 rounded-lg text-center hover:bg-red-600 shadow-lg transform hover:scale-105 transition">
          <div className="text-5xl mb-3">💰</div>
          <div className="text-xl font-bold">Pay Fine</div>
          <div className="text-sm mt-2 opacity-90">Pay pending fines</div>
        </Link>
        <Link to="/cancel-transaction" className="bg-gray-500 text-white p-8 rounded-lg text-center hover:bg-gray-600 shadow-lg transform hover:scale-105 transition">
          <div className="text-5xl mb-3">❌</div>
          <div className="text-xl font-bold">Cancel Transaction</div>
          <div className="text-sm mt-2 opacity-90">Cancel book issue</div>
        </Link>
      </div>
    </Layout>
  );
};

export default Transactions;
