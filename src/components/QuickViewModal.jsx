import React, { useState, useEffect } from 'react';
import { X, Heart, Star, Check, ShieldCheck, Truck, RefreshCw, Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';

const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist, setTryOnProduct } = useShop();

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [selectedPrescription, setSelectedPrescription] = useState('Non-prescription (Plano / Fashion)');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColorIdx(0);
      setSelectedSize(quickViewProduct.frameSize || 'Medium');
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const currentColor = quickViewProduct.colors?.[selectedColorIdx] || quickViewProduct.colors?.[0];
  const isSaved = wishlist.includes(quickViewProduct.id);

  const prescriptionOptions = [
    { name: 'Non-prescription (Plano / Fashion)', price: '+₹0' },
    { name: 'Single Vision (Distance / Reading)', price: '+₹799' },
    { name: 'Digital Blue-Light Shield', price: '+₹499' },
    { name: 'Transitions® Light Intelligent', price: '+₹1,299' },
    { name: 'High-Index Ultra Thin (1.67)', price: '+₹1,599' }
  ];

  const handleAdd = () => {
    addToCart(quickViewProduct, {
      color: currentColor?.name,
      size: selectedSize,
      prescription: selectedPrescription,
      image: currentColor?.image || quickViewProduct.image,
      quantity
    });
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative bg-[#FBF9F5] w-full max-w-4xl border border-[#ECE6DC] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-30 p-2 bg-white/80 hover:bg-white text-[#171717] rounded-full border border-[#E0D8CB] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Imagery */}
          <div className="relative bg-[#F4EFEB] flex flex-col items-center justify-center p-6 sm:p-8 border-b md:border-b-0 md:border-r border-[#ECE6DC]">
            <div className="relative w-full aspect-square max-w-sm flex items-center justify-center overflow-hidden">
              <ProductImage
                src={currentColor?.image || quickViewProduct.image}
                alt={quickViewProduct.name}
                frameShape={quickViewProduct.frameShape}
                aspectRatio="aspect-square"
              />
            </div>

            {/* Quick Action Link */}
            <div className="mt-4 w-full flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0284C7] bg-[#E0F2FE] px-3 py-1 rounded-full border border-[#BAE6FD]">
                100% UV Protection
              </span>

              <Link
                to={`/product/${quickViewProduct.id}`}
                onClick={() => setQuickViewProduct(null)}
                className="text-xs uppercase tracking-wider text-[#0B4D8C] hover:text-[#0284C7] underline font-bold"
              >
                View Full Specifications
              </Link>
            </div>
          </div>

          {/* Right: Product Customization */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Header Details */}
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#7D766E] mb-1">
                <span>{quickViewProduct.category} · {quickViewProduct.material}</span>
                <span className="flex items-center text-[#171717] font-medium">
                  <Star className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880] mr-1" />
                  {quickViewProduct.rating} ({quickViewProduct.reviews})
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#171717]">
                {quickViewProduct.name}
              </h2>
              <p className="text-xs text-[#736C65] mt-1 mb-4">
                {quickViewProduct.subtitle}
              </p>

              {/* Price */}
              <div className="flex items-baseline space-x-3 mb-5">
                <span className="text-2xl font-bold text-[#0B4D8C]">
                  ₹{quickViewProduct.price.toLocaleString('en-IN')}
                </span>
                {quickViewProduct.oldPrice && (
                  <span className="text-sm text-[#94A3B8] line-through">
                    ₹{quickViewProduct.oldPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-[#0284C7] bg-[#E0F2FE] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                  In Stock · Ready to Ship
                </span>
              </div>

              {/* Color Selection */}
              <div className="mb-5">
                <div className="flex items-center justify-between text-xs tracking-wider uppercase mb-2">
                  <span className="font-semibold text-[#171717]">Color:</span>
                  <span className="text-[#6B655F]">{currentColor?.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  {quickViewProduct.colors?.map((col, idx) => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColorIdx(idx)}
                      className={`relative w-8 h-8 rounded-full border transition-all ${
                        selectedColorIdx === idx
                          ? 'ring-2 ring-offset-2 ring-[#0B4D8C] scale-105'
                          : 'border-black/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      {selectedColorIdx === idx && (
                        <Check className="w-3.5 h-3.5 absolute inset-0 m-auto text-white drop-shadow-md" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Frame Size Selection */}
              <div className="mb-5">
                <div className="flex items-center justify-between text-xs tracking-wider uppercase mb-2">
                  <span className="font-semibold text-[#171717]">Size:</span>
                  <span className="text-[#6B655F]">Standard Fit ({quickViewProduct.details?.lensWidth})</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {['Small', 'Medium', 'Large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs uppercase tracking-wider font-semibold rounded-lg border transition-colors ${
                        selectedSize === size
                          ? 'bg-[#0B4D8C] text-white border-[#0B4D8C]'
                          : 'bg-white text-[#4A4744] border-[#E0D8CB] hover:border-[#0B4D8C]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lens / Prescription Options */}
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-2">
                  Lens Customization
                </label>
                <select
                  value={selectedPrescription}
                  onChange={(e) => setSelectedPrescription(e.target.value)}
                  className="w-full bg-white border border-[#DCD3C5] rounded-lg px-3 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#0B4D8C]"
                >
                  {prescriptionOptions.map((opt) => (
                    <option key={opt.name} value={opt.name}>
                      {opt.name} ({opt.price})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Actions & Guarantee */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                {/* Quantity */}
                <div className="flex items-center border border-[#DCD3C5] bg-white rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-sm text-[#171717] hover:bg-[#F2EDE4]"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-semibold text-[#171717] min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-sm text-[#171717] hover:bg-[#F2EDE4]"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 bg-[#0B4D8C] hover:bg-[#0284C7] text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all duration-300 shadow-md"
                >
                  Add to Shopping Bag
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3 border border-[#DCD3C5] rounded-lg transition-colors ${
                    isSaved ? 'bg-[#0B4D8C] text-white' : 'bg-white text-[#171717] hover:text-[#0284C7]'
                  }`}
                  title="Save to wishlist"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Service Badges */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#ECE6DC] text-[10px] text-[#7A736B]">
                <div className="flex items-center space-x-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#8F7C66]" />
                  <span>Free Express Delivery</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-[#8F7C66]" />
                  <span>30-Day Free Returns</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8F7C66]" />
                  <span>2-Year Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
