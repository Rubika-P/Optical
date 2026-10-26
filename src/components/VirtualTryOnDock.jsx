import React from 'react';
import { Camera, X, Sparkles, Check, RefreshCw } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const VirtualTryOnDock = () => {
  const { isVirtualTryOnActive, userTryOnPhoto, turnOffVirtualTryOn, openLiveCameraModal } = useShop();

  if (!isVirtualTryOnActive || !userTryOnPhoto) return null;

  return (
    <div className="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 animate-in slide-in-from-bottom-4 duration-300 pointer-events-auto">
      <div className="bg-[#090D16]/95 backdrop-blur-xl border border-[#38BDF8]/40 shadow-[0_10px_35px_rgba(0,0,0,0.5)] rounded-2xl p-2.5 sm:px-5 sm:py-3 flex items-center justify-between space-x-3 sm:space-x-5 text-white max-w-lg mx-auto">
        {/* User Face Avatar */}
        <div className="relative shrink-0">
          <img
            src={userTryOnPhoto}
            alt="Virtual Try-On Face"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-cover border-2 border-[#38BDF8] shadow-md"
          />
          <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-black animate-pulse" />
        </div>

        {/* Status text */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] sm:text-xs font-bold text-white tracking-wide truncate">
              3D Virtual Try-On Active
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#38BDF8]/25 text-[#38BDF8] font-bold hidden sm:inline">
              ON
            </span>
          </div>
          <p className="text-[10px] text-[#94A3B8] truncate hidden xs:block">
            Catalog is displaying you wearing each pair
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={openLiveCameraModal}
            className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold flex items-center space-x-1 transition-colors cursor-pointer"
            title="Retake Photo"
          >
            <Camera className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="hidden sm:inline">Retake</span>
          </button>

          <button
            onClick={turnOffVirtualTryOn}
            className="px-3 py-1.5 rounded-lg bg-[#EF4444]/20 hover:bg-[#EF4444] text-[#FCA5A5] hover:text-white text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1 transition-colors border border-[#EF4444]/30 cursor-pointer"
            title="Turn Off Virtual Try-On and return to normal product photos"
          >
            <X className="w-3.5 h-3.5" />
            <span>Normal Mode</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOnDock;
