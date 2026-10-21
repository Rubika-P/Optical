import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Calendar, MapPin, Sparkles, Check, Phone, Clock, ArrowRight, Eye, Droplets, RefreshCw } from 'lucide-react';
import { STORES } from '../data/products';

const EyeCare = () => {
  return (
    <div className="bg-[#FBF9F5] min-h-screen text-[#171717]">
      {/* Top Banner */}
      <div className="bg-[#171717] text-white py-16 sm:py-20 border-b border-[#2C2C2C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold block mb-2">
            Clinical Vision & Preservation
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white mb-3">
            Vision Meets Clinical Precision
          </h1>
          <p className="text-xs sm:text-sm text-[#B0A79B] max-w-xl mx-auto">
            Comprehensive ophthalmic health diagnostics, digital refractive mapping, and bespoke frame care by certified master opticians.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Eye Care Services Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] mb-2">
              Our Clinical Services
            </h2>
            <p className="text-xs text-[#6B655F]">
              Advanced 45-minute vision health checkups utilizing high-resolution retinal scanning and digital corneal topography.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-[#ECE6DC] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-[#FAF7F2] flex items-center justify-center text-[#C5A880] mb-4">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#171717] mb-2">Comprehensive Eye Test</h3>
                <p className="text-xs text-[#6B655F] leading-relaxed mb-4">
                  Evaluates refractive acuity, binocular coordination, glaucoma pressure, and early signs of digital ocular strain.
                </p>
                <ul className="text-[11px] text-[#7A736B] space-y-1.5 pt-2 border-t border-[#F0ECE4]">
                  <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#8B6B3F] mr-1.5" /> 45-Minute In-Depth Session</li>
                  <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#8B6B3F] mr-1.5" /> Digital Retinal Photography</li>
                  <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#8B6B3F] mr-1.5" /> Prescription Issued Immediately</li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F0ECE4]">
                <Link
                  to="/book-appointment?service=Comprehensive+Eye+Test"
                  className="w-full py-2.5 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#141414] text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <span>Book Examination</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-8 border border-[#ECE6DC] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-[#FAF7F2] flex items-center justify-center text-[#C5A880] mb-4">
                  <Droplets className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#171717] mb-2">Contact Lens Consultation</h3>
                <p className="text-xs text-[#6B655F] leading-relaxed mb-4">
                  Precision base curve and tear film evaluation for all-day comfort with breathable bio-silicone contact lenses.
                </p>
                <ul className="text-[11px] text-[#7A736B] space-y-1.5 pt-2 border-t border-[#F0ECE4]">
                  <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#8B6B3F] mr-1.5" /> Corneal Curvature Mapping</li>
                  <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#8B6B3F] mr-1.5" /> Complimentary 5-Day Trial Pair</li>
                  <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#8B6B3F] mr-1.5" /> Astigmatism & Toric Fitting</li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F0ECE4]">
                <Link
                  to="/book-appointment?service=Contact+Lens+Consultation"
                  className="w-full py-2.5 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#141414] text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-8 border border-[#ECE6DC] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-[#FAF7F2] flex items-center justify-center text-[#C5A880] mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#171717] mb-2">Bespoke Frame Styling</h3>
                <p className="text-xs text-[#6B655F] leading-relaxed mb-4">
                  One-on-one session with our senior eyewear curator to discover shapes tailored to your bone structure and aesthetic identity.
                </p>
                <ul className="text-[11px] text-[#7A736B] space-y-1.5 pt-2 border-t border-[#F0ECE4]">
                  <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#8B6B3F] mr-1.5" /> Private VIP Styling Suite</li>
                  <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#8B6B3F] mr-1.5" /> Millimeter Custom Nose Adjustment</li>
                  <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#8B6B3F] mr-1.5" /> Complimentary Espresso & Champagne</li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F0ECE4]">
                <Link
                  to="/book-appointment?service=Frame+Consultation"
                  className="w-full py-2.5 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#141414] text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <span>Reserve Styling Suite</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Global Flagship Boutiques */}
        <div className="border-t border-[#ECE6DC] pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-[#8C847A] font-semibold block mb-1">
              Global Boutiques
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] mb-2">
              Find A LUMÉRA Flagship Store
            </h2>
            <p className="text-xs text-[#6B655F]">
              Step into our experiential optical boutiques designed with natural limestone, brushed brass and bespoke fitting lounges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {STORES.map((store) => (
              <div key={store.id} className="bg-white p-8 border border-[#ECE6DC] space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-[#171717]">{store.name}</h3>
                    <p className="text-xs text-[#6B655F] mt-1 flex items-center">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A880] mr-1.5 flex-shrink-0" />
                      {store.address}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-[#FAF7F2] text-[10px] uppercase font-bold tracking-wider text-[#8B6B3F] border border-[#E0D8CB]">
                    Flagship Studio
                  </span>
                </div>

                <div className="text-xs text-[#7A736B] space-y-1 pt-2">
                  <p className="flex items-center">
                    <Phone className="w-3.5 h-3.5 text-[#C5A880] mr-2" />
                    {store.phone}
                  </p>
                  <p className="flex items-center">
                    <Clock className="w-3.5 h-3.5 text-[#C5A880] mr-2" />
                    {store.hours}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0ECE4]">
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-[#171717] mb-2">
                    Available In-Store Services:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {store.services.map((svc) => (
                      <span key={svc} className="text-[10px] bg-[#FAF7F2] text-[#4A4744] px-2 py-0.5 border border-[#E5DFD4]">
                        ✓ {svc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to={`/book-appointment?location=${encodeURIComponent(store.name)}`}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#8B6B3F] hover:text-black"
                  >
                    <span>Book Exam at this Location</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lens Care & Maintenance Guide */}
        <div className="bg-[#FAF7F2] border border-[#EADBCA] p-8 sm:p-12">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.3em] text-[#8C847A] font-semibold block mb-2">
              Maintenance Manual
            </span>
            <h2 className="font-serif text-3xl text-[#171717] mb-4">
              Preserving Your Eyewear For Generations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#57534E] pt-2">
              <div>
                <h4 className="font-serif text-base font-medium text-[#171717] mb-1">1. Daily Cleansing</h4>
                <p>Use lukewarm water with a drop of pH-neutral soap. Dry exclusively with the provided microfiber cloth to prevent micro-scratches.</p>
              </div>
              <div>
                <h4 className="font-serif text-base font-medium text-[#171717] mb-1">2. Heat Protection</h4>
                <p>Never leave your eyewear on car dashboards or in saunas. Excessive heat can alter bio-acetate calibration and lens multi-coatings.</p>
              </div>
              <div>
                <h4 className="font-serif text-base font-medium text-[#171717] mb-1">3. Two-Handed Removal</h4>
                <p>Always put on and take off your glasses with both hands to maintain hinge alignment and avoid temple bending over time.</p>
              </div>
              <div>
                <h4 className="font-serif text-base font-medium text-[#171717] mb-1">4. Complimentary Lifetime Tune-Ups</h4>
                <p>Visit any LUMÉRA boutique for complimentary ultrasonic bath cleansing, screw tightening, and customized nose pad replacements.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EyeCare;
