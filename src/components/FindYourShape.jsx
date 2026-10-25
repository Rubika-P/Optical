import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, HelpCircle, X, Phone, MessageSquare, Calendar } from 'lucide-react';

const SHAPES_DATA = {
  Eyeglasses: [
    {
      id: 'rectangle',
      name: 'RECTANGLE',
      searchKey: 'Rectangle',
      image: '/shapes/eyeglasses-rectangle.jpg',
      tag: 'Classic & Sharp',
      desc: 'Balanced proportions for oval and round faces'
    },
    {
      id: 'cateye',
      name: 'CATEYE',
      searchKey: 'Cat Eye',
      image: '/shapes/eyeglasses-cateye.jpg',
      tag: 'Uplifting & Chic',
      desc: 'Subtle upswept corners accentuating cheekbones'
    },
    {
      id: 'aviator',
      name: 'AVIATOR',
      searchKey: 'Aviator',
      image: '/shapes/eyeglasses-aviator.jpg',
      tag: 'Timeless Navigator',
      desc: 'Iconic double-bridge lightweight wireframe'
    },
    {
      id: 'geometric',
      name: 'GEOMETRIC',
      searchKey: 'Geometric',
      image: '/shapes/eyeglasses-geometric.jpg',
      tag: 'Modern Polygonal',
      desc: 'Architectural facets for creative individualists'
    },
    {
      id: 'round',
      name: 'ROUND',
      searchKey: 'Round',
      image: '/shapes/eyeglasses-round.jpg',
      tag: 'Iconic Vintage',
      desc: 'Soft curves that soften angular jawlines'
    },
    {
      id: 'clubmaster',
      name: 'CLUBMASTER',
      searchKey: 'Clubmaster',
      image: '/shapes/eyeglasses-clubmaster.jpg',
      tag: 'Retro Browline',
      desc: 'Bold upper acetate rim with wire lower accent'
    }
  ],
  Sunglasses: [
    {
      id: 'rectangle-sun',
      name: 'RECTANGLE',
      searchKey: 'Rectangle',
      image: '/shapes/sunglasses-rectangle.jpg',
      tag: 'Urban Edge',
      desc: 'Modern 90s silhouette with polarized UV400 lenses'
    },
    {
      id: 'cateye-sun',
      name: 'CATEYE',
      searchKey: 'Cat Eye',
      image: '/shapes/sunglasses-cateye.jpg',
      tag: 'Glamour Silhouette',
      desc: 'Vintage Hollywood winged frames with gradient tint'
    },
    {
      id: 'aviator-sun',
      name: 'AVIATOR',
      searchKey: 'Aviator',
      image: '/shapes/sunglasses-aviator.jpg',
      tag: 'Military Classic',
      desc: 'Teardrop shape with G-15 high-contrast sun lenses'
    },
    {
      id: 'geometric-sun',
      name: 'GEOMETRIC',
      searchKey: 'Geometric',
      image: '/shapes/sunglasses-geometric.jpg',
      tag: 'Runway Statement',
      desc: 'Octagonal tinted lenses with 18k rose gold plating'
    },
    {
      id: 'round-sun',
      name: 'ROUND',
      searchKey: 'Round',
      image: '/shapes/sunglasses-round.jpg',
      tag: 'Boho Minimal',
      desc: 'Circular dark tint sunglasses for relaxed outdoor style'
    },
    {
      id: 'clubmaster-sun',
      name: 'CLUBMASTER',
      searchKey: 'Clubmaster',
      image: '/shapes/sunglasses-clubmaster.jpg',
      tag: 'Vintage Browline',
      desc: 'Mid-century golden era styling with polarized shade'
    }
  ]
};

