import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Play, Pause, RefreshCw, Download, ArrowRight, X, Flame, Eye, Compass, Wand2, Camera, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

// Curated daily trend formulas calculated from date seeds
const TREND_VAULT = [
  {
    theme: 'Tokyo Neo-Acetate 2026',
    subtitle: 'Whisper-Thin Translucent Rims with Electric Cyber-Tint',
    vibe: 'High-contrast minimalist streetwear with titanium core wire visible through 6mm optical ice crystal.',
    colorHex: '#38BDF8',
    secondaryHex: '#818CF8',
    matchedShape: 'Geometric',
    popularity: '98.7% Global Surge',
    aestheticTag: 'Architectural Cyberpunk',
    matchedMaterial: 'Acetate',
    matchedProducts: ['lumera-arc', 'lumera-prism']
  },
  {
    theme: 'Milan 90s Raw Tortoiseshell',
    subtitle: 'Chunky Sculpted Beveled Edges & Warm Amber Polarized Lenses',
    vibe: 'Bold vintage silhouettes revived with modern ultralight bio-resins and hand-buffed warm caramel luster.',
    colorHex: '#D97706',
    secondaryHex: '#F59E0B',
    matchedShape: 'Square',
    popularity: '96.4% Global Surge',
    aestheticTag: 'High-Fashion Editorial',
    matchedMaterial: 'Acetate',
    matchedProducts: ['lumera-noir', 'lumera-terra']
  },
  {
    theme: 'Sabae Feather-Titanium Wire',
    subtitle: 'Ultralight 0.6mm Monolithic Rim with Zero Screws',
    vibe: 'Clean, understated Japanese engineering celebrating featherweight balance and invisible structural lines.',
    colorHex: '#94A3B8',
    secondaryHex: '#CBD5E1',
    matchedShape: 'Round',
    popularity: '99.1% Global Surge',
    aestheticTag: 'Quiet Luxury Minimalist',
    matchedMaterial: 'Titanium',
    matchedProducts: ['lumera-arc', 'lumera-vista']
  },
  {
    theme: 'Riviera Gradient Sunset Tint',
    subtitle: 'Soft Rose-Gold Wire with Dual-Tone Gradient UV400 Shield',
    vibe: 'Golden hour aesthetic capturing Mediterranean coastal light with anti-reflective photochromic protection.',
    colorHex: '#F43F5E',
    secondaryHex: '#FB923C',
    matchedShape: 'Aviator',
    popularity: '94.8% Global Surge',
    aestheticTag: 'Sunset Resort Chic',
    matchedMaterial: 'Metal',
    matchedProducts: ['lumera-sol', 'lumera-strata']
  },
  {
    theme: 'Bio-Polymer Active Sport-Luxe',
    subtitle: 'Curved Wrap-Around Ergonomics with Matte Hydrophobic Finish',
    vibe: 'Extreme flex TR90 polymer with 22G impact memory and anti-fog ventilation channels.',
    colorHex: '#10B981',
    secondaryHex: '#06B6D4',
    matchedShape: 'Rectangle',
    popularity: '97.2% Global Surge',
    aestheticTag: 'Performance Techwear',
    matchedMaterial: 'TR90',
    matchedProducts: ['lumera-strata', 'lumera-helios']
  }
];

