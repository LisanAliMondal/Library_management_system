import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const UpdateMembership = () => {
  const [memberNo, setMemberNo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [action, setAction] = useState('extend');
  const [extension, setExtension] = useState('6');
  const [error, setError] = useState('');
  const [memberId, setMemberId] = useState(null);
  const { fetchMembers } = useData();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleMemberSearch = async () => {
    if (!memberNo) {
      setError('Membership number is required');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5001/api/members/search/${memberNo}`);
      const data = await response.json();
      if (data) {
        setMemberId(data._id);
        setStartDate(new Date(data.startDate).toISOString().split('T')[0]);
        setEndDate(new Date(data.endDate).toISOString().split('T')[0]);
        setError('');
      } else {
        setError('Member not found');
      }
    } catch (err) {
      setError('Error searching member');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!memberId || !startDate || !endDate) {
      setError('All fields are required');
      return;
    }
    try {
      let updateData = {};
      if (action === 'extend') {
        const newEndDate = new Date(endDate);
        newEndDate.setMonth(newEndDate.getMonth() + parseInt(extension));
        updateData = { startDate, endDate: newEndDate.toISOString().split('T')[0] };
      } else {
        updateData = { status: 'cancelled' };
      }
      const response = await fetch(`http://localhost:5001/api/members/${memberId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      if (response.ok) {
        fetchMembers();
        navigate('/maintenance');
      } else {
        setError('Failed to update membership');
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
        <h2 className="text-3xl font-bold">Update Membership</h2>
        <div className="flex gap-4">
          <button type="button" onClick={() => navigate('/maintenance')} className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 font-semibold">Chart</button>
          <button type="button" onClick={() => navigate('/maintenance')} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-semibold">Home</button>
        </div>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={memberNo}
            onChange={(e) => setMemberNo(e.target.value)}
            placeholder="Enter Membership Number"
            className="flex-1 border p-2 rounded"
          />
          <button onClick={handleMemberSearch} className="bg-blue-600 text-white px-6 py-2 rounded">Search</button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        {memberId && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Membership Number *</label>
              <input type="text" value={memberNo} readOnly className="w-full border p-2 rounded bg-gray-100" />
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
              <label className="block mb-2 font-semibold">Membership Extn: *</label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="6"
                    checked={action === 'extend' && extension === '6'}
                    onChange={(e) => { setAction('extend'); setExtension(e.target.value); }}
                    className="mr-2"
                  />
                  Six months
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="12"
                    checked={action === 'extend' && extension === '12'}
                    onChange={(e) => { setAction('extend'); setExtension(e.target.value); }}
                    className="mr-2"
                  />
                  One Year
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="24"
                    checked={action === 'extend' && extension === '24'}
                    onChange={(e) => { setAction('extend'); setExtension(e.target.value); }}
                    className="mr-2"
                  />
                  Two Years
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Membership Remove</label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="cancel"
                  checked={action === 'cancel'}
                  onChange={(e) => setAction(e.target.value)}
                  className="mr-2"
                />
                Remove Membership
              </label>
            </div>
            <div className="flex justify-between items-center">
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Update</button>
              <button type="button" onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">Log Out</button>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default UpdateMembership;
