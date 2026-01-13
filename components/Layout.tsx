import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { 
  LayoutDashboard, 
  CreditCard, 
  History, 
  Settings, 
  Users, 
  LogOut, 
  Menu, 
  X,
  Bell
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate }) => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isAdmin = user?.role === UserRole.ADMIN;

  const userNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'submit', label: 'Submit Card', icon: CreditCard },
    { id: 'history', label: 'My History', icon: History },
  ];

  const adminNav = [
    { id: 'admin-dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'admin-cards', label: 'Manage Cards', icon: CreditCard },
    { id: 'admin-users', label: 'Manage Users', icon: Users },
    { id: 'admin-settings', label: 'Settings', icon: Settings },
  ];

  const navItems = isAdmin ? adminNav : userNav;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed md:relative z-50 h-full w-64 bg-white border-r border-slate-200 shadow-xl md:shadow-none transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-slate-100">
            <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              survey<span className="font-light text-slate-600">tocash</span>
            </div>
            <button className="md:hidden ml-auto" onClick={toggleSidebar}>
              <X className="w-6 h-6 text-slate-500" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
            <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {isAdmin ? 'Admin Console' : 'User Menu'}
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${active 
                      ? 'bg-violet-50 text-violet-700 shadow-sm ring-1 ring-violet-200' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                >
                  <Icon className={`w-5 h-5 mr-3 ${active ? 'text-violet-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User Profile Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-bold">
                {user?.name?.charAt(0) || "?"}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-700 truncate w-32">{user?.name}</p>
                <p className="text-xs text-slate-500 truncate w-32">{user?.email}</p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-slate-200 rounded-md shadow-sm text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200 flex-shrink-0">
          <button 
            className="md:hidden p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
            onClick={toggleSidebar}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center ml-auto space-x-4">
             {/* Notification Bell (Mock) */}
             <button className="p-2 rounded-full text-slate-400 hover:text-slate-500 hover:bg-slate-100 relative">
               <Bell className="w-5 h-5" />
               <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border-2 border-white"></span>
             </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div className="min-h-full flex flex-col p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto w-full flex-1">
              {children}
            </div>
          </div>
        </main>

        {/* Footer - Fixed at bottom */}
        <footer className="bg-white border-t border-slate-200 py-4 px-6 flex-shrink-0">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} surveytocash. All rights reserved.</p>
            <div className="flex gap-6">
              <button className="hover:text-violet-600 transition-colors">Privacy Policy</button>
              <button className="hover:text-violet-600 transition-colors">Terms of Service</button>
              <button className="hover:text-violet-600 transition-colors">Contact Support</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;