import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Calendar, MapPin, Sparkles, Check, Phone, Clock, ArrowRight, Eye, Droplets, RefreshCw, Activity, Award } from 'lucide-react';
import GrandOpticalsLogo from '../components/GrandOpticalsLogo';

const EyeCare = () => {
  const clinicBranches = [
    {
      id: "flagship-clinic",
      name: "Grand Opticals Flagship Eye Clinic",
      address: "10x14 Ft Flagship Layout · Dispensary & Ophthalmic Suite",
      phone: "+91 (800) 246-4726",
      hours: "Mon – Sat: 9:30 AM – 8:30 PM | Sun: 10:00 AM – 6:00 PM",
      services: [
        "Comprehensive Computerized Eye Test",
        "Digital Phoropter Refraction",
        "Corneal Topography & Slit Lamp",
        "Same-Day Lens Fitting",
        "Ultrasonic Deep Frame Bath"
      ]
    },
    {
      id: "downtown-vision",
      name: "Grand Opticals — Downtown Vision Suite",
      address: "Boutique Display & Contact Lens Clinic",
      phone: "+91 (800) 246-4727",
      hours: "Mon – Sat: 10:00 AM – 8:00 PM",
      services: [
        "Refractive Vision Diagnostics",
        "Astigmatism & Toric Fitting",
        "Blue-Light Digital Eye Fatigue Protocol",
        "Custom Eyewear Styling"
      ]
    }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#0F172A]">
      {/* Top Banner with Royal Blue Clinic Theme */}
      <div className="bg-[#072F5F] text-white py-16 sm:py-20 border-b border-[#0F325E] relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src="/clinic/storefront.jpg" alt="Clinic Interior" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex justify-center mb-4">
            <GrandOpticalsLogo variant="stacked" size="md" theme="dark" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#38BDF8] font-bold block mb-2">
            Clinical Optometry & Preventive Health
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-3">
            Better Vision. Brighter Tomorrow.
          </h1>
          <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-xl mx-auto">
            Comprehensive ophthalmic health diagnostics, digital refractive mapping, and precision lens dispensing by licensed optometrists.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Clinic Suite Visual Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-2xl border border-[#E2E8F0] shadow-md">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#0284C7] font-bold flex items-center">
              <Award className="w-4 h-4 mr-1.5" /> Clinical Standard of Excellence
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B4D8C]">
              State-of-the-art diagnostic vision suite.
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Our examination room is furnished with computerized auto-refractors, digital phoropters, and illuminated Snellen charts. We measure corneal curvature, pupil distance, and intraocular dynamics to deliver personalized lenses that eliminate digital eyestrain and visual fatigue.
            </p>
            <div className="pt-2">
              <Link
                to="/book-appointment"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#0B4D8C] hover:bg-[#0284C7] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-md"
              >
                <Calendar className="w-4 h-4 text-[#38BDF8]" />
                <span>Book In-Clinic Eye Test</span>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 rounded-xl overflow-hidden shadow-lg border border-[#E2E8F0]">
            <img 
              src="/clinic/exam-room.jpg" 
              alt="Grand Opticals Eye Clinic Examination Room" 
              className="w-full h-[320px] object-cover"
            />
          </div>
        </div>

        {/* Eye Care Services Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B4D8C] mb-2">
              Our Clinical Services
            </h2>
            <p className="text-xs text-[#64748B]">
              Rigorous 40-minute vision health checkups utilizing computerized refraction and slit-lamp corneal evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center justify-center text-[#0B4D8C] mb-4">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B4D8C] mb-2">Comprehensive Eye Test</h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  Evaluates refractive acuity, binocular coordination, astigmatic angles, and early signs of digital ocular strain.
                </p>
                <ul className="text-[11px] text-[#475569] space-y-2 pt-3 border-t border-[#F1F5F9]">
                  <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#0284C7] mr-2" /> 40-Minute In-Depth Diagnostic Session</li>
                  <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#0284C7] mr-2" /> Computerized Auto-Refractor Test</li>
                  <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#0284C7] mr-2" /> Immediate Prescription Verification</li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F1F5F9]">
                <Link
                  to="/book-appointment?service=Comprehensive+Eye+Test"
                  className="w-full py-3 bg-[#0B4D8C] hover:bg-[#0284C7] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                >
                  <span>Book Examination</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center justify-center text-[#0B4D8C] mb-4">
                  <Droplets className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B4D8C] mb-2">Contact Lens Clinic</h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  Precision base curve and tear film evaluation for all-day comfort with breathable bio-silicone contact lenses.
                </p>
                <ul className="text-[11px] text-[#475569] space-y-2 pt-3 border-t border-[#F1F5F9]">
                  <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#0284C7] mr-2" /> Corneal Curvature Mapping</li>
                  <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#0284C7] mr-2" /> Complimentary 5-Day Trial Pair</li>
                  <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#0284C7] mr-2" /> Astigmatism & Toric Fitting</li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F1F5F9]">
                <Link
                  to="/book-appointment?service=Contact+Lens+Consultation"
                  className="w-full py-3 bg-[#0B4D8C] hover:bg-[#0284C7] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center justify-center text-[#0B4D8C] mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B4D8C] mb-2">Bespoke Frame Fitting</h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  One-on-one session at our fluted reception desk to calibrate frame bridge fit, pupillary height, and temple alignment.
                </p>
                <ul className="text-[11px] text-[#475569] space-y-2 pt-3 border-t border-[#F1F5F9]">
                  <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#0284C7] mr-2" /> Face Shape Matching</li>
                  <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#0284C7] mr-2" /> Millimeter Custom Nose Adjustment</li>
                  <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#0284C7] mr-2" /> 500+ Curated Boutique Frames</li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F1F5F9]">
                <Link
                  to="/book-appointment?service=Frame+Consultation"
                  className="w-full py-3 bg-[#0B4D8C] hover:bg-[#0284C7] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                >
                  <span>Reserve Styling Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Grand Opticals Flagship Clinics */}
        <div className="border-t border-[#E2E8F0] pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#0284C7] font-bold block mb-1">
              Boutique Locations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B4D8C] mb-2">
              Visit Grand Opticals Eye Clinic
            </h2>
            <p className="text-xs text-[#64748B]">
              Step into our modern optical boutique featuring blue fluted architectural panels, illuminated glass displays, and clinical exam suites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {clinicBranches.map((store) => (
              <div key={store.id} className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-md space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#0B4D8C]">{store.name}</h3>
                    <p className="text-xs text-[#64748B] mt-1 flex items-center">
                      <MapPin className="w-3.5 h-3.5 text-[#0284C7] mr-1.5 flex-shrink-0" />
                      {store.address}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-[#F0F7FF] text-[10px] uppercase font-bold tracking-wider text-[#0284C7] rounded-full border border-[#BAE6FD]">
                    Full Eye Clinic
                  </span>
                </div>

                <div className="text-xs text-[#64748B] space-y-1 pt-2">
                  <p className="flex items-center">
                    <Phone className="w-3.5 h-3.5 text-[#0284C7] mr-2" />
                    {store.phone}
                  </p>
                  <p className="flex items-center">
                    <Clock className="w-3.5 h-3.5 text-[#0284C7] mr-2" />
                    {store.hours}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F1F5F9]">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-[#0B4D8C] mb-2">
                    Available Clinic Services:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {store.services.map((svc) => (
                      <span key={svc} className="text-[10px] bg-[#F8FAFC] text-[#334155] px-2.5 py-1 rounded-md border border-[#E2E8F0]">
                        ✓ {svc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to={`/book-appointment?location=${encodeURIComponent(store.name)}`}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#0284C7] hover:text-[#0B4D8C]"
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
        <div className="bg-[#F0F7FF] border border-[#BAE6FD] rounded-2xl p-8 sm:p-12">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#0284C7] font-bold block mb-2">
              Optical Maintenance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B4D8C] mb-4">
              Preserving Your Eyewear For Crisp Vision
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#475569] pt-2">
              <div>
                <h4 className="text-sm font-bold text-[#0B4D8C] mb-1">1. Daily Cleansing</h4>
                <p>Use lukewarm water with a pH-neutral optical cleanser. Dry exclusively with the provided microfiber cloth to prevent micro-scratches.</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B4D8C] mb-1">2. Thermal Protection</h4>
                <p>Avoid leaving your frames on hot car dashboards. High temperature can degrade anti-reflective lens coatings and loosen hinge tension.</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B4D8C] mb-1">3. Two-Handed Alignment</h4>
                <p>Always put on and remove your glasses with both hands to maintain bridge geometry and avoid temple loosening over time.</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B4D8C] mb-1">4. Free Lifetime Ultrasonic Cleansing</h4>
                <p>Visit any Grand Opticals clinic for complimentary ultrasonic bath cleansing, screw tightening, and silicone nose pad replacements.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EyeCare;
