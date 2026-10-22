import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Sparkles, ShoppingBag, Camera, Check, Layers } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductImage from './ProductImage';

const ProductCard = ({ product }) => {
  const { wishlist, toggleWishlist, setQuickViewProduct, setTryOnProduct, openCustomizer, addToCart } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const isSaved = wishlist.includes(product.id);
  const currentColor = product.colors?.[selectedColorIdx] || product.colors?.[0];
  const displayImage = currentColor?.image || product.image;

  return (
    <div
      className="group relative flex flex-col h-full bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#E2E8F0] hover:border-[#0284C7] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Badges, Wishlist & AR Try-On Quick Pill */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col space-y-1">
          {product.isNew && (
            <span className="bg-[#0B4D8C] text-white text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-md font-bold shadow-sm">
              New
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="bg-[#0284C7] text-white text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-md font-bold shadow-sm">
              Clinical Best Seller
            </span>
          )}
        </div>

        <div className="flex items-center space-x-1.5 pointer-events-auto">
          {/* Quick Try-On Button Badge */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setTryOnProduct(product);
            }}
            className="flex items-center space-x-1 px-2.5 py-1 bg-[#072F5F]/90 hover:bg-[#0284C7] text-white text-[9px] uppercase font-bold tracking-wider rounded-lg backdrop-blur-md border border-white/20 transition-all duration-200 shadow-sm cursor-pointer hover:scale-105"
            title="Try on in AR Studio"
          >
            <Camera className="w-3 h-3 text-[#38BDF8]" />
            <span>Try On</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-1.5 rounded-full transition-all duration-300 backdrop-blur-md cursor-pointer ${
              isSaved
                ? 'bg-[#0B4D8C] text-[#38BDF8] shadow-md scale-105'
                : 'bg-white/90 hover:bg-white text-[#334155] hover:text-[#0B4D8C] shadow-sm'
            }`}
            title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#38BDF8] stroke-[#38BDF8]' : 'stroke-[2]'}`} />
          </button>
        </div>
      </div>

      {/* Main Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F8FAFC] flex items-center justify-center">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <ProductImage
            src={isHovered && product.hoverImage ? product.hoverImage : displayImage}
            alt={product.name}
            frameShape={product.frameShape}
            aspectRatio="aspect-[4/3]"
            imgClassName="group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Hover Action Overlay */}
        <div
          className={`absolute bottom-3 inset-x-3 z-20 flex items-center justify-center space-x-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          <button
            onClick={() => setQuickViewProduct(product)}
            className="flex-1 py-2 px-2 bg-white/95 hover:bg-[#0B4D8C] text-[#0B4D8C] hover:text-white rounded-lg text-[11px] font-bold tracking-wider uppercase flex items-center justify-center space-x-1 shadow-md transition-colors cursor-pointer border border-[#E2E8F0]"
            title="Quick Preview"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View</span>
          </button>
          
          <button
            onClick={() => openCustomizer(product)}
            className="py-2 px-2.5 bg-[#F0F7FF] hover:bg-[#0284C7] text-[#0B4D8C] hover:text-white border border-[#BAE6FD] rounded-lg text-[11px] font-bold tracking-wider uppercase flex items-center justify-center space-x-1 shadow-md transition-colors cursor-pointer"
            title="360° Studio"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>360°</span>
          </button>

          <button
            onClick={() => setTryOnProduct(product)}
            className="py-2 px-2.5 bg-[#0B4D8C] hover:bg-[#0284C7] text-white rounded-lg text-[11px] font-bold tracking-wider uppercase flex items-center justify-center space-x-1 shadow-md transition-colors cursor-pointer"
            title="Virtual Try-On"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>AR</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#64748B] tracking-wider uppercase mb-1.5 font-semibold">
            <span>{product.category} · {product.rimType}</span>
            <span className="flex items-center space-x-1 text-[#334155]">
              <span className="text-[#F59E0B]">★</span>
              <span className="font-bold text-[#0F172A]">{product.rating}</span>
              <span className="text-[#94A3B8]">({product.reviews})</span>
            </span>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`} className="group-hover:text-[#0284C7] transition-colors block">
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#0F172A] leading-tight min-h-[1.4rem]">
              {product.name}
            </h3>
          </Link>

          {/* Subtitle / Silhouette */}
          <p className="text-xs text-[#64748B] line-clamp-1 mt-1 font-normal min-h-[1rem]">
            {product.subtitle}
          </p>
        </div>

        {/* Bottom Swatches & Price */}
        <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
          {/* Color Swatches */}
          <div className="flex items-center space-x-1.5">
            {product.colors?.map((col, idx) => (
              <button
                key={col.name}
                onClick={() => setSelectedColorIdx(idx)}
                className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                  selectedColorIdx === idx
                    ? 'ring-2 ring-offset-1 ring-[#0284C7] scale-110'
                    : 'border-black/20 hover:scale-105'
                }`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
              />
            ))}
            {product.colors?.length > 3 && (
              <span className="text-[10px] text-[#94A3B8] ml-1">+{product.colors.length - 3}</span>
            )}
          </div>

          {/* Pricing & Add to Cart */}
          <div className="flex items-center space-x-2">
            <div className="text-right">
              {product.oldPrice && (
                <span className="text-xs text-[#94A3B8] line-through mr-1.5 font-normal">
                  ${product.oldPrice}
                </span>
              )}
              <span className="font-extrabold text-sm sm:text-base text-[#0B4D8C]">
                ${product.price}
              </span>
            </div>

            <button
              onClick={() => addToCart(product, { color: currentColor?.name })}
              className="p-2 bg-[#F0F7FF] hover:bg-[#0B4D8C] text-[#0B4D8C] hover:text-white rounded-lg border border-[#BAE6FD] hover:border-[#0B4D8C] transition-colors flex-shrink-0 cursor-pointer shadow-xs"
              title="Add directly to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
