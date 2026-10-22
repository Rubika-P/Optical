import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, ShoppingBag, Eye, RotateCw, Layers, ShieldCheck, Sliders, Type } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ThreeGlassesViewer from './ThreeGlassesViewer';

const LENS_TINTS = [
  { id: 'clear', name: 'Clear Blue-Shield Ultra', hex: '#E8F4F8', desc: 'Blocks 420nm digital blue light & HEV', extraPrice: 0 },
  { id: 'dark', name: 'Obsidian Polarized UV400', hex: '#1C1C1C', desc: '100% glare reduction for bright daylight', extraPrice: 499 },
  { id: 'amber', name: 'Champagne Rosé Amber', hex: '#B57C32', desc: 'High-contrast warmth for driving & sunsets', extraPrice: 599 },
  { id: 'mirror', name: 'Platinum Mirror Glint', hex: '#88CCFF', desc: 'One-way mirrored luxury finish with anti-scratch', extraPrice: 799 }
];

const LENS_INDEXES = [
  { id: '1.50', name: '1.50 Standard Optical', desc: 'Ideal for plano or mild prescriptions', extraPrice: 0 },
  { id: '1.60', name: '1.60 Ultra-Light Impact Poly', desc: '20% thinner, shatter-proof polycarbonate', extraPrice: 699 },
  { id: '1.67', name: '1.67 Aspheric Featherweight', desc: '35% thinner, eliminates peripheral distortion', extraPrice: 1299 }
];

const FINISHES = [
  { id: 'gold', name: '18K Champagne Gold', hex: '#C5A880' },
  { id: 'rose', name: 'Brushed Rose Gold', hex: '#B76E79' },
  { id: 'matte', name: 'Midnight Matte Obsidian', hex: '#1C1C1E' },
  { id: 'silver', name: 'Palladium Chrome', hex: '#A8A9AD' }
];

