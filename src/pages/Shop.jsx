import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Filter, SlidersHorizontal, X, ChevronDown, Check, ArrowUpDown, 
  Sparkles, RefreshCw, Camera, Eye, Layers, CheckCircle2
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { 
    isVirtualTryOnActive, 
    toggleVirtualTryOnMode, 
    openLiveCameraModal, 
    turnOffVirtualTryOn,
    openAiTrendModal,
    userTryOnPhoto
  } = useShop();

  // Filters from URL or State
  const initialCategory = searchParams.get('category') || 'All';
  const initialStyle = searchParams.get('style') || 'All';
  const initialShape = searchParams.get('shape') || 'All';
  const initialMaterial = searchParams.get('material') || 'All';
  const initialGender = searchParams.get('gender') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedGender, setSelectedGender] = useState(initialGender);
  const [selectedShape, setSelectedShape] = useState(initialShape);
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState(initialStyle);
  const [selectedMaterial, setSelectedMaterial] = useState(initialMaterial);
  const [selectedRim, setSelectedRim] = useState('All');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState('featured');

  // Menu view states
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [openDropdownMenu, setOpenDropdownMenu] = useState(null); // 'shape' | 'gender' | 'style' | 'price' | 'material' | null

  const categoryDescriptions = {
    'All': 'Architectural eyewear & precision contact lenses engineered for weightless balance, optical clarity and timeless presence.',
    'Contact Lenses': 'Ultra-breathable bio-hydrogel & silicone lenses engineered for continuous 18-hour moisture cushion and clear, effortless sight.',
    'Eyeglasses': 'Sculpted titanium and hand-polished bio-acetate frames designed for daily optical clarity and featherlight presence.',
    'Sunglasses': 'Polarized Zeiss UV400 lenses housed in handcrafted architectural silhouettes for luminous sun protection.'
  };

  // Sync state if URL changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const sty = searchParams.get('style');
    if (sty) setSelectedStyle(sty);
    const mat = searchParams.get('material');
    if (mat) setSelectedMaterial(mat);
    const gen = searchParams.get('gender');
    if (gen) setSelectedGender(gen);
    const shp = searchParams.get('shape');
    if (shp) {
      const found = ['Round', 'Square', 'Rectangle', 'Cat Eye', 'Aviator', 'Geometric', 'Clubmaster', 'Oval'].find(
        (s) => s.toLowerCase().replace(/[^a-z]/g, '') === shp.toLowerCase().replace(/[^a-z]/g, '')
      );
      setSelectedShape(found || shp);
    }
  }, [searchParams]);

  // Categories and filter collections
  const categories = ['All', 'Eyeglasses', 'Sunglasses', 'Contact Lenses'];
  const genders = ['All', 'Unisex', 'Women', 'Men'];
  const shapes = ['All', 'Round', 'Square', 'Rectangle', 'Cat Eye', 'Aviator', 'Geometric', 'Clubmaster', 'Oval'];
  const styles = ['All', 'Minimal', 'Classic', 'Trendy', 'Professional', 'Bold', 'Vintage'];
  const materials = ['All', 'Acetate', 'Titanium', 'Metal', 'TR90', 'Stainless Steel'];
  const rims = ['All', 'Full Rim', 'Half Rim', 'Rimless'];
  const colors = [
    { name: 'All', hex: '' },
    { name: 'Black', hex: '#141414' },
    { name: 'Gold', hex: '#C5A880' },
    { name: 'Silver', hex: '#D8D8D8' },
    { name: 'Tortoise', hex: '#6D4C41' },
    { name: 'Crystal / Clear', hex: '#E2E8F0' },
    { name: 'Amber', hex: '#B8860B' }
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
      if (selectedGender !== 'All' && item.gender !== selectedGender && item.gender !== 'Unisex') return false;
      if (selectedShape !== 'All' && item.frameShape !== selectedShape) return false;
      if (selectedStyle !== 'All' && item.style !== selectedStyle) return false;
      if (selectedRim !== 'All' && item.rimType !== selectedRim) return false;
      if (selectedMaterial !== 'All') {
        const itemMat = (item.material || '').toLowerCase();
        if (!itemMat.includes(selectedMaterial.toLowerCase())) return false;
      }
      if (item.price > maxPrice) return false;
      if (selectedColor !== 'All') {
        const hasColor = item.colors?.some((c) =>
          c.name.toLowerCase().includes(selectedColor.toLowerCase().split('/')[0].trim())
        );
        if (!hasColor) return false;
      }
      if (initialSearch) {
        const query = initialSearch.toLowerCase();
        const matchesQuery =
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.material?.toLowerCase().includes(query) ||
          item.style?.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    selectedCategory,
    selectedGender,
    selectedShape,
    selectedStyle,
    selectedMaterial,
    selectedRim,
    selectedColor,
    maxPrice,
    sortBy,
    initialSearch
  ]);

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSelectedGender('All');
    setSelectedShape('All');
    setSelectedSize('All');
    setSelectedColor('All');
    setSelectedStyle('All');
    setSelectedMaterial('All');
    setSelectedRim('All');
    setMaxPrice(5000);
    setSortBy('featured');
    setSearchParams({});
    setOpenDropdownMenu(null);
  };

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedGender !== 'All' ? 1 : 0) +
    (selectedShape !== 'All' ? 1 : 0) +
    (selectedStyle !== 'All' ? 1 : 0) +
    (selectedMaterial !== 'All' ? 1 : 0) +
    (selectedRim !== 'All' ? 1 : 0) +
    (selectedColor !== 'All' ? 1 : 0) +
    (maxPrice < 5000 ? 1 : 0);

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* 1. TOP HEADER BANNER */}
      <div className="bg-[#0A0F1D] text-white py-12 sm:py-16 border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#38BDF8] font-bold block mb-2">
            The Catalog — 2026 Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-white mb-3">
            {selectedCategory === 'All' ? 'Complete Optical Curations' : `${selectedCategory} Collection`}
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
            {categoryDescriptions[selectedCategory] || categoryDescriptions['All']}
          </p>
        </div>
      </div>

      {/* AI Daily Trend & Camera Try-On Bar */}
      <div className="bg-[#0B132B] border-b border-[#1E293B] px-4 py-2.5 text-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping" />
            <span className="font-mono text-[#38BDF8] font-bold uppercase tracking-wider text-[11px]">
              AI Trend Special:
            </span>
            <span className="text-[#E2E8F0] font-medium">
              Tokyo Neo-Acetate 2026 • 98.7% Global Surge
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={openAiTrendModal}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors flex items-center space-x-1.5 cursor-pointer text-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Daily AI GIF</span>
            </button>

            {!isVirtualTryOnActive ? (
              <button
                onClick={openLiveCameraModal}
                className="px-3.5 py-1.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold transition-all flex items-center space-x-1.5 shadow-sm cursor-pointer text-xs"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Take Photo to Wear All Glasses</span>
              </button>
            ) : (
              <button
                onClick={turnOffVirtualTryOn}
                className="px-3.5 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-200 hover:text-white border border-red-500/30 font-bold transition-all flex items-center space-x-1.5 cursor-pointer text-xs"
              >
                <X className="w-3.5 h-3.5" />
                <span>Normal Mode (Turn Off Try-On)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 2. HORIZONTAL MENU VIEW: Top Category Selector & Quick Filters Bar */}
        <div className="space-y-4">
          {/* Main Category Menu Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
            <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#0B4D8C] text-white shadow-md'
                        : 'bg-white hover:bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]'
                    }`}
                  >
                    <span>{cat}</span>
                    {cat === 'Contact Lenses' && (
                      <span className="ml-1.5 text-[9px] bg-[#38BDF8] text-[#072F5F] px-1.5 py-0.2 rounded-full font-extrabold">
                        3
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right: Results Count & 3D Virtual Try-On Launcher */}
            <div className="flex items-center justify-between sm:justify-end space-x-3">
              <span className="text-xs text-[#64748B] font-semibold uppercase tracking-wider">
                Showing <strong className="text-[#0F172A] font-mono">{filteredProducts.length}</strong> creations
              </span>

              {/* 3D Try-On Toggle Button */}
              <button
                onClick={toggleVirtualTryOnMode}
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-sm cursor-pointer border ${
                  isVirtualTryOnActive
                    ? 'bg-[#0284C7] text-white border-[#0B4D8C]'
                    : 'bg-white hover:bg-[#F8FAFC] text-[#0B4D8C] border-[#BAE6FD]'
                }`}
                title="Toggle Virtual Try-On onto your face"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{isVirtualTryOnActive ? 'Try-On Mode: ON' : 'Try-On My Face'}</span>
              </button>
            </div>
          </div>

          {/* Secondary Horizontal Filter Bar (Menu View) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {/* Left Filter Dropdown Menus */}
            <div className="flex flex-wrap items-center gap-2">
              {/* All Filters Drawer Trigger */}
              <button
                onClick={() => setIsFilterDrawerOpen(true)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  activeFilterCount > 0
                    ? 'bg-[#0B4D8C] text-white border-[#0B4D8C] shadow-sm'
                    : 'bg-white hover:bg-[#F8FAFC] text-[#0F172A] border-[#CBD5E1]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : 'Menu'}</span>
              </button>

              {/* Shape Menu Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdownMenu(openDropdownMenu === 'shape' ? null : 'shape')}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-semibold bg-white border transition-colors cursor-pointer ${
                    selectedShape !== 'All' ? 'border-[#0284C7] text-[#0284C7] bg-[#F0F7FF]' : 'border-[#CBD5E1] text-[#475569] hover:border-[#94A3B8]'
                  }`}
                >
                  <span>Shape: {selectedShape}</span>
                  <ChevronDown className="w-3 h-3 ml-1" />
                </button>

                {openDropdownMenu === 'shape' && (
                  <div className="absolute top-full left-0 mt-1.5 w-48 bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl p-2 z-40 animate-in fade-in zoom-in-95 duration-150">
                    {shapes.map((shp) => (
                      <button
                        key={shp}
                        onClick={() => {
                          setSelectedShape(shp);
                          setOpenDropdownMenu(null);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                          selectedShape === shp ? 'bg-[#F0F7FF] text-[#0B4D8C] font-bold' : 'text-[#475569] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        <span>{shp}</span>
                        {selectedShape === shp && <Check className="w-3 h-3 text-[#0284C7]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Gender Menu Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdownMenu(openDropdownMenu === 'gender' ? null : 'gender')}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-semibold bg-white border transition-colors cursor-pointer ${
                    selectedGender !== 'All' ? 'border-[#0284C7] text-[#0284C7] bg-[#F0F7FF]' : 'border-[#CBD5E1] text-[#475569] hover:border-[#94A3B8]'
                  }`}
                >
                  <span>Gender: {selectedGender}</span>
                  <ChevronDown className="w-3 h-3 ml-1" />
                </button>

                {openDropdownMenu === 'gender' && (
                  <div className="absolute top-full left-0 mt-1.5 w-40 bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl p-2 z-40 animate-in fade-in zoom-in-95 duration-150">
                    {genders.map((gen) => (
                      <button
                        key={gen}
                        onClick={() => {
                          setSelectedGender(gen);
                          setOpenDropdownMenu(null);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                          selectedGender === gen ? 'bg-[#F0F7FF] text-[#0B4D8C] font-bold' : 'text-[#475569] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        <span>{gen}</span>
                        {selectedGender === gen && <Check className="w-3 h-3 text-[#0284C7]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Material Menu Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdownMenu(openDropdownMenu === 'material' ? null : 'material')}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-semibold bg-white border transition-colors cursor-pointer ${
                    selectedMaterial !== 'All' ? 'border-[#0284C7] text-[#0284C7] bg-[#F0F7FF]' : 'border-[#CBD5E1] text-[#475569] hover:border-[#94A3B8]'
                  }`}
                >
                  <span>Material: {selectedMaterial}</span>
                  <ChevronDown className="w-3 h-3 ml-1" />
                </button>

                {openDropdownMenu === 'material' && (
                  <div className="absolute top-full left-0 mt-1.5 w-44 bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl p-2 z-40 animate-in fade-in zoom-in-95 duration-150">
                    {materials.map((mat) => (
                      <button
                        key={mat}
                        onClick={() => {
                          setSelectedMaterial(mat);
                          setOpenDropdownMenu(null);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                          selectedMaterial === mat ? 'bg-[#F0F7FF] text-[#0B4D8C] font-bold' : 'text-[#475569] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        <span>{mat}</span>
                        {selectedMaterial === mat && <Check className="w-3 h-3 text-[#0284C7]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Sort Selection */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-[#64748B] uppercase tracking-wider font-semibold">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs text-[#0F172A] font-semibold focus:outline-none focus:border-[#0284C7] shadow-sm cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="newest">Newest Additions</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFilterCount > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-[#64748B] uppercase font-bold mr-1">Active:</span>

              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center bg-white border border-[#BAE6FD] px-2.5 py-1 rounded-lg text-xs font-semibold text-[#0369A1]">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')} className="ml-1.5 text-[#0284C7] hover:text-[#0B4D8C]">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedShape !== 'All' && (
                <span className="inline-flex items-center bg-white border border-[#CBD5E1] px-2.5 py-1 rounded-lg text-xs font-semibold text-[#1E293B]">
                  Shape: {selectedShape}
                  <button onClick={() => setSelectedShape('All')} className="ml-1.5 text-[#64748B] hover:text-black">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedGender !== 'All' && (
                <span className="inline-flex items-center bg-white border border-[#CBD5E1] px-2.5 py-1 rounded-lg text-xs font-semibold text-[#1E293B]">
                  Gender: {selectedGender}
                  <button onClick={() => setSelectedGender('All')} className="ml-1.5 text-[#64748B] hover:text-black">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedMaterial !== 'All' && (
                <span className="inline-flex items-center bg-white border border-[#CBD5E1] px-2.5 py-1 rounded-lg text-xs font-semibold text-[#1E293B]">
                  Material: {selectedMaterial}
                  <button onClick={() => setSelectedMaterial('All')} className="ml-1.5 text-[#64748B] hover:text-black">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedStyle !== 'All' && (
                <span className="inline-flex items-center bg-white border border-[#CBD5E1] px-2.5 py-1 rounded-lg text-xs font-semibold text-[#1E293B]">
                  Style: {selectedStyle}
                  <button onClick={() => setSelectedStyle('All')} className="ml-1.5 text-[#64748B] hover:text-black">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={resetAllFilters}
                className="text-xs uppercase text-[#EF4444] hover:underline ml-2 font-bold flex items-center space-x-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3 mr-1" /> Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* 3. FULL-WIDTH PRODUCT GRID (No heavy left sidebar covering room!) */}
        <div className="pt-8">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#E2E8F0] shadow-sm max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-[#F0F7FF] text-[#0284C7] flex items-center justify-center mx-auto mb-4">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">No Matching Eyewear Found</h3>
              <p className="text-xs text-[#64748B] mb-6">
                Try loosening your filters or browse all creations.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-6 py-2.5 bg-[#0B4D8C] hover:bg-[#0284C7] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. SLIDE-OVER ALL-FILTERS MENU DRAWER */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-5 h-5 text-[#0B4D8C]" />
                <h3 className="font-bold text-base text-[#0F172A]">Filter Curations</h3>
                {activeFilterCount > 0 && (
                  <span className="text-[10px] bg-[#0284C7] text-white px-2 py-0.5 rounded-full font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-2 text-[#64748B] hover:text-[#0F172A] rounded-xl hover:bg-[#F1F5F9] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Category */}
              <div>
                <h4 className="font-bold uppercase tracking-wider text-[#0F172A] mb-3">Category</h4>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        selectedCategory === cat
                          ? 'border-[#0B4D8C] bg-[#F0F7FF] text-[#0B4D8C] font-bold'
                          : 'border-[#E2E8F0] text-[#475569] hover:border-[#CBD5E1]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Frame Shape */}
              <div>
                <h4 className="font-bold uppercase tracking-wider text-[#0F172A] mb-3">Frame Shape</h4>
                <div className="grid grid-cols-3 gap-2">
                  {shapes.map((shape) => (
                    <button
                      key={shape}
                      onClick={() => setSelectedShape(shape)}
                      className={`p-2 rounded-xl text-center border transition-all ${
                        selectedShape === shape
                          ? 'border-[#0B4D8C] bg-[#F0F7FF] text-[#0B4D8C] font-bold'
                          : 'border-[#E2E8F0] text-[#475569] hover:border-[#CBD5E1]'
                      }`}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div>
                <h4 className="font-bold uppercase tracking-wider text-[#0F172A] mb-3">Material Story</h4>
                <div className="grid grid-cols-2 gap-2">
                  {materials.map((mat) => (
                    <button
                      key={mat}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`p-2 rounded-xl text-left border transition-all ${
                        selectedMaterial === mat
                          ? 'border-[#0B4D8C] bg-[#F0F7FF] text-[#0B4D8C] font-bold'
                          : 'border-[#E2E8F0] text-[#475569] hover:border-[#CBD5E1]'
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div>
                <h4 className="font-bold uppercase tracking-wider text-[#0F172A] mb-3">Gender</h4>
                <div className="grid grid-cols-4 gap-2">
                  {genders.map((gen) => (
                    <button
                      key={gen}
                      onClick={() => setSelectedGender(gen)}
                      className={`p-2 rounded-xl text-center border transition-all ${
                        selectedGender === gen
                          ? 'border-[#0B4D8C] bg-[#F0F7FF] text-[#0B4D8C] font-bold'
                          : 'border-[#E2E8F0] text-[#475569] hover:border-[#CBD5E1]'
                      }`}
                    >
                      {gen}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold uppercase tracking-wider text-[#0F172A]">Price Ceiling</h4>
                  <span className="font-mono font-bold text-[#0B4D8C]">Up to ₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="5000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#0B4D8C]"
                />
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-[#E2E8F0] flex items-center space-x-3 bg-[#F8FAFC]">
              <button
                onClick={resetAllFilters}
                className="flex-1 py-2.5 rounded-xl border border-[#CBD5E1] text-[#475569] font-bold text-xs uppercase tracking-wider hover:bg-white"
              >
                Reset All
              </button>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#0B4D8C] hover:bg-[#0284C7] text-white font-bold text-xs uppercase tracking-wider shadow-md"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
