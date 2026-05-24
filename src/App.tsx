import React, { useState } from 'react';
import { 
  Leaf, Sparkles, ShieldCheck, Droplets, Award, 
  MapPin, PhoneCall, Menu, X, ChevronDown, 
  ChevronUp, ShieldAlert, CheckCircle, Flame 
} from 'lucide-react';

import BeforeAfterSlider from './components/BeforeAfterSlider';
import PricingTiers from './components/PricingTiers';
import BookingSystem from './components/BookingSystem';
import Reviews from './components/Reviews';
import Gallery from './components/Gallery';
import { FAQS } from './data';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFAQIndex, setActiveFAQIndex] = useState<number | null>(null);
  
  // Package preselection link state
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);

  // Stats Counters (Visual indicators)
  const stats = [
    { label: 'Fresh Water Saved', value: '145K+ Gal', icon: Droplets, color: 'text-blue-500' },
    { label: 'Eco-Ceramic Coating Applications', value: '980+', icon: ShieldCheck, color: 'text-green-600' },
    { label: 'Overall Star Rating', value: '4.95 ★', icon: Sparkles, color: 'text-amber-500' },
    { label: 'Expert Hand Craft Hours', value: '6,400h', icon: ClockIcon, color: 'text-green-600' }
  ];

  function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2500/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackageId(packageId);
  };

  const handleBookingComplete = () => {
    // Clear out select triggers once placed successfully
    setSelectedPackageId(null);
  };

  const toggleFAQ = (index: number) => {
    if (activeFAQIndex === index) {
      setActiveFAQIndex(null);
    } else {
      setActiveFAQIndex(index);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-green-400 selection:text-slate-900 overflow-x-hidden antialiased">
      
      {/* Dynamic Upper Banner: Contact Quick Link & Eco preserved Statement */}
      <div className="bg-gradient-to-r from-green-950 via-slate-950 to-green-950 border-b border-green-900/30 text-[10.5px] sm:text-xs text-green-300 py-2.5 px-4 text-center font-mono flex items-center justify-center gap-3 flex-wrap">
        <span className="flex items-center gap-1.5 font-bold">
          <Leaf className="w-3.5 h-3.5 text-green-400 animate-pulse" />
          ECO DETAILED FACT: STEAM CAR WASH SAVES OVER 95% FRESH WATER
        </span>
        <span className="hidden md:inline text-slate-500">|</span>
        <a 
          href="tel:+17733355446" 
          className="hover:text-white transition-colors flex items-center gap-1.5 font-semibold text-slate-200"
        >
          <PhoneCall className="w-3 h-3 text-green-400" /> CALL TO BOOK: +1 (773) 335 - 5446
        </a>
      </div>

      {/* Floating Call Center Trigger for Mobile Viewports */}
      <a
        href="tel:+17733355446"
        draggable="false"
        className="fixed bottom-6 right-6 md:hidden bg-green-500 text-slate-950 p-4 rounded-full shadow-2xl shadow-green-500/25 z-50 border border-green-400 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform"
        title="Direct Line Callback"
      >
        <PhoneCall className="w-5.5 h-5.5" />
      </a>

      {/* Navigation Header */}
      <header className="sticky top-0 bg-slate-900/90 backdrop-blur-md z-40 border-b border-slate-800 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 select-none group">
            <div className="w-10 h-10 bg-green-500/10 rounded-xl border border-glow-green/40 flex items-center justify-center shadow-lg shadow-green-500/5 group-hover:border-green-400 group-hover:bg-green-550/15 transition-all">
              <Leaf className="w-5.5 h-5.5 text-green-400 group-hover:rotate-12 transition-transform animate-pulse" />
            </div>
            <div>
              <span className="text-sm font-display font-black text-white tracking-tight uppercase">Green Car Detailing</span>
              <span className="text-[9px] block font-mono text-green-400 tracking-wider leading-none font-bold">CHICAGO PREMIUM EST.</span>
            </div>
          </a>

          {/* Desktop Navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-350 font-mono">
            <a href="#gallery" className="hover:text-green-400 transition-colors">Before/After</a>
            <a href="#pricing" className="hover:text-green-400 transition-colors">Pricing Packages</a>
            <a href="#showroom" className="hover:text-green-400 transition-colors">Showroom Gallery</a>
            <a href="#reviews" className="hover:text-green-400 transition-colors">Client Testimonials</a>
            <a href="#faq" className="hover:text-green-400 transition-colors">Eco FAQs</a>
          </nav>

          {/* Core Booking Trigger Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="tel:+17733355446" 
              className="text-xs font-mono font-bold text-slate-200 hover:text-green-405 transition-colors flex items-center gap-1.5 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800"
            >
              <PhoneCall className="w-3.5 h-3.5 text-green-400" /> +1 (773) 335 - 5446
            </a>
            <a
              href="#booking"
              className="px-4 py-2.5 text-xs font-bold font-display bg-green-550 text-slate-950 hover:bg-green-400 rounded-xl shadow-3d-green hover:scale-[1.02] active:scale-95 transition-all cursor-pointer font-bold border border-green-300/30"
            >
              Configure Reservation
            </a>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-900/98 py-4 px-6 space-y-4 shadow-2xl animate-fade-in font-mono text-xs uppercase tracking-wider">
            <div className="flex flex-col gap-3.5">
              <a 
                href="#gallery" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-green-400 py-1 border-b border-slate-800 text-left"
              >
                Before / After
              </a>
              <a 
                href="#pricing" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-green-400 py-1 border-b border-slate-800 text-left"
              >
                Pricing Tiers
              </a>
              <a 
                href="#showroom" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-green-400 py-1 border-b border-slate-800 text-left"
              >
                Showroom Gallery
              </a>
              <a 
                href="#reviews" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-green-400 py-1 border-b border-slate-800 text-left"
              >
                Customer Reviews
              </a>
              <a 
                href="#faq" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-green-400 py-1 border-b border-slate-800 text-left"
              >
                Eco FAQs
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <a
                href="tel:+17733355446"
                className="w-full text-center py-2.5 border border-slate-700 hover:border-green-500 rounded-xl font-bold flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-4 h-4 text-green-400" /> Call to Book
              </a>
              <a
                href="#booking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 bg-green-500 text-slate-950 font-bold rounded-xl"
              >
                Configure Reservation
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Header Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-20 bg-slate-950">
        
        {/* Cinematic dark background graphic overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=1600"
            alt="Pristine Detailed Car"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25 pointer-events-none select-none filter scale-105 saturate-100 blur-xs"
          />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/80 to-slate-950" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-slate-900 to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10 text-center space-y-8">
          
          {/* Logo visual badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold tracking-wider font-mono uppercase border border-green-500/25">
            <Award className="w-4 h-4" />
            Voted Chicago's premier eco-detail boutique
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.05]">
              Prismatic Shine. <br className="hidden sm:inline" />
              <span className="text-green-400 glow-text">Zero Water Eco-Waste</span>.
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-lg text-slate-400 font-sans leading-relaxed">
              We melt stubborn road salt, grime, and pollen with biodegradable polymer washes and 240°F organic vapor steam. Handcrafted luster with premium Graphene sealants.
            </p>
          </div>

          {/* Quick CTAs buttons banner */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-sm sm:max-w-none mx-auto">
            <a
              href="#booking"
              className="w-full sm:w-auto px-8 py-4 bg-green-500 text-slate-950 hover:bg-green-400 font-display font-bold text-sm rounded-2xl shadow-xl shadow-green-500/10 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Select & Book Online
            </a>
            
            <a
              href="#pricing"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-700 text-slate-350 font-display font-semibold text-sm rounded-2xl transition-all"
            >
              See Service Packages
            </a>
          </div>

          {/* Contact Details banner inside Hero */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-6 text-[11px] sm:text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-green-400" /> Climatic Studio: <strong>Serving Chicago Area</strong>
            </span>
            <span className="hidden sm:inline text-slate-800">•</span>
            <a
              href="tel:+17733355446"
              className="hover:text-green-450 transition-colors flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-green-400" /> Direct Service Line: <strong>+1 (773) 335 - 5446</strong>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Board (Bento-inspired Grid) */}
      <section className="py-12 bg-slate-900 border-y border-slate-850 relative z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((st, idx) => {
              const Icon = st.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono font-semibold">Metrics</span>
                    <Icon className={`w-5 h-5 ${st.color} opacity-80`} />
                  </div>
                  <div className="mt-6">
                    <h4 className="text-xl sm:text-2xl font-display font-extrabold text-white">{st.value}</h4>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5 uppercase tracking-wide">{st.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Before / After comparisons Section */}
      <BeforeAfterSlider />

      {/* Detailed Service comparison Matrix Pricing Tiers Section */}
      <PricingTiers onSelectPackage={handleSelectPackage} />

      {/* Finished Showroom Portfolio grid */}
      <Gallery />

      {/* Dynamic Scheduling Scheduler Section */}
      <BookingSystem 
        preselectedPackageId={selectedPackageId} 
        onBookingComplete={handleBookingComplete} 
      />

      {/* Customer voice / Reviews section */}
      <Reviews />

      {/* Eco Frequently Asked Questions Section */}
      <section id="faq" className="py-24 bg-slate-950 scroll-mt-12 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold mb-3 tracking-wide uppercase border border-green-500/20 font-mono">
              <ShieldAlert className="w-3.5 h-3.5" />
              Environmentally Conscious Transparency
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight">
              Eco <span className="text-green-400 glow-text">Prismatic FAQs</span>
            </h2>
            <p className="mt-4 text-slate-400 text-xs sm:text-sm leading-relaxed">
              Have doubts on dry steam vapor or graphene oxide covalent coatings? Explore curated details about our professional detailing standards.
            </p>
          </div>

          {/* FAQ Accordions lists */}
          <div className="space-y-4 max-w-3xl mx-auto">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFAQIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-medium text-xs sm:text-sm tracking-tight text-white hover:text-green-300 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="shrink-0 w-6 h-6 rounded-lg bg-slate-850 border border-slate-750 flex items-center justify-center text-slate-405">
                      {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-850/60 font-sans">
                      {faq.answer}
                      <div className="mt-2.5 flex items-center gap-1.5 text-[9px] font-mono text-green-400 uppercase font-semibold">
                        <CheckCircle className="w-3 h-3 text-green-400" /> Category: {faq.category}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Conversion footer sections */}
      <footer className="py-16 bg-slate-950 border-t border-slate-900 text-slate-400 font-sans">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-slate-900 pb-12 mb-12">
            
            {/* Branding Column 1 */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-green-500/10 rounded-xl border border-glow-green/30 flex items-center justify-center">
                  <Leaf className="w-5.5 h-5.5 text-green-400" />
                </div>
                <div>
                  <span className="text-sm font-display font-black text-white uppercase tracking-wider">Green Car Detailing</span>
                  <span className="text-[10px] font-mono block text-green-400 tracking-wider">ECO COATED DETAILING STUDIO</span>
                </div>
              </div>
              <p className="text-xs text-slate-450 leading-relaxed max-w-sm">
                A Climate-controlled detailing and paint-enhancement facility specializing in molecular restoration, low-moisture dry-steam sanitation, and elite ceramic coating installations.
              </p>
              <div className="pt-2 font-mono text-xs">
                <span>Serving: Chicago Area, Illinois</span>
              </div>
            </div>

            {/* Hours Column 2 */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-xs uppercase font-semibold tracking-wider font-mono text-white">Weekly Schedule</h4>
              <ul className="text-xs space-y-2 text-slate-350">
                <li className="flex justify-between"><span>Monday - Friday</span> <span>8:00 AM - 7:00 PM</span></li>
                <li className="flex justify-between"><span>Saturday</span> <span>8:30 AM - 5:30 PM</span></li>
                <li className="flex justify-between text-green-400"><span>Sunday</span> <span>9:00 AM - 4:00 PM</span></li>
              </ul>
              <p className="text-[10px] text-slate-500 italic">$50 slot deposit required online.</p>
            </div>

            {/* Direct contact details Column 3 */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs uppercase font-semibold tracking-wider font-mono text-white">Immediate Dispatch Center</h4>
              <p className="text-xs text-slate-350 leading-relaxed">
                Connect directly with our master technicians to coordinate paint-meter inspection appointments or large commercial detailing quotes.
              </p>
              <div className="space-y-2">
                <a 
                  href="tel:+17733355446" 
                  className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-white font-mono font-bold text-xs flex items-center gap-2 hover:bg-slate-850 hover:border-green-500/30 transition-all cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-green-400 shrink-0" />
                  +1 (773) 335 - 5446
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10.5px] font-mono text-slate-500 text-center">
            <p>© {new Date().getFullYear()} Green Car Detailing Studio. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              <span>Biodegradable Polymer Standards</span> • <span>Low-Moisture Steam Wash Tech</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
