import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';

const UpdateMembership = () => {
  const [memberNo, setMemberNo] = useState('');
  const [member, setMember] = useState(null);
  const [action, setAction] = useState('extend');
  const [extension, setExtension] = useState('6');
  const [error, setError] = useState('');
  const { members, updateMember } = useData();
  const navigate = useNavigate();

  const handleMemberSearch = () => {
    if (!memberNo) {
      setError('Membership number is required');
      return;
    }
    const found = members.find(m => m.memberNo === memberNo);
    if (found) {
      setMember(found);
      setError('');
    } else {
      setError('Member not found');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!member) {
      setError('Please search for a member first');
      return;
    }
    if (action === 'extend') {
      const endDate = new Date(member.endDate);
      endDate.setMonth(endDate.getMonth() + parseInt(extension));
      updateMember(member.id, { endDate: endDate.toISOString().split('T')[0] });
    } else {
      updateMember(member.id, { status: 'cancelled' });
    }
    navigate('/maintenance');
  };

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6">Update Membership</h2>
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
        
        {member && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input type="text" value={member.name} readOnly className="w-full border p-2 rounded bg-gray-100" />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input type="text" value={member.email} readOnly className="w-full border p-2 rounded bg-gray-100" />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Phone</label>
              <input type="text" value={member.phone} readOnly className="w-full border p-2 rounded bg-gray-100" />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Current End Date</label>
              <input type="text" value={member.endDate} readOnly className="w-full border p-2 rounded bg-gray-100" />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Action</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="extend"
                    checked={action === 'extend'}
                    onChange={(e) => setAction(e.target.value)}
                    className="mr-2"
                  />
                  Extend
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="cancel"
                    checked={action === 'cancel'}
                    onChange={(e) => setAction(e.target.value)}
                    className="mr-2"
                  />
                  Cancel
                </label>
              </div>
            </div>
            {action === 'extend' && (
              <div className="mb-4">
                <label className="block mb-2">Extension Period</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="6"
                      checked={extension === '6'}
                      onChange={(e) => setExtension(e.target.value)}
                      className="mr-2"
                    />
                    6 Months
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="12"
                      checked={extension === '12'}
                      onChange={(e) => setExtension(e.target.value)}
                      className="mr-2"
                    />
                    1 Year
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="24"
                      checked={extension === '24'}
                      onChange={(e) => setExtension(e.target.value)}
                      className="mr-2"
                    />
                    2 Years
                  </label>
                </div>
              </div>
            )}
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Update</button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default UpdateMembership;
