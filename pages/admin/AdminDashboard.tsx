import React, { useEffect, useState } from 'react';
import { api } from '../../services/mockApi';
import { DashboardStats } from '../../types';
import { Users, TrendingUp, AlertOctagon, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    api.getStats().then(setStats);
  }, []);

  const data = [
    { name: 'Mon', value: 4000 },
    { name: 'Tue', value: 3000 },
    { name: 'Wed', value: 2000 },
    { name: 'Thu', value: 2780 },
    { name: 'Fri', value: 1890 },
    { name: 'Sat', value: 2390 },
    { name: 'Sun', value: 3490 },
  ];

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
       <h1 className="text-2xl font-bold text-slate-900">Admin Overview</h1>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Users</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{stats.totalUsers}</h3>
            </div>
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
           <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Volume</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">৳{(stats.totalVolumeBdt / 1000).toFixed(1)}k</h3>
            </div>
            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
           <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Cards</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{stats.pendingCount}</h3>
            </div>
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
              <AlertOctagon className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
           <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Transactions</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{stats.totalTransactions}</h3>
            </div>
            <div className="p-2 bg-violet-100 text-violet-600 rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
        </div>
       </div>

       {/* Analytics Area */}
       <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-96">
         <h3 className="text-lg font-bold text-slate-900 mb-6">Volume Trend (Weekly)</h3>
         <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
         </ResponsiveContainer>
       </div>
    </div>
  );
};

export default AdminDashboard;
