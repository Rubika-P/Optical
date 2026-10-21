import React from 'react';
import { Sparkles, CheckCircle2, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const ToastNotification = () => {
  const { toast } = useShop();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-auto">
      <div className="bg-[#141414] text-white px-5 py-3.5 border border-[#333333] shadow-2xl flex items-center space-x-3.5 max-w-sm">
        <div className="w-7 h-7 rounded-full bg-[#C5A880]/20 flex items-center justify-center flex-shrink-0 text-[#C5A880]">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
            {toast.title}
          </p>
          <p className="text-xs text-[#EAE5DD] mt-0.5 leading-snug">
            {toast.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToastNotification;
