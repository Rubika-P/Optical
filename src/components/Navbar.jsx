import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, Heart, ShoppingBag, Menu, X, Phone, MapPin, 
  Calendar, ChevronDown, ArrowRight, Sparkles, Camera
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import GrandOpticalsLogo from './GrandOpticalsLogo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  
  const { 
    cartItemCount, 
    cartSubtotal, 
    wishlist, 
    setIsCartOpen, 
    setIsSearchOpen,
    isVirtualTryOnActive,
    toggleVirtualTryOnMode,
    openAiTrendModal
  } = useShop();

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

  // Clean, Trendy, Minimalist Navigation Items
  const categoryTabs = [
    {
      id: 'eyeglasses',
      label: 'Eyeglasses',
      path: '/shop?category=Eyeglasses',
      subCategories: [
        { title: 'Men’s Collection', path: '/shop?category=Eyeglasses&gender=Men' },
        { title: 'Women’s Collection', path: '/shop?category=Eyeglasses&gender=Women' },
        { title: 'Unisex Minimalist', path: '/shop?category=Eyeglasses&style=Minimal' },
        { title: 'Japanese Titanium', path: '/shop?category=Eyeglasses&material=Titanium' },
        { title: 'Classic Acetate Rims', path: '/shop?category=Eyeglasses&material=Acetate' }
      ]
    },
    {
      id: 'sunglasses',
      label: 'Sunglasses',
      path: '/shop?category=Sunglasses',
      subCategories: [
        { title: 'Polarized UV400 Sunwear', path: '/shop?category=Sunglasses' },
        { title: 'Aviators & Navigators', path: '/shop?category=Sunglasses&shape=Aviator' },
        { title: 'Geometric & Square', path: '/shop?category=Sunglasses&shape=Square' },
        { title: 'Cat-Eye Haute Couture', path: '/shop?category=Sunglasses&shape=Cat+Eye' }
      ]
    },
    {
      id: 'screen-glasses',
      label: 'Screen Glasses',
      path: '/shop?category=Eyeglasses&style=Minimal',
      subCategories: [
        { title: 'Blue-Shield Computer Glasses', path: '/shop?category=Eyeglasses&style=Minimal' },
        { title: 'Zero Power Digital Eyewear', path: '/shop?category=Eyeglasses' },
        { title: 'Anti-Fatigue Gaming Frames', path: '/shop?category=Eyeglasses' }
      ]
    },
    {
      id: 'contact-lenses',
      label: 'Contact Lenses',
      path: '/shop?category=Contact+Lenses',
      subCategories: [
        { title: 'Aqua 1-Day Disposables', path: '/shop?category=Contact+Lenses' },
        { title: 'Air-Moist Monthly Silicones', path: '/shop?category=Contact+Lenses' },
        { title: 'Iris Natural Blend Cosmetic', path: '/shop?category=Contact+Lenses' },
        { title: 'Lens Solutions & Cases', path: '/shop?category=Contact+Lenses' }
      ]
    },
    {
      id: 'progressives',
      label: 'Progressives',
      path: '/shop?category=Eyeglasses',
      subCategories: [
        { title: 'Wide-Corridor HD Multifocals', path: '/shop?category=Eyeglasses' },
        { title: 'Office & Reading Ergonomics', path: '/shop?category=Eyeglasses' }
      ]
    },
    {
      id: 'clinic',
      label: 'Clinical Care',
      path: '/eye-care',
      subCategories: [
        { title: 'Comprehensive Eye Examination', path: '/book-appointment' },
        { title: 'Digital Retinal Checkup', path: '/eye-care' },
        { title: 'Store Locator & Flagships', path: '/eye-care' }
      ]
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white transition-all shadow-sm">
      {/* 1. TOP UTILITY STRIP */}
      <div className="bg-[#072F5F] text-[#E0F2FE] text-[11px] font-medium py-1.5 px-4 sm:px-8 border-b border-[#0B4D8C]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-white tracking-wider flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] mr-2 animate-ping" />
              Grand Opticals Eye Clinic
            </span>
            <span className="opacity-40 hidden md:inline">|</span>
            <span className="text-[#BAE6FD] hidden md:inline">
              Better Vision, Brighter Tomorrow
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
              <span>Stores</span>
            </Link>
            <Link 
              to="/book-appointment" 
              className="flex items-center text-[#38BDF8] hover:text-white font-bold transition-colors"
            >
              <Calendar className="w-3 h-3 mr-1" />
              <span>Book Eye Test</span>
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

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search eyeglasses, sunglasses, contact lenses, materials..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onClick={() => setIsSearchOpen(true)}
                className="w-full bg-[#F8FAFC] hover:bg-white focus:bg-white border border-[#CBD5E1] focus:border-[#0284C7] rounded-full py-2 pl-10 pr-24 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 transition-all cursor-pointer"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 px-3.5 py-1.5 bg-[#0B4D8C] hover:bg-[#0284C7] text-white text-[11px] font-bold uppercase tracking-wider rounded-full transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right: Wishlist, Cart & Eye Exam CTA */}
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
              <Heart className="w-5 h-5 stroke-[1.8]" />
              <span className="hidden xl:inline text-xs font-semibold text-[#475569]">Wishlist</span>
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#0284C7] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
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
                <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
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

            {/* Book Free Eye Test Button */}
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

      {/* 3. CLEAN, MODERN & TRENDY CATEGORY NAVIGATION (Desktop) */}
      <nav className="hidden lg:block bg-[#FAFCFF] border-b border-[#E2E8F0] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-semibold text-[#334155]">
          {/* Main Clean Navigation Tabs */}
          <div className="flex items-center space-x-1 xl:space-x-2">
            {categoryTabs.map((tab) => (
              <div
                key={tab.id}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(tab.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={tab.path}
                  className={`flex items-center space-x-1.5 py-3 px-3.5 transition-all duration-200 border-b-2 font-medium tracking-wide ${
                    activeDropdown === tab.id || location.pathname + location.search === tab.path
                      ? 'text-[#0B4D8C] border-[#0B4D8C] bg-white font-bold'
                      : 'text-[#475569] border-transparent hover:text-[#0B4D8C] hover:bg-white/70'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.subCategories && (
                    <ChevronDown className={`w-3 h-3 text-[#94A3B8] transition-transform duration-200 ${
                      activeDropdown === tab.id ? 'rotate-180 text-[#0B4D8C]' : ''
                    }`} />
                  )}
                </Link>

                {/* Dropdown Menu on Hover */}
                {tab.subCategories && activeDropdown === tab.id && (
                  <div className="absolute top-full left-0 w-64 bg-white border border-[#E2E8F0] shadow-xl rounded-b-2xl p-2.5 z-50 animate-in fade-in zoom-in-98 duration-150">
                    <div className="space-y-0.5">
                      {tab.subCategories.map((sub) => (
                        <Link
                          key={sub.title}
                          to={sub.path}
                          className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#475569] hover:text-[#0B4D8C] hover:bg-[#F0F7FF] rounded-lg transition-colors"
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

          {/* Right Trendy Feature Actions: AI Trend Gif & 3D Virtual Try-On */}
          <div className="flex items-center space-x-2 py-2">
            {/* AI Daily Trend Button */}
            <button
              onClick={openAiTrendModal}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#F0FDF4] to-[#E0F2FE] hover:from-[#DCFCE7] hover:to-[#BAE6FD] text-[#0369A1] border border-[#BAE6FD] font-bold text-[11px] tracking-wide transition-all shadow-sm cursor-pointer"
              title="See today's AI Generated Fashion Trend GIF"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0284C7] animate-pulse" />
              <span>AI Trend GIF</span>
            </button>

            {/* 3D Virtual Try-On Button */}
            <button
              onClick={toggleVirtualTryOnMode}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full font-bold text-[11px] tracking-wide transition-all shadow-sm cursor-pointer border ${
                isVirtualTryOnActive
                  ? 'bg-[#0284C7] text-white border-[#0B4D8C] shadow-cyan-500/20'
                  : 'bg-white hover:bg-[#F8FAFC] text-[#0F172A] border-[#CBD5E1]'
              }`}
              title="Fit glasses live onto your camera photo"
            >
              <Camera className={`w-3.5 h-3.5 ${isVirtualTryOnActive ? 'text-white' : 'text-[#0284C7]'}`} />
              <span>{isVirtualTryOnActive ? '3D Try-On: ON' : '3D Try-On'}</span>
              {isVirtualTryOnActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E2E8F0] px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center space-x-2 pb-3 border-b border-[#E2E8F0]">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openAiTrendModal();
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-[#F0F7FF] text-[#0284C7] font-bold text-xs flex items-center justify-center space-x-1.5 border border-[#BAE6FD]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Daily AI Trend</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                toggleVirtualTryOnMode();
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-[#0B4D8C] text-white font-bold text-xs flex items-center justify-center space-x-1.5"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{isVirtualTryOnActive ? 'Turn Off 3D Try-On' : '3D Try-On'}</span>
            </button>
          </div>

          <div className="space-y-1">
            {categoryTabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                className="block px-3 py-2 text-sm font-semibold text-[#1E293B] hover:text-[#0B4D8C] hover:bg-[#F8FAFC] rounded-lg"
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
