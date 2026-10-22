import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, Lock, CheckCircle2, ArrowRight, Upload, Sparkles, CreditCard, ShoppingBag, Tag, Printer, Download } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';

const Checkout = () => {
  const {
    cart,
    cartSubtotal,
    cartTotal,
    shippingCost,
    isFreeShipping,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    availableCoupons,
    discountAmount
  } = useShop();

  const navigate = useNavigate();

  const [prescriptionMethod, setPrescriptionMethod] = useState('upload'); // 'upload', 'email', 'plano'
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'upi', 'netbanking'
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderedItems, setOrderedItems] = useState([]);
  const [orderTotalSaved, setOrderTotalSaved] = useState(0);
  const [orderDiscountSaved, setOrderDiscountSaved] = useState(0);
  const [couponInput, setCouponInput] = useState('');

  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Vance',
    email: 'alex.vance@studio-design.com',
    phone: '+91 98765 43210',
    address: '42 Marine Drive, Suite 1204',
    city: 'Mumbai',
    state: 'Maharashtra',
    zip: '400020',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvv: '888',
    upiId: 'alex.vance@okhdfcbank'
  });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Save snapshot of current order for confirmation receipt before clearing
    setOrderedItems([...cart]);
    setOrderTotalSaved(cartTotal);
    setOrderDiscountSaved(discountAmount);

    setTimeout(() => {
      setIsProcessing(false);
      const newOrderId = `LUM-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(newOrderId);
      setOrderComplete(true);
      clearCart();

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log(err);
      }
    }, 1600);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponInput('');
    }
  };

  if (orderComplete) {
    return (
      <div className="bg-[#FBF9F5] min-h-screen text-[#171717] py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-[#ECE6DC] p-8 sm:p-14 shadow-2xl relative">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FAF7F2] border border-[#EADBCA] rounded-full flex items-center justify-center mx-auto mb-5 text-[#8B6B3F]">
                <Sparkles className="w-8 h-8 text-[#C5A880]" />
              </div>

              <span className="text-xs uppercase tracking-[0.3em] text-[#8B6B3F] font-semibold block mb-1">
                Order Confirmed
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#171717] mb-2">
                Thank You For Your Patronage
              </h1>

              <p className="text-xs text-[#7A736B] leading-relaxed mb-6 max-w-lg mx-auto">
                Your bespoke eyewear order <strong className="text-[#171717] font-mono">{orderId}</strong> has been transmitted to our master optical laboratory in Sabae. An invoice receipt has been dispatched to <strong>{formData.email}</strong>.
              </p>
            </div>

            {/* Official Invoice Receipt Card */}
            <div className="p-6 bg-[#FAF7F2] border border-[#ECE6DC] space-y-4 mb-8">
              <div className="flex justify-between items-center pb-3 border-b border-[#ECE6DC]">
                <div>
                  <span className="font-serif text-base tracking-widest text-[#171717] font-bold block">
                    GRAND OPTICALS EYE CLINIC INVOICE
                  </span>
                  <span className="text-[10px] text-[#8C847A] font-mono">Invoice #{orderId} · {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-white border border-[#DCD3C5] hover:border-[#171717] text-[#171717] text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
              </div>

              {/* Items Purchased */}
              <div className="space-y-3 divide-y divide-[#EFECE4]">
                {orderedItems.map((item, idx) => (
                  <div key={idx} className="pt-2 first:pt-0 flex justify-between text-xs">
                    <div>
                      <span className="font-medium text-[#171717]">{item.name}</span>
                      <span className="text-[11px] text-[#7A736B] block">
                        {item.selectedColor} · Qty {item.quantity} · {item.prescription}
                      </span>
                      {item.customEngraving && (
                        <span className="text-[10px] text-[#C5A880] font-mono block">
                          Monogram: "{item.customEngraving}"
                        </span>
                      )}
                    </div>
                    <span className="font-medium text-[#171717]">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              {/* Totals Breakdown */}
              <div className="pt-3 border-t border-[#ECE6DC] space-y-1 text-xs">
                {orderDiscountSaved > 0 && (
                  <div className="flex justify-between text-[#2E7D32]">
                    <span>VIP Privilege Savings</span>
                    <span>-₹{orderDiscountSaved.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-[#171717] pt-1">
                  <span>Total Paid (Insured)</span>
                  <span className="font-serif">₹{orderTotalSaved.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Shipping & Delivery details */}
              <div className="pt-3 border-t border-[#ECE6DC] grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-[#8C847A] block">Delivery Recipient:</span>
                  <span className="font-semibold text-[#171717]">{formData.firstName} {formData.lastName} ({formData.phone})</span>
                  <span className="text-[#7A736B] block">{formData.address}, {formData.city}, {formData.state} {formData.zip}</span>
                </div>
                <div>
                  <span className="text-[#8C847A] block">Fulfillment Partner:</span>
                  <span className="font-semibold text-[#171717]">DHL Express Secure Courier (Air Priority)</span>
                  <span className="text-[#7A736B] block">Includes hard case, microfiber cloth & lens care kit</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="px-8 py-3.5 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#141414] text-xs font-semibold uppercase tracking-widest transition-colors text-center"
              >
                Return to Maison Home
              </Link>
              <Link
                to="/shop"
                className="px-8 py-3.5 border border-[#DCD3C5] text-xs font-semibold uppercase tracking-widest text-[#57534E] hover:text-[#171717] text-center"
              >
                Explore More Silhouettes
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-[#FBF9F5] min-h-screen text-[#171717] py-20">
        <div className="max-w-md mx-auto px-4 text-center space-y-4">
          <ShoppingBag className="w-12 h-12 text-[#9E968E] mx-auto" />
          <h2 className="font-serif text-2xl text-[#171717]">Your bag is currently empty</h2>
          <p className="text-xs text-[#7A736B]">Select a frame from our collection to begin bespoke checkout.</p>
          <Link
            to="/shop"
            className="inline-block px-8 py-3.5 bg-[#171717] text-white text-xs font-semibold uppercase tracking-widest"
          >
            Browse The Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FBF9F5] min-h-screen text-[#171717] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:text-left">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B6B3F] font-bold block mb-2">
            Haute Couture Optical Checkout
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#171717]">
            Complete Your Bespoke Commission
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Form: Shipping, Prescription & Payment (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Shipping Address */}
            <div className="bg-white p-6 sm:p-8 border border-[#ECE6DC] space-y-4">
              <div className="flex items-center space-x-3 pb-3 border-b border-[#ECE6DC]">
                <Truck className="w-5 h-5 text-[#8B6B3F]" />
                <h3 className="font-serif text-lg text-[#171717]">1. Insured Delivery Details</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[11px] font-medium text-[#7A736B] mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#DCD3C5] px-3 py-2.5 focus:outline-none focus:border-[#171717]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#7A736B] mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#DCD3C5] px-3 py-2.5 focus:outline-none focus:border-[#171717]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-[#7A736B] mb-1">Email Address (Order & Prescription Receipt)</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#DCD3C5] px-3 py-2.5 focus:outline-none focus:border-[#171717]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-[#7A736B] mb-1">Phone Number (For Courier Tracking Updates)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#DCD3C5] px-3 py-2.5 focus:outline-none focus:border-[#171717]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-[#7A736B] mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#DCD3C5] px-3 py-2.5 focus:outline-none focus:border-[#171717]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#7A736B] mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#DCD3C5] px-3 py-2.5 focus:outline-none focus:border-[#171717]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#7A736B] mb-1">State / PIN Code</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#DCD3C5] px-3 py-2.5 focus:outline-none focus:border-[#171717]"
                    />
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#DCD3C5] px-3 py-2.5 focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Optical Prescription Submission */}
            <div className="bg-white p-6 sm:p-8 border border-[#ECE6DC] space-y-4">
              <div className="flex items-center space-x-3 pb-3 border-b border-[#ECE6DC]">
                <Sparkles className="w-5 h-5 text-[#8B6B3F]" />
                <h3 className="font-serif text-lg text-[#171717]">2. Prescription Verification</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'upload', title: 'Upload Slip', desc: 'Scan or photo of prescription' },
                  { id: 'email', title: 'Send Post-Order', desc: 'Email later to our optometrist' },
                  { id: 'plano', title: 'Zero Power / Plano', desc: 'Blue-light or fashion only' }
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPrescriptionMethod(method.id)}
                    className={`p-3 text-left border transition-all ${
                      prescriptionMethod === method.id
                        ? 'border-[#171717] bg-[#FAF7F2] ring-1 ring-[#171717]'
                        : 'border-[#ECE6DC] hover:border-[#DCD3C5]'
                    }`}
                  >
                    <p className="font-semibold text-xs text-[#171717]">{method.title}</p>
                    <p className="text-[10px] text-[#7A736B] mt-0.5">{method.desc}</p>
                  </button>
                ))}
              </div>

              {prescriptionMethod === 'upload' && (
                <div className="p-4 border-2 border-dashed border-[#DCD3C5] bg-[#FBF9F5] text-center space-y-2">
                  <Upload className="w-6 h-6 mx-auto text-[#8B6B3F]" />
                  <p className="text-xs font-medium text-[#171717]">Drag & Drop your Rx Slip, or Click to Browse</p>
                  <p className="text-[10px] text-[#7A736B]">Accepted: PDF, PNG, JPG (Reviewed by Certified Optometrist)</p>
                </div>
              )}
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white p-6 sm:p-8 border border-[#ECE6DC] space-y-4">
              <div className="flex items-center space-x-3 pb-3 border-b border-[#ECE6DC]">
                <CreditCard className="w-5 h-5 text-[#8B6B3F]" />
                <h3 className="font-serif text-lg text-[#171717]">3. Secure Atelier Payment</h3>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'card', label: 'Credit / Debit Card' },
                  { id: 'upi', label: 'Instant UPI (GPay/PhonePe)' },
                  { id: 'netbanking', label: 'Net Banking' }
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-3 text-center border text-xs font-semibold uppercase tracking-wider transition-all ${
                      paymentMethod === method.id
                        ? 'border-[#171717] bg-[#FAF7F2] text-[#171717] ring-1 ring-[#171717]'
                        : 'border-[#ECE6DC] text-[#7A736B] hover:border-[#DCD3C5]'
                    }`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <label className="block text-[11px] font-medium text-[#7A736B] mb-1">Card Number</label>
                    <input
                      type="text"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#DCD3C5] px-3 py-2.5 font-mono focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-[#7A736B] mb-1">Exp Date</label>
                      <input
                        type="text"
                        required
                        value={formData.expDate}
                        onChange={(e) => setFormData({ ...formData, expDate: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#DCD3C5] px-3 py-2.5 font-mono focus:outline-none focus:border-[#171717]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#7A736B] mb-1">CVV / CVC</label>
                      <input
                        type="text"
                        required
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#DCD3C5] px-3 py-2.5 font-mono focus:outline-none focus:border-[#171717]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="pt-2 text-xs">
                  <label className="block text-[11px] font-medium text-[#7A736B] mb-1">Virtual Payment Address (VPA / UPI ID)</label>
                  <input
                    type="text"
                    required
                    value={formData.upiId}
                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#DCD3C5] px-3 py-2.5 font-mono focus:outline-none focus:border-[#171717]"
                  />
                  <p className="text-[10px] text-[#8C847A] mt-1">A payment authorization request will be sent directly to your UPI app.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Order Summary (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 border border-[#ECE6DC] sticky top-24 space-y-6">
              <h3 className="font-serif text-xl text-[#171717] pb-4 border-b border-[#ECE6DC]">
                Order Summary ({cart.length})
              </h3>

              {/* Items List */}
              <div className="space-y-4 max-h-64 overflow-y-auto divide-y divide-[#F0ECE4]">
                {cart.map((item) => (
                  <div key={item.cartKey} className="pt-3 first:pt-0 flex space-x-3 text-xs">
                    <div className="w-14 h-14 bg-[#F4EFEB] flex-shrink-0 overflow-hidden border border-[#ECE6DC]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex justify-between">
                      <div>
                        <h5 className="font-serif font-medium text-[#171717]">{item.name}</h5>
                        <p className="text-[10px] text-[#7A736B]">{item.selectedColor} · Qty: {item.quantity}</p>
                        <p className="text-[9px] text-[#A89F91] truncate max-w-[160px]">{item.prescription}</p>
                        {item.customEngraving && (
                          <p className="text-[9px] text-[#C5A880] font-mono">Engraved: "{item.customEngraving}"</p>
                        )}
                      </div>
                      <span className="font-medium text-[#171717]">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Engine input in Checkout */}
              {appliedCoupon ? (
                <div className="p-3 bg-[#FAF7F2] border border-[#C5A880]/60 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 text-[#8B6B3F]">
                    <Tag className="w-3.5 h-3.5 text-[#C5A880]" />
                    <div>
                      <span className="font-mono font-bold uppercase">{appliedCoupon.code}</span>
                      <span className="text-[10px] text-[#6B655F] ml-1.5">({appliedCoupon.label})</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-[10px] text-[#C53929] hover:underline font-semibold uppercase tracking-wider"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. LUMERA15)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-[#FBF9F5] border border-[#DCD3C5] px-3 py-2 text-xs uppercase focus:outline-none focus:border-[#171717]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#171717] text-[#171717] hover:text-white border border-[#DCD3C5] text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1 items-center">
                    {availableCoupons.slice(0, 3).map((cp) => (
                      <button
                        key={cp.code}
                        type="button"
                        onClick={() => applyCoupon(cp.code)}
                        className="text-[9px] font-mono px-2 py-0.5 bg-[#FAF7F2] hover:bg-[#EAE2D4] border border-[#DCD3C5] text-[#171717] transition-colors"
                      >
                        +{cp.code}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Cost Totals */}
              <div className="space-y-2 pt-4 border-t border-[#ECE6DC] text-xs text-[#6B655F]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#171717]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#2E7D32]">
                    <span>Privilege Savings ({appliedCoupon?.code})</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>DHL Express Insured Shipping</span>
                  <span className="font-medium text-[#171717]">
                    {isFreeShipping ? 'FREE' : `₹${shippingCost.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#ECE6DC] text-base font-semibold text-[#171717]">
                  <span>Total Due</span>
                  <span className="font-serif text-xl text-[#171717]">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#141414] text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <span className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Processing Commission...</span>
                  </span>
                ) : (
                  <span>Authorize & Commission · ₹{cartTotal.toLocaleString('en-IN')}</span>
                )}
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-[#8C847A]">
                <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>256-Bit Encrypted Secure Transmission</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
