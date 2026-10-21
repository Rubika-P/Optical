import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, ChevronDown, Check, ArrowUpDown, Sparkles, RefreshCw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters from URL or State
  const initialCategory = searchParams.get('category') || 'All';
  const initialFilter = searchParams.get('filter') || 'all';
  const initialStyle = searchParams.get('style') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedShape, setSelectedShape] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState(initialStyle);
  const [selectedRim, setSelectedRim] = useState('All');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state if URL changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const sty = searchParams.get('style');
    if (sty) setSelectedStyle(sty);
  }, [searchParams]);

  // Categories list
  const categories = ['All', 'Eyeglasses', 'Sunglasses', 'Contact Lenses'];
  const genders = ['All', 'Unisex', 'Women', 'Men'];
  const shapes = ['All', 'Round', 'Square', 'Rectangle', 'Cat Eye', 'Aviator', 'Geometric', 'Oval'];
  const sizes = ['All', 'Small', 'Medium', 'Large'];
  const styles = ['All', 'Minimal', 'Classic', 'Trendy', 'Professional', 'Bold', 'Vintage'];
  const rims = ['All', 'Full Rim', 'Half Rim', 'Rimless'];
  const colors = [
    { name: 'All', hex: '' },
    { name: 'Black', hex: '#141414' },
    { name: 'Gold', hex: '#C5A880' },
    { name: 'Silver', hex: '#D8D880' },
    { name: 'Tortoise', hex: '#6D4C41' },
    { name: 'Crystal / Clear', hex: '#F0F0F0' },
    { name: 'Amber', hex: '#B8860B' }
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category Filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
      // Gender Filter
      if (selectedGender !== 'All' && item.gender !== selectedGender && item.gender !== 'Unisex') return false;
      // Shape Filter
      if (selectedShape !== 'All' && item.frameShape !== selectedShape) return false;
      // Size Filter
      if (selectedSize !== 'All' && item.frameSize !== selectedSize) return false;
      // Style Filter
      if (selectedStyle !== 'All' && item.style !== selectedStyle) return false;
      // Rim Filter
      if (selectedRim !== 'All' && item.rimType !== selectedRim) return false;
      // Price Filter
      if (item.price > maxPrice) return false;
      // Color Filter
      if (selectedColor !== 'All') {
        const hasColor = item.colors?.some((c) =>
          c.name.toLowerCase().includes(selectedColor.toLowerCase().split('/')[0].trim())
        );
        if (!hasColor) return false;
      }
      // Search Query
      if (initialSearch) {
        const query = initialSearch.toLowerCase();
        const matchesQuery =
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.material.toLowerCase().includes(query) ||
          item.style.toLowerCase().includes(query);
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
    selectedSize,
    selectedColor,
    selectedStyle,
    selectedRim,
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
    setSelectedRim('All');
    setMaxPrice(5000);
    setSortBy('featured');
    setSearchParams({});
  };

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedGender !== 'All' ? 1 : 0) +
    (selectedShape !== 'All' ? 1 : 0) +
    (selectedSize !== 'All' ? 1 : 0) +
    (selectedColor !== 'All' ? 1 : 0) +
    (selectedStyle !== 'All' ? 1 : 0) +
    (selectedRim !== 'All' ? 1 : 0) +
    (maxPrice < 5000 ? 1 : 0);

  return (
    <div className="bg-[#FBF9F5] min-h-screen">
      {/* Top Banner Header */}
      <div className="bg-[#171717] text-white py-14 sm:py-20 border-b border-[#2C2C2C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold block mb-2">
            The Catalog · 2026 Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-wide text-white mb-3">
            {selectedCategory === 'All' ? 'Complete Eyewear Collection' : `${selectedCategory} Collection`}
          </h1>
          <p className="text-xs sm:text-sm text-[#B0A79B] max-w-xl mx-auto">
            Architectural frames engineered for weightless balance, optical clarity and timeless presence.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#ECE6DC] gap-4">
          {/* Active stats & Mobile Filter Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-[#FAF7F2] border border-[#DCD3C5] text-xs font-semibold uppercase tracking-wider text-[#171717]"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters ({activeFilterCount})</span>
            </button>

            <span className="text-xs text-[#6B655F] uppercase tracking-wider font-medium">
              Showing <strong className="text-[#171717] font-mono">{filteredProducts.length}</strong> creations
            </span>
          </div>

          {/* Quick Category Buttons & Sort Selection */}
          <div className="flex items-center justify-between sm:justify-end space-x-4">
            {/* Quick Category Pills */}
            <div className="hidden sm:flex items-center space-x-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#171717] text-white'
                      : 'text-[#6B655F] hover:text-[#171717]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-[#7A736B] uppercase tracking-wider font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#DCD3C5] px-3 py-2 text-xs text-[#171717] font-medium focus:outline-none focus:border-[#171717]"
              >
                <option value="featured">Featured Curations</option>
                <option value="newest">Newest Additions</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Tags */}
        {activeFilterCount > 0 && (
          <div className="pt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#8C847A] uppercase font-medium mr-1">Active:</span>
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center bg-[#FAF7F2] border border-[#DCD3C5] px-2.5 py-1 text-xs text-[#171717]">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('All')} className="ml-1.5 text-[#8C847A] hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedGender !== 'All' && (
              <span className="inline-flex items-center bg-[#FAF7F2] border border-[#DCD3C5] px-2.5 py-1 text-xs text-[#171717]">
                Gender: {selectedGender}
                <button onClick={() => setSelectedGender('All')} className="ml-1.5 text-[#8C847A] hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedShape !== 'All' && (
              <span className="inline-flex items-center bg-[#FAF7F2] border border-[#DCD3C5] px-2.5 py-1 text-xs text-[#171717]">
                Shape: {selectedShape}
                <button onClick={() => setSelectedShape('All')} className="ml-1.5 text-[#8C847A] hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedStyle !== 'All' && (
              <span className="inline-flex items-center bg-[#FAF7F2] border border-[#DCD3C5] px-2.5 py-1 text-xs text-[#171717]">
                Style: {selectedStyle}
                <button onClick={() => setSelectedStyle('All')} className="ml-1.5 text-[#8C847A] hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedRim !== 'All' && (
              <span className="inline-flex items-center bg-[#FAF7F2] border border-[#DCD3C5] px-2.5 py-1 text-xs text-[#171717]">
                Rim: {selectedRim}
                <button onClick={() => setSelectedRim('All')} className="ml-1.5 text-[#8C847A] hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={resetAllFilters}
              className="text-xs uppercase text-[#C53929] hover:underline ml-2 font-medium flex items-center space-x-1"
            >
              <RefreshCw className="w-3 h-3 mr-1" /> Clear All Filters
            </button>
          </div>
        )}

        {/* Main Body Grid with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          {/* Desktop Filter Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-6 border-r border-[#ECE6DC]">
            {/* Category Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#171717] mb-3">
                Category
              </h4>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left text-xs py-1 transition-colors ${
                      selectedCategory === cat
                        ? 'font-bold text-[#171717]'
                        : 'text-[#6B655F] hover:text-[#171717]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Frame Shape */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#171717] mb-3">
                Frame Shape
              </h4>
              <div className="grid grid-cols-2 gap-1.5">
                {shapes.map((shape) => (
                  <button
                    key={shape}
                    onClick={() => setSelectedShape(shape)}
                    className={`text-left text-xs py-1.5 px-2 border transition-all ${
                      selectedShape === shape
                        ? 'bg-[#171717] text-white border-[#171717]'
                        : 'bg-white text-[#57534E] border-[#E0D8CB] hover:border-[#171717]'
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#171717] mb-3">
                Gender
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {genders.map((gen) => (
                  <button
                    key={gen}
                    onClick={() => setSelectedGender(gen)}
                    className={`text-xs py-1.5 px-3 border transition-colors ${
                      selectedGender === gen
                        ? 'bg-[#171717] text-white border-[#171717]'
                        : 'bg-white text-[#57534E] border-[#E0D8CB] hover:border-[#171717]'
                    }`}
                  >
                    {gen}
                  </button>
                ))}
              </div>
            </div>

            {/* Design Style */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#171717] mb-3">
                Design Style
              </h4>
              <div className="grid grid-cols-2 gap-1.5">
                {styles.map((style) => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`text-left text-xs py-1.5 px-2 border transition-all ${
                      selectedStyle === style
                        ? 'bg-[#171717] text-white border-[#171717]'
                        : 'bg-white text-[#57534E] border-[#E0D8CB] hover:border-[#171717]'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Rim Architecture */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#171717] mb-3">
                Rim Type
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {rims.map((rim) => (
                  <button
                    key={rim}
                    onClick={() => setSelectedRim(rim)}
                    className={`text-xs py-1.5 px-3 border transition-colors ${
                      selectedRim === rim
                        ? 'bg-[#171717] text-white border-[#171717]'
                        : 'bg-white text-[#57534E] border-[#E0D8CB] hover:border-[#171717]'
                    }`}
                  >
                    {rim}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#171717] mb-2">
                <span>Max Price:</span>
                <span className="font-mono text-[#8B6B3F]">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#171717] bg-[#E8E1D5] h-1.5 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8C847A] mt-1 font-mono">
                <span>₹500</span>
                <span>₹5,000</span>
              </div>
            </div>
          </aside>

          {/* Products Grid (9 cols) */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center bg-white border border-[#ECE6DC] p-12">
                <Sparkles className="w-8 h-8 text-[#C5A880] mx-auto mb-3" />
                <h3 className="font-serif text-2xl text-[#171717] mb-2">
                  No frames match your exact filters
                </h3>
                <p className="text-xs text-[#7A736B] max-w-sm mx-auto mb-6">
                  Try adjusting the shape, rim type or price range to discover our other silhouettes.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-6 py-3 bg-[#171717] text-white hover:bg-[#C5A880] hover:text-[#141414] text-xs font-semibold uppercase tracking-widest transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto max-w-xs w-full bg-[#FBF9F5] shadow-2xl z-50 flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#ECE6DC]">
                <h3 className="font-serif text-xl font-medium text-[#171717]">Refine Catalog</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-[#6B655F]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-6">
                {/* Category */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-[#171717] mb-2">Category</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-xs py-1.5 px-3 border ${
                          selectedCategory === cat ? 'bg-[#171717] text-white' : 'bg-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Shape */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-[#171717] mb-2">Frame Shape</h4>
                  <div className="grid grid-cols-2 gap-1.5">
                    {shapes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedShape(s)}
                        className={`text-xs py-1.5 px-2 text-left border ${
                          selectedShape === s ? 'bg-[#171717] text-white' : 'bg-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-[#171717] mb-2">
                    Max Price: ₹{maxPrice.toLocaleString('en-IN')}
                  </h4>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="100"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#171717]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#ECE6DC]">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-[#171717] text-white text-xs font-semibold uppercase tracking-widest"
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
