import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Sparkles, Check, CheckCircle2, User, Mail, Phone, ArrowRight, ShieldCheck, Download, Activity, Eye } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { STORES } from '../data/products';
import GrandOpticalsLogo from '../components/GrandOpticalsLogo';

const BookAppointment = () => {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || 'Comprehensive Digital Eye Exam';
  const initialLocation = searchParams.get('location') || 'Grand Opticals Flagship Eye Clinic';

  const { bookAppointment } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '2026-10-25',
    time: '11:00 AM',
    service: initialService,
    location: initialLocation,
    notes: ''
  });

  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const services = [
    { name: 'Comprehensive Digital Eye Exam', duration: '40 mins', price: 'Free with Frame Purchase' },
    { name: 'Contact Lens Consultation & Fitting', duration: '30 mins', price: 'Complimentary' },
    { name: 'Bespoke Frame Fitting & Facial Styling', duration: '35 mins', price: 'Complimentary' },
    { name: 'Ultrasonic Frame Deep Clean & Realignment', duration: '15 mins', price: 'Complimentary' }
  ];

  const timeSlots = [
    '10:00 AM', '11:00 AM', '11:45 AM',
    '01:30 PM', '02:30 PM', '03:30 PM',
    '04:30 PM', '05:30 PM', '06:30 PM'
  ];

  const clinicBranches = [
    { name: 'Grand Opticals Flagship Eye Clinic', address: 'Boutique & Advanced Refractive Suite' },
    { name: 'Grand Opticals — Downtown Vision Pavilion', address: 'Full Clinical Optometry & Dispensary' },
    { name: 'Grand Opticals — Optical Galleria Studio', address: 'Designer Eyewear & Lens Express Bar' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = bookAppointment(formData);
    setConfirmedBooking(result);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#0F172A] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Visual Banner */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex justify-center mb-4">
            <GrandOpticalsLogo variant="stacked" size="sm" />
          </div>
          <span className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-[0.25em] text-[#0284C7] font-bold mb-2 px-3 py-1 bg-[#F0F7FF] rounded-full border border-[#BAE6FD]">
            <Activity className="w-3.5 h-3.5" />
            <span>Grand Opticals Clinical Care</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B4D8C] mb-3">
            Schedule Your In-Clinic Eye Exam
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Reserve your one-on-one session with certified optometrists in our modern ophthalmic examination suite.
          </p>
        </div>

        {/* Visual Suite Preview Banner */}
        <div className="mb-8 rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-md relative h-48 sm:h-56">
          <img 
            src="/clinic/exam-room.jpg" 
            alt="Grand Opticals Examination Suite" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#072F5F]/90 via-[#072F5F]/60 to-transparent flex items-center p-6 sm:p-8">
            <div className="max-w-md text-white">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#38BDF8] block mb-1">
                State-of-the-art diagnostics
              </span>
              <h3 className="text-xl sm:text-2xl font-bold mb-1">Advanced Computerized Refraction</h3>
              <p className="text-xs text-[#E2E8F0] line-clamp-2">
                Digital phoropter and slit-lamp corneal inspection ensuring crystal clarity for your custom lenses.
              </p>
            </div>
          </div>
        </div>

        {confirmedBooking ? (
          /* Confirmation Pass Screen */
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 sm:p-12 shadow-xl animate-in zoom-in-95 duration-300">
            <div className="text-center pb-8 border-b border-[#E2E8F0]">
              <div className="w-16 h-16 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center mx-auto mb-4 border border-[#BAE6FD]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase tracking-widest text-[#0284C7] font-bold">
                Appointment Confirmed
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B4D8C] mt-1 mb-2">
                We Look Forward To Welcoming You
              </h2>
              <p className="text-xs text-[#64748B]">
                Booking Reference: <strong className="text-[#0B4D8C] font-mono text-sm">{confirmedBooking.id}</strong>
              </p>
            </div>

            {/* Pass details card */}
            <div className="py-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1">
                <span className="text-[#64748B] uppercase tracking-wider text-[10px] font-bold">Patient Name</span>
                <p className="font-bold text-sm text-[#0B4D8C]">{confirmedBooking.name}</p>
                <p className="text-[#64748B]">{confirmedBooking.email} · {confirmedBooking.phone}</p>
              </div>

              <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1">
                <span className="text-[#64748B] uppercase tracking-wider text-[10px] font-bold">Service</span>
                <p className="font-bold text-sm text-[#0B4D8C]">{confirmedBooking.service}</p>
                <p className="text-[#64748B]">Digital Diagnostic Protocol</p>
              </div>

              <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1">
                <span className="text-[#64748B] uppercase tracking-wider text-[10px] font-bold">Date & Time</span>
                <p className="font-bold text-sm text-[#0B4D8C]">{confirmedBooking.date} at {confirmedBooking.time}</p>
                <p className="text-[#64748B]">Please arrive 5-10 minutes early</p>
              </div>

              <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1">
                <span className="text-[#64748B] uppercase tracking-wider text-[10px] font-bold">Clinic Location</span>
                <p className="font-bold text-sm text-[#0B4D8C]">{confirmedBooking.location}</p>
                <p className="text-[#64748B]">Grand Opticals Reception Desk</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/shop"
                className="px-8 py-3.5 bg-[#0B4D8C] hover:bg-[#0284C7] text-white text-xs font-bold uppercase tracking-wider rounded-xl text-center transition-colors shadow-md"
              >
                Pre-Select Your Frames Online
              </Link>
              <button
                onClick={() => setConfirmedBooking(null)}
                className="px-6 py-3.5 border border-[#E2E8F0] text-xs font-bold uppercase tracking-wider text-[#64748B] hover:text-[#0B4D8C] rounded-xl text-center"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-10 shadow-lg space-y-8">
            {/* Service Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-[#0B4D8C] mb-3">
                1. Select Eye Care Service
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((svc) => (
                  <button
                    key={svc.name}
                    type="button"
                    onClick={() => setFormData({ ...formData, service: svc.name })}
                    className={`p-4 text-left rounded-xl border transition-all cursor-pointer ${
                      formData.service === svc.name
                        ? 'border-[#0284C7] bg-[#F0F7FF] ring-2 ring-[#0284C7]/20 shadow-sm'
                        : 'border-[#E2E8F0] hover:border-[#0284C7] bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-[#0B4D8C]">{svc.name}</span>
                      {formData.service === svc.name && <Check className="w-4 h-4 text-[#0284C7]" />}
                    </div>
                    <div className="flex justify-between text-[11px] text-[#64748B] mt-1">
                      <span>{svc.duration}</span>
                      <span className="text-[#0284C7] font-bold">{svc.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Location Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-[#0B4D8C] mb-2">
                2. Choose Clinic Branch
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-[#0F172A] font-medium focus:outline-none focus:border-[#0284C7]"
              >
                {clinicBranches.map((st) => (
                  <option key={st.name} value={st.name}>
                    {st.name} — {st.address}
                  </option>
                ))}
              </select>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#0B4D8C] mb-2">
                  3. Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#0284C7]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#0B4D8C] mb-2">
                  4. Available Time Slot
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#0284C7]"
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
              <label className="block text-xs uppercase tracking-wider font-bold text-[#0B4D8C] mb-3">
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
                    className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-[#0B4D8C] mb-2">
                Special Vision Notes or Prescription History (Optional)
              </label>
              <textarea
                rows="3"
                placeholder="e.g. Existing power, dry eyes, progressive lenses, or specific frame models to try..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#0284C7]"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-4 border-t border-[#E2E8F0]">
              <button
                type="submit"
                className="w-full py-4 bg-[#0B4D8C] hover:bg-[#0284C7] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#38BDF8]" />
                <span>Confirm & Reserve Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-[#64748B] text-center mt-2.5">
                Grand Opticals Eye Clinic · Complimentary cancellation or rescheduling up to 4 hours prior.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
