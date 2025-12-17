import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';

const AddMembership = () => {
  const [memberNo, setMemberNo] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [aadharNo, setAadharNo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [membership, setMembership] = useState('6');
  const [error, setError] = useState('');
  const { fetchMembers } = useData();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !contactName || !contactAddress || !aadharNo || !startDate || !endDate) {
      setError('All fields are required');
      return;
    }
    const name = `${firstName} ${lastName}`;
    try {
      const response = await fetch('http://localhost:5001/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberNo, name, email: contactName, phone: contactName, address: contactAddress, aadharNo, startDate, endDate, status: 'active' })
      });
      if (response.ok) {
        fetchMembers();
        navigate('/maintenance');
      } else {
        setError('Failed to add membership');
      }
    } catch (err) {
      setError('Error connecting to server');
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Add Membership</h2>
        <div className="flex gap-4">
          <button type="button" onClick={() => navigate('/maintenance')} className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 font-semibold">Chart</button>
          <button type="button" onClick={() => navigate('/maintenance')} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-semibold">Home</button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block mb-2 font-semibold">First Name *</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Last Name *</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Contact Name *</label>
          <input
            type="text"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Contact Address *</label>
          <input
            type="text"
            value={contactAddress}
            onChange={(e) => setContactAddress(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Aadhar Card No *</label>
          <input
            type="text"
            value={aadharNo}
            onChange={(e) => setAadharNo(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Start Date *</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">End Date *</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Membership *</label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="6"
                checked={membership === '6'}
                onChange={(e) => setMembership(e.target.value)}
                className="mr-2"
                required
              />
              Six months
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="12"
                checked={membership === '12'}
                onChange={(e) => setMembership(e.target.value)}
                className="mr-2"
              />
              One Year
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="24"
                checked={membership === '24'}
                onChange={(e) => setMembership(e.target.value)}
                className="mr-2"
              />
              Two Years
            </label>
          </div>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-between items-center">
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Add Membership</button>
          <button type="button" onClick={() => { logout(); navigate('/'); }} className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">Log Out</button>
        </div>
      </form>
    </Layout>
  );
};

export default AddMembership;
