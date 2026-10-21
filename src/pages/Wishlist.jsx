import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { wishlist, products, addToCart, toggleWishlist, showToast } = useShop();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    savedProducts.forEach((p) => {
      addToCart(p);
    });
    showToast(`Added ${savedProducts.length} saved frames to your bag.`);
  };

  return (
    <div className="bg-[#FBF9F5] min-h-screen text-[#171717] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-[#ECE6DC] mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#8C847A] font-semibold block mb-1">
              Personal Moodboard
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717]">
              Saved Wishlist ({savedProducts.length})
            </h1>
          </div>

          {savedProducts.length > 0 && (
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <button
                onClick={handleMoveAllToCart}
                className="px-6 py-3 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#141414] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All To Bag</span>
              </button>
            </div>
          )}
        </div>

        {/* Empty state or Grid */}
        {savedProducts.length === 0 ? (
          <div className="py-24 text-center bg-white border border-[#ECE6DC] p-12 max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-[#9E968E] flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl text-[#171717]">Your Wishlist is Empty</h3>
            <p className="text-xs text-[#7A736B]">
              Explore our architectural catalog to save frames for virtual try-on and comparison.
            </p>
            <Link
              to="/shop"
              className="inline-block px-8 py-3.5 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#141414] text-xs font-semibold uppercase tracking-widest transition-colors mt-2"
            >
              Explore Eyewear
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
