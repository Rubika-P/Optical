import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MapPin, Phone, Mail, ShieldCheck, Clock, Award, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import GrandOpticalsLogo from './GrandOpticalsLogo';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useShop();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      showToast('Welcome to Grand Opticals. Your 15% VIP code is GRAND15', 'Grand Opticals Eye Clinic');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#071E3D] text-[#E2E8F0] pt-16 pb-12 border-t border-[#0F325E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-[#143E70]">
          {/* Brand Vision */}
          <div className="lg:col-span-6 space-y-4">
            <Link to="/" className="inline-block">
              <GrandOpticalsLogo variant="horizontal" size="md" theme="dark" />
            </Link>

            <p className="text-base sm:text-lg text-[#38BDF8] font-medium tracking-wide">
              "Better Vision | Brighter Tomorrow"
            </p>
            <p className="text-xs text-[#94A3B8] max-w-md leading-relaxed">
              Grand Opticals Eye Clinic combines clinical optometry diagnostics, high-definition digital lens crafting, and premier designer frames. Where eye healthcare meets everyday elegance.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <span className="text-xs uppercase tracking-wider text-[#38BDF8] flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1.5 text-[#38BDF8]" /> Certified Ophthalmic Opticians
              </span>
              <span className="text-xs uppercase tracking-wider text-[#94A3B8] flex items-center">
                <Award className="w-4 h-4 mr-1.5 text-[#38BDF8]" /> Advanced Digital Refraction
              </span>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 flex flex-col justify-center bg-[#0B2545] p-6 sm:p-8 rounded-2xl border border-[#1E4976] shadow-xl">
            <div className="flex items-center space-x-2 text-[#38BDF8] text-xs font-bold uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vision Care Privileges</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
              Keep your sight in sharp focus.
            </h3>
            <p className="text-xs text-[#94A3B8] mb-5 leading-relaxed">
              Subscribe for clinical vision care tips, seasonal eyewear launches, and an instant 15% VIP discount on your next prescription frame.
            </p>

            {isSubscribed ? (
              <div className="bg-[#064E3B]/40 border border-[#059669] p-4 rounded-xl text-xs text-[#A7F3D0]">
                <p className="font-bold flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" /> Thank you for subscribing to Grand Opticals.
                </p>
                <p className="mt-1">Enjoy 15% off with voucher code: <strong className="text-white font-mono bg-black/40 px-2 py-0.5 rounded">GRAND15</strong></p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#071E3D] border border-[#1E4976] rounded-xl px-4 py-3 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#38BDF8]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-cyan-500/20 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Multi-Column Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-12 border-b border-[#143E70] text-xs">
          {/* Col 1: Eyewear Catalog */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Eyewear
            </h4>
            <ul className="space-y-2 text-[#94A3B8]">
              <li>
                <Link to="/shop?category=Eyeglasses" className="hover:text-[#38BDF8] transition-colors">
                  Prescription Glasses
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Sunglasses" className="hover:text-[#38BDF8] transition-colors">
                  Polarized Sunglasses
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Contact+Lenses" className="hover:text-[#38BDF8] transition-colors">
                  Contact Lenses
                </Link>
              </li>
              <li>
                <Link to="/shop?filter=new" className="hover:text-[#38BDF8] transition-colors">
                  2026 Collection
                </Link>
              </li>
              <li>
                <Link to="/shop?style=Minimal" className="hover:text-[#38BDF8] transition-colors">
                  Titanium Featherlight
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Clinical Services */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Eye Clinic
            </h4>
            <ul className="space-y-2 text-[#94A3B8]">
              <li>
                <Link to="/book-appointment" className="hover:text-[#38BDF8] transition-colors font-medium text-white">
                  Book Comprehensive Eye Exam
                </Link>
              </li>
              <li>
                <Link to="/eye-care" className="hover:text-[#38BDF8] transition-colors">
                  Digital Retinal Imaging
                </Link>
              </li>
              <li>
                <Link to="/eye-care" className="hover:text-[#38BDF8] transition-colors">
                  Computer Vision & Blue-Cut
                </Link>
              </li>
              <li>
                <Link to="/eye-care" className="hover:text-[#38BDF8] transition-colors">
                  Pediatric & Senior Vision
                </Link>
              </li>
              <li>
                <Link to="/eye-care" className="hover:text-[#38BDF8] transition-colors">
                  Contact Lens Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Smart Tools */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Smart Tech
            </h4>
            <ul className="space-y-2 text-[#94A3B8]">
              <li>
                <Link to="/face-finder" className="hover:text-[#38BDF8] transition-colors">
                  AI Face Shape Finder
                </Link>
              </li>
              <li>
                <Link to="/virtual-try-on" className="hover:text-[#38BDF8] transition-colors">
                  AR 3D Virtual Try-On
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#38BDF8] transition-colors">
                  360° Frame Viewer
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-[#38BDF8] transition-colors">
                  Saved Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: About Clinic */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Our Clinic
            </h4>
            <ul className="space-y-2 text-[#94A3B8]">
              <li>
                <Link to="/about" className="hover:text-[#38BDF8] transition-colors">
                  About Grand Opticals
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#38BDF8] transition-colors">
                  Boutique & Examination Suite
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#38BDF8] transition-colors">
                  Ultrasonic Frame Cleansing
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#38BDF8] transition-colors">
                  Warranty & Guarantee
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Clinic Contacts */}
          <div className="col-span-2 lg:col-span-1 space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Clinic Contact
            </h4>
            <div className="space-y-2.5 text-[#94A3B8] text-[11px]">
              <p className="flex items-start text-white">
                <MapPin className="w-3.5 h-3.5 text-[#38BDF8] mr-1.5 mt-0.5 flex-shrink-0" />
                <span>Grand Opticals Eye Clinic & Optical Dispensary</span>
              </p>
              <p className="flex items-center">
                <Phone className="w-3.5 h-3.5 text-[#38BDF8] mr-1.5 flex-shrink-0" />
                +91 (800) 246-4726
              </p>
              <p className="flex items-center">
                <Mail className="w-3.5 h-3.5 text-[#38BDF8] mr-1.5 flex-shrink-0" />
                care@grandopticals.com
              </p>
              <p className="flex items-center">
                <Clock className="w-3.5 h-3.5 text-[#38BDF8] mr-1.5 flex-shrink-0" />
                Mon – Sat: 9:30 AM – 8:30 PM
              </p>
            </div>

            {/* Socials */}
            <div className="pt-2 flex items-center space-x-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#0B2545] hover:bg-[#0284C7] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#0B2545] hover:bg-[#0284C7] text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Slogan & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#64748B] space-y-4 sm:space-y-0">
          <p className="font-medium text-[#94A3B8]">
            © {new Date().getFullYear()} GRAND OPTICALS EYE CLINIC. Better Vision | Brighter Tomorrow.
          </p>
          <div className="flex items-center space-x-4">
            <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link to="/about" className="hover:text-white transition-colors">Terms of Care</Link>
            <span>·</span>
            <span className="text-[#38BDF8]">ISO Certified Optical Care</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