const FindYourShape = () => {
  const [activeTab, setActiveTab] = useState('Eyeglasses');
  const [hoveredShape, setHoveredShape] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const currentShapes = SHAPES_DATA[activeTab] || SHAPES_DATA.Eyeglasses;

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    const handleResize = () => checkScrollability();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollability, 350);
    }
  };

  const handleShapeClick = (shape) => {
    navigate(`/shop?category=${encodeURIComponent(activeTab)}&shape=${encodeURIComponent(shape.searchKey)}`);
  };

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#E8E6E1] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Top Eyebrow Label */}
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#55504A] mb-2.5">
          SHAPES TRENDING NOW
        </p>

        {/* Big Serif Heading */}
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#111111] leading-tight mb-8">
          Find your shape
        </h2>

        {/* Category Tabs (Eyeglasses / Sunglasses) */}
        <div className="flex items-center space-x-8 sm:space-x-12 border-b border-[#E2DFD8] pb-0">
          {['Eyeglasses', 'Sunglasses'].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                  }
                }}
                className={`pb-3.5 text-xl sm:text-2xl transition-all relative font-normal cursor-pointer select-none ${
                  isActive
                    ? 'font-bold text-[#111111]'
                    : 'text-[#8A857D] hover:text-[#111111]'
                }`}
              >
                <span>{tab}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#111111] rounded-full animate-in fade-in duration-200" />
                )}
              </button>
            );
          })}
        </div>

        {/* Horizontal Carousel Track of Shape Cards */}
        <div className="relative mt-8 sm:mt-10">
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollability}
            className="flex items-stretch space-x-5 sm:space-x-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1"
          >
            {currentShapes.map((shape) => {
              const isHovered = hoveredShape === shape.id;
              return (
                <div
                  key={shape.id}
                  onClick={() => handleShapeClick(shape)}
                  onMouseEnter={() => setHoveredShape(shape.id)}
                  onMouseLeave={() => setHoveredShape(null)}
                  className="w-[240px] sm:w-[270px] lg:w-[290px] flex-shrink-0 cursor-pointer group flex flex-col justify-between select-none"
                >
                  {/* Photo Studio Frame Card */}
                  <div className="relative aspect-square w-full bg-[#F5F5F3] group-hover:bg-[#EFEFEA] transition-all duration-300 overflow-hidden flex items-center justify-center p-3 border border-[#ECEBE6]">
                    <img
                      src={shape.image}
                      alt={`${shape.name} ${activeTab}`}
                      className="w-full h-full object-contain mix-blend-multiply transform transition-transform duration-700 ease-out group-hover:scale-106"
                      loading="lazy"
                    />

                    {/* Subtle Corner Badge */}
                    <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider text-[#736E66] opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded shadow-xs">
                      {shape.tag}
                    </span>
                  </div>

                  {/* Bottom Text & Interactive Arrow */}
                  <div className="pt-3.5 flex items-center justify-between">
                    <span className="text-xs sm:text-[13px] font-bold tracking-[0.18em] uppercase text-[#111111] group-hover:text-[#0B4D8C] transition-colors">
                      {shape.name}
                    </span>

                    {/* Animated Arrow on Hover (Matching the screenshot's 'AVIATOR →') */}
                    <div className="flex items-center text-[#111111] group-hover:text-[#0B4D8C]">
                      <ArrowRight className={`w-4 h-4 transform transition-all duration-300 ${
                        isHovered ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0'
                      }`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Right Carousel Navigation Arrows (matching the screenshot) */}
          <div className="flex items-center justify-end space-x-3 mt-6 sm:mt-8 pt-2">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                canScrollLeft
                  ? 'border-[#262626] text-[#111111] hover:bg-[#111111] hover:text-white shadow-xs'
                  : 'border-[#E0DCD5] text-[#C2BCB2] cursor-not-allowed opacity-40'
              }`}
              aria-label="Previous frame shapes"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2]" />
            </button>

            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                canScrollRight
                  ? 'border-[#262626] text-[#111111] hover:bg-[#111111] hover:text-white shadow-xs'
                  : 'border-[#E0DCD5] text-[#C2BCB2] cursor-not-allowed opacity-40'
              }`}
              aria-label="Next frame shapes"
            >
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Help / Support Widget in Bottom Right (matching the '?' button in screenshot) */}
      <div className="fixed bottom-6 right-6 z-40">
        {isHelpOpen && (
          <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] p-5 animate-in fade-in slide-in-from-bottom-3 duration-200 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9] mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#072F5F] text-[#38BDF8] flex items-center justify-center font-bold text-xs">
                  GO
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">Grand Opticals Help</h4>
                  <p className="text-[10px] text-[#10B981] font-semibold">● Optometrists Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsHelpOpen(false)}
                className="text-[#94A3B8] hover:text-[#0F172A] p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#475569] mb-4 leading-relaxed">
              Need assistance finding your frame shape or booking a free in-clinic eye examination?
            </p>

            <div className="space-y-2 text-xs">
              <Link
                to="/book-appointment"
                onClick={() => setIsHelpOpen(false)}
                className="w-full flex items-center justify-between p-2.5 bg-[#F0F7FF] hover:bg-[#0284C7] text-[#0B4D8C] hover:text-white rounded-xl font-bold transition-colors"
              >
                <span className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#0284C7] group-hover:text-white" />
                  <span>Book Free Eye Exam</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href="tel:+919840012345"
                className="w-full flex items-center justify-between p-2.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] rounded-xl font-semibold border border-[#E2E8F0] transition-colors"
              >
                <span className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-[#0284C7]" />
                  <span>Call +91 98400 12345</span>
                </span>
                <span className="text-[10px] text-[#64748B]">Toll-Free</span>
              </a>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsHelpOpen(!isHelpOpen)}
          className="w-12 h-12 rounded-full bg-[#1F2421] hover:bg-[#072F5F] text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-108 cursor-pointer border border-white/20"
          title="Grand Opticals Help & Assistance"
          aria-label="Help and Support"
        >
          {isHelpOpen ? <X className="w-5 h-5" /> : <HelpCircle className="w-6 h-6" />}
        </button>
      </div>
    </section>
  );
};

export default FindYourShape;