const AiDailyTrendGif = ({ isOpen, onClose, embedded = false }) => {
  const navigate = useNavigate();
  const { openLiveCameraModal, isVirtualTryOnActive, turnOffVirtualTryOn } = useShop();
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Today's date calculations
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Daily seed index
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const [variationOffset, setVariationOffset] = useState(0);

  const activeTrendIdx = (dayOfYear + variationOffset) % TREND_VAULT.length;
  const currentTrend = TREND_VAULT[activeTrendIdx];

  const [isPlaying, setIsPlaying] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationCount, setGenerationCount] = useState(1);

  // Animated GIF-like canvas rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame = 0;

    const render = () => {
      frame++;
      const width = canvas.width;
      const height = canvas.height;

      // Dark luxury background
      ctx.fillStyle = '#06090F';
      ctx.fillRect(0, 0, width, height);

      // 1. Dynamic Radial Aura
      const cx = width / 2;
      const cy = height / 2;
      const gradient = ctx.createRadialGradient(cx, cy, 30, cx, cy, width / 1.5);
      const pulse = Math.sin(frame * 0.05) * 0.2 + 0.8;
      gradient.addColorStop(0, `${currentTrend.colorHex}44`);
      gradient.addColorStop(0.5, `${currentTrend.secondaryHex}18`);
      gradient.addColorStop(1, '#06090F00');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Animated Trend Waveform & Particles
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `${currentTrend.colorHex}${Math.floor((30 - i * 8) * pulse).toString(16).padStart(2, '0')}`;
        for (let x = 0; x < width; x += 6) {
          const y = cy + Math.sin((x * 0.015) + (frame * 0.04) + i) * (24 + i * 8) * pulse;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // 3. Central 3D Stylized Eyewear Wireframe Silhouette
      const tilt = Math.sin(frame * 0.04) * 8; // subtle 3D oscillation
      const scale = 1 + Math.sin(frame * 0.03) * 0.03;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((tilt * Math.PI) / 180);
      ctx.scale(scale, scale);

      // Eyewear Rims (Left & Right)
      const rimW = 75;
      const rimH = 46;
      const bridgeW = 28;

      // Outer Glow
      ctx.shadowColor = currentTrend.colorHex;
      ctx.shadowBlur = 18 * pulse;

      // Left Lens
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.fillStyle = `${currentTrend.colorHex}22`;
      drawRoundedRect(ctx, -bridgeW / 2 - rimW, -rimH / 2, rimW, rimH, 14);
      ctx.fill();
      ctx.stroke();

      // Right Lens
      drawRoundedRect(ctx, bridgeW / 2, -rimH / 2, rimW, rimH, 14);
      ctx.fill();
      ctx.stroke();

      // Bridge
      ctx.beginPath();
      ctx.moveTo(-bridgeW / 2, -4);
      ctx.quadraticCurveTo(0, -12, bridgeW / 2, -4);
      ctx.stroke();

      // Temples hints
      ctx.beginPath();
      ctx.moveTo(-bridgeW / 2 - rimW, -2);
      ctx.lineTo(-bridgeW / 2 - rimW - 32, -18);
      ctx.moveTo(bridgeW / 2 + rimW, -2);
      ctx.lineTo(bridgeW / 2 + rimW + 32, -18);
      ctx.stroke();

      // Shimmer highlight sweeping across the lenses
      const sweepX = ((frame * 3) % (width + 100)) - width / 2;
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.45 * pulse})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sweepX - 20, -rimH);
      ctx.lineTo(sweepX + 20, rimH);
      ctx.stroke();

      ctx.restore();

      // 4. Trendy AI Frame Metadata HUD Overlay
      ctx.font = '10px monospace';
      ctx.fillStyle = currentTrend.colorHex;
      ctx.fillText(`AI.TREND // ${currentTrend.popularity}`, 20, 30);

      ctx.font = '10px monospace';
      ctx.fillStyle = '#64748B';
      ctx.fillText(`FRAME #${frame % 120} / 60 FPS`, width - 130, 30);

      // Loop animation if playing
      if (isPlaying) {
        animationFrameRef.current = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentTrend, isPlaying]);

  const drawRoundedRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const handleGenerateVariation = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setVariationOffset((prev) => prev + 1);
      setGenerationCount((c) => c + 1);
      setIsGenerating(false);
    }, 600);
  };

  const handleDownloadGif = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `GrandOpticals-Trend-${dateString.replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleShopTrend = () => {
    if (onClose) onClose();
    navigate(`/shop?shape=${encodeURIComponent(currentTrend.matchedShape)}&category=Eyeglasses`);
  };

  if (!isOpen && !embedded) return null;

  const content = (
    <div className="bg-[#0A0E17] text-white rounded-3xl border border-white/15 overflow-hidden shadow-2xl max-w-2xl w-full mx-auto animate-in zoom-in-95 duration-200">
      {/* Top Header Bar */}
      <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#0F172A] to-[#0A0E17]">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0284C7] to-[#38BDF8] flex items-center justify-center text-white shadow-lg">
            <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#38BDF8] font-bold">
                Daily AI Trend Engine
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                LIVE TODAY
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {dateString}
            </h3>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main GIF Stage */}
      <div className="p-4 sm:p-6 space-y-6">
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black shadow-inner">
          {/* Animated Canvas */}
          <canvas
            ref={canvasRef}
            width={580}
            height={280}
            className="w-full h-56 sm:h-64 object-cover block"
          />

          {/* Floating Controls on Canvas */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <div className="glass-dark px-3 py-1 rounded-full border border-white/20 text-[10px] font-mono text-white/90 flex items-center space-x-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AI GIF LOOP #0{generationCount}</span>
            </div>

            <div className="flex items-center space-x-2 pointer-events-auto">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-full glass-dark hover:bg-white/20 text-white transition-colors shadow-lg cursor-pointer"
                title={isPlaying ? 'Pause Animation' : 'Play Animation'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={handleDownloadGif}
                className="p-2 rounded-full glass-dark hover:bg-white/20 text-white transition-colors shadow-lg cursor-pointer"
                title="Download Snapshot / GIF Frame"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Trend Insights Card */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Flame className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Trending: {currentTrend.aestheticTag}
                </span>
              </div>
              <h4 className="text-xl font-bold text-white">
                {currentTrend.theme}
              </h4>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] text-white/50 block font-mono">GLOBAL INDEX</span>
              <span className="text-sm font-bold text-[#38BDF8] font-mono">
                {currentTrend.popularity}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-4">
            {currentTrend.vibe}
          </p>

          {/* Trend Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-3 border-t border-white/10 text-xs">
            <div className="bg-white/[0.04] p-2.5 rounded-xl border border-white/5">
              <span className="text-[10px] text-white/40 uppercase block font-semibold">Silhouette</span>
              <span className="font-bold text-white">{currentTrend.matchedShape} Rims</span>
            </div>
            <div className="bg-white/[0.04] p-2.5 rounded-xl border border-white/5">
              <span className="text-[10px] text-white/40 uppercase block font-semibold">Material Focus</span>
              <span className="font-bold text-white">{currentTrend.matchedMaterial}</span>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-white/[0.04] p-2.5 rounded-xl border border-white/5">
              <span className="text-[10px] text-white/40 uppercase block font-semibold">Tint Palette</span>
              <span className="font-bold text-[#38BDF8] flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentTrend.colorHex }} />
                <span>Optic Glow</span>
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Generate GIF, Camera Photo Try-On, and Shop */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleGenerateVariation}
            disabled={isGenerating}
            className="w-full sm:flex-1 py-3 px-3 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Synthesizing...' : 'Generate New Daily GIF'}</span>
          </button>

          {!isVirtualTryOnActive ? (
            <button
              onClick={() => {
                if (onClose) onClose();
                openLiveCameraModal();
              }}
              className="w-full sm:flex-1 py-3 px-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-cyan-500/20 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Camera Try-On Face</span>
            </button>
          ) : (
            <button
              onClick={turnOffVirtualTryOn}
              className="w-full sm:flex-1 py-3 px-3 rounded-xl bg-red-500/20 hover:bg-red-500 text-red-200 hover:text-white border border-red-500/30 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Normal Mode (Turn Off)</span>
            </button>
          )}

          <button
            onClick={handleShopTrend}
            className="w-full sm:flex-1 py-3 px-3 rounded-xl bg-white hover:bg-[#38BDF8] text-[#0A0E17] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
          >
            <span>Shop This Trend</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );

  if (embedded) return content;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {content}
      </div>
    </div>
  );
};

export default AiDailyTrendGif;
