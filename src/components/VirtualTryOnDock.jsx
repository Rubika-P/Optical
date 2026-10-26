import React, { useState } from 'react';
import { Camera, X, Sparkles, Check, RefreshCw, ChevronUp, ChevronDown, Plus, Minus, Sliders } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const VirtualTryOnDock = () => {
  const { 
    isVirtualTryOnActive, 
    userTryOnPhoto, 
    tryOnPosition, 
    adjustTryOnY, 
    adjustTryOnScale, 
    resetTryOnPosition,
    turnOffVirtualTryOn, 
    openLiveCameraModal 
  } = useShop();

  const [isAdjustOpen, setIsAdjustOpen] = useState(false);

  if (!isVirtualTryOnActive || !userTryOnPhoto) return null;

  return (
    <div className="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 animate-in slide-in-from-bottom-4 duration-300 pointer-events-auto flex flex-col items-center">
      {/* Alignment Adjust Popover Menu */}
      {isAdjustOpen && (
        <div className="mb-2 bg-[#090D16]/98 backdrop-blur-xl border border-[#38BDF8]/40 shadow-2xl rounded-2xl p-3 sm:px-4 text-white max-w-md w-full animate-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
            <span className="font-bold flex items-center space-x-1.5 text-[#38BDF8]">
              <Sliders className="w-3.5 h-3.5" />
              <span>Fine-Tune Glasses Fit Over Eyes</span>
            </span>
            <button
              onClick={resetTryOnPosition}
              className="text-[10px] text-white/50 hover:text-white uppercase tracking-wider font-semibold"
            >
              Reset Default
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            {/* Height / Eye Position */}
            <div className="flex items-center justify-between bg-white/[0.05] p-2 rounded-xl border border-white/10">
              <span className="text-[11px] text-[#94A3B8] font-medium">Position:</span>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => adjustTryOnY(-1.0)}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Move Glasses Up"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono font-bold text-[11px] px-1 text-white">
                  {tryOnPosition.y}%
                </span>
                <button
                  onClick={() => adjustTryOnY(1.0)}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Move Glasses Down"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Size / Scale */}
            <div className="flex items-center justify-between bg-white/[0.05] p-2 rounded-xl border border-white/10">
              <span className="text-[11px] text-[#94A3B8] font-medium">Frame Size:</span>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => adjustTryOnScale(-2.0)}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Make Frame Smaller"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono font-bold text-[11px] px-1 text-white">
                  {tryOnPosition.scale}%
                </span>
                <button
                  onClick={() => adjustTryOnScale(2.0)}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Make Frame Larger"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Dock */}
      <div className="bg-[#090D16]/95 backdrop-blur-xl border border-[#38BDF8]/40 shadow-[0_10px_35px_rgba(0,0,0,0.5)] rounded-2xl p-2 sm:px-4 sm:py-2.5 flex items-center justify-between space-x-3 sm:space-x-4 text-white max-w-lg mx-auto">
        {/* User Face Avatar */}
        <div className="relative shrink-0">
          <img
            src={userTryOnPhoto}
            alt="Virtual Try-On Face"
            className="w-10 h-10 rounded-xl object-cover border-2 border-[#38BDF8] shadow-md"
          />
          <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black animate-pulse" />
        </div>

        {/* Status text */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-bold text-white tracking-wide truncate">
              3D Virtual Try-On
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
              ACTIVE
            </span>
          </div>
          <p className="text-[10px] text-[#94A3B8] truncate hidden xs:block">
            Glasses fitted directly to your photo
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-1.5 shrink-0">
          {/* Adjust Fit Toggle */}
          <button
            onClick={() => setIsAdjustOpen(!isAdjustOpen)}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold flex items-center space-x-1 transition-all cursor-pointer border ${
              isAdjustOpen
                ? 'bg-[#0284C7] text-white border-[#38BDF8]'
                : 'bg-white/10 hover:bg-white/20 text-[#38BDF8] border-white/10'
            }`}
            title="Adjust eye alignment and size"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Adjust Fit</span>
          </button>

          {/* Retake Camera */}
          <button
            onClick={openLiveCameraModal}
            className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold flex items-center space-x-1 transition-colors cursor-pointer"
            title="Retake Photo"
          >
            <Camera className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="hidden sm:inline">Retake</span>
          </button>

          {/* Normal Mode */}
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
