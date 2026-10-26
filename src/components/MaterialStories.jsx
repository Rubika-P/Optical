import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const MATERIALS = [
  {
    id: 'acetate',
    name: 'Acetate',
    spec: 'CA — 6 MM',
    tagline: 'Milled Italian bio-cellulose with diamond-cut crystal clarity.',
    image: '/materials/acetate.jpg',
    filterParam: 'Acetate'
  },
  {
    id: 'metal',
    name: 'Metal',
    spec: 'SS — 1.2 MM',
    tagline: 'Ultralight Japanese monel with 18k electroplated finish.',
    image: '/materials/metal.jpg',
    filterParam: 'Metal'
  },
  {
    id: 'titanium',
    name: 'Titanium',
    spec: 'TI — 0.6 MM',
    tagline: 'Aerospace beta-titanium wire engineered for weightless cranial fit.',
    image: '/materials/titanium.jpg',
    filterParam: 'Titanium'
  },
  {
    id: 'tr90',
    name: 'TR90',
    spec: 'TR — 22G FLEX',
    tagline: 'Swiss memory thermoplastic polymer with 22G torsional recovery.',
    image: '/materials/tr90.jpg',
    filterParam: 'TR90'
  },
  {
    id: 'stainless-steel',
    name: 'Stainless Steel',
    spec: 'M49 — 68% BIO',
    tagline: 'Laser-etched medical 316L alloy fused with circular bio-resins.',
    image: '/materials/stainless_steel.jpg',
    filterParam: 'Stainless Steel'
  }
];

const MaterialStories = () => {
  const [activeMaterialId, setActiveMaterialId] = useState('acetate');
  const activeMaterial = MATERIALS.find((m) => m.id === activeMaterialId) || MATERIALS[0];

  return (
    <section className="relative bg-[#050608] text-white py-16 sm:py-24 overflow-hidden border-t border-b border-[#1A1F2C]" id="materials">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-[#0284C7]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Clean, Trendy Section Header */}
        <div className="mb-10 sm:mb-14">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#94A3B8] font-bold block mb-2">
            EXPLORE BASED ON MATERIALS
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
            Material stories
          </h2>
        </div>

        {/* Minimalist Editorial Grid: Clean Left Nav + Sleek Right Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left: Minimal, Trendy Material Rows (No heavy clutter or paragraphs) */}
          <div className="lg:col-span-5 divide-y divide-white/10 border-t border-b border-white/10">
            {MATERIALS.map((mat) => {
              const isActive = mat.id === activeMaterialId;
              return (
                <button
                  key={mat.id}
                  onClick={() => setActiveMaterialId(mat.id)}
                  onMouseEnter={() => setActiveMaterialId(mat.id)}
                  className={`w-full text-left py-4 sm:py-5 px-1 sm:px-2 transition-all duration-300 flex flex-col group cursor-pointer ${
                    isActive ? 'bg-white/[0.03]' : 'hover:bg-white/[0.015]'
                  }`}
                >
                  <div className="flex items-baseline justify-between w-full">
                    {/* Material Title */}
                    <span
                      className={`font-serif text-2xl sm:text-3xl lg:text-4xl transition-colors duration-300 ${
                        isActive
                          ? 'text-white font-medium'
                          : 'text-white/45 group-hover:text-white/80'
                      }`}
                    >
                      {mat.name}
                    </span>

                    {/* Clean Spec Badge */}
                    <span
                      className={`font-mono text-[11px] tracking-wider transition-colors duration-300 uppercase ${
                        isActive
                          ? 'text-[#38BDF8] font-semibold'
                          : 'text-white/35 group-hover:text-white/60'
                      }`}
                    >
                      {mat.spec}
                    </span>
                  </div>

                  {/* Clean 1-line Micro-tagline only when active */}
                  {isActive && (
                    <p className="mt-2 text-xs text-[#94A3B8] font-light leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
                      {mat.tagline}
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Pure Luxury Visual Stage */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-black shadow-2xl group">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black flex items-center justify-center">
                <img
                  key={activeMaterial.id}
                  src={activeMaterial.image}
                  alt={`${activeMaterial.name} eyewear frame material`}
                  className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 animate-in fade-in duration-500"
                />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Bottom Floating Bar with Instant Direct Action */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between backdrop-blur-md bg-black/60 border border-white/15 px-4 py-3 rounded-2xl">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#38BDF8] font-bold block font-mono">
                      {activeMaterial.spec}
                    </span>
                    <h4 className="text-sm sm:text-base font-semibold text-white tracking-wide">
                      {activeMaterial.name} Collection
                    </h4>
                  </div>

                  <Link
                    to={`/shop?material=${encodeURIComponent(activeMaterial.filterParam)}`}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 bg-white hover:bg-[#38BDF8] text-[#0A0E17] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer"
                  >
                    <span>Explore</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaterialStories;
