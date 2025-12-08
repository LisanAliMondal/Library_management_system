import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [view, setView] = useState('select');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e, role) => {
    e.preventDefault();
    if (username && password) {
      login(username, password, role);
      navigate(role === 'admin' ? '/maintenance' : '/reports');
    }
  };

  if (view === 'select') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Library Management System</h2>
          <h3 className="text-lg mb-6 text-center text-gray-600">Select Login Type</h3>
          <div className="space-y-4">
            <button
              onClick={() => setView('admin')}
              className="w-full bg-blue-600 text-white p-4 rounded hover:bg-blue-700 text-lg"
            >
              Admin Login
            </button>
            <button
              onClick={() => setView('user')}
              className="w-full bg-green-600 text-white p-4 rounded hover:bg-green-700 text-lg"
            >
              User Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-2 text-center">Library Management System</h2>
        <h3 className={`text-lg mb-6 text-center font-semibold ${view === 'admin' ? 'text-blue-600' : 'text-green-600'}`}>
          {view === 'admin' ? 'Admin Login' : 'User Login'}
        </h3>
        <form onSubmit={(e) => handleSubmit(e, view)}>
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <button type="submit" className={`w-full text-white p-2 rounded ${view === 'admin' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}>
            Login as {view === 'admin' ? 'Admin' : 'User'}
          </button>
          <button
            type="button"
            onClick={() => { setView('select'); setUsername(''); setPassword(''); }}
            className="w-full mt-3 bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
