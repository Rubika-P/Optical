import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Sparkles, Plus, Minus, Tag, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTotal,
    shippingCost,
    freeShippingThreshold,
    isFreeShipping,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    availableCoupons,
    discountAmount,
    showToast
  } = useShop();

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;
    const res = applyCoupon(promoCodeInput);
    if (res.success) {
      setPromoCodeInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF9F5] shadow-2xl border-l border-[#ECE6DC] flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Top Header */}
          <div className="p-6 border-b border-[#ECE6DC] flex items-center justify-between bg-white">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#171717]" />
              <h2 className="font-serif text-xl font-medium tracking-wide text-[#171717]">
                Shopping Bag
              </h2>
              <span className="text-xs bg-[#F2EDE4] text-[#6B655F] px-2 py-0.5 font-mono">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#6B655F] hover:text-[#171717] rounded-full hover:bg-[#F2EDE4] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#FAF7F2] p-4 border-b border-[#ECE6DC] text-xs">
            <div className="flex justify-between items-center mb-1.5 font-medium text-[#171717]">
              <span>
                {isFreeShipping
                  ? '✨ Qualified for Free Express Courier Delivery!'
                  : `Add ₹${amountNeeded.toLocaleString('en-IN')} more for Free Express Delivery`}
              </span>
              <span className="font-mono text-[11px] text-[#C5A880]">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#E8E1D5] overflow-hidden">
              <div
                className="h-full bg-[#C5A880] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 divide-y divide-[#EFECE4]">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F4EFEB] flex items-center justify-center text-[#9E968E]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl text-[#171717]">Your bag is empty</h3>
                <p className="text-xs text-[#7A736B] max-w-xs mx-auto">
                  Explore our curated architectural eyewear collection and find your signature frame.
                </p>
                <Link
                  to="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block px-6 py-3 bg-[#171717] text-white hover:bg-[#C5A880] hover:text-[#171717] text-xs font-semibold uppercase tracking-widest transition-colors"
                >
                  Explore The Edit
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartKey} className="pt-4 first:pt-0 flex space-x-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-[#F4EFEB] flex-shrink-0 border border-[#ECE6DC] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-base font-medium text-[#171717]">
                          {item.name}
                        </h4>
                        <span className="font-medium text-sm text-[#171717]">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7A736B]">{item.selectedColor} · {item.selectedSize}</p>
                      <p className="text-[10px] text-[#A89F91] truncate max-w-[200px] mt-0.5">
                        {item.prescription}
                      </p>
                      {item.customEngraving && (
                        <p className="text-[10px] text-[#C5A880] font-mono mt-0.5">
                          Engraved: "{item.customEngraving}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity control */}
                      <div className="flex items-center border border-[#DCD3C5] bg-white">
                        <button
                          onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                          className="px-2 py-1 text-xs hover:bg-[#F2EDE4] text-[#6B655F]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 py-1 text-xs font-mono font-semibold min-w-[1.5rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                          className="px-2 py-1 text-xs hover:bg-[#F2EDE4] text-[#6B655F]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartKey)}
                        className="text-xs text-[#9E968E] hover:text-[#C53929] flex items-center space-x-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#ECE6DC] space-y-4">
              {/* Promo Code Input or Active Badge */}
              {appliedCoupon ? (
                <div className="p-2.5 bg-[#FAF7F2] border border-[#C5A880]/60 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 text-[#8B6B3F]">
                    <Tag className="w-3.5 h-3.5 text-[#C5A880]" />
                    <div>
                      <span className="font-mono font-bold uppercase">{appliedCoupon.code}</span>
                      <span className="text-[10px] text-[#6B655F] ml-1.5">({appliedCoupon.label})</span>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[10px] text-[#C53929] hover:underline font-semibold uppercase tracking-wider"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <form onSubmit={handleApplyPromo} className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. LUMERA15)"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      className="flex-1 bg-[#FBF9F5] border border-[#DCD3C5] px-3 py-2 text-xs uppercase focus:outline-none focus:border-[#171717]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#171717] text-[#171717] hover:text-white border border-[#DCD3C5] hover:border-[#171717] text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Apply
                    </button>
                  </form>

                  {/* 1-Click Promo Suggestions */}
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-[10px] text-[#8C847A] uppercase tracking-wider">Offers:</span>
                    {availableCoupons.slice(0, 3).map((cp) => (
                      <button
                        key={cp.code}
                        type="button"
                        onClick={() => applyCoupon(cp.code)}
                        className="text-[10px] font-mono px-2 py-0.5 bg-[#F6F2EB] hover:bg-[#EAE2D4] border border-[#DCD3C5] text-[#171717] transition-colors"
                      >
                        +{cp.code} ({cp.type === 'percent' ? `${cp.value}%` : cp.type === 'flat' ? `₹${cp.value}` : 'Free Ship'})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#6B655F]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#171717]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#2E7D32]">
                    <span>Privilege Discount ({appliedCoupon?.code})</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Express Shipping</span>
                  <span className="font-medium text-[#171717]">
                    {isFreeShipping ? 'FREE' : `₹${shippingCost.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#ECE6DC] text-base font-semibold text-[#171717]">
                  <span>Total Estimated</span>
                  <span className="font-serif text-lg">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/checkout');
                }}
                className="w-full py-3.5 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#141414] text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300 shadow-md"
              >
                <span>Proceed to Bespoke Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-[#8C847A]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>256-Bit Encrypted Secure Checkout · 30-Day Money Back</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
