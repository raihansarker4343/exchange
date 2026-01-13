import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/mockApi';
import { Transaction, CardStatus } from '../../types';
import { PlusCircle, Clock, CheckCircle, XCircle, Wallet } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Props {
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<Props> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        const data = await api.getUserTransactions(user.id);
        setTransactions(data);
        setLoading(false);
      }
    };
    loadData();
  }, [user]);

  const stats = {
    pending: transactions.filter(t => t.status === CardStatus.PENDING).length,
    approved: transactions.filter(t => t.status === CardStatus.APPROVED).length,
    rejected: transactions.filter(t => t.status === CardStatus.REJECTED).length,
    totalVolume: transactions
      .filter(t => t.status === CardStatus.APPROVED)
      .reduce((acc, curr) => acc + curr.payoutAmountBdt, 0)
  };

  const chartData = [
    { name: 'Pending', value: stats.pending, color: '#f59e0b' },
    { name: 'Approved', value: stats.approved, color: '#10b981' },
    { name: 'Rejected', value: stats.rejected, color: '#ef4444' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Welcome back, {user?.name}</p>
        </div>
        <button 
          onClick={() => onNavigate('submit')}
          className="flex items-center justify-center px-4 py-2 bg-violet-600 text-white rounded-lg shadow-md hover:bg-violet-700 transition-all"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          New Exchange
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center">
          <div className="p-3 bg-violet-100 rounded-lg text-violet-600 mr-4">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">Total Earned</p>
            <p className="text-xl font-bold text-slate-900">৳{stats.totalVolume.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center">
          <div className="p-3 bg-amber-100 rounded-lg text-amber-600 mr-4">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">Pending</p>
            <p className="text-xl font-bold text-slate-900">{stats.pending}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center">
          <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600 mr-4">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">Approved</p>
            <p className="text-xl font-bold text-slate-900">{stats.approved}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center">
          <div className="p-3 bg-red-100 rounded-lg text-red-600 mr-4">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">Rejected</p>
            <p className="text-xl font-bold text-slate-900">{stats.rejected}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-1">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Submission Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-bold text-slate-900">Recent Transactions</h3>
             <button onClick={() => onNavigate('history')} className="text-sm text-violet-600 hover:text-violet-700 font-medium">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 uppercase bg-slate-50">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Card</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-r-lg">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                   <tr><td colSpan={4} className="text-center py-4">Loading...</td></tr>
                ) : transactions.length === 0 ? (
                   <tr><td colSpan={4} className="text-center py-4 text-slate-500">No transactions yet</td></tr>
                ) : (
                  transactions.slice(0, 5).map((trx) => (
                    <tr key={trx.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-700">{trx.cardType}</td>
                      <td className="px-4 py-3 text-slate-600">৳{trx.payoutAmountBdt.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold
                          ${trx.status === CardStatus.APPROVED ? 'bg-green-100 text-green-700' :
                            trx.status === CardStatus.REJECTED ? 'bg-red-100 text-red-700' :
                            'bg-amber-100 text-amber-700'}
                        `}>
                          {trx.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500">
                        {new Date(trx.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
