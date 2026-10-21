import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';


const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useShop();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      showToast('Welcome to LUMÉRA. Your 15% VIP code is LUMERA15');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#111111] text-[#E0D8CB] pt-16 pb-12 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-[#262626]">
          {/* Brand Vision */}
          <div className="lg:col-span-6 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-display text-3xl sm:text-4xl font-semibold tracking-[0.25em] text-white">
                LUMÉRA
              </span>
            </Link>
            <p className="font-serif italic text-lg text-[#C5A880]">
              "See the world differently."
            </p>
            <p className="text-xs text-[#9E968E] max-w-md leading-relaxed">
              LUMÉRA brings together Japanese titanium precision, Italian bio-acetate craftsmanship, and intelligent vision ergonomics to create eyewear that feels personal, effortless and timeless.
            </p>

            <div className="flex items-center space-x-4 pt-2">
              <span className="text-xs uppercase tracking-wider text-[#C5A880] flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1.5" /> 2-Year Craftsmanship Guarantee
              </span>
              <span className="text-xs uppercase tracking-wider text-[#9E968E]">
                · Global Flagships
              </span>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 flex flex-col justify-center bg-[#171717] p-6 sm:p-8 border border-[#2B2B2B]">
            <div className="flex items-center space-x-2 text-[#C5A880] text-xs font-semibold uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Luméra Gazette</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-white mb-2">
              Stay in focus.
            </h3>
            <p className="text-xs text-[#9E968E] mb-5">
              Receive private previews of limited edition drops, optical breakthroughs, and exclusive seasonal invitations.
            </p>

            {isSubscribed ? (
              <div className="bg-[#1E2922] border border-[#2E5E3B] p-4 text-xs text-[#A3E6B5]">
                <p className="font-semibold">Thank you for subscribing.</p>
                <p className="mt-1">Enjoy 15% off your first frame with code: <strong className="text-white font-mono bg-black/40 px-1.5 py-0.5">LUMERA15</strong></p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#0D0D0D] border border-[#333333] px-4 py-3 text-xs text-white placeholder-[#736C65] focus:outline-none focus:border-[#C5A880]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C5A880] hover:bg-[#B39264] text-[#141414] text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 transition-colors"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Multi-Column Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-12 border-b border-[#262626] text-xs">
          {/* Col 1: Shop */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs">
              Shop
            </h4>
            <ul className="space-y-2 text-[#9E968E]">
              <li>
                <Link to="/shop?category=Eyeglasses" className="hover:text-white transition-colors">
                  Eyeglasses
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Sunglasses" className="hover:text-white transition-colors">
                  Sunglasses
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Contact+Lenses" className="hover:text-white transition-colors">
                  Contact Lenses
                </Link>
              </li>
              <li>
                <Link to="/shop?filter=new" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop?style=Minimal" className="hover:text-white transition-colors">
                  Titanium Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Discover */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs">
              Discover
            </h4>
            <ul className="space-y-2 text-[#9E968E]">
              <li>
                <Link to="/face-finder" className="hover:text-white transition-colors">
                  AI Face Finder
                </Link>
              </li>
              <li>
                <Link to="/virtual-try-on" className="hover:text-white transition-colors">
                  AR Virtual Try-On
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  The Seasonal Edit
                </Link>
              </li>
              <li>
                <Link to="/eye-care" className="hover:text-white transition-colors">
                  Clinical Eye Care
                </Link>
              </li>
              <li>
                <Link to="/book-appointment" className="hover:text-white transition-colors">
                  Book In-Store Exam
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs">
              Client Care
            </h4>
            <ul className="space-y-2 text-[#9E968E]">
              <li>
                <Link to="/eye-care" className="hover:text-white transition-colors">
                  Lens & Frame Care Guide
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Complimentary Adjustments
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  30-Day Risk-Free Trial
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Shipping & Customs
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Prescription Assistance
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Maison / Brand */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs">
              Maison
            </h4>
            <ul className="space-y-2 text-[#9E968E]">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Our Philosophy & Story
                </Link>
              </li>
              <li>
                <Link to="/eye-care" className="hover:text-white transition-colors">
                  Global Flagships
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Bio-Acetate Sustainability
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Sabae Master Craftsmen
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Careers & Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Global Concierge */}
          <div className="col-span-2 lg:col-span-1 space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs">
              Concierge
            </h4>
            <div className="space-y-2 text-[#9E968E] text-[11px]">
              <p className="flex items-center text-white">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880] mr-1.5 flex-shrink-0" />
                SoHo, New York · Mayfair, London
              </p>
              <p className="flex items-center">
                <Phone className="w-3.5 h-3.5 text-[#C5A880] mr-1.5 flex-shrink-0" />
                +1 (800) 586-3721
              </p>
              <p className="flex items-center">
                <Mail className="w-3.5 h-3.5 text-[#C5A880] mr-1.5 flex-shrink-0" />
                concierge@lumera.com
              </p>
            </div>

            {/* Socials */}
            <div className="pt-2 flex items-center space-x-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1F1F1F] hover:bg-[#C5A880] text-[#E0D8CB] hover:text-[#141414] flex items-center justify-center transition-colors"
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
                className="w-8 h-8 rounded-full bg-[#1F1F1F] hover:bg-[#C5A880] text-[#E0D8CB] hover:text-[#141414] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1F1F1F] hover:bg-[#C5A880] text-[#E0D8CB] hover:text-[#141414] flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7A736B] space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} LUMÉRA HAUTE OPTIQUE. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center space-x-4">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>Accessibility</span>
            <span>·</span>
            <span className="text-[#C5A880]">USD ($) · English</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
