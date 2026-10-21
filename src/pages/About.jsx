import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, ArrowRight, Eye, RefreshCw, Feather } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-[#FBF9F5] min-h-screen text-[#171717]">
      {/* Editorial Hero */}
      <div className="relative py-20 sm:py-32 bg-[#141414] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=2000&q=85"
            alt="LUMÉRA Atelier"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold block mb-3">
            Maison Manifesto
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white mb-6 leading-tight">
            Vision Meets Design.
          </h1>
          <p className="text-base sm:text-lg text-[#D8CEBE] font-light max-w-2xl mx-auto leading-relaxed">
            LUMÉRA was founded on a singular conviction: that corrective eyewear should never compromise between architectural poise and optical perfection.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        {/* Story Section 1: Sabae Craftsmanship */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] bg-[#ECE6DC] overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1591076482161-42ce6da69f68?auto=format&fit=crop&w=1200&q=85"
                alt="Titanium Crafting in Sabae"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6 space-y-5 lg:pl-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#8C847A] font-semibold block">
              Sabae, Fukui Prefecture, Japan
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171717]">
              The Art of Japanese Titanium
            </h2>
            <p className="text-sm text-[#57534E] leading-relaxed">
              In Sabae, titanium craftsmanship is an ancestral discipline. Our frames are sculpted from high-purity Beta-Titanium alloys, celebrated for exceptional memory retention, anti-corrosive longevity, and featherweight comfort (under 10 grams).
            </p>
            <p className="text-sm text-[#57534E] leading-relaxed">
              Each bridge and temple wire is polished through a 7-stage organic tumbling process involving natural Japanese walnut shells and diamond paste.
            </p>
          </div>
        </div>

        {/* Story Section 2: Cadore Bio-Acetate */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-5 lg:pr-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#8C847A] font-semibold block">
              Cadore Valley, Italy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171717]">
              100% Plant-Derived Bio-Acetate
            </h2>
            <p className="text-sm text-[#57534E] leading-relaxed">
              We reject petroleum-based plastics. LUMÉRA bio-acetate is harvested from FSC-certified cotton seeds and sustainably sourced wood pulp, blended with organic plasticizers in the Italian Dolomites.
            </p>
            <p className="text-sm text-[#57534E] leading-relaxed">
              The result is a frame material with remarkable depth of color, warm organic tactile feel, and complete biodegradability over time without harming ecological waterways.
            </p>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="aspect-[4/3] bg-[#ECE6DC] overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85"
                alt="Italian Bio-Acetate Hand Polishing"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 3 Pillars Values Grid */}
        <div className="border-t border-[#ECE6DC] pt-16">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] mb-2">
              Our Guiding Principles
            </h2>
            <p className="text-xs text-[#6B655F]">
              Every silhouette adheres to our three architectural commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 border border-[#ECE6DC]">
              <Feather className="w-8 h-8 text-[#C5A880] mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-[#171717] mb-2">Weightlessness</h3>
              <p className="text-xs text-[#6B655F] leading-relaxed">
                Frames so balanced that you forget you are wearing them, allowing your focus to remain unobstructed.
              </p>
            </div>

            <div className="bg-white p-8 border border-[#ECE6DC]">
              <Eye className="w-8 h-8 text-[#C5A880] mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-[#171717] mb-2">Optical Clarity</h3>
              <p className="text-xs text-[#6B655F] leading-relaxed">
                State-of-the-art multi-layer anti-reflective coatings and zero-distortion prescription curvature.
              </p>
            </div>

            <div className="bg-white p-8 border border-[#ECE6DC]">
              <ShieldCheck className="w-8 h-8 text-[#C5A880] mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-[#171717] mb-2">Enduring Design</h3>
              <p className="text-xs text-[#6B655F] leading-relaxed">
                Timeless proportions immune to fleeting micro-trends, engineered to accompany your vision for decades.
              </p>
            </div>
          </div>
        </div>

        {/* CTA banner */}
        <div className="bg-[#171717] text-white p-10 sm:p-16 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl text-white">
            Experience LUMÉRA For Yourself
          </h2>
          <p className="text-xs sm:text-sm text-[#D8CEBE] max-w-md mx-auto">
            Discover frames crafted with passion and precision. Enjoy 30 days of risk-free in-home trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              to="/shop"
              className="px-8 py-3.5 bg-[#C5A880] hover:bg-[#B39264] text-[#141414] text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Explore Collection
            </Link>
            <Link
              to="/face-finder"
              className="px-8 py-3.5 border border-white/30 hover:border-white text-white text-xs font-semibold uppercase tracking-widest transition-colors"
            >
              Find Your Face Shape
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
