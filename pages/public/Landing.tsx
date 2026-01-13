import React from 'react';
import { useAuth } from '../../context/AuthContext';
import FloatingContact from '../../components/FloatingContact';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  CreditCard,
  ChevronRight,
  Star,
  Globe,
  Lock,
  ArrowUpRight
} from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
}

const Landing: React.FC<Props> = ({ onNavigate }) => {
  const { isAuthenticated } = useAuth();

  // লোগো ডেটা
  const partners = [
    { name: "ACH Transfer", logo: "https://api.tremendous.com/product_images/ET0ZVETV5ILN/card" },
    { name: "Apple Card", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Visa", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" },
    { name: "Mastercard", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-violet-100 selection:text-violet-700 overflow-x-hidden font-inter">
      {/* Decorative Background Blobs - Light Version */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-violet-50 blur-[120px] rounded-full -z-10 opacity-70" />

      {/* Navigation - Fixed/Sticky Header */}
      <nav className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-md border-b border-slate-100 bg-white/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-200 group-hover:rotate-6 transition-transform">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter italic text-slate-900">
              SURVEY<span className="text-violet-600">TOCASH</span>
            </span>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-500 uppercase tracking-wider">
              <button className="hover:text-violet-600 transition-colors">Rates</button>
              <button className="hover:text-violet-600 transition-colors">Safety</button>
              <button className="hover:text-violet-600 transition-colors">Help</button>
            </div>
            <div className="flex gap-4">
              {!isAuthenticated ? (
                <>
                  <button onClick={() => onNavigate('login')} className="px-5 py-2 text-sm font-bold text-slate-600 hover:text-violet-600 transition-colors">Login</button>
                  <button onClick={() => onNavigate('register')} className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-violet-600 transition-all shadow-xl shadow-slate-200 active:scale-95">Get Started</button>
                </>
              ) : (
                <button onClick={() => onNavigate('dashboard')} className="bg-violet-600 text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-violet-700 transition-all shadow-lg shadow-violet-200">
                  My Dashboard <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area - Added padding top to account for fixed header */}
      <div className="pt-[72px]">
        {/* Hero Section */}

        <section className="relative pt-16 pb-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

            {/* 🟢 LEFT SIDE: TEXT CONTENT */}
            <div className="flex-1 text-left z-10 animate-slide-in-left">
              <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 px-4 py-2 rounded-full mb-6">
                <Star className="w-4 h-4 text-violet-600 fill-violet-600" />
                <span className="text-[10px] font-black tracking-[0.15em] uppercase text-violet-700">
                  Trusted by 10,000+ Active Traders
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight text-slate-900 italic">
                Exchange your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600">
                  Gift Cards
                </span> for Cash.
              </h1>

              <p className="text-lg text-slate-500 max-w-xl mb-10 leading-relaxed font-medium">
                Join the most reliable platform in Bangladesh to sell Apple, Visa, and Amazon cards.
                Receive payments in <span className="text-slate-900 font-bold italic">2-5 minutes</span> via bKash or Nagad.
              </p>

              {/* Action Buttons & Trust Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <button
                  onClick={() => onNavigate('register')}
                  className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-violet-600 hover:shadow-2xl hover:shadow-violet-200 transition-all hover:-translate-y-1 active:scale-95"
                >
                  Start Trading <ArrowRight className="w-6 h-6" />
                </button>

                <div className="flex items-center gap-4 group">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">ID</div>
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-black text-slate-900 flex items-center gap-1">
                      4.9/5 Rating <ArrowUpRight className="w-3 h-3 text-violet-600" />
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Reviews</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 🔵 RIGHT SIDE: PREMIUM IMAGE/ILLUSTRATION */}
            <div className="flex-1 relative w-full max-w-xl lg:max-w-none animate-fade-in-right">
              {/* Decorative Gradient Glow behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 bg-violet-400/20 blur-[100px] rounded-full -z-10" />

              {/* Main Illustration Container */}
              <div className="relative p-4">
                {/* আপনি এখানে আপনার পছন্দের কোনো প্রফেশনাল ইলাস্ট্রেশন বা ইউজারের ছবি দিতে পারেন */}
                <div className="relative rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                  <img
                    src="https://res.cloudinary.com/dsezfqke7/image/upload/v1768299190/Gemini_Generated_Image_uk47lfuk47lfuk47_byb7vw.png"
                    alt="Secure Exchange"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Floating Success Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow">
                  <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900">Tk 920</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Success</div>
                  </div>
                </div>

                {/* Floating Card Icon Badge */}
                <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl animate-float">
                  <Zap className="w-8 h-8 text-violet-600 fill-violet-600" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🚀 INFINITE LOGO SCROLL SECTION (Real Image Logos) */}
        <div className="py-16 bg-slate-50/50 border-y border-slate-100 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="flex animate-infinite-scroll gap-20 items-center">
            {/* Infinite loop for smooth scrolling */}
            {[...partners, ...partners, ...partners].map((item, index) => (
              <div key={index} className="flex items-center gap-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default flex-none group">
                <div className="h-12 w-20 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform"
                  />
                </div>
                <span className="text-lg font-black italic tracking-tighter uppercase text-slate-400 group-hover:text-slate-900 transition-colors">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section - High Quality Grid */}
        <section className="py-24 border-y border-slate-100 bg-slate-50/30">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="text-4xl font-black text-slate-900 mb-2 italic">$300+</div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Total Payouts</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-slate-900 mb-2 italic">30 Min</div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Fast Processing</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-slate-900 mb-2 italic">5+</div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Card Types</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-slate-900 mb-2 italic">100%</div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Safe & Secure</div>
            </div>
          </div>
        </section>

        {/* Feature Grid - Figma Clean Style */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 rounded-[40px] bg-white border border-slate-100 hover:border-violet-200 hover:shadow-2xl hover:shadow-violet-100/50 transition-all duration-500 group">
              <div className="w-16 h-16 bg-violet-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-8 h-8 text-violet-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 italic">No-Risk Policy</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Your assets are protected by our proprietary escrow system. Zero scams, total transparency.</p>
            </div>

            <div className="p-10 rounded-[40px] bg-slate-900 border border-slate-800 hover:shadow-2xl hover:shadow-slate-300 transition-all duration-500 group">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 italic">Global Reach</h3>
              <p className="text-slate-400 font-medium leading-relaxed">Selling from USA, Canada, or Europe? We accept international gift cards with the best rates in BDT.</p>
            </div>

            <div className="p-10 rounded-[40px] bg-white border border-slate-100 hover:border-violet-200 hover:shadow-2xl hover:shadow-violet-100/50 transition-all duration-500 group">
              <div className="w-16 h-16 bg-violet-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Lock className="w-8 h-8 text-violet-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 italic">Instant Payouts</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Automated bank transfers and mobile wallet payments. Get your money right when you need it.</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-violet-600 to-indigo-700 rounded-[50px] p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-violet-200">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic">Ready to make your <br />first trade?</h2>
            <button onClick={() => onNavigate('register')} className="bg-white text-violet-700 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform active:scale-95 shadow-xl">
              Register Account
            </button>
          </div>
        </section>
        
        {/* 🟢 এখানে FloatingContact যুক্ত করুন */}
      <FloatingContact />

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-xl font-black italic tracking-tighter uppercase">SURVEY<span className="text-violet-600">TOCASH</span></div>
            <div className="flex gap-10 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <button className="hover:text-violet-600 transition-colors">Privacy</button>
              <button className="hover:text-violet-600 transition-colors">Terms</button>
              <button className="hover:text-violet-600 transition-colors">Legal</button>
            </div>
            <p className="text-slate-400 text-[10px] font-black tracking-widest uppercase">&copy; 2026 surveytocash</p>
          </div>
        </footer>
      </div>

      {/* 🟢 CSS For Infinite Scroll Animation */}
      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
        .animate-infinite-scroll {
          display: flex;
          width: fit-content;
          animation: infinite-scroll 40s linear infinite;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }

      //
      @keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.animate-float { animation: float 6s ease-in-out infinite; }
.animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }

      `}</style>



    </div>
  );
};

export default Landing;
