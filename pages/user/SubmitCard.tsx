import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/mockApi';
import { GiftCardRate, PaymentMethod } from '../../types';
import Confetti from '../../components/Confetti';
import { toast } from 'react-hot-toast';
import { ArrowRight, Check, AlertCircle, CreditCard, Landmark, Apple, Gift, Smartphone, Wallet, Rocket } from 'lucide-react';

interface Props {
  onSuccess: () => void;
}

const getCardIcon = (type: string) => {
  const t = type.toLowerCase();
  if (t.includes('apple')) return <Apple className="w-6 h-6 text-slate-800" />;
  if (t.includes('visa')) return <CreditCard className="w-6 h-6 text-blue-600" />;
  if (t.includes('mastercard')) return <CreditCard className="w-6 h-6 text-orange-500" />;
  if (t.includes('ach') || t.includes('bank')) return <Landmark className="w-6 h-6 text-emerald-600" />;
  return <Gift className="w-6 h-6 text-violet-500" />;
};

const getPayoutIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('bkash')) return <Smartphone className="w-5 h-5 text-pink-600" />;
  if (n.includes('nagad')) return <Wallet className="w-5 h-5 text-orange-600" />;
  if (n.includes('rocket')) return <Rocket className="w-5 h-5 text-purple-600" />;
  if (n.includes('cellfin')) return <Landmark className="w-5 h-5 text-blue-600" />;
  return <CreditCard className="w-5 h-5 text-slate-600" />;
};

const SubmitCard: React.FC<Props> = ({ onSuccess }) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [rates, setRates] = useState<GiftCardRate[]>([]);
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Form State
  const [selectedCard, setSelectedCard] = useState<GiftCardRate | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [cardLink, setCardLink] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [payoutNumber, setPayoutNumber] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        const [r, m] = await Promise.all([api.getRates(), api.getPaymentMethods()]);
        setRates(r.filter(x => x.isEnabled));
        setMethods(m.filter(x => x.isEnabled));
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const totalPayout = selectedCard && amount ? amount * selectedCard.rate : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedCard || !selectedMethod) return;

    if (totalPayout > selectedMethod.limitPerTrx) {
        toast.error(`Limit exceeded for ${selectedMethod.name}. Max: ৳${selectedMethod.limitPerTrx}`);
        return;
    }

    setSubmitting(true);
    try {
      await api.submitTransaction({
        userId: user.id,
        cardType: selectedCard.type,
        cardLink: cardLink,
        cardAmountUsd: amount,
        exchangeRate: selectedCard.rate,
        payoutAmountBdt: totalPayout,
        payoutMethod: selectedMethod.name,
        payoutNumber: payoutNumber,
      });

      // Simulation of Email sent
      toast.success("Confirmation email sent!", { icon: '📧' });
      
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        onSuccess();
      }, 5000);

    } catch (error) {
      toast.error("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (showConfetti) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
        <Confetti isActive={true} />
        <div className="text-center animate-bounce-in z-10">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <Check className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Submission Successful!</h2>
          <p className="text-slate-500 mb-8">We have received your card. Check your email for details.</p>
          <p className="text-sm text-slate-400">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Start Exchange</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Progress Bar */}
        <div className="h-1 bg-slate-100 w-full">
          <div 
            className="h-full bg-violet-600 transition-all duration-500"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Select Gift Card Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {rates.map(rate => (
                    <div 
                      key={rate.id}
                      onClick={() => setSelectedCard(rate)}
                      className={`
                        cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center gap-4
                        ${selectedCard?.id === rate.id 
                          ? 'border-violet-600 bg-violet-50' 
                          : 'border-slate-100 hover:border-violet-200'}
                      `}
                    >
                      <div className={`p-2 rounded-lg ${selectedCard?.id === rate.id ? 'bg-white shadow-sm' : 'bg-slate-50'}`}>
                        {getCardIcon(rate.type)}
                      </div>
                      <div className="flex-1">
                        <span className="block font-medium text-slate-800">{rate.type}</span>
                        <span className="text-xs font-medium text-slate-500">Rate: {rate.rate}</span>
                      </div>
                      {selectedCard?.id === rate.id && (
                        <div className="text-violet-600">
                          <Check className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Card Amount ($ USD)</label>
                <input 
                  type="number"
                  min="5"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-violet-500 outline-none"
                  value={amount || ''}
                  onChange={e => setAmount(Number(e.target.value))}
                  placeholder="e.g. 100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Card Code / Link</label>
                <textarea 
                  required
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-violet-500 outline-none"
                  value={cardLink}
                  onChange={e => setCardLink(e.target.value)}
                  placeholder="Paste your card code or validation link here..."
                />
              </div>

              {selectedCard && amount > 0 && (
                <div className="bg-slate-50 p-4 rounded-lg flex justify-between items-center">
                  <span className="text-slate-500">Estimated Payout</span>
                  <span className="text-xl font-bold text-slate-900">৳ {totalPayout.toLocaleString()}</span>
                </div>
              )}

              <button
                type="button"
                disabled={!selectedCard || !amount || !cardLink}
                onClick={() => setStep(2)}
                className="w-full py-3 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Select Payout Method</label>
                <div className="grid grid-cols-2 gap-4">
                  {methods.map(method => (
                    <div 
                      key={method.id}
                      onClick={() => setSelectedMethod(method)}
                      className={`
                        cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-3
                        ${selectedMethod?.id === method.id 
                          ? 'border-pink-500 bg-pink-50' 
                          : 'border-slate-100 hover:border-pink-200'}
                      `}
                    >
                      {getPayoutIcon(method.name)}
                      <span className="font-medium text-slate-800">{method.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Wallet Number</label>
                <input 
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-pink-500 outline-none"
                  value={payoutNumber}
                  onChange={e => setPayoutNumber(e.target.value)}
                  placeholder="01XXXXXXXXX"
                />
              </div>

              {selectedMethod && totalPayout > selectedMethod.limitPerTrx && (
                  <div className="flex items-center text-red-600 text-sm p-3 bg-red-50 rounded-lg">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Limit exceeded. Max {selectedMethod.limitPerTrx} BDT.
                  </div>
              )}

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting || !selectedMethod || !payoutNumber || (selectedMethod && totalPayout > selectedMethod.limitPerTrx)}
                  className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center shadow-lg"
                >
                  {submitting ? 'Processing...' : 'Submit Exchange'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubmitCard;