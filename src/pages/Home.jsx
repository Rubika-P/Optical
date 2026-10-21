import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Eye, ShieldCheck, CheckCircle2, ChevronRight, Star, RefreshCw, Calendar, MapPin, Compass, Play } from 'lucide-react';
import ProductCard from '../components/ProductCard';
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
    <div className="bg-[#FBF9F5] text-[#171717]">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#121212] text-white">
        {/* Background Editorial Image with refined gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=2000&q=90"
            alt="LUMÉRA Editorial Eyewear Collection"
            className="w-full h-full object-cover object-center opacity-40 scale-105 animate-in fade-in zoom-in-105 duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/40 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0E0E0E]/30 to-[#0E0E0E]" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* Subtle Decorative Monogram Tag */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 border border-white/20 mb-8 animate-in fade-in slide-in-from-bottom-3 duration-700">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#E7DFD5]">
              Maison de Haute Optique · 2026 Edition
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.18em] leading-tight sm:leading-none uppercase text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-800">
            See The World <br />
            <span className="font-serif italic font-normal tracking-wider lowercase text-[#EADBCA]">
              differently.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-lg text-[#D6CFC4] max-w-2xl mx-auto font-light leading-relaxed mb-10 tracking-wide animate-in fade-in slide-in-from-bottom-5 duration-900">
            Eyewear engineered at the intersection of Japanese aerospace titanium, hand-polished Italian bio-acetate, and intelligent facial architecture.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <Link
              to="/shop"
              className="w-full sm:w-auto px-8 py-4 bg-[#C5A880] hover:bg-[#B39264] text-[#141414] text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2 group"
            >
              <span>Explore Eyewear</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/face-finder"
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-[0.25em] border border-white/40 hover:border-white transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span>Find Your Frame</span>
            </Link>
          </div>

          {/* Floating Feature Highlight Pills */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/15 text-left">
            <div className="flex items-center space-x-3 text-xs text-[#D8CEBE]">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-[#C5A880]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-white">Sabae Titanium</p>
                <p className="text-[10px] text-[#A89F91]">9.8g Ultralight Core</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs text-[#D8CEBE]">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-[#C5A880]">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-white">Zeiss™ Vision</p>
                <p className="text-[10px] text-[#A89F91]">High-Clarity Optics</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs text-[#D8CEBE]">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-[#C5A880]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-white">AR Try-On</p>
                <p className="text-[10px] text-[#A89F91]">3D Real-time Fit</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs text-[#D8CEBE]">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-[#C5A880]">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-white">30-Day Trial</p>
                <p className="text-[10px] text-[#A89F91]">Complimentary Returns</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#8C847A] font-semibold block mb-2">
              Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#171717]">
              Shop By Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="mt-4 md:mt-0 text-xs uppercase tracking-widest text-[#171717] font-semibold flex items-center space-x-2 group hover:text-[#9F8259]"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Large Editorial Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${encodeURIComponent(cat.title)}`}
              className="group relative h-[450px] sm:h-[500px] overflow-hidden bg-[#ECE6DC] flex flex-col justify-end p-8 text-white transition-all duration-700"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent group-hover:via-black/40 transition-colors duration-500" />

              {/* Card Meta Content */}
              <div className="relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                <span className="inline-block px-2.5 py-1 bg-white/20 backdrop-blur-md text-[10px] uppercase tracking-widest font-semibold text-[#EADBCA] mb-3">
                  {cat.tag}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-medium tracking-wide mb-2">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#D8CEBE] font-light max-w-xs mb-4 line-clamp-2">
                  {cat.subtitle}
                </p>

                <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#C5A880] group-hover:text-white transition-colors">
                  <span>Explore Series</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. "FIND YOUR FRAME" INTERACTIVE EXPERIENCE */}
      <section className="py-20 bg-[#F4EFEB] border-y border-[#ECE6DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center space-x-1 text-xs uppercase tracking-[0.3em] text-[#8C847A] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Smart Optical Consultation</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] mb-4">
              Find the frame that fits you.
            </h2>
            <p className="text-sm text-[#6B655F]">
              Select your face architecture, aesthetic mood and rim silhouette to receive tailored optical recommendations.
            </p>
          </div>

          {/* Interactive Selectors */}
          <div className="bg-white p-6 sm:p-10 border border-[#ECE6DC] shadow-sm mb-12 space-y-8">
            {/* Step 1: Face Shape */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#171717]">
                  1. Face Shape:
                </span>
                <span className="text-xs text-[#8C847A]">
                  Active: <strong className="text-[#171717]">{selectedFaceShape}</strong>
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                {['Oval', 'Round', 'Square', 'Heart', 'Diamond', 'Oblong'].map((shape) => (
                  <button
                    key={shape}
                    onClick={() => setSelectedFaceShape(shape)}
                    className={`py-3 px-2 text-xs uppercase tracking-wider font-medium border transition-all ${
                      selectedFaceShape === shape
                        ? 'bg-[#171717] text-white border-[#171717] shadow-sm'
                        : 'bg-[#FAF7F2] text-[#4A4744] border-[#E0D8CB] hover:border-[#171717]'
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
                <span className="text-xs uppercase tracking-wider font-semibold text-[#171717]">
                  2. Design Aesthetic:
                </span>
                <span className="text-xs text-[#8C847A]">
                  Active: <strong className="text-[#171717]">{selectedStyle}</strong>
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                {['Minimal', 'Classic', 'Professional', 'Trendy', 'Bold', 'Vintage'].map((style) => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`py-3 px-2 text-xs uppercase tracking-wider font-medium border transition-all ${
                      selectedStyle === style
                        ? 'bg-[#171717] text-white border-[#171717] shadow-sm'
                        : 'bg-[#FAF7F2] text-[#4A4744] border-[#E0D8CB] hover:border-[#171717]'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Frame Preference */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#171717]">
                  3. Rim Architecture:
                </span>
                <span className="text-xs text-[#8C847A]">
                  Active: <strong className="text-[#171717]">{selectedRim}</strong>
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {['Full Rim', 'Half Rim', 'Rimless'].map((rim) => (
                  <button
                    key={rim}
                    onClick={() => setSelectedRim(rim)}
                    className={`py-3 px-3 text-xs uppercase tracking-wider font-medium border transition-all ${
                      selectedRim === rim
                        ? 'bg-[#171717] text-white border-[#171717] shadow-sm'
                        : 'bg-[#FAF7F2] text-[#4A4744] border-[#E0D8CB] hover:border-[#171717]'
                    }`}
                  >
                    {rim}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Products Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-serif text-2xl text-[#171717]">
                  Curated Matches For You ({recommendedFrames.length})
                </h3>
                <p className="text-xs text-[#7A736B]">
                  Harmonized for <strong>{selectedFaceShape}</strong> facial proportions and <strong>{selectedStyle}</strong> aesthetic.
                </p>
              </div>

              <Link
                to="/face-finder"
                className="text-xs uppercase tracking-widest font-semibold text-[#8B6B3F] hover:text-[#171717] flex items-center space-x-1"
              >
                <span>Full AI Diagnostic</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedFrames.map((frame) => (
                <ProductCard key={frame.id} product={frame} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED EDIT / SEASONAL COLLECTION */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C847A] font-semibold block mb-2">
            The Edit
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] mb-3">
            Frames Selected For The Season
          </h2>
          <p className="text-xs sm:text-sm text-[#6B655F]">
            Hand-assembled silhouettes celebrating structural balance and architectural purity.
          </p>

          {/* Category Tabs */}
          <div className="mt-8 inline-flex items-center p-1 bg-[#F4EFEB] border border-[#E5DFD4] space-x-1">
            {[
              { id: 'all', label: 'All Featured' },
              { id: 'titanium', label: 'Aerospace Titanium' },
              { id: 'sunglasses', label: 'Sun Edition' },
              { id: 'acetate', label: 'Bio-Acetate' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-[#171717] shadow-sm'
                    : 'text-[#6B655F] hover:text-[#171717]'
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
            className="inline-flex items-center space-x-3 px-8 py-4 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#141414] text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300 shadow-md"
          >
            <span>Explore All 24+ Frames</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. VIRTUAL TRY-ON INTERACTIVE BANNER */}
      <section className="py-20 bg-[#121212] text-white overflow-hidden relative border-t border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 px-3.5 py-1.5 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#E7DFD5]">
                  Instant 3D Face Geometry
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-light leading-tight text-white">
                See it on you <br />
                <span className="italic font-serif text-[#C5A880]">before you choose.</span>
              </h2>

              <p className="text-sm text-[#A89F91] leading-relaxed max-w-lg">
                Experience real-time virtual fitting from the comfort of your home. Use your live camera or upload a portrait to calibrate millimeter lens dimensions, browline alignment, and tint shades.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white/5 border border-white/10">
                  <span className="text-xl font-serif text-[#C5A880] block mb-1">01</span>
                  <h4 className="text-xs font-semibold uppercase text-white mb-1">Webcam or Photo</h4>
                  <p className="text-[11px] text-[#9E968E]">Automatic facial landmark alignment in seconds.</p>
                </div>

                <div className="p-4 bg-white/5 border border-white/10">
                  <span className="text-xl font-serif text-[#C5A880] block mb-1">02</span>
                  <h4 className="text-xs font-semibold uppercase text-white mb-1">Side-by-Side Compare</h4>
                  <p className="text-[11px] text-[#9E968E]">Contrast two silhouettes simultaneously.</p>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setTryOnProduct(PRODUCTS[0])}
                  className="px-8 py-4 bg-[#C5A880] hover:bg-[#B39264] text-[#141414] text-xs font-bold uppercase tracking-[0.25em] transition-colors flex items-center justify-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Launch AR Studio Now</span>
                </button>

                <Link
                  to="/virtual-try-on"
                  className="px-6 py-4 bg-transparent hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-[0.25em] border border-white/30 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Learn More</span>
                </Link>
              </div>
            </div>

            {/* Right Visualizer Mockup */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] bg-[#1F1F1F] border border-[#333333] shadow-2xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
                  alt="Virtual Fitting Demonstration"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Simulated Glass Overlay Badge */}
                <div className="absolute top-6 left-6 bg-black/75 backdrop-blur-md px-4 py-2 border border-white/20 text-xs text-white">
                  <span className="text-[#C5A880] font-mono mr-2">● LIVE</span>
                  <span>Frame: LUMÉRA ARC (Titanium)</span>
                </div>

                <div className="absolute bottom-6 inset-x-6 flex items-center justify-between">
                  <div className="bg-black/80 backdrop-blur-md px-4 py-2 border border-white/20 text-xs">
                    <p className="text-[10px] uppercase text-[#9E968E]">Face Shape Detected</p>
                    <p className="font-serif text-sm text-[#C5A880]">Oval · 98% Compatibility</p>
                  </div>

                  <button
                    onClick={() => setTryOnProduct(PRODUCTS[0])}
                    className="p-3 bg-[#C5A880] text-[#141414] rounded-full hover:scale-110 transition-transform shadow-lg"
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ABOUT THE BRAND: "VISION MEETS DESIGN" */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Asymmetric Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] bg-[#ECE6DC] overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=85"
                alt="LUMÉRA Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Small floating detail card */}
            <div className="absolute -bottom-6 -right-6 hidden sm:block w-56 bg-white p-5 border border-[#ECE6DC] shadow-xl">
              <p className="font-serif text-2xl text-[#171717] font-medium">9.8g</p>
              <p className="text-[11px] uppercase tracking-wider text-[#8C847A] mt-1">
                Average Titanium Weight for all-day comfort
              </p>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#8C847A] font-semibold block">
              Maison Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] leading-tight">
              Vision meets design.
            </h2>
            <p className="text-base text-[#4A4744] font-light leading-relaxed">
              LUMÉRA brings together optical precision and contemporary design to create eyewear that feels personal, effortless, and timeless.
            </p>
            <p className="text-sm text-[#6B655F] leading-relaxed">
              Every silhouette is conceived in our studio, sourced from certified sustainable bio-cellulose in Cadore, Italy and sculpted by generational titanium masters in Sabae, Japan. We believe that true luxury lies in weightlessness, balanced proportions, and uncompromising optical fidelity.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-6 border-t border-[#ECE6DC]">
              <div>
                <h4 className="font-serif text-lg font-medium text-[#171717] mb-1">Sustainable Acetate</h4>
                <p className="text-xs text-[#7A736B]">100% plant-derived, petroleum-free Italian bio-acetate.</p>
              </div>
              <div>
                <h4 className="font-serif text-lg font-medium text-[#171717] mb-1">Japanese Precision</h4>
                <p className="text-xs text-[#7A736B]">Beta-titanium hinges tested for 50,000 continuous flex cycles.</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-[#171717] hover:text-[#9F8259] transition-colors"
              >
                <span>Read The LUMÉRA Manifesto</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. EYE TEST & CLINICAL CARE */}
      <section className="py-20 bg-[#F4EFEB] border-t border-[#ECE6DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#8C847A] font-semibold block mb-2">
                Clinical Vision
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#171717]">
                Comprehensive Eye Care
              </h2>
            </div>
            <Link
              to="/book-appointment"
              className="mt-4 md:mt-0 px-6 py-3 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#141414] text-xs font-semibold uppercase tracking-widest transition-colors inline-block"
            >
              Book An Appointment
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-8 border border-[#ECE6DC] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#FAF7F2] border border-[#E5DFD4] flex items-center justify-center text-[#C5A880]">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#171717]">Book an Eye Test</h3>
                <p className="text-xs text-[#6B655F] leading-relaxed">
                  Get your refractive vision and retinal health evaluated with state-of-the-art optical diagnostic equipment.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#F0ECE4]">
                <Link
                  to="/book-appointment"
                  className="text-xs font-semibold uppercase tracking-wider text-[#171717] hover:text-[#C5A880] flex items-center space-x-1"
                >
                  <span>Reserve Session</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 border border-[#ECE6DC] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#FAF7F2] border border-[#E5DFD4] flex items-center justify-center text-[#C5A880]">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#171717]">Find a Flagship Store</h3>
                <p className="text-xs text-[#6B655F] leading-relaxed">
                  Visit our intimate boutique studios in New York, London, Tokyo and Paris for bespoke custom fitting.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#F0ECE4]">
                <Link
                  to="/eye-care"
                  className="text-xs font-semibold uppercase tracking-wider text-[#171717] hover:text-[#C5A880] flex items-center space-x-1"
                >
                  <span>View Global Studios</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 border border-[#ECE6DC] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#FAF7F2] border border-[#E5DFD4] flex items-center justify-center text-[#C5A880]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#171717]">Lens & Frame Care</h3>
                <p className="text-xs text-[#6B655F] leading-relaxed">
                  Simple maintenance guidelines, complimentary ultrasonic cleaning, and lifetime hinge adjustments.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#F0ECE4]">
                <Link
                  to="/eye-care"
                  className="text-xs font-semibold uppercase tracking-wider text-[#171717] hover:text-[#C5A880] flex items-center space-x-1"
                >
                  <span>Read Care Guide</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS & PRESS */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C847A] font-semibold block mb-2">
            Client Voices
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#171717]">
            Worn By Discerning Eyes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 border border-[#ECE6DC] flex flex-col justify-between"
            >
              <div>
                <div className="flex text-[#C5A880] mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <p className="text-xs text-[#4A4744] font-light italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0ECE4]">
                <h4 className="font-serif text-base font-medium text-[#171717]">{t.author}</h4>
                <p className="text-[11px] text-[#7A736B]">{t.role} · {t.city}</p>
                <span className="inline-block mt-2 text-[10px] font-mono text-[#8B6B3F] bg-[#FAF7F2] px-2 py-0.5 border border-[#EADBCA]">
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
