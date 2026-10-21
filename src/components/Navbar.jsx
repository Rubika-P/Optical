import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles, Eye, User, ChevronDown, ArrowRight, Camera } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsHovered, setIsCollectionsHovered] = useState(false);
  const { cartItemCount, wishlist, setIsCartOpen, setIsSearchOpen, setTryOnProduct, openCustomizer } = useShop();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Eyeglasses', path: '/shop?category=Eyeglasses' },
    { label: 'Sunglasses', path: '/shop?category=Sunglasses' },
    { label: 'Contact Lenses', path: '/shop?category=Contact+Lenses' },
    { 
      label: 'Collections', 
      path: '/shop', 
      hasDropdown: true,
      subLinks: [
        { label: 'All Frames', path: '/shop' },
        { label: 'The Edit 2026', path: '/shop?filter=featured' },
        { label: 'Aerospace Titanium Line', path: '/shop?style=Minimal' },
        { label: 'Bio-Acetate Sculptures', path: '/shop?style=Bold' },
        { label: 'New Arrivals', path: '/shop?filter=new' }
      ]
    },
    { label: 'Face Finder', path: '/face-finder', highlight: true },
    { label: 'Virtual Try-On', path: '/virtual-try-on', badge: 'AR' },
    { label: 'Eye Care', path: '/eye-care' }
  ];

  return (
    <>
      {/* Top Banner Ticker with Promo Code */}
      <div className="bg-[#141414] text-[#E7DFD5] text-[11px] font-medium tracking-widest uppercase py-2 px-4 text-center flex items-center justify-between sm:justify-center space-x-3 border-b border-[#262626]">
        <span className="flex items-center text-[#C5A880]">
          <Sparkles className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
          <span>VIP PRIVILEGE: 15% OFF WITH CODE <strong className="text-white bg-[#C5A880]/30 px-1.5 py-0.5 ml-1 font-mono">LUMERA15</strong></span>
        </span>
        <span className="hidden md:inline opacity-70">· Insured Express Delivery across India</span>
        <button
          onClick={() => openCustomizer()}
          className="hidden sm:inline-flex items-center text-[#C5A880] hover:text-white transition-colors ml-2 font-bold cursor-pointer"
        >
          360° Customizer <ArrowRight className="w-3 h-3 ml-1" />
        </button>
      </div>

      {/* Main Sticky Glass Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-sm border-b border-[#EBE5DC]/80 py-3'
            : 'bg-[#FBF9F5]/95 border-b border-[#EBE5DC]/40 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile Toggle & Desktop Logo */}
          <div className="flex items-center space-x-3 flex-shrink-0 mr-4 xl:mr-8">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#171717] hover:text-[#C5A880] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo */}
            <Link to="/" className="flex flex-col group text-left flex-shrink-0">
              <span className="font-display text-xl sm:text-2xl xl:text-3xl font-semibold tracking-[0.25em] text-[#141414] group-hover:text-[#9F8259] transition-colors whitespace-nowrap">
                LUMÉRA
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.35em] text-[#6B655F] uppercase font-medium -mt-1 whitespace-nowrap">
                Haute Vision
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 text-xs xl:text-[13px] font-medium tracking-wider uppercase text-[#2B2B2B]">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative flex-shrink-0"
                onMouseEnter={() => link.hasDropdown && setIsCollectionsHovered(true)}
                onMouseLeave={() => link.hasDropdown && setIsCollectionsHovered(false)}
              >
                <Link
                  to={link.path}
                  className={`flex items-center space-x-1 py-1 transition-colors nav-link-hover whitespace-nowrap ${
                    location.pathname + location.search === link.path
                      ? 'text-[#171717] font-semibold'
                      : 'text-[#4A4744] hover:text-[#171717]'
                  }`}
                >
                  {link.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] mr-1 animate-pulse flex-shrink-0" />
                  )}
                  <span className="whitespace-nowrap">{link.label}</span>
                  {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-60 ml-0.5 flex-shrink-0" />}
                  {link.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#C5A880]/20 text-[#8B6B3F] rounded-full border border-[#C5A880]/40 whitespace-nowrap flex-shrink-0">
                      {link.badge}
                    </span>
                  )}
                </Link>

                {/* Dropdown Menu for Collections */}
                {link.hasDropdown && isCollectionsHovered && (
                  <div className="absolute top-full left-0 pt-2 w-56 animate-in fade-in duration-200 z-50">
                    <div className="bg-[#FFFFFF] border border-[#EBE5DC] shadow-xl p-3 rounded-none flex flex-col space-y-1">
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.path}
                          className="px-3 py-2 text-xs uppercase tracking-wider text-[#4A4744] hover:text-[#171717] hover:bg-[#F7F4EE] transition-colors flex items-center justify-between whitespace-nowrap"
                        >
                          <span>{sub.label}</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 flex-shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right: Actions (Atelier, Search, Wishlist, Cart) */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 flex-shrink-0">
            {/* 360 Atelier Studio Button */}
            <button
              onClick={() => openCustomizer()}
              className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#171717] text-[#171717] hover:text-[#C5A880] border border-[#DCD3C5] hover:border-[#171717] text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
              title="360° Bespoke Lens & Frame Customizer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>360° Atelier</span>
            </button>

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-[#2B2B2B] hover:text-[#C5A880] transition-colors flex-shrink-0 cursor-pointer"
              title="Search eyewear catalog"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-1.5 text-[#2B2B2B] hover:text-[#C5A880] transition-colors flex-shrink-0"
              title="View saved wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#171717] text-[#FFFFFF] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 text-[#2B2B2B] hover:text-[#C5A880] transition-colors flex items-center flex-shrink-0"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C5A880] text-[#141414] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FBF9F5] shadow-2xl z-50 flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              {/* Top Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#EBE5DC]">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="font-display text-2xl font-semibold tracking-[0.25em] text-[#141414]">
                    LUMÉRA
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[#171717] hover:text-[#C5A880]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Links */}
              <div className="py-6 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className="text-base font-medium tracking-widest uppercase text-[#171717] hover:text-[#C5A880] py-2 flex items-center justify-between border-b border-[#F0EBE1]"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#A89F91]" />
                  </Link>
                ))}
              </div>

              {/* Features shortcuts */}
              <div className="mt-2 p-3 bg-[#F2EDE4] space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setTryOnProduct(PRODUCTS[0]);
                  }}
                  className="w-full flex items-center justify-between p-3 bg-[#171717] text-[#C5A880] text-xs font-semibold uppercase tracking-widest hover:bg-black transition-colors"
                >
                  <span className="flex items-center space-x-2">
                    <Camera className="w-4 h-4 text-[#C5A880]" />
                    <span>Launch AR Try-On</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <Link
                  to="/virtual-try-on"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 text-xs text-[#171717] font-medium p-1 hover:text-[#C5A880]"
                >
                  <Eye className="w-4 h-4 text-[#C5A880]" />
                  <span>Virtual Try-On Guide</span>
                </Link>
                <Link
                  to="/book-appointment"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 text-xs text-[#171717] font-medium p-1 hover:text-[#C5A880]"
                >
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                  <span>Book In-Store Eye Test</span>
                </Link>
              </div>
            </div>

            {/* Bottom info */}
            <div className="pt-6 border-t border-[#EBE5DC] text-xs text-[#6B655F] space-y-2">
              <p>Customer Concierge: +1 (800) 586-3721</p>
              <p>Email: concierge@lumera-eyewear.com</p>
              <p className="text-[10px] tracking-wider text-[#9E968E] uppercase">
                © 2026 LUMÉRA Haute Optique
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
