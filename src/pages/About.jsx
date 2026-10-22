import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, ArrowRight, Eye, RefreshCw, Feather, Award, Heart, CheckCircle2 } from 'lucide-react';
import GrandOpticalsLogo from '../components/GrandOpticalsLogo';

const About = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#0F172A]">
      {/* Editorial Hero */}
      <div className="relative py-20 sm:py-28 bg-[#072F5F] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/clinic/storefront.jpg"
            alt="Grand Opticals Eye Clinic & Eyewear Boutique"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#072F5F] via-[#072F5F]/75 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <GrandOpticalsLogo variant="stacked" size="md" theme="dark" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#38BDF8] font-bold block mb-3">
            Our Heritage & Medical Philosophy
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Better Vision. <br />
            <span className="text-[#38BDF8]">Brighter Tomorrow.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#CBD5E1] font-light max-w-2xl mx-auto leading-relaxed">
            Grand Opticals was founded on a singular conviction: that corrective eyewear should never compromise between architectural poise, everyday comfort, and optical clinical perfection.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        {/* Story Section 1: The Boutique & Examination Suite */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-[#E2E8F0]">
              <img
                src="/clinic/storefront.jpg"
                alt="Grand Opticals Reception & Eyewear Gallery"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6 space-y-5 lg:pl-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#0284C7] font-bold block">
              The Flagship Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B4D8C]">
              Eyewear For A Better You
            </h2>
            <p className="text-sm text-[#475569] leading-relaxed">
              Every detail of our flagship clinic—from our signature royal blue fluted reception desk to the warm illuminated floating glass display shelves—is engineered to create an inviting, stress-free optical experience.
            </p>
            <p className="text-sm text-[#475569] leading-relaxed">
              We combine in-depth digital vision diagnostics with personalized face-geometry styling, ensuring your spectacles harmonize with your facial structure, lifestyle, and visual prescription.
            </p>
          </div>
        </div>

        {/* Story Section 2: Clinical Precision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-5 lg:pr-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#0284C7] font-bold block">
              Ophthalmic Suite
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B4D8C]">
              Digital Diagnostics & Lens Accuracy
            </h2>
            <p className="text-sm text-[#475569] leading-relaxed">
              Our clinical consultation suite features computerized auto-refraction, digital phoropter tests, and corneal topography. We detect minute astigmatic variations and visual fatigue factors to deliver razor-sharp clarity.
            </p>
            <p className="text-sm text-[#475569] leading-relaxed">
              Paired with high-definition multi-coated lenses that filter harsh digital blue light and eliminate glare, our eyewear empowers you to experience the world with renewed vibrancy.
            </p>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-[#E2E8F0]">
              <img
                src="/clinic/exam-room.jpg"
                alt="Grand Opticals Digital Examination Room"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* 3 Pillars Values Grid */}
        <div className="border-t border-[#E2E8F0] pt-16">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B4D8C] mb-2">
              Our Guiding Principles
            </h2>
            <p className="text-xs text-[#64748B]">
              The core commitments behind every pair of Grand Opticals glasses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
              <div className="w-14 h-14 rounded-xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center justify-center text-[#0B4D8C] mx-auto mb-4">
                <Feather className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#0B4D8C] mb-2">Ultralight Comfort</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Featherweight titanium cores and ergonomic silicone nose pads crafted for all-day pressure-free wear.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
              <div className="w-14 h-14 rounded-xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center justify-center text-[#0B4D8C] mx-auto mb-4">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#0B4D8C] mb-2">Optical Precision</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                State-of-the-art anti-reflective multi-coatings, UV400 defense, and zero-distortion customized prescription lenses.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
              <div className="w-14 h-14 rounded-xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center justify-center text-[#0B4D8C] mx-auto mb-4">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#0B4D8C] mb-2">Clinical Guarantee</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Lifetime complimentary ultrasonic bath cleansing, temple realignments, and certified prescription accuracy.
              </p>
            </div>
          </div>
        </div>

        {/* CTA banner */}
        <div className="bg-[#072F5F] text-white p-10 sm:p-16 rounded-3xl text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src="/clinic/storefront.jpg" alt="Clinic Interior" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-3">
              Experience Grand Opticals For Yourself
            </h2>
            <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-md mx-auto mb-6">
              Book your comprehensive eye checkup or browse our curated designer frames today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="px-8 py-3.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                Explore Eyewear
              </Link>
              <Link
                to="/book-appointment"
                className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl border border-white/30 transition-all"
              >
                Book Clinic Exam
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
