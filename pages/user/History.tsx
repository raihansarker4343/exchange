import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/mockApi';
import { Transaction, CardStatus } from '../../types';

const History: React.FC = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      api.getUserTransactions(user.id).then(data => {
        setTransactions(data);
        setLoading(false);
      });
    }
  }, [user]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">My History</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Ref ID</th>
                <th className="px-6 py-4">Card Info</th>
                <th className="px-6 py-4">Amount ($)</th>
                <th className="px-6 py-4">Payout (BDT)</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-8">Loading...</td></tr>
              ) : transactions.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-slate-500">No records found</td></tr>
              ) : (
                transactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">#{trx.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{trx.cardType}</div>
                      <div className="text-xs text-slate-500 truncate max-w-[150px]">{trx.cardLink}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">${trx.cardAmountUsd}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">৳{trx.payoutAmountBdt.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
                        ${trx.status === CardStatus.APPROVED ? 'bg-green-100 text-green-700' :
                          trx.status === CardStatus.REJECTED ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'}
                      `}>
                        {trx.status}
                      </span>
                      {trx.adminNote && (
                         <div className="text-xs text-slate-400 mt-1">Note: {trx.adminNote}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
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
  );
};

export default History;
