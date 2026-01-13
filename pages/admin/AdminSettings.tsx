import React, { useEffect, useState } from 'react';
import { api } from '../../services/mockApi';
import { GiftCardRate, PaymentMethod } from '../../types';
import { Save, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminSettings: React.FC = () => {
  const [rates, setRates] = useState<GiftCardRate[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getRates().then(setRates);
  }, []);

  const handleRateChange = (id: string, newRate: number) => {
    setRates(rates.map(r => r.id === id ? { ...r, rate: newRate } : r));
  };

  const toggleRateEnabled = (id: string) => {
    setRates(rates.map(r => r.id === id ? { ...r, isEnabled: !r.isEnabled } : r));
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      await api.updateRates(rates);
      toast.success('Settings saved successfully');
    } catch (e) {
      toast.error('Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
       <div className="flex justify-between items-center">
         <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
         <button 
           onClick={saveSettings}
           disabled={loading}
           className="flex items-center px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all disabled:opacity-50"
         >
           <Save className="w-4 h-4 mr-2" />
           Save Changes
         </button>
       </div>

       {/* Exchange Rates */}
       <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
         <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
           <RefreshCw className="w-5 h-5 mr-2 text-violet-600" />
           Exchange Rate Control
         </h3>
         <p className="text-sm text-slate-500 mb-6">Real-time update for user exchange rates.</p>

         <div className="space-y-4">
           {rates.map((rate) => (
             <div key={rate.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center space-x-4">
                  <input 
                    type="checkbox" 
                    checked={rate.isEnabled}
                    onChange={() => toggleRateEnabled(rate.id)}
                    className="w-5 h-5 rounded text-violet-600 focus:ring-violet-500 border-slate-300"
                  />
                  <span className={`font-medium ${!rate.isEnabled ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                    {rate.type}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-500">Rate:</span>
                  <input 
                    type="number" 
                    value={rate.rate}
                    onChange={(e) => handleRateChange(rate.id, Number(e.target.value))}
                    className="w-24 px-2 py-1 rounded border border-slate-300 text-right focus:ring-2 focus:ring-violet-500 outline-none"
                  />
                  <span className="text-sm text-slate-500">BDT/$</span>
                </div>
             </div>
           ))}
         </div>
       </div>

       {/* Payment Methods (Visual Mock) */}
       <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 opacity-80">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Payment Methods Limits</h3>
          <p className="text-sm text-slate-500 mb-4">Control transaction limits per gateway (Read-only demo).</p>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 border rounded-lg">
               <div className="font-bold text-pink-600">bKash</div>
               <div className="text-xs text-slate-500">Max: 25,000 BDT</div>
             </div>
             <div className="p-4 border rounded-lg">
               <div className="font-bold text-orange-600">Nagad</div>
               <div className="text-xs text-slate-500">Max: 25,000 BDT</div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default AdminSettings;
