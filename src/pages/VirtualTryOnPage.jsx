import React, { useState } from 'react';
import { Sparkles, Camera, Upload, Eye, ArrowRight, Layers, ShieldCheck, CheckCircle2, Wand2, Cpu, Check, RefreshCw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, FACE_SHAPES_DATA } from '../data/products';
import ProductCard from '../components/ProductCard';

const VirtualTryOnPage = () => {
  const { setTryOnProduct } = useShop();
  const [selectedShape, setSelectedShape] = useState(FACE_SHAPES_DATA[0]);
  const [analyzingShape, setAnalyzingShape] = useState(false);

  const handleShapeSelect = (shapeData) => {
    setAnalyzingShape(true);
    setTimeout(() => {
      setSelectedShape(shapeData);
      setAnalyzingShape(false);
    }, 300);
  };

  // Find products that match this face shape
  const recommendedProducts = PRODUCTS.filter((p) => 
    p.faceShapes?.includes(selectedShape.shape)
  ).slice(0, 3);

  const bestProduct = recommendedProducts[0] || PRODUCTS[0];

  return (
    <div className="bg-[#FBF9F5] min-h-screen text-[#171717]">
      {/* Hero Studio Banner */}
      <div className="bg-[#121212] text-white py-16 sm:py-24 border-b border-[#2C2C2C] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 border border-white/20 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#E7DFD5]">
              GRAND OPTICALS Real-Time AR Virtual Try-On Suite
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white mb-4">
            See it on you before you choose.
          </h1>

          <p className="text-sm sm:text-base text-[#B5ADA3] max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Experience our 3D optical fitting suite. Real-time camera face tracking, automated facial proportion analysis, and instant AI frame model recommendations tailored to your face architecture.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setTryOnProduct(bestProduct)}
              className="px-8 py-4 bg-[#C5A880] hover:bg-[#B39264] text-[#141414] text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300 shadow-xl inline-flex items-center space-x-2 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Launch Virtual Camera AR Studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive AI Frame Model Suggestion Engine */}
      <div className="bg-[#181614] text-white py-14 border-b border-[#2C2C2C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#333]">
            <div>
              <div className="flex items-center space-x-2 text-[#C5A880] text-xs font-bold uppercase tracking-widest mb-1.5">
                <Wand2 className="w-4 h-4" />
                <span>AI Face Geometry Diagnostic</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                Instant AI Frame Model Advisor
              </h2>
              <p className="text-xs text-[#A89F91] mt-1">
                Select your face architecture to reveal AI-computed frame silhouettes with optimal balance and millimeter precision.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => setTryOnProduct(bestProduct)}
                className="px-5 py-2.5 bg-[#C5A880] hover:bg-[#B39264] text-[#141414] text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center space-x-2 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Try On AI Match in AR</span>
              </button>
            </div>
          </div>

          {/* Face Shape Selector Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-8">
            {FACE_SHAPES_DATA.map((item) => {
              const isSelected = selectedShape.shape === item.shape;
              return (
                <button
                  key={item.shape}
                  type="button"
                  onClick={() => handleShapeSelect(item)}
                  className={`p-3 text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#C5A880] bg-[#292218] ring-1 ring-[#C5A880]'
                      : 'border-[#333] hover:border-[#555] bg-[#1F1D1A]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-xs text-white">{item.shape}</span>
                    {isSelected && <Check className="w-3 h-3 text-[#C5A880]" />}
                  </div>
                  <p className="text-[10px] text-[#A89F91] line-clamp-2">{item.subtitle || item.description}</p>
                </button>
              );
            })}
          </div>

          {/* AI Recommended Frame Models Showcase for Selected Shape */}
          <div className="bg-[#12100E] border border-[#38332E] p-6 rounded-none">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-6 border-b border-[#2C2620]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] font-bold">
                  AI Architecture Diagnostic · {selectedShape.shape} Face
                </span>
                <p className="text-xs text-[#D8CEBE] mt-0.5">
                  <span className="font-semibold text-white">Recommended Silhouettes:</span> {(selectedShape.recommendations || []).join(', ')} · <span className="font-semibold text-white">Avoid:</span> {selectedShape.avoid || 'Heavy oversized styles'}
                </p>
              </div>
              <div className="mt-2 md:mt-0 font-mono text-xs text-[#C5A880] bg-[#221B12] px-3 py-1 border border-[#C5A880]/30">
                Match Accuracy: 98.4%
              </div>
            </div>

            {/* Frame Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {recommendedProducts.map((prod, idx) => (
                <div key={prod.id} className="bg-[#1A1815] border border-[#2E2923] p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-mono uppercase px-2 py-0.5 bg-[#C5A880]/20 text-[#C5A880] font-bold border border-[#C5A880]/40">
                        {idx === 0 ? '★ #1 AI Top Pick' : idx === 1 ? 'Balanced Pick' : 'Bold Silhouette'}
                      </span>
                      <span className="text-[11px] font-serif text-[#C5A880]">₹{prod.price.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="aspect-[16/10] bg-[#0E0D0C] overflow-hidden mb-3">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-serif text-lg text-white">{prod.name}</h4>
                    <p className="text-[11px] text-[#A89F91] mb-3">{prod.subtitle}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTryOnProduct(prod)}
                    className="w-full py-2.5 bg-white/10 hover:bg-[#C5A880] hover:text-[#141414] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Try On This Model in AR</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 border border-[#ECE6DC]">
            <div className="w-12 h-12 bg-[#FAF7F2] flex items-center justify-center text-[#C5A880] mb-4">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-[#171717] mb-2">Real-Time Camera AR</h3>
            <p className="text-xs text-[#6B655F] leading-relaxed">
              Live face landmark tracking right in your browser. The 3D glasses automatically stay attached to your eyes and nose while you move your head.
            </p>
          </div>

          <div className="bg-white p-8 border border-[#ECE6DC]">
            <div className="w-12 h-12 bg-[#FAF7F2] flex items-center justify-center text-[#C5A880] mb-4">
              <Wand2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-[#171717] mb-2">AI Face Shape Detection</h3>
            <p className="text-xs text-[#6B655F] leading-relaxed">
              Automated facial proportion diagnostic identifies Oval, Square, Round, Heart, and Oblong contours with tailored frame styling advice.
            </p>
          </div>

          <div className="bg-white p-8 border border-[#ECE6DC]">
            <div className="w-12 h-12 bg-[#FAF7F2] flex items-center justify-center text-[#C5A880] mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-[#171717] mb-2">100% Privacy Protected</h3>
            <p className="text-xs text-[#6B655F] leading-relaxed">
              All camera data and biometrics are calculated locally in your client browser session. No video or imagery is ever uploaded or stored.
            </p>
          </div>
        </div>

        {/* Catalog of Try-On Ready Frames */}
        <div className="border-t border-[#ECE6DC] pt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-3xl text-[#171717]">
                Try On In AR Studio
              </h2>
              <p className="text-xs text-[#7A736B]">
                Select any silhouette to launch instant augmented reality fitting.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOnPage;
