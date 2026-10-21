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
      className="group relative flex flex-col h-full bg-[#FFFFFF] border border-[#ECE6DC] hover:border-[#C5A880] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Badges, Wishlist & AR Try-On Quick Pill */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col space-y-1">
          {product.isNew && (
            <span className="bg-[#171717] text-[#FFFFFF] text-[10px] uppercase tracking-widest px-2.5 py-0.5 font-semibold shadow-xs">
              New
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="bg-[#C5A880] text-[#141414] text-[10px] uppercase tracking-widest px-2.5 py-0.5 font-semibold shadow-xs">
              Best Seller
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
            className="flex items-center space-x-1 px-2.5 py-1 bg-black/85 hover:bg-[#C5A880] text-white hover:text-[#141414] text-[9px] uppercase font-bold tracking-wider rounded-none backdrop-blur-md border border-white/20 transition-all duration-200 shadow-sm cursor-pointer hover:scale-105"
            title="Try on in AR Studio"
          >
            <Camera className="w-3 h-3" />
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
                ? 'bg-[#141414] text-[#C5A880] shadow-md scale-105'
                : 'bg-white/90 hover:bg-white text-[#171717] hover:text-[#C5A880] shadow-sm'
            }`}
            title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#C5A880] stroke-[#C5A880]' : 'stroke-[1.75]'}`} />
          </button>
        </div>
      </div>

      {/* Main Image Container with ProductImage Fallback & Shimmer */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F6F3ED] flex items-center justify-center">
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
            className="flex-1 py-2 px-2 bg-white/95 hover:bg-[#171717] text-[#171717] hover:text-white text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center space-x-1 shadow-md transition-colors cursor-pointer"
            title="Quick Preview"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View</span>
          </button>
          
          <button
            onClick={() => openCustomizer(product)}
            className="py-2 px-2.5 bg-[#1E1B17] hover:bg-[#C5A880] text-[#C5A880] hover:text-[#171717] border border-[#C5A880]/50 text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center space-x-1 shadow-md transition-colors cursor-pointer"
            title="360° Bespoke Atelier Customizer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>360°</span>
          </button>

          <button
            onClick={() => setTryOnProduct(product)}
            className="py-2 px-2.5 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#171717] text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center space-x-1 shadow-md transition-colors cursor-pointer"
            title="Virtual Try-On with Camera / Photo"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>AR</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#7A736B] tracking-wider uppercase mb-1.5 font-medium">
            <span>{product.category} · {product.rimType}</span>
            <span className="flex items-center space-x-1 text-[#4A4744]">
              <span className="text-[#C5A880]">★</span>
              <span className="font-semibold text-black">{product.rating}</span>
              <span className="text-[#9E968E]">({product.reviews})</span>
            </span>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`} className="group-hover:text-[#9F8259] transition-colors block">
            <h3 className="font-serif text-lg sm:text-xl font-medium tracking-wide text-[#171717] leading-tight min-h-[1.5rem]">
              {product.name}
            </h3>
          </Link>

          {/* Subtitle / Silhouette */}
          <p className="text-xs text-[#736C65] line-clamp-1 mt-1 font-light min-h-[1rem]">
            {product.subtitle}
          </p>
        </div>

        {/* Bottom Swatches & Price */}
        <div className="mt-4 pt-3 border-t border-[#F0ECE4] flex items-center justify-between">
          {/* Color Swatches */}
          <div className="flex items-center space-x-1.5">
            {product.colors?.map((col, idx) => (
              <button
                key={col.name}
                onClick={() => setSelectedColorIdx(idx)}
                className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                  selectedColorIdx === idx
                    ? 'ring-1 ring-offset-1 ring-[#171717] scale-110'
                    : 'border-black/20 hover:scale-105'
                }`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
              />
            ))}
            {product.colors?.length > 3 && (
              <span className="text-[10px] text-[#8C847A] ml-1">+{product.colors.length - 3}</span>
            )}
          </div>

          {/* Pricing & Add to Cart */}
          <div className="flex items-center space-x-2">
            <div className="text-right">
              {product.oldPrice && (
                <span className="text-xs text-[#9E968E] line-through mr-1.5 font-normal">
                  ${product.oldPrice}
                </span>
              )}
              <span className="font-medium text-sm sm:text-base text-[#171717]">
                ${product.price}
              </span>
            </div>

            <button
              onClick={() => addToCart(product, { color: currentColor?.name })}
              className="p-2 bg-[#FAF7F2] hover:bg-[#171717] text-[#171717] hover:text-white rounded-none border border-[#E0D8CB] hover:border-[#171717] transition-colors flex-shrink-0 cursor-pointer"
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