const InteractiveCustomizerModal = () => {
  const { customizerProduct, closeCustomizer, addToCart } = useShop();

  const [selectedLens, setSelectedLens] = useState(LENS_TINTS[0]);
  const [selectedIndex, setSelectedIndex] = useState(LENS_INDEXES[0]);
  const [selectedFinish, setSelectedFinish] = useState(FINISHES[0]);
  const [engravingText, setEngravingText] = useState('');
  const [activeTab, setActiveTab] = useState('lenses'); // 'lenses', 'finishes', 'engraving'

  // Sync state if product changes
  useEffect(() => {
    if (customizerProduct) {
      setSelectedLens(LENS_TINTS[0]);
      setSelectedIndex(LENS_INDEXES[0]);
      setSelectedFinish(FINISHES[0]);
      setEngravingText('');
      setActiveTab('lenses');
    }
  }, [customizerProduct]);

  if (!customizerProduct) return null;

  const basePrice = customizerProduct.price || 2499;
  const customTotal = basePrice + selectedLens.extraPrice + selectedIndex.extraPrice + (engravingText.trim() ? 299 : 0);

  const handleAddBespokeToBag = () => {
    const bespokeOptions = {
      color: selectedFinish.name,
      prescription: `Bespoke: ${selectedLens.name} (${selectedIndex.id})`,
      customEngraving: engravingText.trim() || undefined,
      customPrice: customTotal,
      lensDetails: `${selectedLens.name} · Index ${selectedIndex.id}`
    };

    addToCart(customizerProduct, bespokeOptions);
    closeCustomizer();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Dark Ambient Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={closeCustomizer}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#121212] border border-[#2D2822] text-[#F4EFEB] w-full max-w-5xl shadow-2xl rounded-none overflow-hidden my-auto z-10 grid grid-cols-1 lg:grid-cols-12 max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={closeCustomizer}
          className="absolute top-4 right-4 z-30 p-2 text-[#9E968E] hover:text-white bg-black/60 hover:bg-black/90 border border-white/10 transition-colors"
          aria-label="Close Bespoke Customizer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Interactive 3D 360 Canvas Viewer (7 cols) */}
        <div className="lg:col-span-7 bg-[#080808] border-b lg:border-b-0 lg:border-r border-[#242424] flex flex-col justify-between relative min-h-[380px] lg:min-h-[560px]">
          {/* Header pill */}
          <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
            <span className="bg-[#1C1710] border border-[#C5A880]/40 text-[#C5A880] text-[10px] uppercase font-bold tracking-widest px-3 py-1 flex items-center space-x-1.5">
              <Sparkles className="w-3 h-3 text-[#C5A880]" />
              <span>360° Bespoke Atelier</span>
            </span>
          </div>

          {/* 3D WebGL Canvas */}
          <div className="w-full h-full flex-grow flex items-center justify-center pt-8">
            <ThreeGlassesViewer
              product={customizerProduct}
              selectedColor={selectedFinish}
              lensTint={selectedLens.id}
              height="100%"
            />
          </div>

          {/* Engraving Preview Overlay on frame arm */}
          {engravingText.trim() && (
            <div className="absolute bottom-16 left-6 z-20 bg-black/80 border border-[#C5A880]/50 px-3 py-1.5 backdrop-blur-md flex items-center space-x-2">
              <Type className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="text-[11px] font-mono tracking-wider text-[#C5A880]">
                Temple Inscription: "{engravingText.toUpperCase()}"
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Customization Controls (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#141414] overflow-y-auto">
          <div className="space-y-6">
            {/* Header info */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
                Haute Optique Studio
              </p>
              <h3 className="font-serif text-2xl text-white font-normal mt-1">
                {customizerProduct.name}
              </h3>
              <p className="text-xs text-[#8C847A] mt-1">
                {customizerProduct.subtitle || 'Mastercrafted Japanese titanium & bespoke custom optics.'}
              </p>
            </div>

            {/* Customizer Tabs */}
            <div className="grid grid-cols-3 gap-1 bg-[#1C1C1C] p-1 border border-[#2B2B2B]">
              {[
                { id: 'lenses', label: '1. Lenses' },
                { id: 'finishes', label: '2. Frame' },
                { id: 'engraving', label: '3. Engrave' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 text-[11px] uppercase tracking-wider font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#C5A880] text-[#121212]'
                      : 'text-[#9E968E] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Lens Customization */}
            {activeTab === 'lenses' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#C5A880] block mb-2 font-medium">
                    A. Select Optical Tint & Coating
                  </label>
                  <div className="space-y-2">
                    {LENS_TINTS.map(lens => (
                      <div
                        key={lens.id}
                        onClick={() => setSelectedLens(lens)}
                        className={`p-3 border cursor-pointer transition-all flex items-center justify-between ${
                          selectedLens.id === lens.id
                            ? 'border-[#C5A880] bg-[#1F1B15]'
                            : 'border-[#262626] bg-[#181818] hover:border-[#403B35]'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span
                            className="w-4 h-4 rounded-full border border-white/20 shadow-inner flex-shrink-0"
                            style={{ backgroundColor: lens.hex }}
                          />
                          <div>
                            <p className="text-xs font-semibold text-white">{lens.name}</p>
                            <p className="text-[10px] text-[#8C847A]">{lens.desc}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-xs font-mono font-medium text-[#C5A880]">
                            {lens.extraPrice === 0 ? 'Included' : `+₹${lens.extraPrice}`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#C5A880] block mb-2 font-medium">
                    B. Lens Index & Thinness
                  </label>
                  <div className="space-y-2">
                    {LENS_INDEXES.map(idx => (
                      <div
                        key={idx.id}
                        onClick={() => setSelectedIndex(idx)}
                        className={`p-3 border cursor-pointer transition-all flex items-center justify-between ${
                          selectedIndex.id === idx.id
                            ? 'border-[#C5A880] bg-[#1F1B15]'
                            : 'border-[#262626] bg-[#181818] hover:border-[#403B35]'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-semibold text-white">{idx.name}</p>
                          <p className="text-[10px] text-[#8C847A]">{idx.desc}</p>
                        </div>
                        <span className="text-xs font-mono font-medium text-[#C5A880]">
                          {idx.extraPrice === 0 ? 'Included' : `+₹${idx.extraPrice}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Frame Finish */}
            {activeTab === 'finishes' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <label className="text-[11px] uppercase tracking-wider text-[#C5A880] block mb-2 font-medium">
                  Select Precious Metal / Acetate Finish
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {FINISHES.map(finish => (
                    <div
                      key={finish.id}
                      onClick={() => setSelectedFinish(finish)}
                      className={`p-3 border cursor-pointer transition-all flex flex-col space-y-2 ${
                        selectedFinish.id === finish.id
                          ? 'border-[#C5A880] bg-[#1F1B15]'
                          : 'border-[#262626] bg-[#181818] hover:border-[#403B35]'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className="w-4 h-4 rounded-full border border-white/30"
                          style={{ backgroundColor: finish.hex }}
                        />
                        <span className="text-xs font-medium text-white">{finish.name}</span>
                      </div>
                      <span className="text-[10px] text-[#8C847A]">Hand-polished in Sabae</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Bespoke Monogram Engraving */}
            {activeTab === 'engraving' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#C5A880] block mb-1 font-medium">
                    Laser Temple Monogram (+₹299)
                  </label>
                  <p className="text-[11px] text-[#8C847A] mb-3">
                    Have your initials, signature year, or coordinates micro-laser engraved on the inside right titanium temple arm.
                  </p>
                  <input
                    type="text"
                    maxLength={16}
                    placeholder="E.g. A.V. 2026 or TOKYO-NY"
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#333] px-3.5 py-2.5 text-xs font-mono tracking-widest uppercase text-white focus:outline-none focus:border-[#C5A880]"
                  />
                  <div className="flex justify-between text-[10px] text-[#6E675F] mt-1 font-mono">
                    <span>MAX 16 CHARACTERS</span>
                    <span>{engravingText.length} / 16</span>
                  </div>
                </div>

                <div className="p-3 bg-[#1A1814] border border-[#C5A880]/30 text-xs text-[#D8CFBF] space-y-1">
                  <div className="flex items-center space-x-1.5 text-[#C5A880] font-semibold text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>GRAND OPTICALS Bespoke Guarantee</span>
                  </div>
                  <p className="text-[10px] text-[#9E968E]">
                    Laser micro-etching is performed under 40x magnification with 2-year alignment warranty.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Total & CTA */}
          <div className="pt-6 border-t border-[#262626] mt-6 space-y-3">
            <div className="flex justify-between items-baseline">
              <div>
                <span className="text-[10px] text-[#8C847A] uppercase tracking-wider block">Bespoke Total</span>
                <span className="text-[10px] text-[#C5A880]">Includes hard leather case & micro-cloth</span>
              </div>
              <span className="font-serif text-2xl font-semibold text-white">
                ₹{customTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={handleAddBespokeToBag}
              className="w-full py-3.5 bg-[#C5A880] hover:bg-[#D4B992] text-[#121212] text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Bespoke Pair to Bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCustomizerModal;
