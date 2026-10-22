import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, Heart, ShoppingBag, Menu, X, Phone, MapPin, 
  Calendar, ChevronDown, ArrowRight, ShieldCheck, Truck, Clock, Sparkles,
  Glasses
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import GrandOpticalsLogo from './GrandOpticalsLogo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  
  const { cartItemCount, cartSubtotal, wishlist, setIsCartOpen, setIsSearchOpen } = useShop();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname, location.search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchInput.trim())}`);
    } else {
      setIsSearchOpen(true);
    }
  };

  // Lenskart-style Category Tabs
  const categoryTabs = [
    {
      id: 'eyeglasses',
      label: 'Eyeglasses',
      path: '/shop?category=Eyeglasses',
      badge: 'Popular',
      subCategories: [
        { title: 'Men', path: '/shop?category=Eyeglasses&gender=Men' },
        { title: 'Women', path: '/shop?category=Eyeglasses&gender=Women' },
        { title: 'Kids Glasses', path: '/shop?category=Eyeglasses&gender=Kids' },
        { title: 'Zero Power Computer Glasses', path: '/shop?category=Eyeglasses&style=Minimal' },
        { title: 'Featherlight Titanium', path: '/shop?category=Eyeglasses&material=Titanium' },
        { title: 'Rimless & Semi-Rimless', path: '/shop?category=Eyeglasses&rim=Rimless' }
      ]
    },
    {
      id: 'screen-glasses',
      label: 'Screen Glasses',
      path: '/shop?category=Eyeglasses&style=Minimal',
      badge: 'Blue Cut',
      subCategories: [
        { title: 'Anti-Glare Computer Glasses', path: '/shop?category=Eyeglasses' },
        { title: 'Zero Power Digital Protection', path: '/shop?category=Eyeglasses' },
        { title: 'Blue-Shield Kids Glasses', path: '/shop?category=Eyeglasses' }
      ]
    },
    {
      id: 'sunglasses',
      label: 'Sunglasses',
      path: '/shop?category=Sunglasses',
      subCategories: [
        { title: 'Polarized Sunglasses', path: '/shop?category=Sunglasses' },
        { title: 'Power / Prescription Sunglasses', path: '/shop?category=Sunglasses' },
        { title: 'Aviator & Navigator', path: '/shop?category=Sunglasses' },
        { title: 'Wayfarer Classics', path: '/shop?category=Sunglasses' },
        { title: '100% UV Protection Sunwear', path: '/shop?category=Sunglasses' }
      ]
    },
    {
      id: 'contact-lenses',
      label: 'Contact Lenses',
      path: '/shop?category=Contact+Lenses',
      subCategories: [
        { title: 'Daily Disposables', path: '/shop?category=Contact+Lenses' },
        { title: 'Monthly Breathable Hydration', path: '/shop?category=Contact+Lenses' },
        { title: 'Toric / Astigmatism Lenses', path: '/shop?category=Contact+Lenses' },
        { title: 'Color Cosmetic Lenses', path: '/shop?category=Contact+Lenses' }
      ]
    },
    {
      id: 'progressives',
      label: 'Progressive Lenses',
      path: '/shop?category=Eyeglasses',
      badge: 'Advanced',
      subCategories: [
        { title: 'Wide-Corridor HD Progressives', path: '/shop?category=Eyeglasses' },
        { title: 'Bifocal Reading Glasses', path: '/shop?category=Eyeglasses' },
        { title: 'Office & Computer Multifocals', path: '/shop?category=Eyeglasses' }
      ]
    },
    {
      id: 'clinic',
      label: 'Clinical Eye Care',
      path: '/eye-care',
      subCategories: [
        { title: 'Comprehensive Eye Examination', path: '/book-appointment' },
        { title: 'Digital Retinal Checkup', path: '/eye-care' },
        { title: 'Store Locator & Flagships', path: '/eye-care' },
        { title: 'Ultrasonic Frame Cleansing', path: '/eye-care' }
      ]
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white transition-all shadow-sm">
      {/* 1. TOP UTILITY STRIP (Lenskart-style) */}
      <div className="bg-[#072F5F] text-[#E0F2FE] text-[11px] font-medium py-1.5 px-4 sm:px-8 border-b border-[#0B4D8C]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-white tracking-wider flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] mr-2 animate-ping" />
              Do More, Be More · Grand Opticals Eye Clinic
            </span>
            <span className="opacity-40 hidden md:inline">|</span>
            <span className="text-[#BAE6FD] hidden md:inline">
              Better Vision | Brighter Tomorrow
            </span>
          </div>

          <div className="flex items-center space-x-4 sm:space-x-6">
            <a 
              href="tel:+919840012345" 
              className="flex items-center hover:text-white transition-colors text-white/90"
            >
              <Phone className="w-3 h-3 mr-1 text-[#38BDF8]" />
              <span className="font-semibold">+91 98400 12345</span>
            </a>
            <Link 
              to="/eye-care" 
              className="hidden sm:flex items-center hover:text-white transition-colors"
            >
              <MapPin className="w-3 h-3 mr-1 text-[#38BDF8]" />
              <span>Find A Store</span>
            </Link>
            <Link 
              to="/book-appointment" 
              className="flex items-center text-[#38BDF8] hover:text-white font-bold transition-colors"
            >
              <Calendar className="w-3 h-3 mr-1" />
              <span>Book Free Eye Test</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER ROW: Logo, Centered Search, Utilities */}
      <div className="border-b border-[#E2E8F0] py-3 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#0F172A] hover:text-[#0B4D8C] transition-colors rounded-lg"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link to="/" className="flex items-center shrink-0" title="Grand Opticals Eye Clinic">
              <GrandOpticalsLogo variant="compact" size="md" />
            </Link>
          </div>

          {/* Center: Lenskart-style Prominent Search Bar */}
          <div className="flex-1 max-w-2xl hidden md:block mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="What are you looking for? (e.g. Eyeglasses, Anti-glare, Round, Titanium...)"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onClick={() => setIsSearchOpen(true)}
                className="w-full bg-[#F8FAFC] hover:bg-white focus:bg-white border border-[#CBD5E1] focus:border-[#0284C7] rounded-full py-2.5 pl-11 pr-24 text-xs text-[#0F172A] placeholder-[#94A3B8] shadow-inner focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 transition-all cursor-pointer"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#0B4D8C] hover:bg-[#0284C7] text-white text-[11px] font-bold uppercase tracking-wider rounded-full transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right: Store, Wishlist, Cart & Eye Exam CTA */}
          <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
            {/* Search Icon for Mobile */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 text-[#334155] hover:text-[#0B4D8C] rounded-lg cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-[#334155] hover:text-[#0B4D8C] hover:bg-[#F0F7FF] rounded-xl transition-colors shrink-0 flex items-center space-x-1"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[2]" />
              <span className="hidden xl:inline text-xs font-semibold text-[#475569]">Wishlist</span>
              {wishlist.length > 0 && (
                <span className="absolute 0 top-1 right-1 bg-[#0284C7] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Bag / Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#334155] hover:text-[#0B4D8C] hover:bg-[#F0F7FF] rounded-xl transition-colors shrink-0 flex items-center space-x-1.5 cursor-pointer"
              title="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 stroke-[2]" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#0B4D8C] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <div className="hidden xl:flex flex-col text-left leading-none">
                <span className="text-[10px] text-[#64748B] uppercase font-semibold">Cart</span>
                <span className="text-xs font-bold text-[#0B4D8C]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
            </button>

            {/* Book Free Eye Test Button (Lenskart Highlight CTA) */}
            <Link
              to="/book-appointment"
              className="hidden lg:inline-flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-[#0B4D8C] to-[#0284C7] hover:from-[#072F5F] hover:to-[#0B4D8C] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-cyan-500/20 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Book Eye Test</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. LENSKART-STYLE MEGA CATEGORY TABS (Desktop) */}
      <nav className="hidden lg:block bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-bold tracking-wider uppercase text-[#1E293B]">
          <div className="flex items-center space-x-1 xl:space-x-2">
            {categoryTabs.map((tab) => (
              <div
                key={tab.id}
                className="relative"
                onMouseEnter={() => setActiveDropdown(tab.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={tab.path}
                  className={`flex items-center space-x-1.5 py-3 px-3 xl:px-4 transition-all duration-200 border-b-2 ${
                    activeDropdown === tab.id || location.pathname + location.search === tab.path
                      ? 'text-[#0B4D8C] border-[#0B4D8C] bg-white'
                      : 'text-[#334155] border-transparent hover:text-[#0B4D8C] hover:bg-white/80'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.2 bg-[#E0F2FE] text-[#0284C7] rounded-full border border-[#BAE6FD]">
                      {tab.badge}
                    </span>
                  )}
                  {tab.subCategories && (
                    <ChevronDown className={`w-3 h-3 text-[#64748B] transition-transform ${activeDropdown === tab.id ? 'rotate-180' : ''}`} />
                  )}
                </Link>

                {/* Dropdown Menu on Hover */}
                {tab.subCategories && activeDropdown === tab.id && (
                  <div className="absolute top-full left-0 w-64 bg-white border border-[#E2E8F0] shadow-2xl rounded-b-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="space-y-1">
                      {tab.subCategories.map((sub) => (
                        <Link
                          key={sub.title}
                          to={sub.path}
                          className="flex items-center justify-between px-3 py-2 text-xs font-semibold normal-case text-[#475569] hover:text-[#0B4D8C] hover:bg-[#F0F7FF] rounded-lg transition-colors"
                        >
                          <span>{sub.title}</span>
                          <ArrowRight className="w-3 h-3 text-[#0284C7] opacity-60" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Perks Strip on Right */}
          <div className="flex items-center space-x-4 text-[11px] font-semibold text-[#0B4D8C]">
            <Link 
              to="/book-appointment" 
              className="px-3 py-1 bg-[#E0F2FE] text-[#0B4D8C] hover:bg-[#0B4D8C] hover:text-white rounded-full border border-[#BAE6FD] transition-colors flex items-center space-x-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] animate-pulse" />
              <span>In-Clinic Free Eye Test</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* 4. MOBILE NAVIGATION DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-[#072F5F]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl z-50 flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
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

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="mt-4 relative">
                <input
                  type="text"
                  placeholder="Search frames, lenses, clinic..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl py-2 pl-9 pr-4 text-xs text-[#0F172A]"
                />
                <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
              </form>

              {/* Mobile Category Links */}
              <div className="py-4 space-y-1">
                {categoryTabs.map((tab) => (
                  <div key={tab.id} className="border-b border-[#F1F5F9] pb-1">
                    <Link
                      to={tab.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between py-2 px-2 text-sm font-bold text-[#0F172A] hover:text-[#0B4D8C]"
                    >
                      <span className="flex items-center space-x-2">
                        <span>{tab.label}</span>
                        {tab.badge && (
                          <span className="text-[9px] px-1.5 py-0.2 bg-[#E0F2FE] text-[#0284C7] rounded font-bold">
                            {tab.badge}
                          </span>
                        )}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#94A3B8]" />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Book Eye Test CTA in Drawer */}
              <div className="mt-2 p-3 bg-[#F0F7FF] rounded-2xl border border-[#BAE6FD] space-y-2">
                <Link
                  to="/book-appointment"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between p-3 bg-[#0B4D8C] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md"
                >
                  <span className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-[#38BDF8]" />
                    <span>Book In-Store Eye Test</span>
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="text-[11px] text-[#64748B] text-center pt-1">
                  100% Free Computerized Refraction Check
                </div>
              </div>
            </div>

            {/* Bottom Support */}
            <div className="pt-4 border-t border-[#E2E8F0] text-xs text-[#64748B] space-y-2">
              <a href="tel:+919840012345" className="flex items-center space-x-2 text-[#0B4D8C] font-bold">
                <Phone className="w-4 h-4 text-[#0284C7]" />
                <span>Call Helpline: +91 98400 12345</span>
              </a>
              <p className="text-[10px] text-[#94A3B8]">
                Grand Opticals Eye Clinic · Better Vision | Brighter Tomorrow
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
