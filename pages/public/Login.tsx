import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Mail, Lock, ArrowRight, LogIn, ShieldCheck } from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
}

const Login: React.FC<Props> = ({ onNavigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
    } catch (err: any) {
      toast.error(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAdmin = () => {
    setEmail('admin@surveytocash.com');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {/* Brand Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-violet-600 text-white mb-4 shadow-lg shadow-violet-200">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          survey<span className="font-light text-slate-500">tocash</span>
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border border-slate-100 overflow-hidden transition-all hover:shadow-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-slate-900">Welcome Back</h2>
            <p className="text-sm text-slate-500 mt-1">Sign in to manage your exchanges</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                </div>
                <input 
                  type="email" 
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all text-sm font-medium text-slate-900 placeholder:text-slate-400"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Password</label>
                <button type="button" className="text-xs font-semibold text-violet-600 hover:text-violet-700 hover:underline">Forgot Password?</button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                </div>
                <input 
                  type="password" 
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all text-sm font-medium text-slate-900 placeholder:text-slate-400"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-3.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account? 
              <button onClick={() => onNavigate('register')} className="text-violet-600 font-bold hover:underline ml-1">
                Create Account
              </button>
            </p>
          </div>
        </div>

        {/* Demo Footer */}
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex flex-col items-center">
           <button 
             onClick={handleDemoAdmin} 
             className="text-xs font-medium text-slate-500 hover:text-violet-600 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white hover:shadow-sm"
           >
             <LogIn className="w-3 h-3" />
             Demo Admin Access
           </button>
        </div>
      </div>
    </div>
  );
};

export default Login;