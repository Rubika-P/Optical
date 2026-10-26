import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const ShopContext = createContext();

export const AVAILABLE_COUPONS = [
  { code: 'LUMERA15', type: 'percent', value: 15, label: '15% Off Total Order', desc: 'VIP Concierge privilege' },
  { code: 'VIP20', type: 'percent', value: 20, label: '20% Haute Couture', desc: 'Orders over ₹3,000' },
  { code: 'GOLD500', type: 'flat', value: 500, label: '₹500 Instant Credit', desc: 'Special atelier token' },
  { code: 'FREESHIP', type: 'shipping', value: 0, label: 'Free Insured Courier', desc: 'Complimentary white-glove delivery' }
];

const DEFAULT_SAMPLE_FACE = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';

export const ShopProvider = ({ children }) => {
  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('grand_opticals_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('grand_opticals_wishlist');
      return saved ? JSON.parse(saved) : ["lumera-arc", "lumera-noir"];
    } catch {
      return ["lumera-arc", "lumera-noir"];
    }
  });

  // Modals state
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [tryOnProduct, setTryOnProduct] = useState(null);
  const [customizerProduct, setCustomizerProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // 3D Virtual Try-On Whole-Store State
  const [isVirtualTryOnActive, setIsVirtualTryOnActive] = useState(() => {
    try {
      const saved = localStorage.getItem('grand_opticals_vto_active');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [userTryOnPhoto, setUserTryOnPhoto] = useState(() => {
    try {
      return localStorage.getItem('grand_opticals_vto_photo') || null;
    } catch {
      return null;
    }
  });

  // Precise Eyewear Alignment Calibration (Height, Scale, Horizontal offset)
  const [tryOnPosition, setTryOnPosition] = useState(() => {
    try {
      const saved = localStorage.getItem('grand_opticals_vto_pos');
      return saved ? JSON.parse(saved) : { y: 50.5, scale: 52, x: 50 };
    } catch {
      return { y: 50.5, scale: 52, x: 50 };
    }
  });

  const [isLiveCameraModalOpen, setIsLiveCameraModalOpen] = useState(false);
  const [isAiTrendModalOpen, setIsAiTrendModalOpen] = useState(false);

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('grand_opticals_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Appointments in localStorage
  const [appointments, setAppointments] = useState(() => {
    try {
      const saved = localStorage.getItem('grand_opticals_appointments');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist Cart
  useEffect(() => {
    try {
      localStorage.setItem('grand_opticals_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Persist Wishlist
  useEffect(() => {
    try {
      localStorage.setItem('grand_opticals_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Persist Virtual Try-On state & position
  useEffect(() => {
    try {
      localStorage.setItem('grand_opticals_vto_active', isVirtualTryOnActive ? 'true' : 'false');
      if (userTryOnPhoto) {
        localStorage.setItem('grand_opticals_vto_photo', userTryOnPhoto);
      }
      localStorage.setItem('grand_opticals_vto_pos', JSON.stringify(tryOnPosition));
    } catch (e) {
      console.error(e);
    }
  }, [isVirtualTryOnActive, userTryOnPhoto, tryOnPosition]);

  // Persist Appointments
  useEffect(() => {
    try {
      localStorage.setItem('grand_opticals_appointments', JSON.stringify(appointments));
    } catch (e) {
      console.error(e);
    }
  }, [appointments]);

  // Persist Coupon
  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem('grand_opticals_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('grand_opticals_coupon');
      }
    } catch (e) {
      console.error(e);
    }
  }, [appliedCoupon]);

  // Trigger Toast
  const showToast = (message, title = "Grand Opticals Eye Clinic") => {
    setToast({ message, title, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Virtual Try-On Control Functions
  const activateVirtualTryOn = (photoDataUrl, customPos = null) => {
    const photo = photoDataUrl || DEFAULT_SAMPLE_FACE;
    setUserTryOnPhoto(photo);
    if (customPos) {
      setTryOnPosition(prev => ({ ...prev, ...customPos }));
    }
    setIsVirtualTryOnActive(true);
    setIsLiveCameraModalOpen(false);
    showToast("Virtual Try-On Mode Activated! All catalog frames fitted to your photo.", "3D Try-On Active");
  };

  const turnOffVirtualTryOn = () => {
    setIsVirtualTryOnActive(false);
    showToast("Virtual Try-On deactivated. Returned to studio product mode.", "Standard Catalog Mode");
  };

  const toggleVirtualTryOnMode = () => {
    if (isVirtualTryOnActive) {
      turnOffVirtualTryOn();
    } else {
      if (userTryOnPhoto) {
        setIsVirtualTryOnActive(true);
        showToast("Virtual Try-On Mode Restored! Wearing your saved photo.", "3D Try-On Active");
      } else {
        setIsLiveCameraModalOpen(true);
      }
    }
  };

  // Fine-tune glasses position on face
  const updateTryOnPosition = (newPos) => {
    setTryOnPosition(prev => ({ ...prev, ...newPos }));
  };

  const adjustTryOnY = (delta) => {
    setTryOnPosition(prev => ({
      ...prev,
      y: Math.min(65, Math.max(35, parseFloat((prev.y + delta).toFixed(1))))
    }));
  };

  const adjustTryOnScale = (delta) => {
    setTryOnPosition(prev => ({
      ...prev,
      scale: Math.min(70, Math.max(38, parseFloat((prev.scale + delta).toFixed(1))))
    }));
  };

  const resetTryOnPosition = () => {
    setTryOnPosition({ y: 50.5, scale: 52, x: 50 });
    showToast("Glasses alignment reset to default eye-line.", "Alignment Reset");
  };

  const openLiveCameraModal = () => {
    setIsLiveCameraModalOpen(true);
  };

  const closeLiveCameraModal = () => {
    setIsLiveCameraModalOpen(false);
  };

  const openAiTrendModal = () => {
    setIsAiTrendModalOpen(true);
  };

  const closeAiTrendModal = () => {
    setIsAiTrendModalOpen(false);
  };

  // Add to cart
  const addToCart = (product, options = {}) => {
    const selectedColor = options.color || product.colors?.[0]?.name || "Default";
    const selectedSize = options.size || product.frameSize || "Medium";
    const prescription = options.prescription || "Non-prescription (Plano / Fashion)";
    const customEngraving = options.customEngraving || "";
    const lensDetails = options.lensDetails || "";
    const quantity = options.quantity || 1;
    const finalPrice = options.customPrice || product.price;

    const cartKey = `${product.id}-${selectedColor}-${selectedSize}-${prescription}-${customEngraving}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartKey === cartKey);
      if (existing) {
        return prev.map(item =>
          item.cartKey === cartKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          cartKey,
          productId: product.id,
          name: product.name,
          subtitle: product.subtitle,
          category: product.category,
          price: finalPrice,
          image: options.image || product.image,
          selectedColor,
          selectedSize,
          prescription,
          customEngraving,
          lensDetails,
          quantity
        }
      ];
    });

    showToast(`Added ${product.name} to your shopping bag.`);
    setIsCartOpen(true);
  };

  // Remove from cart
  const removeFromCart = (cartKey) => {
    setCart(prev => prev.filter(item => item.cartKey !== cartKey));
    showToast("Item removed from bag.");
  };

  // Update quantity
  const updateQuantity = (cartKey, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartKey);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.cartKey === cartKey ? { ...item, quantity: newQty } : item))
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Toggle Wishlist
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const product = PRODUCTS.find(p => p.id === productId);
      if (exists) {
        showToast(`Removed ${product ? product.name : 'item'} from wishlist.`);
        return prev.filter(id => id !== productId);
      } else {
        showToast(`Saved ${product ? product.name : 'item'} to your wishlist.`);
        return [...prev, productId];
      }
    });
  };

  // Add Appointment
  const bookAppointment = (appointmentData) => {
    const booking = {
      ...appointmentData,
      id: `LUM-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString()
    };
    setAppointments(prev => [booking, ...prev]);
    showToast(`Appointment confirmed: #${booking.id}`);
    return booking;
  };

  // Bespoke Customizer Helpers
  const openCustomizer = (product) => {
    setCustomizerProduct(product || PRODUCTS[0]);
  };

  const closeCustomizer = () => {
    setCustomizerProduct(null);
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 1999;
  const isEligibleForAutoFreeShip = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0;

  // Coupon Engine
  const applyCoupon = (code) => {
    if (!code) return { success: false, message: 'Please enter a coupon code.' };
    const normalized = code.trim().toUpperCase();
    const match = AVAILABLE_COUPONS.find(c => c.code === normalized);

    if (!match) {
      showToast(`Coupon "${normalized}" is not recognized.`);
      return { success: false, message: 'Invalid coupon code.' };
    }

    if (match.code === 'VIP20' && cartSubtotal < 3000) {
      showToast('VIP20 requires a minimum order of ₹3,000.');
      return { success: false, message: 'Minimum ₹3,000 order required.' };
    }

    setAppliedCoupon(match);
    showToast(`Promo code ${match.code} applied! (${match.label})`);
    return { success: true, coupon: match };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed.');
  };

  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon && cartSubtotal > 0) {
    if (appliedCoupon.type === 'percent') {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === 'flat') {
      discountAmount = Math.min(cartSubtotal, appliedCoupon.value);
    }
  }

  // Shipping calculation
  const hasShippingCoupon = appliedCoupon?.type === 'shipping';
  const isFreeShipping = isEligibleForAutoFreeShip || hasShippingCoupon;
  const shippingCost = isFreeShipping ? 0 : 199;

  // Final Total
  const cartTotal = cartSubtotal > 0 ? Math.max(0, cartSubtotal - discountAmount + shippingCost) : 0;
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        products: PRODUCTS,
        cart,
        wishlist,
        quickViewProduct,
        setQuickViewProduct,
        tryOnProduct,
        setTryOnProduct,
        customizerProduct,
        openCustomizer,
        closeCustomizer,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        toast,
        showToast,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        appointments,
        bookAppointment,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        availableCoupons: AVAILABLE_COUPONS,
        discountAmount,
        cartSubtotal,
        freeShippingThreshold,
        isFreeShipping,
        shippingCost,
        cartTotal,
        cartItemCount,
        // Virtual Try-On
        isVirtualTryOnActive,
        userTryOnPhoto,
        tryOnPosition,
        updateTryOnPosition,
        adjustTryOnY,
        adjustTryOnScale,
        resetTryOnPosition,
        activateVirtualTryOn,
        turnOffVirtualTryOn,
        toggleVirtualTryOnMode,
        isLiveCameraModalOpen,
        openLiveCameraModal,
        closeLiveCameraModal,
        // AI Daily Trend
        isAiTrendModalOpen,
        openAiTrendModal,
        closeAiTrendModal
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
