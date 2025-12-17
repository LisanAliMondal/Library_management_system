import React from 'react';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';

const ProductDetails = () => {
  const { books } = useData();

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6">Product Details</h2>
      <div className="bg-white p-6 rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Serial No</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Author/Director</th>
              <th className="text-left p-2">Type</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book._id} className="border-b">
                <td className="p-2">{book.serialNo}</td>
                <td className="p-2">{book.name}</td>
                <td className="p-2">{book.author}</td>
                <td className="p-2 capitalize">{book.type}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded ${book.available ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {book.available ? 'Available' : 'Issued'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ProductDetails;
