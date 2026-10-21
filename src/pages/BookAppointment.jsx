import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Sparkles, Check, CheckCircle2, User, Mail, Phone, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { STORES } from '../data/products';

const BookAppointment = () => {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || 'Comprehensive Eye Test';
  const initialLocation = searchParams.get('location') || STORES[0].name;

  const { bookAppointment } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '2026-09-30',
    time: '11:00 AM',
    service: initialService,
    location: initialLocation,
    notes: ''
  });

  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const services = [
    { name: 'Comprehensive Eye Test', duration: '45 mins', price: '$95 (Credited with Frame purchase)' },
    { name: 'Contact Lens Consultation', duration: '30 mins', price: '$65' },
    { name: 'Bespoke Frame Consultation & Styling', duration: '40 mins', price: 'Complimentary' },
    { name: 'Ultrasonic Frame Restoration & Adjustment', duration: '20 mins', price: 'Complimentary' }
  ];

  const timeSlots = [
    '10:30 AM', '11:00 AM', '11:45 AM',
    '01:30 PM', '02:15 PM', '03:00 PM',
    '04:00 PM', '05:00 PM', '06:00 PM'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = bookAppointment(formData);
    setConfirmedBooking(result);
  };

  return (
    <div className="bg-[#FBF9F5] min-h-screen text-[#171717] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C847A] font-semibold block mb-2">
            Clinical Consultation
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] mb-3">
            Book An Eye Appointment
          </h1>
          <p className="text-xs sm:text-sm text-[#6B655F]">
            Reserve your session with certified ophthalmic specialists at any LUMÉRA boutique worldwide.
          </p>
        </div>

        {confirmedBooking ? (
          /* Confirmation Pass Screen */
          <div className="bg-white border border-[#ECE6DC] p-8 sm:p-12 shadow-md animate-in zoom-in-95 duration-300">
            <div className="text-center pb-8 border-b border-[#ECE6DC]">
              <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase tracking-widest text-[#2E7D32] font-semibold">
                Booking Confirmed
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] mt-1 mb-2">
                We Look Forward To Seeing You
              </h2>
              <p className="text-xs text-[#7A736B]">
                Booking Reference: <strong className="text-[#171717] font-mono text-sm">{confirmedBooking.id}</strong>
              </p>
            </div>

            {/* Pass details card */}
            <div className="py-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#57534E]">
              <div className="p-4 bg-[#FAF7F2] border border-[#EADBCA] space-y-1">
                <span className="text-[#8C847A] uppercase tracking-wider text-[10px]">Patient Name</span>
                <p className="font-semibold text-sm text-[#171717]">{confirmedBooking.name}</p>
                <p className="text-[#7A736B]">{confirmedBooking.email} · {confirmedBooking.phone}</p>
              </div>

              <div className="p-4 bg-[#FAF7F2] border border-[#EADBCA] space-y-1">
                <span className="text-[#8C847A] uppercase tracking-wider text-[10px]">Service</span>
                <p className="font-semibold text-sm text-[#171717]">{confirmedBooking.service}</p>
                <p className="text-[#7A736B]">Clinical Consultation</p>
              </div>

              <div className="p-4 bg-[#FAF7F2] border border-[#EADBCA] space-y-1">
                <span className="text-[#8C847A] uppercase tracking-wider text-[10px]">Date & Time</span>
                <p className="font-semibold text-sm text-[#171717]">{confirmedBooking.date} at {confirmedBooking.time}</p>
                <p className="text-[#7A736B]">Please arrive 10 minutes prior</p>
              </div>

              <div className="p-4 bg-[#FAF7F2] border border-[#EADBCA] space-y-1">
                <span className="text-[#8C847A] uppercase tracking-wider text-[10px]">Boutique Location</span>
                <p className="font-semibold text-sm text-[#171717]">{confirmedBooking.location}</p>
                <p className="text-[#7A736B]">VIP Examination Lounge</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/shop"
                className="px-8 py-3.5 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#141414] text-xs font-semibold uppercase tracking-widest text-center transition-colors"
              >
                Browse Eyewear Catalog
              </Link>
              <button
                onClick={() => setConfirmedBooking(null)}
                className="px-6 py-3.5 border border-[#DCD3C5] text-xs font-semibold uppercase tracking-widest text-[#57534E] hover:text-[#171717] text-center"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="bg-white border border-[#ECE6DC] p-6 sm:p-10 shadow-sm space-y-8">
            {/* Service Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-3">
                1. Select Desired Clinical Service
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((svc) => (
                  <button
                    key={svc.name}
                    type="button"
                    onClick={() => setFormData({ ...formData, service: svc.name })}
                    className={`p-4 text-left border transition-all ${
                      formData.service === svc.name
                        ? 'border-[#171717] bg-[#FAF7F2] ring-1 ring-[#171717]'
                        : 'border-[#E0D8CB] hover:border-[#171717] bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-base font-medium text-[#171717]">{svc.name}</span>
                      {formData.service === svc.name && <Check className="w-4 h-4 text-[#8B6B3F]" />}
                    </div>
                    <div className="flex justify-between text-[11px] text-[#7A736B]">
                      <span>{svc.duration}</span>
                      <span className="text-[#8B6B3F] font-semibold">{svc.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Location Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-2">
                2. Choose Flagship Boutique
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-white border border-[#DCD3C5] px-4 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
              >
                {STORES.map((st) => (
                  <option key={st.id} value={st.name}>
                    {st.name} — {st.address}
                  </option>
                ))}
              </select>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-2">
                  3. Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-white border border-[#DCD3C5] px-4 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-2">
                  4. Available Time Slot
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-white border border-[#DCD3C5] px-4 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Client Info Fields */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-3">
                5. Patient Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Legal Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-[#DCD3C5] px-4 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-[#DCD3C5] px-4 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-[#DCD3C5] px-4 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-2">
                Special Vision Notes or Prescription History (Optional)
              </label>
              <textarea
                rows="3"
                placeholder="e.g. Existing astigmatism, progressive lenses, or request for specific frame models to try..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-white border border-[#DCD3C5] px-4 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-4 border-t border-[#ECE6DC]">
              <button
                type="submit"
                className="w-full py-4 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#141414] text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center space-x-2"
              >
                <span>Confirm & Reserve Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-[#8C847A] text-center mt-2">
                Complimentary cancellation or rescheduling up to 4 hours before your session.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
