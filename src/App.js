import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Maintenance from './pages/Maintenance';
import Reports from './pages/Reports';
import Transactions from './pages/Transactions';
import BookIssue from './pages/BookIssue';
import ReturnBook from './pages/ReturnBook';
import PayFine from './pages/PayFine';
import BookAvailable from './pages/BookAvailable';
import AddBook from './pages/AddBook';
import UpdateBook from './pages/UpdateBook';
import AddMembership from './pages/AddMembership';
import UpdateMembership from './pages/UpdateMembership';
import ProductDetails from './pages/ProductDetails';
import MasterBooks from './pages/MasterBooks';
import MasterMovies from './pages/MasterMovies';
import MasterMemberships from './pages/MasterMemberships';
import ActiveIssues from './pages/ActiveIssues';
import OverdueReturns from './pages/OverdueReturns';
import IssueRequests from './pages/IssueRequests';
import UserManagement from './pages/UserManagement';
import CancelTransaction from './pages/CancelTransaction';
import TransactionConfirmation from './pages/TransactionConfirmation';
import LogoutConfirmation from './pages/LogoutConfirmation';

const ProtectedRoute = ({ children, adminOnly }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/reports" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/maintenance" element={<ProtectedRoute adminOnly><Maintenance /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
            <Route path="/book-issue" element={<ProtectedRoute><BookIssue /></ProtectedRoute>} />
            <Route path="/return-book" element={<ProtectedRoute><ReturnBook /></ProtectedRoute>} />
            <Route path="/pay-fine" element={<ProtectedRoute><PayFine /></ProtectedRoute>} />
            <Route path="/pay-fine/:id" element={<ProtectedRoute><PayFine /></ProtectedRoute>} />
            <Route path="/book-available" element={<ProtectedRoute><BookAvailable /></ProtectedRoute>} />
            <Route path="/add-book" element={<ProtectedRoute adminOnly><AddBook /></ProtectedRoute>} />
            <Route path="/update-book" element={<ProtectedRoute adminOnly><UpdateBook /></ProtectedRoute>} />
            <Route path="/add-membership" element={<ProtectedRoute adminOnly><AddMembership /></ProtectedRoute>} />
            <Route path="/update-membership" element={<ProtectedRoute adminOnly><UpdateMembership /></ProtectedRoute>} />
            <Route path="/product-details" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
            <Route path="/master-books" element={<ProtectedRoute><MasterBooks /></ProtectedRoute>} />
            <Route path="/master-movies" element={<ProtectedRoute><MasterMovies /></ProtectedRoute>} />
            <Route path="/master-memberships" element={<ProtectedRoute><MasterMemberships /></ProtectedRoute>} />
            <Route path="/active-issues" element={<ProtectedRoute><ActiveIssues /></ProtectedRoute>} />
            <Route path="/overdue-returns" element={<ProtectedRoute><OverdueReturns /></ProtectedRoute>} />
            <Route path="/pending-requests" element={<ProtectedRoute><IssueRequests /></ProtectedRoute>} />
            <Route path="/user-management" element={<ProtectedRoute adminOnly><UserManagement /></ProtectedRoute>} />
            <Route path="/cancel-transaction" element={<ProtectedRoute><CancelTransaction /></ProtectedRoute>} />
            <Route path="/transaction-confirmation" element={<ProtectedRoute><TransactionConfirmation /></ProtectedRoute>} />
            <Route path="/logout-confirmation" element={<LogoutConfirmation />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
