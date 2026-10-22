import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Sparkles, Eye, ShieldCheck, CheckCircle2, ChevronRight, Star, 
  RefreshCw, Calendar, MapPin, Compass, Play, Stethoscope, Clock, Award, 
  Activity, Check, Phone, Camera, Glasses, Building2
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import GrandOpticalsLogo from '../components/GrandOpticalsLogo';
import { PRODUCTS, CATEGORIES, TESTIMONIALS, FACE_SHAPES_DATA } from '../data/products';
import { useShop } from '../context/ShopContext';

const Home = () => {
  const navigate = useNavigate();
  const { setTryOnProduct } = useShop();

  // Interactive "Find Your Frame" State on Home
  const [selectedFaceShape, setSelectedFaceShape] = useState('Oval');
  const [selectedStyle, setSelectedStyle] = useState('Minimal');
  const [selectedRim, setSelectedRim] = useState('Full Rim');

  // Featured Collection Filter
  const [activeTab, setActiveTab] = useState('all');

  // Clinic Tour Tab State
  const [activeClinicZone, setActiveZone] = useState('dispensary');

  // Filter recommendations based on selected attributes
  const recommendedFrames = useMemo(() => {
    let matches = PRODUCTS.filter((p) => {
      const shapeMatch = p.faceShapes?.includes(selectedFaceShape);
      const styleMatch = p.style === selectedStyle || p.rimType === selectedRim;
      return shapeMatch || styleMatch;
    });

    if (matches.length < 3) {
      matches = PRODUCTS.slice(0, 4);
    }
    return matches.slice(0, 4);
  }, [selectedFaceShape, selectedStyle, selectedRim]);

  // Featured tab products
  const featuredProducts = useMemo(() => {
    if (activeTab === 'titanium') {
      return PRODUCTS.filter((p) => p.material.toLowerCase().includes('titanium'));
    }
    if (activeTab === 'sunglasses') {
      return PRODUCTS.filter((p) => p.category === 'Sunglasses');
    }
    if (activeTab === 'acetate') {
      return PRODUCTS.filter((p) => p.material.toLowerCase().includes('acetate'));
    }
    return PRODUCTS.filter((p) => p.isFeatured).slice(0, 8);
  }, [activeTab]);

  return (
    <div className="bg-[#F8FAFC] text-[#0F172A]">
      {/* 1. HERO SECTION: Grand Opticals Signature Clinic & Eyewear Experience */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#072F5F] text-white">
        {/* Background Clinic Interior Showcase with Royal Blue Cinematic Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="/clinic/storefront.jpg"
            alt="Grand Opticals Eye Clinic Interior and Eyewear Boutique"
            className="w-full h-full object-cover object-center opacity-30 scale-105 animate-in fade-in zoom-in-105 duration-1000"
          />
          {/* Deep Royal & Navy Blue gradient vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#062447] via-[#072F5F]/90 to-[#0B4D8C]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061D38] via-transparent to-[#072F5F]/50" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 sm:py-28">
          {/* Tagline Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-[#38BDF8]/40 mb-8 animate-in fade-in slide-in-from-bottom-3 duration-700 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping" />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#E0F2FE]">
              Grand Opticals Eye Clinic · Better Vision | Brighter Tomorrow
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight sm:leading-none text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-800">
            Better Vision. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#7DD3FC] to-[#FFFFFF]">
              Brighter Tomorrow.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-[#CBD5E1] max-w-2xl mx-auto font-light leading-relaxed mb-10 tracking-wide animate-in fade-in slide-in-from-bottom-5 duration-900">
            Eyewear for a better you. Combining advanced digital ophthalmic diagnostics with hand-finished titanium and bio-acetate frames.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <Link
              to="/book-appointment"
              className="w-full sm:w-auto px-8 py-4 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 shadow-xl hover:shadow-cyan-500/25 flex items-center justify-center space-x-2.5 group"
            >
              <Calendar className="w-4 h-4 text-[#E0F2FE]" />
              <span>Book In-Clinic Eye Test</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/shop"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl border border-white/30 hover:border-white transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-md"
            >
              <Glasses className="w-4 h-4 text-[#38BDF8]" />
              <span>Explore Eyewear</span>
            </Link>

            <Link
              to="/virtual-try-on"
              className="w-full sm:w-auto px-6 py-4 bg-transparent hover:bg-white/10 text-[#38BDF8] hover:text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl border border-[#38BDF8]/40 hover:border-[#38BDF8] transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>3D Virtual Try-On</span>
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
                <p className="text-[10px] text-[#94A3B8]">Computerized Refraction</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs text-[#E2E8F0]">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 text-[#38BDF8]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white">Precision Optics</p>
                <p className="text-[10px] text-[#94A3B8]">Blue-Cut & HD Lenses</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs text-[#E2E8F0]">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 text-[#38BDF8]">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white">AR 3D Try-On</p>
                <p className="text-[10px] text-[#94A3B8]">Millimeter-accurate fit</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs text-[#E2E8F0]">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 text-[#38BDF8]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white">Clinical Guarantee</p>
                <p className="text-[10px] text-[#94A3B8]">Lifetime Adjustments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CLINIC & BOUTIQUE SHOWCASE: Directly matching the store design */}
      <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-[#0284C7] font-bold mb-3 px-3.5 py-1.5 bg-[#F0F7FF] rounded-full border border-[#BAE6FD]">
              <Building2 className="w-4 h-4" />
              <span>Flagship Clinic & Boutique</span>
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#072F5F]/80 via-transparent to-black/20" />

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
                  className="px-4 py-2 bg-[#0B4D8C] hover:bg-[#0284C7] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap text-center"
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
                      Warm backlit glass displays with titanium featherweights, Italian bio-acetate sculptures, and polarized sun series.
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
                  className="text-xs font-bold text-[#0B4D8C] hover:text-[#0284C7] flex items-center"
                >
                  Schedule Appointment <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY */}
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
            className="mt-4 md:mt-0 text-xs uppercase tracking-widest text-[#0B4D8C] font-bold flex items-center space-x-2 group hover:text-[#0284C7]"
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
              className="group relative h-[450px] sm:h-[500px] rounded-2xl overflow-hidden bg-[#E2E8F0] flex flex-col justify-end p-8 text-white transition-all duration-700 shadow-lg hover:shadow-2xl"
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

      {/* 4. "FIND YOUR FRAME" INTERACTIVE EXPERIENCE */}
      <section className="py-20 bg-[#F0F7FF] border-y border-[#BAE6FD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center space-x-1 text-xs uppercase tracking-[0.25em] text-[#0284C7] font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Smart Optical Consultation</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B4D8C] mb-4">
              Find the frame that fits your face.
            </h2>
            <p className="text-sm text-[#475569]">
              Select your face architecture, aesthetic mood and rim silhouette to receive tailored optical recommendations from our clinical specialists.
            </p>
          </div>

          {/* Interactive Selectors */}
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E2E8F0] shadow-md mb-12 space-y-8">
            {/* Step 1: Face Shape */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider font-bold text-[#0B4D8C]">
                  1. Face Shape:
                </span>
                <span className="text-xs text-[#64748B]">
                  Active: <strong className="text-[#0B4D8C]">{selectedFaceShape}</strong>
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                {['Oval', 'Round', 'Square', 'Heart', 'Diamond', 'Oblong'].map((shape) => (
                  <button
                    key={shape}
                    onClick={() => setSelectedFaceShape(shape)}
                    className={`py-3 px-2 text-xs uppercase tracking-wider font-bold rounded-xl border transition-all cursor-pointer ${
                      selectedFaceShape === shape
                        ? 'bg-[#0B4D8C] text-white border-[#0B4D8C] shadow-md'
                        : 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:border-[#0284C7]'
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Preferred Style */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider font-bold text-[#0B4D8C]">
                  2. Design Aesthetic:
                </span>
                <span className="text-xs text-[#64748B]">
                  Active: <strong className="text-[#0B4D8C]">{selectedStyle}</strong>
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {['Minimal', 'Bold', 'Classic', 'Avant-Garde'].map((style) => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`py-3 px-2 text-xs uppercase tracking-wider font-bold rounded-xl border transition-all cursor-pointer ${
                      selectedStyle === style
                        ? 'bg-[#0B4D8C] text-white border-[#0B4D8C] shadow-md'
                        : 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:border-[#0284C7]'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Rim Structure */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider font-bold text-[#0B4D8C]">
                  3. Rim Silhouette:
                </span>
                <span className="text-xs text-[#64748B]">
                  Active: <strong className="text-[#0B4D8C]">{selectedRim}</strong>
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {['Full Rim', 'Semi-Rimless', 'Rimless'].map((rim) => (
                  <button
                    key={rim}
                    onClick={() => setSelectedRim(rim)}
                    className={`py-3 px-2 text-xs uppercase tracking-wider font-bold rounded-xl border transition-all cursor-pointer ${
                      selectedRim === rim
                        ? 'bg-[#0B4D8C] text-white border-[#0B4D8C] shadow-md'
                        : 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:border-[#0284C7]'
                    }`}
                  >
                    {rim}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedFrames.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/face-finder"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#0B4D8C] hover:bg-[#0284C7] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#38BDF8]" />
              <span>Launch Full AI Face Shape Camera Scanner</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FEATURED CURATION */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="mt-8 inline-flex items-center p-1.5 bg-[#F1F5F9] rounded-xl border border-[#E2E8F0] space-x-1">
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
            className="inline-flex items-center space-x-3 px-8 py-4 bg-[#0B4D8C] hover:bg-[#0284C7] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all shadow-md"
          >
            <span>Explore All 24+ Designer Frames</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 6. VIRTUAL TRY-ON BANNER */}
      <section className="py-20 bg-[#072F5F] text-white overflow-hidden relative border-t border-[#0F325E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E0F2FE]">
                  Real-Time 3D Fitting Technology
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight text-white">
                See it on your face <br />
                <span className="text-[#38BDF8]">before your clinic appointment.</span>
              </h2>

              <p className="text-sm text-[#CBD5E1] leading-relaxed max-w-lg">
                Experience real-time virtual fitting from the comfort of your home. Use your live camera or upload a portrait to calibrate millimeter lens dimensions, pupillary distance, and temple fit.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white/10 rounded-xl border border-white/15">
                  <span className="text-xl font-bold text-[#38BDF8] block mb-1">01</span>
                  <h4 className="text-xs font-bold uppercase text-white mb-1">Live AR Camera</h4>
                  <p className="text-[11px] text-[#94A3B8]">Automatic facial landmark alignment in seconds.</p>
                </div>

                <div className="p-4 bg-white/10 rounded-xl border border-white/15">
                  <span className="text-xl font-bold text-[#38BDF8] block mb-1">02</span>
                  <h4 className="text-xs font-bold uppercase text-white mb-1">Prescription Ready</h4>
                  <p className="text-[11px] text-[#94A3B8]">Seamlessly send your selected frame to the clinic.</p>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setTryOnProduct(PRODUCTS[0])}
                  className="px-8 py-4 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all shadow-xl flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Launch AR Studio Now</span>
                </button>

                <Link
                  to="/virtual-try-on"
                  className="px-6 py-4 bg-transparent hover:bg-white/10 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl border border-white/30 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Learn More</span>
                </Link>
              </div>
            </div>

            {/* Right Visualizer Mockup */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] bg-[#0A192F] rounded-2xl border border-[#1E4976] shadow-2xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
                  alt="Virtual Fitting Demonstration"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#072F5F]/90 via-transparent to-black/30" />

                {/* Simulated Glass Overlay Badge */}
                <div className="absolute top-6 left-6 bg-[#072F5F]/85 backdrop-blur-md px-4 py-2 rounded-lg border border-[#38BDF8]/40 text-xs text-white">
                  <span className="text-[#38BDF8] font-bold mr-2">● LIVE AR</span>
                  <span>Grand Opticals Titanium Series</span>
                </div>

                <div className="absolute bottom-6 inset-x-6 flex items-center justify-between">
                  <div className="bg-[#072F5F]/90 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 text-xs">
                    <p className="text-[10px] uppercase text-[#94A3B8]">Grand Opticals Fitting</p>
                    <p className="font-bold text-sm text-[#38BDF8]">Precision Geometric Frame</p>
                  </div>

                  <button
                    onClick={() => setTryOnProduct(PRODUCTS[0])}
                    className="p-3 bg-[#0284C7] text-white rounded-full hover:scale-110 transition-transform shadow-lg cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CLINICAL CARE & APPOINTMENT BOOKING HIGHLIGHT */}
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
              className="mt-4 md:mt-0 px-6 py-3 bg-[#0B4D8C] hover:bg-[#0284C7] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-md inline-flex items-center space-x-2"
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
                  className="text-xs font-bold uppercase tracking-wider text-[#0B4D8C] hover:text-[#0284C7] flex items-center space-x-1"
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
                  className="text-xs font-bold uppercase tracking-wider text-[#0B4D8C] hover:text-[#0284C7] flex items-center space-x-1"
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
                  className="text-xs font-bold uppercase tracking-wider text-[#0B4D8C] hover:text-[#0284C7] flex items-center space-x-1"
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
