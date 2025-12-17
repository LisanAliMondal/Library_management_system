import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const UserManagement = () => {
  const [userType, setUserType] = useState('new');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5001/api/auth/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const handleUserSelect = (id) => {
    setSelectedUser(id);
    const user = users.find(u => u._id === id);
    if (user) {
      setName(user.username);
      setIsActive(user.status === 'active');
      setIsAdmin(user.role === 'admin');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError('All fields are required to submit the form');
      return;
    }

    try {
      if (userType === 'new') {
        if (!password) {
          setError('Password is required for new user');
          return;
        }
        const response = await fetch('http://localhost:5001/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: name,
            password,
            role: isAdmin ? 'admin' : 'user',
            status: isActive ? 'active' : 'inactive'
          })
        });
        if (response.ok) {
          navigate('/maintenance');
        } else {
          setError('Failed to create user');
        }
      } else {
        const response = await fetch(`http://localhost:5001/api/auth/users/${selectedUser}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            role: isAdmin ? 'admin' : 'user',
            status: isActive ? 'active' : 'inactive'
          })
        });
        if (response.ok) {
          navigate('/maintenance');
        } else {
          setError('Failed to update user');
        }
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
        <h2 className="text-3xl font-bold">User Management</h2>
        <div className="flex gap-4">
          <button type="button" onClick={() => navigate('/maintenance')} className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 font-semibold">Chart</button>
          <button type="button" onClick={() => navigate('/maintenance')} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-semibold">Home</button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block mb-2 font-semibold">User Type *</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="new"
                checked={userType === 'new'}
                onChange={(e) => setUserType(e.target.value)}
                className="mr-2"
                required
              />
              New User
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="existing"
                checked={userType === 'existing'}
                onChange={(e) => setUserType(e.target.value)}
                className="mr-2"
              />
              Existing User
            </label>
          </div>
        </div>

        {userType === 'existing' && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Select User *</label>
            <select value={selectedUser} onChange={(e) => handleUserSelect(e.target.value)} className="w-full border p-2 rounded" required>
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>{user.username}</option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
            readOnly={userType === 'existing'}
          />
        </div>

        {userType === 'new' && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Password *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="mr-2"
            />
            <span className="font-semibold">Status - Active</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="mr-2"
            />
            <span className="font-semibold">Admin</span>
          </label>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-between items-center">
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            {userType === 'new' ? 'Create User' : 'Update User'}
          </button>
          <button type="button" onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">Log Out</button>
        </div>
      </form>
    </Layout>
  );
};

export default UserManagement;
