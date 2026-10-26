import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Sparkles, Eye, ShieldCheck, CheckCircle2, ChevronRight, Star, 
  RefreshCw, Calendar, MapPin, Compass, Stethoscope, Clock, Award, 
  Activity, Check, Phone, Glasses, Building2, Zap, Layers, Cpu
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import GrandOpticalsLogo from '../components/GrandOpticalsLogo';
import FindYourShape from '../components/FindYourShape';
import MaterialStories from '../components/MaterialStories';
import AiDailyTrendGif from '../components/AiDailyTrendGif';
import { PRODUCTS, CATEGORIES, TESTIMONIALS } from '../data/products';

const LENS_TECHNOLOGIES = [
  {
    title: 'BLU-Shield Digital Cut',
    desc: 'Filters 99.9% harmful high-energy blue-violet rays from laptops, smartphones & LED lighting. Minimizes eye fatigue.',
    badge: 'Screen Protection',
    icon: Cpu
  },
  {
    title: 'Anti-Glare HD Coating',
    desc: 'Multi-layer hydrophobic & anti-reflective nanocoating provides crystal-clear vision with zero night-driving glares.',
    badge: '100% Clarity',
    icon: Eye
  },
  {
    title: 'High-Index Ultra Thin',
    desc: 'Up to 40% thinner & lighter than standard plastic lenses. Perfect for higher prescriptions with zero edge distortion.',
    badge: 'Featherweight',
    icon: Layers
  },
  {
    title: 'Transitions® Light Adaptive',
    desc: 'Intelligent photochromic pigments activate automatically in sunlight, darkening to full UV400 sunglasses outdoors.',
    badge: 'All-in-One',
    icon: Zap
  }
];

