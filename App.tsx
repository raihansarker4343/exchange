import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserRole } from './types';
import Layout from './components/Layout';
import { Toaster, toast } from 'react-hot-toast';

// User Pages
import Dashboard from './pages/user/Dashboard';
import SubmitCard from './pages/user/SubmitCard';
import History from './pages/user/History';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCards from './pages/admin/AdminCards';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSettings from './pages/admin/AdminSettings';

// Public Pages
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Landing from './pages/public/Landing';

const AppContent: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    // Reset page on role change or login
    if (isAuthenticated) {
      if (user?.role === UserRole.ADMIN) {
        setCurrentPage('admin-dashboard');
      } else {
        setCurrentPage('dashboard');
      }
    } else {
      // Default public page state if needed
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  // App.tsx এর AppContent এর ভিতরে এটি চেক করুন
if (!isAuthenticated) {
  if (currentPage === 'login') return <Login onNavigate={setCurrentPage} />;
  if (currentPage === 'register') return <Register onNavigate={setCurrentPage} />;
  return <Landing onNavigate={setCurrentPage} />;
}

// ইউজার লগইন থাকলে লেআউট লোড হবে
return (
  <Layout activePage={currentPage} onNavigate={setCurrentPage}>
    {renderPage()}
  </Layout>
);

  // Protected Routing Logic
  const renderPage = () => {
    // Admin Routes
    if (user?.role === UserRole.ADMIN) {
      switch (currentPage) {
        case 'admin-dashboard': return <AdminDashboard />;
        case 'admin-cards': return <AdminCards />;
        case 'admin-users': return <AdminUsers />;
        case 'admin-settings': return <AdminSettings />;
        default: return <AdminDashboard />;
      }
    }

    // User Routes
    switch (currentPage) {
      case 'dashboard': return <Dashboard onNavigate={setCurrentPage} />;
      case 'submit': return <SubmitCard onSuccess={() => setCurrentPage('history')} />;
      case 'history': return <History />;
      default: return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout activePage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{
        className: '',
        style: {
          background: '#1e293b',
          color: '#fff',
          fontSize: '14px',
        },
      }} />
      <AppContent />
    </AuthProvider>
  );
}
