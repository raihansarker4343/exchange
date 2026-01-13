import React from 'react';
import { useAuth } from '../../context/AuthContext'; // AuthContext যোগ করুন
import { ArrowRight, ShieldCheck, Zap, CreditCard } from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
}

const Landing: React.FC<Props> = ({ onNavigate }) => {
  const { isAuthenticated } = useAuth(); // চেক করুন ইউজার লগইন কি না

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation */}
      <nav className="w-full py-6 px-6 lg:px-12 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          survey<span className="font-light text-slate-600">tocash</span>
        </div>
        <div className="flex gap-4">
          {!isAuthenticated ? (
            <>
              <button 
                onClick={() => onNavigate('login')}
                className="text-slate-600 hover:text-violet-600 font-medium transition-colors"
              >
                Log In
              </button>
              <button 
                onClick={() => onNavigate('register')}
                className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-lg shadow-violet-200"
              >
                Get Started
              </button>
            </>
          ) : (
            <button 
              onClick={() => onNavigate('dashboard')}
              className="bg-violet-600 text-white px-5 py-2 rounded-full font-medium"
            >
              Go to Dashboard
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
        {/* Abstract Background Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
            Turn your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Gift Cards</span> into Cash instantly.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            The most secure and premium platform to exchange Apple, Visa, MasterCard, and more for BDT. Get paid via bKash, Rocket, or Nagad within minutes.
          </p>
          
          <button 
            onClick={() => onNavigate('register')}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-slate-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-slate-800"
          >
            Start Exchanging
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10 px-4">
          <div className="bg-white/60 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all">
            <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-6 text-violet-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Secure Transactions</h3>
            <p className="text-slate-600">Bank-grade security protocols ensuring your cards and data are always protected.</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6 text-indigo-600">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Fast Payouts</h3>
            <p className="text-slate-600">We process legitimate cards instantly. Receive money in your mobile wallet in minutes.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6 text-pink-600">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Best Rates</h3>
            <p className="text-slate-600">We offer the most competitive exchange rates in the market updated daily.</p>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-auto relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} surveytocash. All rights reserved.</p>
          <div className="flex gap-6">
            <button className="hover:text-violet-600 transition-colors">Privacy Policy</button>
            <button className="hover:text-violet-600 transition-colors">Terms of Service</button>
            <button className="hover:text-violet-600 transition-colors">Contact Support</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
