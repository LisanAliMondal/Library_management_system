import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';

const AddMembership = () => {
  const [memberNo, setMemberNo] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [duration, setDuration] = useState('6');
  const [error, setError] = useState('');
  const { addMember } = useData();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!memberNo || !name || !email || !phone) {
      setError('All fields are mandatory');
      return;
    }
    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + parseInt(duration));
    addMember({ memberNo, name, email, phone, startDate, endDate: endDate.toISOString().split('T')[0], status: 'active' });
    navigate('/maintenance');
  };

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6">Add Membership</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block mb-2">Membership Number *</label>
          <input
            type="text"
            value={memberNo}
            onChange={(e) => setMemberNo(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
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
          <label className="block mb-2">Email *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Phone *</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Duration *</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="6"
                checked={duration === '6'}
                onChange={(e) => setDuration(e.target.value)}
                className="mr-2"
              />
              6 Months
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="12"
                checked={duration === '12'}
                onChange={(e) => setDuration(e.target.value)}
                className="mr-2"
              />
              1 Year
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="24"
                checked={duration === '24'}
                onChange={(e) => setDuration(e.target.value)}
                className="mr-2"
              />
              2 Years
            </label>
          </div>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Add Membership</button>
      </form>
    </Layout>
  );
};

export default AddMembership;
