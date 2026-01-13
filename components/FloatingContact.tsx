import React from 'react';
import { MessageCircle, Mail, Download, FileText, PhoneCall } from 'lucide-react';

const FloatingContact: React.FC = () => {
  const contactItems = [
    { icon: <PhoneCall className="w-5 h-5" />, label: 'Call', color: 'text-blue-600' },
    { icon: <MessageCircle className="w-5 h-5" />, label: 'WhatsApp', color: 'text-green-600' },
    { icon: <Mail className="w-5 h-5" />, label: 'Email', color: 'text-red-500' },
  ];

  return (
    /* 🟢 'hidden' ক্লাসটি সরিয়ে সরাসরি 'flex' ব্যবহার করুন যেন সব স্ক্রিনে দেখা যায় */
    /* 🟢 z-index বাড়িয়ে [9999] করা হয়েছে যেন এটি সবকিছুর উপরে থাকে */
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[9999] flex flex-col items-center pointer-events-auto">
      <div className="bg-white border border-slate-200 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] py-6 px-3 flex flex-col gap-6 items-center backdrop-blur-xl bg-white/95">
        {contactItems.map((item, index) => (
          <button
            key={index}
            className="group flex flex-col items-center gap-1 transition-all duration-300 hover:-translate-y-1 active:scale-90"
            title={item.label}
          >
            <div className={`p-2.5 rounded-2xl bg-slate-50 group-hover:bg-white group-hover:shadow-lg transition-all ${item.color}`}>
              {item.icon}
            </div>
            <span className="text-[9px] font-black uppercase tracking-tighter text-slate-400 group-hover:text-slate-900 transition-colors">
              {item.label}
            </span>
          </button>
        ))}
      </div>
      
      {/* ছবির মতো নিচের ইন্ডিকেটর অ্যারো */}
      <div className="mt-4 animate-bounce">
         <div className="w-1.5 h-12 bg-gradient-to-b from-violet-600 to-transparent rounded-full opacity-50" />
      </div>
    </div>
  );
};

export default FloatingContact;