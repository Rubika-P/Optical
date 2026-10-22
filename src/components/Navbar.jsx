import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles, Eye, User, ChevronDown, ArrowRight, Camera, Calendar, Phone } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import GrandOpticalsLogo from './GrandOpticalsLogo';

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
        { label: 'All Designer Frames', path: '/shop' },
        { label: 'Clinical Best-Sellers', path: '/shop?filter=featured' },
        { label: 'Ultralight Titanium Series', path: '/shop?style=Minimal' },
        { label: 'High-Density Bio-Acetate', path: '/shop?style=Bold' },
        { label: '2026 New Arrivals', path: '/shop?filter=new' }
      ]
    },
    { label: 'Face Finder', path: '/face-finder', highlight: true },
    { label: 'Virtual Try-On', path: '/virtual-try-on', badge: 'AR' },
    { label: 'Eye Care & Clinic', path: '/eye-care' }
  ];

  return (
    <>
      {/* Top Banner Ticker with Clinic Slogan & Privilege */}
      <div className="bg-[#072F5F] text-[#E0F2FE] text-[11px] font-medium tracking-wider uppercase py-2 px-4 text-center flex items-center justify-between sm:justify-center space-x-3 border-b border-[#0B4D8C]">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping flex-shrink-0" />
          <span className="font-semibold text-white tracking-widest hidden sm:inline">
            GRAND OPTICALS EYE CLINIC
          </span>
          <span className="opacity-60 hidden sm:inline">|</span>
          <span className="text-[#BAE6FD]">
            Better Vision | Brighter Tomorrow
          </span>
          <span className="hidden md:inline text-white/90">
            — 15% OFF WITH CODE <strong className="text-white bg-[#0284C7] px-1.5 py-0.5 rounded font-mono text-[10px]">GRAND15</strong>
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link
            to="/book-appointment"
            className="inline-flex items-center text-[#38BDF8] hover:text-white transition-colors text-[10px] sm:text-[11px] font-bold cursor-pointer underline underline-offset-2"
          >
            <Calendar className="w-3 h-3 mr-1" />
            Book Free Eye Exam
          </Link>
          <span className="text-white/30 hidden md:inline">|</span>
          <button
            onClick={() => openCustomizer()}
            className="hidden lg:inline-flex items-center text-[#BAE6FD] hover:text-white transition-colors text-[11px] font-bold cursor-pointer"
          >
            <Sparkles className="w-3 h-3 mr-1 text-[#38BDF8]" />
            360° Studio <ArrowRight className="w-3 h-3 ml-1" />
          </button>
        </div>
      </div>

      {/* Main Sticky Glass Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-md border-b border-[#E2E8F0] py-2.5'
            : 'bg-[#FFFFFF]/95 border-b border-[#E2E8F0]/80 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center space-x-3 flex-shrink-0 mr-4 xl:mr-8">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#0F172A] hover:text-[#0284C7] transition-colors rounded-md"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo Component */}
            <Link to="/" className="flex items-center group flex-shrink-0" title="Grand Opticals Eye Clinic">
              <GrandOpticalsLogo variant="compact" size="md" />
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 text-xs xl:text-[13px] font-semibold tracking-wider uppercase text-[#334155]">
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
                      ? 'text-[#0B4D8C] font-bold'
                      : 'text-[#475569] hover:text-[#0B4D8C]'
                  }`}
                >
                  {link.highlight && (
                    <span className="w-2 h-2 rounded-full bg-[#0284C7] mr-1 animate-pulse flex-shrink-0" />
                  )}
                  <span className="whitespace-nowrap">{link.label}</span>
                  {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-60 ml-0.5 flex-shrink-0" />}
                  {link.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#E0F2FE] text-[#0284C7] rounded-full border border-[#BAE6FD] whitespace-nowrap flex-shrink-0">
                      {link.badge}
                    </span>
                  )}
                </Link>

                {/* Dropdown Menu for Collections */}
                {link.hasDropdown && isCollectionsHovered && (
                  <div className="absolute top-full left-0 pt-2 w-60 animate-in fade-in duration-200 z-50">
                    <div className="bg-[#FFFFFF] border border-[#E2E8F0] shadow-2xl rounded-xl p-2.5 flex flex-col space-y-1">
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.path}
                          className="px-3 py-2 text-xs uppercase font-medium tracking-wider text-[#475569] hover:text-[#0B4D8C] hover:bg-[#F0F7FF] rounded-lg transition-colors flex items-center justify-between whitespace-nowrap"
                        >
                          <span>{sub.label}</span>
                          <ArrowRight className="w-3 h-3 text-[#0284C7] opacity-70 flex-shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right: Actions (Book Exam, Atelier, Search, Wishlist, Cart) */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            {/* Book Appointment CTA */}
            <Link
              to="/book-appointment"
              className="hidden md:inline-flex items-center space-x-1.5 px-3.5 py-2 bg-[#0B4D8C] hover:bg-[#072F5F] text-white text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Book Eye Exam</span>
            </Link>

            {/* 360 Customizer Atelier */}
            <button
              onClick={() => openCustomizer()}
              className="hidden xl:flex items-center space-x-1.5 px-3 py-1.5 bg-[#F0F7FF] hover:bg-[#E0F2FE] text-[#0B4D8C] border border-[#BAE6FD] text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
              title="360° Customizer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>360° Custom</span>
            </button>

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#334155] hover:text-[#0B4D8C] hover:bg-[#F1F5F9] rounded-lg transition-colors flex-shrink-0 cursor-pointer"
              title="Search eyewear catalog"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-[#334155] hover:text-[#0B4D8C] hover:bg-[#F1F5F9] rounded-lg transition-colors flex-shrink-0"
              title="View saved wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
              {wishlist.length > 0 && (
                <span className="absolute 0 top-1 right-1 bg-[#0284C7] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#334155] hover:text-[#0B4D8C] hover:bg-[#F1F5F9] rounded-lg transition-colors flex items-center flex-shrink-0 cursor-pointer"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
              {cartItemCount > 0 && (
                <span className="absolute 0 top-1 right-1 bg-[#0B4D8C] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
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
            className="fixed inset-0 bg-[#072F5F]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FFFFFF] shadow-2xl z-50 flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              {/* Top Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#E2E8F0]">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <GrandOpticalsLogo variant="compact" size="sm" />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[#64748B] hover:text-[#0B4D8C]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-4 flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className="text-sm font-semibold tracking-wider uppercase text-[#1E293B] hover:text-[#0B4D8C] hover:bg-[#F0F7FF] px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#94A3B8]" />
                  </Link>
                ))}
              </div>

              {/* Clinic Shortcuts */}
              <div className="mt-4 p-3 bg-[#F0F7FF] rounded-xl border border-[#BAE6FD] space-y-2.5">
                <Link
                  to="/book-appointment"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between p-3 bg-[#0B4D8C] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm"
                >
                  <span className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-[#38BDF8]" />
                    <span>Book In-Clinic Eye Test</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setTryOnProduct(PRODUCTS[0]);
                  }}
                  className="w-full flex items-center justify-between p-2.5 bg-white border border-[#BAE6FD] text-[#0B4D8C] text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#E0F2FE] transition-colors cursor-pointer"
                >
                  <span className="flex items-center space-x-2">
                    <Camera className="w-4 h-4 text-[#0284C7]" />
                    <span>Launch 3D AR Try-On</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bottom info */}
            <div className="pt-4 border-t border-[#E2E8F0] text-xs text-[#64748B] space-y-1.5">
              <div className="flex items-center space-x-2 text-[#0B4D8C] font-semibold">
                <Phone className="w-3.5 h-3.5" />
                <span>Clinic Desk: +91 (800) 246-4726</span>
              </div>
              <p className="text-[11px] text-[#475569]">Grand Opticals Eye Clinic & Boutique</p>
              <p className="text-[10px] tracking-wider text-[#94A3B8] uppercase">
                Better Vision | Brighter Tomorrow
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
