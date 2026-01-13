import React, { useEffect, useState } from 'react';
import { api } from '../../services/mockApi';
import { User, UserRole } from '../../types';
import { Ban, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.getAllUsers().then(setUsers);
  }, []);

  const toggleUserStatus = async (user: User) => {
    // In a real app, API call here
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, isActive: !u.isActive } : u
    );
    setUsers(updatedUsers);
    toast.success(`User ${user.isActive ? 'deactivated' : 'activated'}`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-xs text-slate-500 uppercase">
             <tr>
               <th className="px-6 py-4">Name</th>
               <th className="px-6 py-4">Email</th>
               <th className="px-6 py-4">Role</th>
               <th className="px-6 py-4">Status</th>
               <th className="px-6 py-4 text-right">Actions</th>
             </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
             {users.map(u => (
               <tr key={u.id} className="hover:bg-slate-50/50">
                 <td className="px-6 py-4 font-medium text-slate-900">{u.name}</td>
                 <td className="px-6 py-4 text-slate-500">{u.email}</td>
                 <td className="px-6 py-4">
                   <span className={`text-xs px-2 py-1 rounded border ${u.role === UserRole.ADMIN ? 'bg-violet-50 text-violet-700 border-violet-100' : 'bg-slate-50 text-slate-600 border-slate-100'}`}>
                     {u.role}
                   </span>
                 </td>
                 <td className="px-6 py-4">
                    <span className={`flex items-center text-xs font-semibold ${u.isActive ? 'text-green-600' : 'text-red-500'}`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${u.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      {u.isActive ? 'Active' : 'Banned'}
                    </span>
                 </td>
                 <td className="px-6 py-4 text-right">
                   {u.role !== UserRole.ADMIN && (
                     <button 
                       onClick={() => toggleUserStatus(u)}
                       className={`p-2 rounded-lg transition-colors ${u.isActive ? 'text-red-500 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}
                       title={u.isActive ? 'Deactivate User' : 'Activate User'}
                     >
                       {u.isActive ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                     </button>
                   )}
                 </td>
               </tr>
             ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
