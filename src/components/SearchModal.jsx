import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setResults(PRODUCTS.slice(0, 4));
      return;
    }
    const query = searchTerm.toLowerCase();
    const filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.style.toLowerCase().includes(query) ||
        p.frameShape.toLowerCase().includes(query) ||
        p.material.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
    setResults(filtered);
  }, [searchTerm]);

  if (!isSearchOpen) return null;

  const popularSearches = ['Titanium', 'Cat Eye', 'Aviator', 'Bio-Acetate', 'Rimless', 'Sunglasses'];

  const handleSelectProduct = (productId) => {
    setIsSearchOpen(false);
    navigate(`/product/${productId}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center p-4 sm:p-8 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative bg-[#FBF9F5] w-full max-w-3xl border border-[#ECE6DC] shadow-2xl overflow-hidden mt-8 sm:mt-16 animate-in slide-in-from-top-6 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="p-4 sm:p-6 border-b border-[#ECE6DC] flex items-center space-x-3 bg-white">
          <Search className="w-5 h-5 text-[#8F7C66]" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by frame name, shape, material, style (e.g. Titanium, ARC, Sunglasses)..."
            className="w-full bg-transparent text-base sm:text-lg text-[#171717] placeholder-[#A89F91] focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-[#9E968E] hover:text-[#171717]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-[#7A736B] hover:text-[#171717] rounded-full hover:bg-[#F2EDE4]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="px-6 py-3 bg-[#FAF7F2] border-b border-[#ECE6DC] flex items-center space-x-2 overflow-x-auto text-xs">
          <span className="text-[#8C847A] uppercase font-medium flex-shrink-0">Popular:</span>
          {popularSearches.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="px-2.5 py-1 bg-white hover:bg-[#171717] text-[#4A4744] hover:text-white border border-[#E0D8CB] rounded-full transition-colors flex-shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#8C847A] mb-4 font-semibold">
            <span>{searchTerm ? `Results (${results.length})` : 'Curated Highlights'}</span>
            {searchTerm && (
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
                }}
                className="text-[#C5A880] hover:underline flex items-center space-x-1"
              >
                <span>View all results</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <div className="py-12 text-center text-[#7A736B]">
              <p className="text-base font-serif">No optical frames found matching "{searchTerm}"</p>
              <p className="text-xs text-[#A89F91] mt-1">
                Try searching for shapes like "Round", "Square", "Aviator" or materials like "Titanium".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                  className="flex space-x-3 p-3 bg-white border border-[#ECE6DC] hover:border-[#C5A880] hover:shadow-md cursor-pointer transition-all group"
                >
                  <div className="w-16 h-16 bg-[#F4EFEB] flex-shrink-0 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-sm font-medium text-[#171717] group-hover:text-[#9F8259] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-[#7A736B] line-clamp-1">{product.subtitle}</p>
                    </div>

                    <div className="flex items-center justify-between mt-1 text-xs">
                      <span className="font-medium text-[#171717]">${product.price}</span>
                      <span className="text-[10px] text-[#8C847A] uppercase">{product.frameShape}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