const Home = () => {
  const navigate = useNavigate();

  // Selected shape for interactive quick preview
  const [selectedShape, setSelectedShape] = useState('Rectangle');

  // Featured Collection Filter
  const [activeTab, setActiveTab] = useState('all');

  // Clinic Tour Tab State
  const [activeClinicZone, setActiveZone] = useState('dispensary');

  // Featured tab products
  const featuredProducts = useMemo(() => {
    if (activeTab === 'titanium') {
      return PRODUCTS.filter((p) => p.material?.toLowerCase().includes('titanium')).slice(0, 8);
    }
    if (activeTab === 'sunglasses') {
      return PRODUCTS.filter((p) => p.category === 'Sunglasses').slice(0, 8);
    }
    if (activeTab === 'acetate') {
      return PRODUCTS.filter((p) => p.material?.toLowerCase().includes('acetate')).slice(0, 8);
    }
    return PRODUCTS.filter((p) => p.isFeatured).slice(0, 8);
  }, [activeTab]);

  return (
    <div className="bg-[#F8FAFC] text-[#0F172A] overflow-x-hidden">
      {/* 1. HERO SECTION: Grand Opticals Signature Clinic & Eyewear Experience */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#03152B] via-[#072F5F] to-[#0B4D8C] text-white">
        {/* Dynamic Animated Ambient Orbs & Radiant Glows */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#0284C7]/30 blur-3xl animate-orb-1 pointer-events-none" />
        <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] rounded-full bg-[#38BDF8]/20 blur-3xl animate-orb-2 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#0B4D8C]/25 blur-[120px] animate-pulse-glow pointer-events-none" />

        {/* Optical Concentric Rings Pattern (SVG Overlay) */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none flex items-center justify-center">
          <svg className="w-[1100px] h-[1100px] animate-spin" style={{ animationDuration: '120s' }} viewBox="0 0 1000 1000">
            <circle cx="500" cy="500" r="160" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="6 6" />
            <circle cx="500" cy="500" r="280" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="4 8" />
            <circle cx="500" cy="500" r="380" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.4" />
            <circle cx="500" cy="500" r="480" fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeDasharray="8 12" />
          </svg>
        </div>

        {/* Background Clinic Interior Showcase with Vignette Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/clinic/storefront.jpg"
            alt="Grand Opticals Eye Clinic Interior and Eyewear Boutique"
            className="w-full h-full object-cover object-center opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#03152B]/95 via-[#072F5F]/85 to-[#0B4D8C]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#03152B] via-transparent to-[#072F5F]/60" />
        </div>

        {/* Floating Glassmorphism Badges (Hidden on mobile for clarity, visible on tablet/desktop) */}
        <div className="hidden lg:block absolute top-28 left-8 xl:left-16 z-20 animate-float">
          <div className="glass-dark px-4 py-3 rounded-2xl border border-white/20 shadow-2xl flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0284C7] to-[#38BDF8] flex items-center justify-center text-white shadow-lg">
              <Star className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-white">4.9 / 5 Rating</p>
              <p className="text-[10px] text-[#94A3B8]">12,000+ Happy Patients</p>
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute top-36 right-8 xl:right-16 z-20 animate-float" style={{ animationDelay: '2s' }}>
          <div className="glass-dark px-4 py-3 rounded-2xl border border-white/20 shadow-2xl flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#10B981] to-[#34D399] flex items-center justify-center text-white shadow-lg">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-white">Free Computerized Exam</p>
              <p className="text-[10px] text-[#94A3B8]">Certified Ophthalmic Care</p>
            </div>
          </div>
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 sm:py-28">
          {/* Tagline Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-[#38BDF8]/40 mb-8 shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] animate-ping" />
            <span className="text-[11px] font-extrabold tracking-[0.25em] uppercase text-[#E0F2FE]">
              Grand Opticals Eye Clinic · Better Vision | Brighter Tomorrow
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight sm:leading-none text-white mb-6">
            Better Vision. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#7DD3FC] to-[#FFFFFF]">
              Brighter Tomorrow.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-[#CBD5E1] max-w-2xl mx-auto font-light leading-relaxed mb-10 tracking-wide">
            Eyewear for a better you. Combining state-of-the-art digital ophthalmic diagnostics with hand-finished titanium and bio-acetate frames starting at just <strong className="text-white font-semibold">₹1,999</strong>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/book-appointment"
              className="w-full sm:w-auto px-8 py-4 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 shadow-xl hover:shadow-cyan-500/30 flex items-center justify-center space-x-2.5 group cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#E0F2FE]" />
              <span>Book Free Eye Test</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/shop?category=Eyeglasses"
              className="w-full sm:w-auto px-8 py-4 bg-white/15 hover:bg-white/25 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl border border-white/30 hover:border-white transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-md cursor-pointer"
            >
              <Glasses className="w-4 h-4 text-[#38BDF8]" />
              <span>Shop Eyeglasses</span>
            </Link>

            <Link
              to="/shop?category=Sunglasses"
              className="w-full sm:w-auto px-6 py-4 bg-transparent hover:bg-white/10 text-[#38BDF8] hover:text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl border border-[#38BDF8]/40 hover:border-[#38BDF8] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Explore Sunglasses</span>
            </Link>
          </div>

          {/* Floating Clinical Feature Highlight Pills */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/15 text-left">
            <div className="flex items-center space-x-3 text-xs text-[#E2E8F0]">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 text-[#38BDF8]">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white">Digital Eye Exams</p>
                <p className="text-[10px] text-[#94A3B8]">12-Step Computerized</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs text-[#E2E8F0]">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 text-[#38BDF8]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white">Precision Optics</p>
                <p className="text-[10px] text-[#94A3B8]">Anti-Glare & Blue Cut</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs text-[#E2E8F0]">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 text-[#38BDF8]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white">Same-Day Fitting</p>
                <p className="text-[10px] text-[#94A3B8]">Fast Clinical Dispatch</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs text-[#E2E8F0]">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 text-[#38BDF8]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white">1-Year Warranty</p>
                <p className="text-[10px] text-[#94A3B8]">Lifetime Adjustments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FIND YOUR SHAPE: Trending Shapes Carousel (Eyeglasses & Sunglasses) */}
      <FindYourShape />

      {/* EXPLORE BASED ON MATERIALS: Material Stories Showcase (from Picture 1) */}
      <MaterialStories />

      {/* AI DAILY TREND ENGINE & VIRTUAL TRY-ON STUDIO */}
      <section className="py-16 sm:py-20 bg-[#070B14] text-white border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#38BDF8] font-bold block mb-2 font-mono">
              GENERATIVE FORECAST // TODAY'S SPECIAL
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white mb-3">
              Daily AI Eyewear Trend
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Synthesized each morning based on global fashion week telemetry and optical design surges. Generate today's GIF loop or snap a photo to try the trend on your own face.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <AiDailyTrendGif embedded={true} />
          </div>
        </div>
      </section>
      <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-[#0284C7] font-bold mb-3 px-3.5 py-1.5 bg-[#F0F7FF] rounded-full border border-[#BAE6FD]">
              <Building2 className="w-4 h-4" />
              <span>Flagship Clinic & Eyewear Boutique</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B4D8C] tracking-tight mb-4">
              Eyewear For A Better You.
            </h2>
            <p className="text-base text-[#475569] leading-relaxed">
              Step into the Grand Opticals flagship: where boutique aesthetic styling meets certified ophthalmic medical precision. Designed for clear vision and all-day comfort.
            </p>
          </div>

          {/* Interactive 3-Zone Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Image with interactive hot-spots */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-2xl border border-[#E2E8F0] group">
              <img
                src={activeClinicZone === 'exam' ? '/clinic/exam-room.jpg' : '/clinic/storefront.jpg'}
                alt="Grand Opticals Eye Clinic Boutique"
                className="w-full h-[420px] sm:h-[480px] object-cover transition-all duration-700 group-hover:scale-102"
              />
              
              {/* Backlit glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#072F5F]/85 via-transparent to-black/20" />

              {/* Slogan Banner inside image */}
              <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-[#E2E8F0] flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" />
                <span className="text-xs font-extrabold text-[#0B4D8C] uppercase tracking-wider">
                  Style · Comfort · Clear Vision
                </span>
              </div>

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-5 inset-x-5 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-[#0B4D8C]">
                    {activeClinicZone === 'exam' ? 'Digital Refraction & Exam Suite' : 'Illuminated Optical Dispensary'}
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    {activeClinicZone === 'exam' ? 'Equipped with computerized auto-refractor & Snellen chart' : 'Over 500+ curated frames with backlit floating glass shelves'}
                  </p>
                </div>
                <Link
                  to="/book-appointment"
                  className="px-4 py-2 bg-[#0B4D8C] hover:bg-[#0284C7] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap text-center cursor-pointer"
                >
                  Visit Clinic
                </Link>
              </div>
            </div>

            {/* Right: Feature Zone Cards */}
            <div className="lg:col-span-5 space-y-4">
              {/* Zone 1: Dispensary */}
              <div 
                onClick={() => setActiveZone('dispensary')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeClinicZone === 'dispensary' 
                    ? 'bg-[#F0F7FF] border-[#0284C7] shadow-lg ring-2 ring-[#0284C7]/20' 
                    : 'bg-white border-[#E2E8F0] hover:border-[#94A3B8]'
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <div className={`p-3 rounded-xl flex-shrink-0 ${activeClinicZone === 'dispensary' ? 'bg-[#0B4D8C] text-white' : 'bg-[#F1F5F9] text-[#0B4D8C]'}`}>
                    <Glasses className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0B4D8C] flex items-center justify-between">
                      <span>Illuminated Eyewear Gallery</span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7]">
                        500+ Frames
                      </span>
                    </h3>
                    <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                      Warm backlit displays showcasing aerospace titanium featherweights, Italian bio-acetate, and polarized sun series.
                    </p>
                  </div>
                </div>
              </div>

              {/* Zone 2: Clinical Suite */}
              <div 
                onClick={() => setActiveZone('exam')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeClinicZone === 'exam' 
                    ? 'bg-[#F0F7FF] border-[#0284C7] shadow-lg ring-2 ring-[#0284C7]/20' 
                    : 'bg-white border-[#E2E8F0] hover:border-[#94A3B8]'
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <div className={`p-3 rounded-xl flex-shrink-0 ${activeClinicZone === 'exam' ? 'bg-[#0B4D8C] text-white' : 'bg-[#F1F5F9] text-[#0B4D8C]'}`}>
                    <Eye className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0B4D8C] flex items-center justify-between">
                      <span>Comprehensive Eye Examination</span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7]">
                        Digital Exam
                      </span>
                    </h3>
                    <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                      High-precision digital phoropter tests, corneal mapping, intraocular pressure check, and custom lens power calibration.
                    </p>
                  </div>
                </div>
              </div>

              {/* Zone 3: Fluted Reception & Concierge */}
              <div 
                onClick={() => setActiveZone('reception')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeClinicZone === 'reception' 
                    ? 'bg-[#F0F7FF] border-[#0284C7] shadow-lg ring-2 ring-[#0284C7]/20' 
                    : 'bg-white border-[#E2E8F0] hover:border-[#94A3B8]'
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <div className={`p-3 rounded-xl flex-shrink-0 ${activeClinicZone === 'reception' ? 'bg-[#0B4D8C] text-white' : 'bg-[#F1F5F9] text-[#0B4D8C]'}`}>
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0B4D8C] flex items-center justify-between">
                      <span>Certified Optical Dispensary</span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7]">
                        Expert Care
                      </span>
                    </h3>
                    <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                      Complimentary ultrasonic cleaning, nose-pad adjustments, and instant prescription fulfillment at our dedicated reception.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Callout */}
              <div className="pt-2 flex items-center justify-between px-2">
                <span className="text-xs text-[#64748B] flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-[#0284C7]" /> Walk-ins & appointments welcome
                </span>
                <Link
                  to="/book-appointment"
                  className="text-xs font-bold text-[#0B4D8C] hover:text-[#0284C7] flex items-center cursor-pointer"
                >
                  Schedule Appointment <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SHOP BY CATEGORY */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#0284C7] font-bold block mb-2">
              Boutique Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B4D8C]">
              Shop By Eyewear Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="mt-4 md:mt-0 text-xs uppercase tracking-widest text-[#0B4D8C] font-bold flex items-center space-x-2 group hover:text-[#0284C7] cursor-pointer"
          >
            <span>Explore All Frames</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Large Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${encodeURIComponent(cat.title)}`}
              className="group relative h-[450px] sm:h-[500px] rounded-2xl overflow-hidden bg-[#E2E8F0] flex flex-col justify-end p-8 text-white transition-all duration-700 shadow-lg hover:shadow-2xl cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#072F5F] via-[#072F5F]/40 to-transparent group-hover:via-[#072F5F]/60 transition-colors duration-500" />

              {/* Card Meta Content */}
              <div className="relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] uppercase tracking-widest font-bold text-[#E0F2FE] mb-3 border border-white/20">
                  {cat.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-wide mb-2">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#CBD5E1] font-normal max-w-xs mb-4 line-clamp-2">
                  {cat.subtitle}
                </p>

                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#38BDF8] group-hover:text-white transition-colors">
                  <span>Explore Series</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. FEATURED CURATION (INR PRICING) */}
      <section className="py-20 sm:py-28 bg-[#F0F7FF] border-y border-[#BAE6FD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#0284C7] font-bold block mb-2">
              Selected By Master Opticians
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B4D8C] mb-4">
              Clinical Best-Sellers & New Frames
            </h2>
            <p className="text-sm text-[#64748B]">
              Handcrafted with medical-grade hypoallergenic titanium and Japanese bio-acetate.
            </p>

            {/* Category Tabs */}
            <div className="mt-8 inline-flex items-center p-1.5 bg-white rounded-xl border border-[#BAE6FD] space-x-1 shadow-sm">
              {[
                { id: 'all', label: 'All Featured' },
                { id: 'titanium', label: 'Titanium' },
                { id: 'sunglasses', label: 'Sun Series' },
                { id: 'acetate', label: 'Bio-Acetate' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#0B4D8C] text-white shadow-sm'
                      : 'text-[#64748B] hover:text-[#0B4D8C]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-[#0B4D8C] hover:bg-[#0284C7] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all shadow-md cursor-pointer"
            >
              <span>Explore All 24+ Designer Frames</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. ADVANCED LENS TECHNOLOGY SHOWCASE (LENSKART-STYLE VALUE PROPOSITION) */}
      <section className="py-20 sm:py-28 bg-[#072F5F] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0284C7]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#38BDF8]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 text-xs uppercase tracking-[0.2em] text-[#38BDF8] font-bold mb-4">
              <Eye className="w-4 h-4 text-[#38BDF8]" />
              <span>The Grand Opticals Vision Standard</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Clinical Precision In Every Lens.
            </h2>
            <p className="text-base text-[#CBD5E1] mt-4 leading-relaxed">
              Every pair of Grand Opticals lenses is digitally mapped and surfaced using robotic German ophthalmic generators for distortion-free clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LENS_TECHNOLOGIES.map((tech) => {
              const IconComponent = tech.icon;
              return (
                <div
                  key={tech.title}
                  className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/15 flex flex-col justify-between hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#0284C7]/30 border border-[#38BDF8]/40 flex items-center justify-center text-[#38BDF8]">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-[#38BDF8] bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                        {tech.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{tech.title}</h3>
                    <p className="text-xs text-[#CBD5E1] leading-relaxed">{tech.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <span className="text-[11px] font-bold text-[#38BDF8] flex items-center space-x-1">
                      <span>Included in All Frames</span>
                      <Check className="w-3.5 h-3.5 ml-1 text-[#34D399]" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/book-appointment"
              className="inline-flex items-center space-x-2.5 px-8 py-4 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all shadow-xl hover:shadow-cyan-500/25 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Eye Power Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CLINICAL SERVICES HIGHLIGHT */}
      <section className="py-20 bg-[#F0F7FF] border-t border-[#BAE6FD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#0284C7] font-bold block mb-2">
                Ophthalmic Care
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B4D8C]">
                Grand Opticals Clinical Services
              </h2>
            </div>
            <Link
              to="/book-appointment"
              className="mt-4 md:mt-0 px-6 py-3 bg-[#0B4D8C] hover:bg-[#0284C7] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-md inline-flex items-center space-x-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#38BDF8]" />
              <span>Book Appointment</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center justify-center text-[#0B4D8C]">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B4D8C]">Comprehensive Eye Exam</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Refractive vision assessment, corneal topography, astigmatism check, and digital fundus evaluation by licensed optometrists.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#F1F5F9]">
                <Link
                  to="/book-appointment"
                  className="text-xs font-bold uppercase tracking-wider text-[#0B4D8C] hover:text-[#0284C7] flex items-center space-x-1 cursor-pointer"
                >
                  <span>Reserve Examination Session</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center justify-center text-[#0B4D8C]">
                  <Glasses className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B4D8C]">Custom Optical Dispensing</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Precision digital single vision, progressive, and occupational lenses with blue-light filtration and anti-reflective nanocoatings.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#F1F5F9]">
                <Link
                  to="/shop"
                  className="text-xs font-bold uppercase tracking-wider text-[#0B4D8C] hover:text-[#0284C7] flex items-center space-x-1 cursor-pointer"
                >
                  <span>View Eyewear Line</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center justify-center text-[#0B4D8C]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B4D8C]">Lifetime Frame Care</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Complimentary ultrasonic bath cleansing, temple realignment, screw tightening, and silicone nose pad replacements anytime.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#F1F5F9]">
                <Link
                  to="/eye-care"
                  className="text-xs font-bold uppercase tracking-wider text-[#0B4D8C] hover:text-[#0284C7] flex items-center space-x-1 cursor-pointer"
                >
                  <span>Read Care Guide</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#0284C7] font-bold block mb-2">
            Patient & Customer Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B4D8C]">
            Better Vision. Real Stories.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex text-[#F59E0B] mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <p className="text-xs text-[#475569] font-normal italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F1F5F9]">
                <h4 className="text-base font-bold text-[#0B4D8C]">{t.author}</h4>
                <p className="text-[11px] text-[#64748B]">{t.role} · {t.city}</p>
                <span className="inline-block mt-2 text-[10px] font-bold text-[#0284C7] bg-[#F0F7FF] px-2.5 py-1 rounded-md border border-[#BAE6FD]">
                  Wearing {t.frame}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
