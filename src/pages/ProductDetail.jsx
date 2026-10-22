import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Star, ShieldCheck, Truck, RefreshCw, Sparkles, Check, ChevronRight, Eye, Ruler, HelpCircle, ArrowRight, Box, Image as ImageIcon } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import ThreeGlassesViewer from '../components/ThreeGlassesViewer';
import ProductImage from '../components/ProductImage';


const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, wishlist, toggleWishlist, setTryOnProduct, openCustomizer } = useShop();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [selectedPrescription, setSelectedPrescription] = useState('Non-prescription (Plano / Fashion)');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs', 'fit', 'shipping', 'reviews'
  const [viewMode, setViewMode] = useState('photos'); // 'photos' or '3d'

  // Scroll to top on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedColorIdx(0);
    setActiveImageIdx(0);
    setSelectedSize(product.frameSize || 'Medium');
  }, [id, product]);

  const currentColor = product.colors?.[selectedColorIdx] || product.colors?.[0];
  const isSaved = wishlist.includes(product.id);

  // Gallery image options (Current color, hover lifestyle, extra angles)
  const galleryImages = [
    currentColor?.image || product.image,
    product.hoverImage || product.image,
    "https://images.unsplash.com/photo-1591076482161-42ce6da69f68?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85"
  ];

  const prescriptionOptions = [
    { name: 'Non-prescription (Plano / Fashion)', price: '+₹0', desc: 'Standard high-clarity lenses with anti-scratch coating.' },
    { name: 'Digital Blue-Light Shield', price: '+₹499', desc: 'Blocks 99.9% of harmful blue-violet light from digital screens.' },
    { name: 'Single Vision (Distance or Reading)', price: '+₹799', desc: 'Custom prescription surfaced with hydrophobic coating.' },
    { name: 'Transitions® Light Intelligent', price: '+₹1,299', desc: 'Seamlessly shifts from crystal clear indoors to dark outdoors.' },
    { name: 'High-Index Ultra Thin (1.67)', price: '+₹1,599', desc: 'Recommended for stronger prescriptions (above +/- 3.50).' }
  ];

  const handleAddToCart = () => {
    addToCart(product, {
      color: currentColor?.name,
      size: selectedSize,
      prescription: selectedPrescription,
      image: galleryImages[0],
      quantity
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  // Related products
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="bg-[#FBF9F5] text-[#171717] min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#ECE6DC] text-xs text-[#7A736B]">
        <div className="flex items-center space-x-2">
          <Link to="/" className="hover:text-black">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-black">Eyewear</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/shop?category=${product.category}`} className="hover:text-black">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#171717] font-semibold">{product.name}</span>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left: Interactive Image Gallery & 3D AR Model View (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* View Mode Toggle Tabs */}
            <div className="flex items-center justify-between bg-[#F4EFEB] p-1 border border-[#E0D8CB] self-start space-x-1">
              <button
                type="button"
                onClick={() => setViewMode('photos')}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold flex items-center space-x-1.5 transition-all ${
                  viewMode === 'photos'
                    ? 'bg-white text-[#171717] shadow-sm'
                    : 'text-[#6B655F] hover:text-[#171717]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Editorial Photos</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('3d')}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold flex items-center space-x-1.5 transition-all ${
                  viewMode === '3d'
                    ? 'bg-[#171717] text-[#C5A880] shadow-sm'
                    : 'text-[#6B655F] hover:text-[#171717]'
                }`}
              >
                <Box className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>3D AR Model (360°)</span>
              </button>
            </div>

            {viewMode === '3d' ? (
              /* 3D WebGL Model Interactive Viewer */
              <div className="w-full aspect-[4/3] sm:aspect-square bg-[#0D0D0D] border border-[#262626] overflow-hidden shadow-lg">
                <ThreeGlassesViewer
                  product={product}
                  selectedColor={currentColor}
                  height="100%"
                />
              </div>
            ) : (
              /* 2D Image Gallery */
              <div className="flex flex-col-reverse md:flex-row gap-4">
                {/* Thumbnails list */}
                <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar max-h-[580px]">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-[#ECE6DC] border transition-all overflow-hidden ${
                        activeImageIdx === idx
                          ? 'border-[#171717] ring-1 ring-[#171717]'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Main Stage Image */}
                <div className="flex-1 relative aspect-[4/3] sm:aspect-square bg-[#F4EFEB] border border-[#ECE6DC] overflow-hidden group">
                  <ProductImage
                    src={galleryImages[activeImageIdx]}
                    alt={product.name}
                    frameShape={product.frameShape}
                    aspectRatio="aspect-[4/3] sm:aspect-square"
                    imgClassName="group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Wishlist Button floating on image */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-colors ${
                      isSaved ? 'bg-[#171717] text-[#C5A880]' : 'bg-white/80 hover:bg-white text-[#171717]'
                    }`}
                    title="Save to wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isSaved ? 'fill-[#C5A880]' : ''}`} />
                  </button>

                  {/* Clinical Quality Assurance Pill */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#0284C7]/30 text-xs font-bold text-[#0B4D8C] flex items-center space-x-2 shadow-lg">
                    <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
                    <span>Certified Grand Opticals Optical Precision</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Product Purchase Controls & Customizer (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#7D766E] mb-2">
                <span>{product.category} · {product.material}</span>
                <span className="flex items-center font-medium text-[#171717]">
                  <Star className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880] mr-1" />
                  {product.rating} ({product.reviews} client reviews)
                </span>
              </div>

              {/* Product Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#171717] leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-[#736C65] font-light mt-1 mb-4">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="flex items-baseline space-x-3 pb-6 border-b border-[#ECE6DC]">
                <span className="text-3xl font-medium text-[#171717]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.oldPrice && (
                  <span className="text-base text-[#9E968E] line-through">
                    ₹{product.oldPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 uppercase tracking-wider font-semibold">
                  Free Express Shipping
                </span>
              </div>

              {/* Color Selection */}
              <div className="py-5 border-b border-[#ECE6DC]">
                <div className="flex items-center justify-between text-xs tracking-wider uppercase mb-3">
                  <span className="font-semibold text-[#171717]">
                    Frame Finish: <strong className="text-[#8B6B3F]">{currentColor?.name}</strong>
                  </span>
                  <span className="text-[11px] text-[#8C847A]">{product.colors?.length} options</span>
                </div>
                <div className="flex items-center space-x-3">
                  {product.colors?.map((col, idx) => (
                    <button
                      key={col.name}
                      onClick={() => {
                        setSelectedColorIdx(idx);
                        setActiveImageIdx(0);
                      }}
                      className={`relative w-9 h-9 rounded-full border transition-all ${
                        selectedColorIdx === idx
                          ? 'ring-2 ring-offset-2 ring-[#171717] scale-105'
                          : 'border-black/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      {selectedColorIdx === idx && (
                        <Check className="w-4 h-4 absolute inset-0 m-auto text-white drop-shadow" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Frame Size Selection */}
              <div className="py-5 border-b border-[#ECE6DC]">
                <div className="flex items-center justify-between text-xs tracking-wider uppercase mb-3">
                  <span className="font-semibold text-[#171717]">Frame Sizing</span>
                  <span className="text-[11px] text-[#6B655F] flex items-center">
                    <Ruler className="w-3 h-3 mr-1" /> Lens: {product.details?.lensWidth} · Bridge: {product.details?.bridgeWidth}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {['Small', 'Medium', 'Large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-xs uppercase tracking-wider font-medium border transition-all ${
                        selectedSize === size
                          ? 'bg-[#171717] text-white border-[#171717] shadow-sm'
                          : 'bg-white text-[#4A4744] border-[#E0D8CB] hover:border-[#171717]'
                      }`}
                    >
                      {size} Fit
                    </button>
                  ))}
                </div>
              </div>

              {/* Prescription / Lens Selection */}
              <div className="py-5 border-b border-[#ECE6DC]">
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-2">
                  Optical Lens Configuration
                </label>
                <select
                  value={selectedPrescription}
                  onChange={(e) => setSelectedPrescription(e.target.value)}
                  className="w-full bg-white border border-[#DCD3C5] px-3.5 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                >
                  {prescriptionOptions.map((opt) => (
                    <option key={opt.name} value={opt.name}>
                      {opt.name} ({opt.price})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-[#7A736B] mt-2 italic">
                  Prescription values (Sphere, Cylinder, Axis) can be uploaded or entered after checkout.
                </p>
              </div>

              {/* Quantity and Primary CTAs */}
              <div className="pt-6 space-y-3">
                <div className="flex items-center space-x-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#DCD3C5] bg-white h-12">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 h-full text-sm text-[#171717] hover:bg-[#F2EDE4]"
                    >
                      -
                    </button>
                    <span className="px-4 h-full flex items-center justify-center text-xs font-mono font-semibold min-w-[2.5rem]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 h-full text-sm text-[#171717] hover:bg-[#F2EDE4]"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 h-12 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#141414] text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center cursor-pointer"
                  >
                    Add To Shopping Bag
                  </button>
                </div>

                {/* 360 Bespoke Atelier Customizer */}
                <button
                  type="button"
                  onClick={() => openCustomizer(product)}
                  className="w-full h-12 bg-gradient-to-r from-[#171717] to-[#26211A] hover:from-[#C5A880] hover:to-[#B39264] text-[#C5A880] hover:text-[#141414] border border-[#C5A880]/60 text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>360° Bespoke Atelier (Custom Lenses & Monogram)</span>
                </button>

                {/* AR Virtual Try-On Direct Button */}
                <button
                  type="button"
                  onClick={() => setTryOnProduct(product)}
                  className="w-full h-12 bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#141414] border border-[#C5A880] text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#C5A880]" />
                  <span>Try On in AR Studio (Camera & 3D)</span>
                </button>

                {/* Buy Now Direct */}
                <button
                  onClick={handleBuyNow}
                  className="w-full h-12 bg-[#C5A880] hover:bg-[#B39264] text-[#141414] text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                >
                  <span>Express Checkout · ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Complimentary Services Badges */}
              <div className="mt-6 pt-6 border-t border-[#ECE6DC] grid grid-cols-3 gap-2 text-[11px] text-[#7A736B]">
                <div className="flex items-center space-x-1.5">
                  <Truck className="w-4 h-4 text-[#8B6B3F] flex-shrink-0" />
                  <span>Free Insured Delivery</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <RefreshCw className="w-4 h-4 text-[#8B6B3F] flex-shrink-0" />
                  <span>30-Day In-Home Trial</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#8B6B3F] flex-shrink-0" />
                  <span>2-Year Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Specs, Fit Guide, Shipping, Customer Reviews */}
        <div className="mt-20 pt-10 border-t border-[#ECE6DC]">
          {/* Tabs bar */}
          <div className="flex items-center space-x-8 border-b border-[#ECE6DC] text-xs uppercase tracking-widest font-semibold pb-4">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2 transition-colors ${
                activeTab === 'specs' ? 'text-[#171717] border-b-2 border-[#171717]' : 'text-[#8C847A] hover:text-[#171717]'
              }`}
            >
              Frame Architecture & Specs
            </button>
            <button
              onClick={() => setActiveTab('fit')}
              className={`pb-2 transition-colors ${
                activeTab === 'fit' ? 'text-[#171717] border-b-2 border-[#171717]' : 'text-[#8C847A] hover:text-[#171717]'
              }`}
            >
              Fit & Face Compatibility
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-2 transition-colors ${
                activeTab === 'shipping' ? 'text-[#171717] border-b-2 border-[#171717]' : 'text-[#8C847A] hover:text-[#171717]'
              }`}
            >
              Complimentary Services
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-2 transition-colors ${
                activeTab === 'reviews' ? 'text-[#171717] border-b-2 border-[#171717]' : 'text-[#8C847A] hover:text-[#171717]'
              }`}
            >
              Reviews ({product.reviews})
            </button>
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl text-[#171717]">Architectural Description</h3>
                  <p className="text-[#6B655F] leading-relaxed text-sm">
                    {product.description}
                  </p>
                  <p className="text-[#6B655F] leading-relaxed">
                    Sculpted by generational artisans in {product.details?.origin}. Every bevel is diamond-buffed and calibrated for optimal optical center placement.
                  </p>
                </div>

                <div className="bg-white p-6 border border-[#ECE6DC] space-y-3">
                  <h4 className="font-semibold uppercase tracking-wider text-[#171717] mb-2">Technical Dimensions</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="border-b border-[#F0ECE4] pb-2">
                      <span className="text-[#8C847A]">Lens Width:</span>
                      <p className="font-mono font-semibold text-[#171717]">{product.details?.lensWidth}</p>
                    </div>
                    <div className="border-b border-[#F0ECE4] pb-2">
                      <span className="text-[#8C847A]">Bridge Width:</span>
                      <p className="font-mono font-semibold text-[#171717]">{product.details?.bridgeWidth}</p>
                    </div>
                    <div className="border-b border-[#F0ECE4] pb-2">
                      <span className="text-[#8C847A]">Temple Length:</span>
                      <p className="font-mono font-semibold text-[#171717]">{product.details?.templeLength}</p>
                    </div>
                    <div className="border-b border-[#F0ECE4] pb-2">
                      <span className="text-[#8C847A]">Total Frame Width:</span>
                      <p className="font-mono font-semibold text-[#171717]">{product.details?.frameWidth}</p>
                    </div>
                    <div className="border-b border-[#F0ECE4] pb-2">
                      <span className="text-[#8C847A]">Weight:</span>
                      <p className="font-mono font-semibold text-[#171717]">{product.details?.weight}</p>
                    </div>
                    <div className="border-b border-[#F0ECE4] pb-2">
                      <span className="text-[#8C847A]">Origin of Assembly:</span>
                      <p className="font-semibold text-[#171717]">{product.details?.origin}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'fit' && (
              <div className="bg-white p-8 border border-[#ECE6DC] space-y-4 text-xs">
                <h3 className="font-serif text-2xl text-[#171717]">Face Shape Affinity</h3>
                <p className="text-sm text-[#6B655F]">
                  The <strong>{product.name}</strong> is designed to complement faces with <strong>{product.faceShapes?.join(', ')}</strong> facial architecture.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div className="p-4 bg-[#FAF7F2] border border-[#EADBCA]">
                    <h5 className="font-semibold text-[#171717] uppercase mb-1">Bridge & Nose Fit</h5>
                    <p className="text-[#6B655F]">Adjustable medical-grade Japanese silicone nose pads prevent slippage and distribute frame weight evenly.</p>
                  </div>
                  <div className="p-4 bg-[#FAF7F2] border border-[#EADBCA]">
                    <h5 className="font-semibold text-[#171717] uppercase mb-1">Temple Tension</h5>
                    <p className="text-[#6B655F]">Flexible beta-titanium temples provide gentle hugging tension without temple pressure headaches.</p>
                  </div>
                  <div className="p-4 bg-[#FAF7F2] border border-[#EADBCA]">
                    <h5 className="font-semibold text-[#171717] uppercase mb-1">Optical Centering</h5>
                    <p className="text-[#6B655F]">Optimized vertical lens height accommodates both single-vision and progressive prescription corridors.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div className="bg-white p-6 border border-[#ECE6DC]">
                  <Truck className="w-6 h-6 text-[#C5A880] mb-3" />
                  <h4 className="font-serif text-lg text-[#171717] mb-1">Complimentary Delivery</h4>
                  <p className="text-[#6B655F]">DHL Express insured 2-4 business day shipping worldwide with real-time tracking.</p>
                </div>
                <div className="bg-white p-6 border border-[#ECE6DC]">
                  <RefreshCw className="w-6 h-6 text-[#C5A880] mb-3" />
                  <h4 className="font-serif text-lg text-[#171717] mb-1">30-Day Risk-Free Trial</h4>
                  <p className="text-[#6B655F]">Wear them in your daily routine. If you don't adore the fit, return them for a 100% refund.</p>
                </div>
                <div className="bg-white p-6 border border-[#ECE6DC]">
                  <ShieldCheck className="w-6 h-6 text-[#C5A880] mb-3" />
                  <h4 className="font-serif text-lg text-[#171717] mb-1">2-Year Guarantee</h4>
                  <p className="text-[#6B655F]">Covers structural integrity, titanium welding, hinge screws, and anti-reflective lens coating.</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="bg-white p-8 border border-[#ECE6DC] space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-[#ECE6DC]">
                  <div>
                    <h3 className="font-serif text-3xl text-[#171717]">{product.rating} / 5.0</h3>
                    <p className="text-xs text-[#7A736B]">Based on {product.reviews} verified client reviews</p>
                  </div>
                  <div className="flex text-[#C5A880] text-xl">
                    ★★★★★
                  </div>
                </div>

                <div className="space-y-4 divide-y divide-[#F0ECE4]">
                  <div className="pt-4 first:pt-0">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-[#171717]">Laurent M. · Verified Buyer</span>
                      <span className="text-[#9E968E]">3 weeks ago</span>
                    </div>
                    <div className="text-[#C5A880] text-xs mb-1">★★★★★</div>
                    <p className="text-xs text-[#57534E]">
                      "The craftsmanship on this frame is extraordinary. The titanium feels virtually weightless on the nose bridge even during 12-hour workdays."
                    </p>
                  </div>

                  <div className="pt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-[#171717]">Sarah K. · Verified Buyer</span>
                      <span className="text-[#9E968E]">1 month ago</span>
                    </div>
                    <div className="text-[#C5A880] text-xs mb-1">★★★★★</div>
                    <p className="text-xs text-[#57534E]">
                      "The amber tint lenses are so crisp for screen glare and sunny days. Received so many compliments in the studio."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* You May Also Like */}
        <div className="mt-20 pt-12 border-t border-[#ECE6DC]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#171717]">
              You May Also Like
            </h3>
            <Link to="/shop" className="text-xs uppercase tracking-wider font-semibold text-[#8B6B3F] hover:underline flex items-center">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
