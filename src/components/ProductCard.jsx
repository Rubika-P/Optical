import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Check, Layers, Sparkles, Camera } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductImage from './ProductImage';

// Highly Realistic Eyewear Overlay for Face Try-On
const GlassesFaceOverlay = ({ shape = 'Geometric', colorHex = '#1A1A1A', isSunglasses = false }) => {
  const isDarkTint = isSunglasses;
  const lensFill = isDarkTint ? 'rgba(15, 23, 42, 0.84)' : 'rgba(224, 242, 254, 0.22)';
  const strokeColor = colorHex || '#262626';

  // Different geometry paths by shape calibrated with realistic nose pads and temple depth
  switch (shape) {
    case 'Round':
      return (
        <svg viewBox="0 0 280 100" className="w-full" style={{ filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.55))' }}>
          <defs>
            <linearGradient id="lensShineRound" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Bridge */}
          <path d="M 118 48 Q 140 36 162 48" fill="none" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
          {/* Nose pads */}
          <path d="M 124 53 Q 120 62 122 66" fill="none" stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 156 53 Q 160 62 158 66" fill="none" stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round" />
          {/* Left Rim */}
          <ellipse cx="72" cy="50" rx="46" ry="38" fill={lensFill} stroke={strokeColor} strokeWidth="5.5" />
          <ellipse cx="72" cy="50" rx="43" ry="35" fill="none" stroke={strokeColor} strokeWidth="1" strokeOpacity="0.4" />
          {/* Right Rim */}
          <ellipse cx="208" cy="50" rx="46" ry="38" fill={lensFill} stroke={strokeColor} strokeWidth="5.5" />
          <ellipse cx="208" cy="50" rx="43" ry="35" fill="none" stroke={strokeColor} strokeWidth="1" strokeOpacity="0.4" />
          {/* Temple hinges */}
          <line x1="26" y1="50" x2="4" y2="44" stroke={strokeColor} strokeWidth="4.5" strokeLinecap="round" />
          <line x1="254" y1="50" x2="276" y2="44" stroke={strokeColor} strokeWidth="4.5" strokeLinecap="round" />
          {/* Lens reflections */}
          <ellipse cx="64" cy="42" rx="28" ry="18" fill="url(#lensShineRound)" transform="rotate(-20 64 42)" />
          <ellipse cx="200" cy="42" rx="28" ry="18" fill="url(#lensShineRound)" transform="rotate(-20 200 42)" />
        </svg>
      );
    case 'Square':
    case 'Rectangle':
      return (
        <svg viewBox="0 0 280 100" className="w-full" style={{ filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.55))' }}>
          <defs>
            <linearGradient id="lensShineSquare" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Bridge */}
          <path d="M 120 44 Q 140 35 160 44" fill="none" stroke={strokeColor} strokeWidth="5.5" strokeLinecap="round" />
          {/* Nose pads */}
          <path d="M 124 50 Q 120 59 122 63" fill="none" stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 156 50 Q 160 59 158 63" fill="none" stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round" />
          {/* Left Rim */}
          <rect x="22" y="20" width="98" height="60" rx="9" fill={lensFill} stroke={strokeColor} strokeWidth="6" />
          <rect x="25" y="23" width="92" height="54" rx="7" fill="none" stroke={strokeColor} strokeWidth="1" strokeOpacity="0.35" />
          {/* Right Rim */}
          <rect x="160" y="20" width="98" height="60" rx="9" fill={lensFill} stroke={strokeColor} strokeWidth="6" />
          <rect x="163" y="23" width="92" height="54" rx="7" fill="none" stroke={strokeColor} strokeWidth="1" strokeOpacity="0.35" />
          {/* Temples */}
          <line x1="22" y1="30" x2="2" y2="24" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
          <line x1="258" y1="30" x2="278" y2="24" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
          {/* Lens reflections */}
          <line x1="42" y1="28" x2="68" y2="68" stroke="#FFFFFF" strokeWidth="3" strokeOpacity="0.45" strokeLinecap="round" />
          <line x1="180" y1="28" x2="206" y2="68" stroke="#FFFFFF" strokeWidth="3" strokeOpacity="0.45" strokeLinecap="round" />
        </svg>
      );
    case 'Cat Eye':
      return (
        <svg viewBox="0 0 280 100" className="w-full" style={{ filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.55))' }}>
          {/* Bridge */}
          <path d="M 122 46 Q 140 36 158 46" fill="none" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
          {/* Left Cat Eye */}
          <path d="M 20 25 Q 80 14 122 42 Q 112 80 54 72 Q 16 66 20 25 Z" fill={lensFill} stroke={strokeColor} strokeWidth="6" strokeLinejoin="round" />
          {/* Right Cat Eye */}
          <path d="M 260 25 Q 200 14 158 42 Q 168 80 226 72 Q 264 66 260 25 Z" fill={lensFill} stroke={strokeColor} strokeWidth="6" strokeLinejoin="round" />
          {/* Temples */}
          <line x1="20" y1="25" x2="4" y2="20" stroke={strokeColor} strokeWidth="4.5" strokeLinecap="round" />
          <line x1="260" y1="25" x2="276" y2="20" stroke={strokeColor} strokeWidth="4.5" strokeLinecap="round" />
          {/* Lens reflection */}
          <line x1="42" y1="34" x2="65" y2="68" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.4" strokeLinecap="round" />
          <line x1="182" y1="34" x2="205" y2="68" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.4" strokeLinecap="round" />
        </svg>
      );
    case 'Aviator':
      return (
        <svg viewBox="0 0 280 100" className="w-full" style={{ filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.55))' }}>
          {/* Top Brow Bar & Bridge */}
          <line x1="60" y1="24" x2="220" y2="24" stroke={strokeColor} strokeWidth="3.5" />
          <path d="M 120 42 Q 140 34 160 42" fill="none" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
          {/* Left Teardrop */}
          <path d="M 28 26 C 80 20 120 28 120 46 C 120 78 72 82 42 70 C 24 60 22 38 28 26 Z" fill={lensFill} stroke={strokeColor} strokeWidth="4.5" />
          {/* Right Teardrop */}
          <path d="M 252 26 C 200 20 160 28 160 46 C 160 78 208 82 238 70 C 256 60 258 38 252 26 Z" fill={lensFill} stroke={strokeColor} strokeWidth="4.5" />
          {/* Temples */}
          <line x1="28" y1="30" x2="4" y2="26" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
          <line x1="252" y1="30" x2="276" y2="26" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
          {/* Glare */}
          <line x1="50" y1="34" x2="74" y2="70" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.4" strokeLinecap="round" />
          <line x1="182" y1="34" x2="206" y2="70" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.4" strokeLinecap="round" />
        </svg>
      );
    default:
      // Geometric / Hexagonal default
      return (
        <svg viewBox="0 0 280 100" className="w-full" style={{ filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.55))' }}>
          <defs>
            <linearGradient id="lensShineGeo" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Bridge */}
          <path d="M 120 46 Q 140 36 160 46" fill="none" stroke={strokeColor} strokeWidth="5.5" strokeLinecap="round" />
          {/* Nose pads */}
          <path d="M 124 52 Q 120 61 122 65" fill="none" stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 156 52 Q 160 61 158 65" fill="none" stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round" />
          {/* Left Hexagonal */}
          <polygon points="52,22 98,22 122,48 98,74 52,74 26,48" fill={lensFill} stroke={strokeColor} strokeWidth="6" strokeLinejoin="round" />
          <polygon points="54,25 96,25 118,48 96,71 54,71 30,48" fill="none" stroke={strokeColor} strokeWidth="1" strokeOpacity="0.35" />
          {/* Right Hexagonal */}
          <polygon points="182,22 228,22 254,48 228,74 182,74 158,48" fill={lensFill} stroke={strokeColor} strokeWidth="6" strokeLinejoin="round" />
          <polygon points="184,25 226,25 250,48 226,71 184,71 162,48" fill="none" stroke={strokeColor} strokeWidth="1" strokeOpacity="0.35" />
          {/* Temples */}
          <line x1="26" y1="48" x2="4" y2="42" stroke={strokeColor} strokeWidth="4.5" strokeLinecap="round" />
          <line x1="254" y1="48" x2="276" y2="42" stroke={strokeColor} strokeWidth="4.5" strokeLinecap="round" />
          {/* Glare reflections */}
          <line x1="50" y1="30" x2="74" y2="66" stroke="#FFFFFF" strokeWidth="3" strokeOpacity="0.45" strokeLinecap="round" />
          <line x1="180" y1="30" x2="204" y2="66" stroke="#FFFFFF" strokeWidth="3" strokeOpacity="0.45" strokeLinecap="round" />
        </svg>
      );
  }
};

const ProductCard = ({ product }) => {
  const {
    wishlist,
    toggleWishlist,
    setQuickViewProduct,
    openCustomizer,
    addToCart,
    isVirtualTryOnActive,
    userTryOnPhoto,
    tryOnPosition = { y: 50.5, scale: 52, x: 50 },
    openLiveCameraModal
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [peekOriginal, setPeekOriginal] = useState(false);

  const isSaved = wishlist.includes(product.id);
  const currentColor = product.colors?.[selectedColorIdx] || product.colors?.[0];
  const displayImage = currentColor?.image || product.image;

  const isContactLens = product.category === 'Contact Lenses';
  const showVirtualTryOn = isVirtualTryOnActive && userTryOnPhoto && !peekOriginal;

  // Calibrated size multiplier based on frame category and frame size
  const sizeMultiplier = product.frameSize === 'Large' ? 1.08 : product.frameSize === 'Small' ? 0.94 : 1.0;
  const targetScale = (tryOnPosition.scale || 52) * sizeMultiplier;
  const targetY = tryOnPosition.y || 50.5;
  const targetX = tryOnPosition.x || 50;

  return (
    <div
      className="group relative flex flex-col h-full bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#E2E8F0] hover:border-[#0284C7] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPeekOriginal(false);
      }}
    >
      {/* Top Badges & Wishlist */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col space-y-1">
          {showVirtualTryOn && (
            <span className="bg-[#0284C7] text-white text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md font-bold shadow-sm flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>You Wearing</span>
            </span>
          )}
          {product.isNew && !showVirtualTryOn && (
            <span className="bg-[#0B4D8C] text-white text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-md font-bold shadow-sm">
              New
            </span>
          )}
          {product.isBestSeller && !product.isNew && !showVirtualTryOn && (
            <span className="bg-[#0284C7] text-white text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-md font-bold shadow-sm">
              Best Seller
            </span>
          )}
        </div>

        <div className="flex items-center space-x-1.5 pointer-events-auto">
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-2 rounded-full transition-all duration-300 backdrop-blur-md cursor-pointer ${
              isSaved
                ? 'bg-[#0B4D8C] text-[#38BDF8] shadow-md scale-105'
                : 'bg-white/90 hover:bg-white text-[#334155] hover:text-[#0B4D8C] shadow-sm'
            }`}
            title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#38BDF8] stroke-[#38BDF8]' : 'stroke-[2]'}`} />
          </button>
        </div>
      </div>

      {/* Main Image Container (Normal Studio shot OR Virtual Try-On Face) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F8FAFC] flex items-center justify-center p-3">
        {showVirtualTryOn ? (
          // VIRTUAL TRY-ON MODE: User face wearing this exact frame!
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
            {/* User Face Portrait Base */}
            <img
              src={userTryOnPhoto}
              alt={`Virtual Try-On for ${product.name}`}
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-700 group-hover:scale-108"
            />

            {/* Overlaid Glasses calibrated precisely to the eye-line */}
            {!isContactLens && (
              <div
                className="absolute pointer-events-none transition-all duration-200"
                style={{
                  top: `${targetY}%`,
                  left: `${targetX}%`,
                  transform: 'translate(-50%, -50%)',
                  width: `${targetScale}%`
                }}
              >
                <GlassesFaceOverlay
                  shape={product.frameShape}
                  colorHex={currentColor?.hex || '#1A1A1A'}
                  isSunglasses={product.category === 'Sunglasses'}
                />
              </div>
            )}

            {/* Contact lens hydration glow if contact lenses */}
            {isContactLens && (
              <div className="absolute inset-0 pointer-events-none bg-radial from-cyan-400/25 via-transparent to-transparent flex items-center justify-center">
                <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-cyan-900/80 text-cyan-200 border border-cyan-400/30">
                  ✨ Smart Hydration Fit
                </span>
              </div>
            )}

            {/* Peek original button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setPeekOriginal(true);
              }}
              className="absolute bottom-2 right-2 z-20 px-2 py-1 rounded bg-black/75 hover:bg-black text-[9px] font-bold text-white uppercase tracking-wider backdrop-blur-sm border border-white/20 transition-colors cursor-pointer"
              title="Peek product photo"
            >
              Original View
            </button>
          </div>
        ) : (
          // NORMAL STUDIO PRODUCT VIEW
          <Link to={`/product/${product.id}`} className="block w-full h-full">
            <ProductImage
              src={isHovered && product.hoverImage ? product.hoverImage : displayImage}
              alt={product.name}
              frameShape={product.frameShape}
              category={product.category}
              aspectRatio="aspect-[4/3]"
              imgClassName="group-hover:scale-108 transition-transform duration-700 ease-out"
            />
          </Link>
        )}

        {/* Hover Action Overlay */}
        <div
          className={`absolute bottom-3 inset-x-3 z-20 flex items-center justify-center space-x-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          <button
            onClick={() => setQuickViewProduct(product)}
            className="flex-1 py-2 px-3 bg-white/95 hover:bg-[#0B4D8C] text-[#0B4D8C] hover:text-white rounded-xl text-[11px] font-bold tracking-wider uppercase flex items-center justify-center space-x-1 shadow-md transition-colors cursor-pointer border border-[#E2E8F0]"
            title="Quick Preview"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          {!isVirtualTryOnActive && (
            <button
              onClick={() => openLiveCameraModal()}
              className="py-2 px-3 bg-[#0284C7] hover:bg-[#0B4D8C] text-white rounded-xl text-[11px] font-bold tracking-wider uppercase flex items-center justify-center space-x-1 shadow-md transition-colors cursor-pointer"
              title="Try On My Face"
            >
              <Camera className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Try On</span>
            </button>
          )}

          <button
            onClick={() => addToCart(product, { color: currentColor?.name })}
            className="p-2 bg-[#0B4D8C] hover:bg-[#0284C7] text-white rounded-xl shadow-md transition-colors cursor-pointer"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Content Information */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#64748B] mb-1">
            <span className="font-semibold uppercase tracking-wider text-[#0284C7]">{product.category}</span>
            <div className="flex items-center space-x-1 text-[#0F172A] font-bold">
              <span>★</span>
              <span>{product.rating}</span>
              <span className="text-[#94A3B8] font-normal">({product.reviews})</span>
            </div>
          </div>

          {/* Product Name */}
          <Link to={`/product/${product.id}`} className="block group-hover:text-[#0B4D8C] transition-colors">
            <h3 className="font-bold text-sm text-[#0F172A] tracking-tight line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-[11px] text-[#64748B] line-clamp-1 mb-3">
            {product.subtitle}
          </p>

          {/* Color Swatches */}
          {product.colors && product.colors.length > 1 && (
            <div className="flex items-center space-x-1.5 mb-3">
              {product.colors.map((color, idx) => (
                <button
                  key={color.name}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColorIdx(idx);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                    selectedColorIdx === idx
                      ? 'border-[#0B4D8C] scale-125 shadow-sm'
                      : 'border-black/20 hover:scale-110'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              <span className="text-[10px] text-[#94A3B8] pl-1 font-medium">
                {product.colors.length} shades
              </span>
            </div>
          )}
        </div>

        {/* Price & CTA */}
        <div className="pt-3 border-t border-[#F1F5F9] flex items-baseline justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="font-extrabold text-base text-[#0F172A]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-[#94A3B8] line-through">
                ₹{product.oldPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
            Free Delivery
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
