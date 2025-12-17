import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const MasterMemberships = () => {
  const { members } = useData();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">List of Active Memberships</h2>
        <div className="flex gap-4">
          <Link to="/reports" className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 font-semibold">Chart</Link>
          <Link to={user?.role === 'admin' ? '/maintenance' : '/reports'} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-semibold">Home</Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 p-3 text-left">Membership Id</th>
              <th className="border border-gray-300 p-3 text-left">Name of Member</th>
              <th className="border border-gray-300 p-3 text-left">Contact Number</th>
              <th className="border border-gray-300 p-3 text-left">Contact Address</th>
              <th className="border border-gray-300 p-3 text-left">Aadhar Card No</th>
              <th className="border border-gray-300 p-3 text-left">Start Date of Membership</th>
              <th className="border border-gray-300 p-3 text-left">End Date of Membership</th>
              <th className="border border-gray-300 p-3 text-left">Status (Active/Inactive)</th>
              <th className="border border-gray-300 p-3 text-left">Amount Pending(Fine)</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, idx) => (
              <tr key={member._id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border border-gray-300 p-3">{member.memberNo}</td>
                <td className="border border-gray-300 p-3">{member.name}</td>
                <td className="border border-gray-300 p-3">{member.phone}</td>
                <td className="border border-gray-300 p-3">{member.address || 'N/A'}</td>
                <td className="border border-gray-300 p-3">{member.aadharNo || 'N/A'}</td>
                <td className="border border-gray-300 p-3">{formatDate(member.startDate)}</td>
                <td className="border border-gray-300 p-3">{formatDate(member.endDate)}</td>
                <td className="border border-gray-300 p-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${member.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {member.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="border border-gray-300 p-3">${member.pendingFine || '0.00'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-6">
          <button onClick={handleLogout} className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 font-semibold shadow-lg">Log Out</button>
        </div>
      </div>
    </Layout>
  );
};

export default MasterMemberships;
