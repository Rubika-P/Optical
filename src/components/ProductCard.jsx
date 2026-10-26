import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Check, Layers, Sparkles, Camera } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductImage from './ProductImage';

// Frame SVG silhouette generator for virtual try-on on face
const GlassesFaceOverlay = ({ shape = 'Geometric', colorHex = '#1A1A1A', isSunglasses = false }) => {
  const isDarkTint = isSunglasses;
  const lensFill = isDarkTint ? 'rgba(20, 24, 33, 0.82)' : 'rgba(186, 230, 253, 0.22)';
  const strokeColor = colorHex || '#222222';

  // Different geometry paths by shape
  switch (shape) {
    case 'Round':
      return (
        <svg viewBox="0 0 280 90" className="w-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.45)]">
          {/* Bridge */}
          <path d="M 120 42 Q 140 32 160 42" fill="none" stroke={strokeColor} strokeWidth="4.5" strokeLinecap="round" />
          {/* Left Rim */}
          <ellipse cx="72" cy="45" rx="46" ry="36" fill={lensFill} stroke={strokeColor} strokeWidth="5" />
          {/* Right Rim */}
          <ellipse cx="208" cy="45" rx="46" ry="36" fill={lensFill} stroke={strokeColor} strokeWidth="5" />
          {/* Temple hinges */}
          <line x1="26" y1="45" x2="4" y2="40" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
          <line x1="254" y1="45" x2="276" y2="40" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
          {/* Lens reflection */}
          <line x1="48" y1="28" x2="68" y2="60" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.45" strokeLinecap="round" />
          <line x1="184" y1="28" x2="204" y2="60" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.45" strokeLinecap="round" />
        </svg>
      );
    case 'Square':
    case 'Rectangle':
      return (
        <svg viewBox="0 0 280 90" className="w-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.45)]">
          {/* Bridge */}
          <path d="M 122 38 Q 140 30 158 38" fill="none" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
          {/* Left Rim */}
          <rect x="24" y="16" width="98" height="58" rx="8" fill={lensFill} stroke={strokeColor} strokeWidth="5.5" />
          {/* Right Rim */}
          <rect x="158" y="16" width="98" height="58" rx="8" fill={lensFill} stroke={strokeColor} strokeWidth="5.5" />
          {/* Temples */}
          <line x1="24" y1="26" x2="2" y2="20" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
          <line x1="256" y1="26" x2="278" y2="20" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
          {/* Lens reflection */}
          <line x1="42" y1="24" x2="65" y2="62" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.4" strokeLinecap="round" />
          <line x1="176" y1="24" x2="199" y2="62" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.4" strokeLinecap="round" />
        </svg>
      );
    case 'Cat Eye':
      return (
        <svg viewBox="0 0 280 90" className="w-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.45)]">
          {/* Bridge */}
          <path d="M 124 40 Q 140 30 156 40" fill="none" stroke={strokeColor} strokeWidth="4.5" strokeLinecap="round" />
          {/* Left Cat Eye */}
          <path d="M 22 22 Q 80 12 124 38 Q 110 76 56 68 Q 20 62 22 22 Z" fill={lensFill} stroke={strokeColor} strokeWidth="5.5" strokeLinejoin="round" />
          {/* Right Cat Eye */}
          <path d="M 258 22 Q 200 12 156 38 Q 170 76 224 68 Q 260 62 258 22 Z" fill={lensFill} stroke={strokeColor} strokeWidth="5.5" strokeLinejoin="round" />
          {/* Temples */}
          <line x1="22" y1="22" x2="4" y2="18" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
          <line x1="258" y1="22" x2="276" y2="18" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'Aviator':
      return (
        <svg viewBox="0 0 280 90" className="w-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.45)]">
          {/* Top Brow Bar & Bridge */}
          <line x1="60" y1="20" x2="220" y2="20" stroke={strokeColor} strokeWidth="3" />
          <path d="M 122 36 Q 140 30 158 36" fill="none" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />
          {/* Left Teardrop */}
          <path d="M 30 22 C 80 16 122 24 122 42 C 122 72 74 76 44 64 C 26 56 24 34 30 22 Z" fill={lensFill} stroke={strokeColor} strokeWidth="4" />
          {/* Right Teardrop */}
          <path d="M 250 22 C 200 16 158 24 158 42 C 158 72 206 76 236 64 C 254 56 256 34 250 22 Z" fill={lensFill} stroke={strokeColor} strokeWidth="4" />
          {/* Temples */}
          <line x1="30" y1="26" x2="6" y2="22" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="250" y1="26" x2="274" y2="22" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    default:
      // Geometric / Hexagonal default
      return (
        <svg viewBox="0 0 280 90" className="w-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.45)]">
          {/* Bridge */}
          <path d="M 122 40 Q 140 30 158 40" fill="none" stroke={strokeColor} strokeWidth="4.5" strokeLinecap="round" />
          {/* Left Hexagonal */}
          <polygon points="54,18 98,18 122,42 98,68 54,68 30,42" fill={lensFill} stroke={strokeColor} strokeWidth="5" strokeLinejoin="round" />
          {/* Right Hexagonal */}
          <polygon points="182,18 226,18 250,42 226,68 182,68 158,42" fill={lensFill} stroke={strokeColor} strokeWidth="5" strokeLinejoin="round" />
          {/* Temples */}
          <line x1="30" y1="42" x2="6" y2="38" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
          <line x1="250" y1="42" x2="274" y2="38" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
          {/* Glare */}
          <line x1="50" y1="26" x2="72" y2="58" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.4" strokeLinecap="round" />
          <line x1="178" y1="26" x2="200" y2="58" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.4" strokeLinecap="round" />
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
    openLiveCameraModal
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [peekOriginal, setPeekOriginal] = useState(false);

  const isSaved = wishlist.includes(product.id);
  const currentColor = product.colors?.[selectedColorIdx] || product.colors?.[0];
  const displayImage = currentColor?.image || product.image;

  const isContactLens = product.category === 'Contact Lenses';
  const showVirtualTryOn = isVirtualTryOnActive && userTryOnPhoto && !peekOriginal && !isContactLens;

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
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlaid Glasses accurately sitting on bridge */}
            {!isContactLens && (
              <div
                className="absolute pointer-events-none transition-all duration-300"
                style={{
                  top: '43.5%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: product.frameSize === 'Large' ? '50%' : product.frameSize === 'Small' ? '42%' : '46%'
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
              <div className="absolute inset-0 pointer-events-none bg-radial from-cyan-400/20 via-transparent to-transparent flex items-center justify-center">
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
              className="absolute bottom-2 right-2 z-20 px-2 py-1 rounded bg-black/70 hover:bg-black text-[9px] font-bold text-white uppercase tracking-wider backdrop-blur-sm border border-white/20 transition-colors cursor-pointer"
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
