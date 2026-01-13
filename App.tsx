import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserRole } from './types';
import Layout from './components/Layout';
import { Toaster } from 'react-hot-toast';

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
  const [currentPage, setCurrentPage] = useState('landing');

  useEffect(() => {
    // লগইন করার পর রোল অনুযায়ী পেজ সেট করা
    if (isAuthenticated) {
      if (user?.role === UserRole.ADMIN) {
        setCurrentPage('admin-dashboard');
      } else {
        setCurrentPage('dashboard');
      }
    } else {
      // লগআউট থাকলে ডিফল্ট ল্যান্ডিং পেজ
      setCurrentPage('landing');
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  // --- Protected Routing Logic ---
  const renderPage = () => {
    // ইউজার লগইন না থাকলে পাবলিক পেজগুলো রেন্ডার হবে
    if (!isAuthenticated) {
      switch (currentPage) {
        case 'login': return <Login onNavigate={setCurrentPage} />;
        case 'register': return <Register onNavigate={setCurrentPage} />;
        default: return <Landing onNavigate={setCurrentPage} />;
      }
    }

    // এডমিন পেজগুলো
    if (user?.role === UserRole.ADMIN) {
      switch (currentPage) {
        case 'admin-dashboard': return <AdminDashboard />;
        case 'admin-cards': return <AdminCards />;
        case 'admin-users': return <AdminUsers />;
        case 'admin-settings': return <AdminSettings />;
        default: return <AdminDashboard />;
      }
    }

    // সাধারণ ইউজার পেজগুলো
    switch (currentPage) {
      case 'dashboard': return <Dashboard onNavigate={setCurrentPage} />;
      case 'submit': return <SubmitCard onSuccess={() => setCurrentPage('history')} />;
      case 'history': return <History />;
      default: return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  // যদি লগইন না থাকে তবে লেআউট ছাড়া পেজ রেন্ডার হবে (যেমন: ল্যান্ডিং, লগইন)
  if (!isAuthenticated) {
    return renderPage();
  }

  // লগইন থাকলে লেআউটের ভেতরে পেজ রেন্ডার হবে
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
