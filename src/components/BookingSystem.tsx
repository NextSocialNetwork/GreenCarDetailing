import React, { useState, useEffect } from 'react';
import { 
  Car, Clock, Sliders, Calendar, User, CheckCircle2, 
  ChevronRight, ChevronLeft, Undo, Sparkles, Droplets, 
  PhoneCall, ShieldAlert, BadgeInfo 
} from 'lucide-react';
import { VEHICLE_TYPES, SERVICE_PACKAGES, ADD_ON_SERVICES, ORGANIC_SCENTS } from '../data';
import { VehicleType, Booking } from '../types';

interface BookingSystemProps {
  preselectedPackageId: string | null;
  onBookingComplete: () => void;
}

export default function BookingSystem({ preselectedPackageId, onBookingComplete }: BookingSystemProps) {
  // Booking Wizard Steps:
  // 1: Vehicle & Package Setup
  // 2: Add-on Customizations
  // 3: Schedule Date & Time
  // 4: Contact Info & Review
  // 5: Complete & Confirmed
  const [step, setStep] = useState<number>(1);
  
  // State
  const [vehicleId, setVehicleId] = useState<VehicleType>('sedan');
  const [packageId, setPackageId] = useState<string>('eco-essential');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedScent, setSelectedScent] = useState<string>('lavender-mint');
  
  // Date selection states (Defaulting to tomorrow: May 25, 2026)
  const [selectedDate, setSelectedDate] = useState<string>('2026-05-25');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:30 AM');
  
  // Contacts
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [carMakeModel, setCarMakeModel] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  
  // App bookings loaded from localStorage for collision detection
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  
  // Completed Booking Details
  const [newBooking, setNewBooking] = useState<Booking | null>(null);

  // Synchronize package selection from props
  useEffect(() => {
    if (preselectedPackageId) {
      setPackageId(preselectedPackageId);
      // Automatically jump to booking wizard if preselected
      setStep(1);
      const elem = document.getElementById('booking');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [preselectedPackageId]);

  // Load existing bookings from LocalStorage
  useEffect(() => {
    const stored = localStorage.getItem('ngreen_bookings');
    if (stored) {
      try {
        setAllBookings(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse local bookings", e);
      }
    }
  }, []);

  // Constants for Calendar
  const currentYear = 2026;
  const currentMonthIdx = 4; // May (0-indexed)
  const monthName = "May";
  const daysInMay = 31;
  const startDayOffset = 5; // May 1, 2026 is a Friday

  const daysList = Array.from({ length: daysInMay }, (_, i) => i + 1);

  // Time slot options
  const TIME_SLOTS = [
    "08:30 AM", "10:30 AM", "12:30 PM", "02:30 PM", "04:30 PM", "06:30 PM"
  ];

  // Calculations
  const selectedVehicle = VEHICLE_TYPES.find(v => v.id === vehicleId)!;
  const selectedPackage = SERVICE_PACKAGES.find(p => p.id === packageId)!;
  const selectedAddOnObjects = ADD_ON_SERVICES.filter(a => selectedAddOns.includes(a.id));

  const basePrice = selectedPackage.priceBase;
  const sizeSurcharge = selectedVehicle.priceMultiplier;
  const addOnsTotal = selectedAddOnObjects.reduce((acc, a) => acc + a.price, 0);
  const totalCost = basePrice + sizeSurcharge + addOnsTotal;

  const totalDuration = selectedPackage.durationMinutes + selectedAddOnObjects.reduce((acc, a) => acc + a.durationMinutes, 0);

  // Environmental impact values
  const waterSavedGallons = 45 + (vehicleId === 'suv' ? 10 : vehicleId === 'truck' ? 20 : 0);

  const toggleAddOn = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter(item => item !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !carMakeModel) {
      alert("Please fill in all requested fields to finalize authorization.");
      return;
    }

    const bookingId = 'GCD-' + Math.floor(100000 + Math.random() * 900000);
    const bookingData: Booking = {
      id: bookingId,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      vehicleType: vehicleId,
      vehicleMakeModel: carMakeModel,
      packageId,
      addOnIds: selectedAddOns,
      selectedScent: selectedScent,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      totalCost,
      notes,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    const updatedBookings = [...allBookings, bookingData];
    localStorage.setItem('ngreen_bookings', JSON.stringify(updatedBookings));
    setAllBookings(updatedBookings);
    setNewBooking(bookingData);
    setStep(5);
    onBookingComplete();
  };

  // Check if a specific slot is booked
  const isSlotBooked = (dateStr: string, slotStr: string) => {
    return allBookings.some(b => b.date === dateStr && b.timeSlot === slotStr && b.status !== 'cancelled');
  };

  return (
    <section id="booking" className="py-24 bg-white text-slate-900 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold mb-3 tracking-wide uppercase border border-green-100">
            <Droplets className="w-3.5 h-3.5 text-green-600" />
            Vapor Stream Scheduler
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight text-slate-900">
            Book Your <span className="text-green-700 font-bold">Premium Detail</span>
          </h2>
          <p className="mt-4 text-slate-600 text-sm md:text-base leading-relaxed">
            Customize, coordinate, and reserve a detailing slot in 2 minutes. Secure your booking with a $50 deposit.
          </p>
        </div>

        {/* Wizard Progress Bar */}
        {step < 5 && (
          <div className="mb-12 max-w-2xl mx-auto">
            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
              <span className={step >= 1 ? 'text-green-700 font-bold' : ''}>1. Tier & Vehicle</span>
              <span className={step >= 2 ? 'text-green-700 font-bold' : ''}>2. Add-Ons</span>
              <span className={step >= 3 ? 'text-green-700 font-bold' : ''}>3. Calendar Info</span>
              <span className={step >= 4 ? 'text-green-700 font-bold' : ''}>4. Review Details</span>
            </div>
            <div className="mt-2.5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-600 transition-all duration-300" 
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Content Panel Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Wizard Inputs (Left 8 Cols) */}
          <div className="lg:col-span-8 bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
            
            {/* STEP 1: VEHICLE TYPE AND PACKAGE */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-display font-medium text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-green-100 text-green-800 text-xs flex items-center justify-center font-bold">1</span>
                    Select Your Vehicle Class
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Surcharges account for supplementary organic detergents and manual polish labor hours.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                    {VEHICLE_TYPES.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setVehicleId(v.id)}
                        className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                          vehicleId === v.id
                            ? 'bg-white border-green-600 ring-2 ring-green-600/10'
                            : 'bg-white border-slate-200 hover:border-slate-350'
                        }`}
                      >
                        <div className="flex justify-between items-start w-full">
                          <Car className={`w-6 h-6 ${vehicleId === v.id ? 'text-green-700' : 'text-slate-400'}`} />
                          <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                            v.priceMultiplier === 0 ? 'bg-slate-100 text-slate-600' : 'bg-green-100 text-green-800'
                          }`}>
                            {v.priceMultiplier === 0 ? 'Base Price' : `+$${v.priceMultiplier}`}
                          </span>
                        </div>
                        <div className="mt-4">
                          <h4 className="text-xs sm:text-sm font-semibold tracking-tight">{v.name}</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{v.sizeCategory}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <h3 className="text-lg font-display font-medium text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-green-100 text-green-800 text-xs flex items-center justify-center font-bold">2</span>
                    Select Detailing Service Package
                  </h3>
                  
                  <div className="space-y-3 mt-4">
                    {SERVICE_PACKAGES.map((pkg) => (
                      <label
                        key={pkg.id}
                        onClick={() => setPackageId(pkg.id)}
                        className={`flex items-start gap-4 p-4 rounded-2xl border bg-white transition-all cursor-pointer ${
                          packageId === pkg.id
                            ? 'border-green-600 ring-2 ring-green-600/10'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="package"
                          checked={packageId === pkg.id}
                          onChange={() => {}} // Handled by click of container
                          className="mt-1 h-4 w-4 accent-green-600 cursor-pointer shrink-0"
                        />
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold text-slate-900">{pkg.name}</span>
                            <span className="text-xs font-mono font-medium text-slate-500">
                              (Est: {Math.floor(pkg.durationMinutes / 60)}h)
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-snug">{pkg.shortDescription}</p>
                          <div className="text-xs text-green-700 font-semibold font-display pt-1">
                            From ${pkg.priceBase} Base
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    Select Add-Ons <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: ADD-ON TREATMENTS */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-display font-medium text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-green-100 text-green-800 text-xs flex items-center justify-center font-bold">3</span>
                      Add Specialty Eco Treatments
                    </h3>
                    <button
                      type="button"
                      onClick={() => setSelectedAddOns([])}
                      className="text-xs text-slate-500 hover:text-red-600 transition-colors flex items-center gap-1"
                    >
                      Clear Selection
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Select individual custom services to complement your baseline detailing setup.</p>

                  <div className="grid grid-cols-1 gap-3 mt-4">
                    {ADD_ON_SERVICES.map((add) => {
                      const isSelected = selectedAddOns.includes(add.id);
                      return (
                        <div
                          key={add.id}
                          onClick={() => toggleAddOn(add.id)}
                          className={`p-4 rounded-2xl border bg-white transition-all cursor-pointer flex justify-between items-start gap-4 ${
                            isSelected
                              ? 'border-green-600 bg-green-50/10 ring-2 ring-green-600/10'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}} // Click is handled on container level
                              className="mt-1 h-4 w-4 accent-green-600 shrink-0 cursor-pointer"
                            />
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs sm:text-sm font-semibold text-slate-900">{add.name}</h4>
                                <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 rounded uppercase">
                                  {add.category}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 leading-snug">{add.description}</p>
                              <p className="text-[10px] font-mono text-slate-400">Estimated Duration: +{add.durationMinutes} minutes</p>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs sm:text-sm font-bold text-green-700">+${add.price}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* COMPLIMENTARY ORGANIC SCENTS SELECTION PANEL */}
                <div className="pt-8 border-t border-slate-200">
                  <h3 className="text-lg font-display font-medium text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-green-600 shrink-0" />
                    Complimentary Premium Herb & Berry Aroma Infusion
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Every detailing project includes dry-vapor steam thermal cycles infused with 100% biological botanical essential oils. Keep your cabin smelling fresh and free of synthetic chemicals.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {ORGANIC_SCENTS.map((scent) => {
                      const isSelected = selectedScent === scent.id;
                      return (
                        <div
                          key={scent.id}
                          onClick={() => setSelectedScent(scent.id)}
                          className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-slate-900 text-white border-slate-950 shadow-md scale-[1.01]'
                              : 'bg-white border-slate-200 text-slate-800 hover:border-slate-350'
                          }`}
                        >
                          <div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs sm:text-sm font-semibold tracking-tight">{scent.name}</span>
                              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                                isSelected ? 'bg-green-600/20 text-green-400' : 'bg-slate-150 text-slate-500'
                              }`}>
                                {scent.intensity} Intensity
                              </span>
                            </div>
                            <p className={`text-[10px] sm:text-xs mt-1.5 leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                              {scent.description}
                            </p>
                          </div>
                          <div className={`mt-3 text-[9px] font-mono italic shrink-0 ${isSelected ? 'text-green-400' : 'text-slate-400'}`}>
                            Notes: {scent.notes}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200 flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-5 py-3 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-650 hover:bg-slate-100 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> Go Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    Choose Date & Time <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: SCHEDULE DATE & TIME */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-display font-medium text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-green-100 text-green-800 text-xs flex items-center justify-center font-bold">4</span>
                    Coordinate Detailing Date
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Currently taking reservations for the month of May 2026. Select an active date.</p>

                  {/* CUSTOM MONTHLY CALENDAR GRID (MAY 2026) */}
                  <div className="mt-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-inner max-w-sm mx-auto">
                    <div className="text-center font-display font-semibold text-sm text-slate-900 pb-3 border-b border-slate-150">
                      May 2026
                    </div>
                    {/* Weekday headers */}
                    <div className="grid grid-cols-7 text-center text-[10px] font-mono font-bold text-slate-400 mt-3 mb-2.5">
                      <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                    </div>
                    {/* Days grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {/* Empty cells to offset start day (May 1 2026 is Friday) */}
                      {Array.from({ length: startDayOffset }).map((_, idx) => (
                        <div key={`empty-${idx}`} />
                      ))}
                      
                      {daysList.map((day) => {
                        const dateStr = `2026-05-${day < 10 ? '0' + day : day}`;
                        const isPast = day < 25; // Disable days before tomorrow (May 25, 2026)
                        const isSunday = (day + startDayOffset - 1) % 7 === 6;
                        const isClickable = !isPast; // Open on Sundays too!
                        const isSelected = selectedDate === dateStr;

                        return (
                          <button
                            key={`day-${day}`}
                            type="button"
                            disabled={!isClickable}
                            onClick={() => setSelectedDate(dateStr)}
                            className={`aspect-square rounded-lg text-xs font-semibold flex flex-col items-center justify-center transition-all ${
                              isSelected
                                ? 'bg-green-700 text-white font-display ring-2 ring-green-600/20'
                                : isClickable
                                ? 'bg-slate-50 hover:bg-green-100 text-slate-800 border border-slate-150 cursor-pointer'
                                : 'bg-slate-100 text-slate-350 cursor-not-allowed opacity-40 line-through'
                            }`}
                          >
                            <span>{day}</span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-3 flex justify-between text-[10px] text-slate-500">
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-green-700 inline-block"/>Selected</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-slate-100 border inline-block"/>Available</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded opacity-40 bg-slate-200 inline-block line-through"/>Unavailable</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <h3 className="text-lg font-display font-medium text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-green-100 text-green-800 text-xs flex items-center justify-center font-bold">5</span>
                    Select Arrival Time Slot
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Arrival windows. Detail starts within 15 minutes of selected time.</p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                    {TIME_SLOTS.map((slot) => {
                      const isTaken = isSlotBooked(selectedDate, slot);
                      const isSelected = selectedTimeSlot === slot;
                      
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isTaken}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-slate-900 border-slate-900 text-white'
                              : isTaken
                              ? 'bg-red-50 border-red-200 text-red-500 opacity-60 cursor-not-allowed text-xs line-through flex flex-col items-center justify-center'
                              : 'bg-white border-slate-200 hover:border-slate-350 cursor-pointer text-slate-800'
                          }`}
                        >
                          <div>{slot}</div>
                          {isTaken && <span className="text-[9px] block text-red-400 font-mono italic">Booked out</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200 flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-5 py-3 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-650 hover:bg-slate-100 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> Go Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    Customer Details <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: CONTACT INFO & REVIEW */}
            {step === 4 && (
              <form onSubmit={handleSubmitBooking} className="space-y-6">
                <div>
                  <h3 className="text-lg font-display font-medium text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-green-100 text-green-800 text-xs flex items-center justify-center font-bold">6</span>
                    Your Contact & Vehicle Identity
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Please insert correct coordinates. No pre-payment is processed today.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono font-semibold text-slate-500 uppercase">First & Last Name*</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono font-semibold text-slate-500 uppercase">Email Address*</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono font-semibold text-slate-500 uppercase">Phone Number*</label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono font-semibold text-slate-500 uppercase">Car Make & Model*</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 2023 Tesla Model Y (Metallic Black)"
                        value={carMakeModel}
                        onChange={(e) => setCarMakeModel(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 mt-4">
                    <label className="text-[11px] font-mono font-semibold text-slate-500 uppercase">Special Detailing Instructions or Requests (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Pet odor extreme spill on center console, or request fragile interior ceramic screen hand wiping..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-[11px] text-green-800 leading-relaxed flex gap-2.5">
                  <BadgeInfo className="w-5 -mt-0.5 h-5 shrink-0 text-green-700" />
                  <div>
                    <strong>Confirmation Guarantee:</strong> Space is highly limited. Clicking confirm secures your spot with a $50 deposit processed online. The remaining balance will be collected upon total work completion!
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-5 py-3 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-650 hover:bg-slate-100 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> Go Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-green-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 hover:bg-green-800 transition-all cursor-pointer shadow-lg shadow-green-500/10"
                  >
                    Confirm & Submit Booking <CheckCircle2 className="w-4.5 h-4.5 text-green-300" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 5: COMPLETED CONFIRMATION CARD */}
            {step === 5 && newBooking && (
              <div className="text-center py-6 space-y-6">
                <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase bg-green-100 text-green-800 px-2.5 py-1 rounded-full font-bold">
                    Reservation Confirmed
                  </span>
                  <h3 className="text-2xl font-display font-semibold text-slate-900 mt-3">Prismatic Slot Reserved!</h3>
                  <p className="text-xs text-slate-500 mt-1">Order Ref ID: <strong className="font-mono text-slate-800">{newBooking.id}</strong></p>
                </div>

                {/* Receipt visual card */}
                <div className="bg-white border rounded-2xl p-5 text-left text-xs space-y-3/5 max-w-sm mx-auto">
                  <div className="flex justify-between font-bold border-b pb-2">
                    <span>Summary</span>
                    <span className="text-green-700">${newBooking.totalCost}</span>
                  </div>
                  <div className="space-y-1.5 text-slate-600">
                    <p className="flex justify-between text-green-700 font-semibold bg-green-50/50 px-2 py-1 rounded border border-green-100 mb-1">
                      <span>Deposit Paid Online:</span>
                      <span className="font-bold">$50.00</span>
                    </p>
                    <p className="flex justify-between font-bold text-slate-800 border-b pb-1.5 mb-2 text-[13px]">
                      <span>Remaining Balance:</span>
                      <span className="font-extrabold text-slate-900">${newBooking.totalCost - 50}</span>
                    </p>
                    <p className="flex justify-between"><span>Package:</span> <span className="font-semibold text-slate-800">{selectedPackage.name}</span></p>
                    <p className="flex justify-between"><span>Frame:</span> <span className="font-semibold text-slate-800">{selectedVehicle.name}</span></p>
                    <p className="flex justify-between"><span>Assigned Date:</span> <span className="font-semibold text-slate-800">{newBooking.date}</span></p>
                    <p className="flex justify-between"><span>Arrival Slot:</span> <span className="font-semibold text-slate-800">{newBooking.timeSlot}</span></p>
                    {newBooking.selectedScent && (
                      <p className="flex justify-between text-green-800 bg-green-50 px-2 py-1 rounded border border-green-100 font-medium">
                        <span>Aroma Infusion:</span>
                        <span className="font-bold">
                          {ORGANIC_SCENTS.find(s => s.id === newBooking.selectedScent)?.name || newBooking.selectedScent}
                        </span>
                      </p>
                    )}
                    {selectedAddOnObjects.length > 0 && (
                      <p className="pt-1.5 flex flex-wrap gap-1 bg-slate-50 p-2 rounded border border-slate-100">
                        {selectedAddOnObjects.map(ao => (
                          <span key={ao.id} className="text-[9px] bg-slate-100 text-slate-700 px-1 py-0.5 rounded">+{ao.name}</span>
                        ))}
                      </p>
                    )}
                  </div>
                </div>

                {/* Environmental impact note */}
                <div className="bg-green-50 text-green-900 p-4 rounded-2xl border border-green-200 text-xs flex items-center gap-3.5 max-w-md mx-auto">
                  <Droplets className="w-8 h-8 text-green-600 shrink-0" />
                  <div className="text-left leading-normal">
                    <strong>Green Impact Highlight:</strong> By choosing Green Car Detailing dry-vapor technology, your detailing wash uses only 1.5 gallons of water compared to the industry standard of 60 gallons. You just conserved <strong>~{waterSavedGallons} gallons</strong> of premium fresh water!
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => {
                      setStep(1);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setCarMakeModel('');
                      setSelectedAddOns([]);
                      setNotes('');
                    }}
                    className="px-5 py-2.5 border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Schedule Another Vehicle
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sizing & Pricing Sidebar (3 Columns) */}
          {step < 5 && (
            <div className="lg:col-span-4 bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-6">
              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-green-400">Selected Setup</h4>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-xs pb-2 border-b border-slate-800">
                    <span className="text-slate-400">Selected Vehicle:</span>
                    <span className="font-bold">{selectedVehicle.name}</span>
                  </div>
                  <div className="flex justify-between text-xs pb-2 border-b border-slate-800">
                    <span className="text-slate-400">Core Frame Base Tariff:</span>
                    <span className="font-bold">${selectedPackage.priceBase}</span>
                  </div>
                  <div className="flex justify-between text-xs pb-2 border-b border-slate-800">
                    <span className="text-slate-400">Class Surcharge:</span>
                    <span className="font-bold text-green-400">+${sizeSurcharge}</span>
                  </div>
                  {selectedScent && (
                    <div className="flex justify-between text-xs pb-2 border-b border-slate-800">
                      <span className="text-slate-400">Aroma Infusion:</span>
                      <span className="font-bold text-green-400 truncate max-w-[150px]">
                        {ORGANIC_SCENTS.find(s => s.id === selectedScent)?.name || 'None'}
                      </span>
                    </div>
                  )}

                  {/* Add-ons list */}
                  {selectedAddOnObjects.length > 0 && (
                    <div className="pt-2">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Custom Add-Ons</p>
                      <div className="space-y-1.5 mt-1.5">
                        {selectedAddOnObjects.map(ao => (
                          <div key={ao.id} className="flex justify-between text-[11px]">
                            <span className="text-slate-300 truncate max-w-[150px]">{ao.name}</span>
                            <span className="font-medium text-green-400">+${ao.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Live running summary values */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-green-400" /> Coordinated Time:
                  </span>
                  <span className="font-bold text-white uppercase">{Math.floor(totalDuration / 60)}h {totalDuration % 60 > 0 ? `${totalDuration % 60}m` : ''}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-blue-400" /> Preserved Water:
                  </span>
                  <span className="font-bold text-blue-300">~{waterSavedGallons} Gallons Saved</span>
                </div>
              </div>

              {/* Big running Total Cost display */}
              <div className="pt-4 border-t border-slate-800 flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Estimated Total</p>
                  <p className="text-xs text-green-400 font-medium font-mono">$50 Deposit Required</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-display font-extrabold text-green-400">${totalCost}</span>
                </div>
              </div>

              {/* Call-to-action details direct */}
              <div className="pt-2 pb-1 bg-slate-850 p-4 rounded-2xl border border-slate-800 text-center space-y-1">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Immediate Question?</p>
                <a
                  href="tel:+17733355446"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-green-300 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-green-400" /> +1 (773) 335 - 5446
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Local device historical bookings viewer */}
        {allBookings.length > 0 && (
          <div className="mt-20 border-t pt-16 max-w-4xl mx-auto">
            <h3 className="text-lg font-display font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-600 animate-pulse"/>
              My Local Reservational Appointments
            </h3>
            <p className="text-xs text-slate-500 mb-4">Bookings stored on this web browser device. You can cancel reservations below.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allBookings.map((bk) => (
                <div 
                  key={bk.id} 
                  className={`p-4 rounded-2xl border bg-slate-50 relative flex flex-col justify-between ${
                    bk.status === 'cancelled' ? 'opacity-50 border-slate-200' : 'border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-mono uppercase bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold">Ref: {bk.id}</span>
                        <h4 className="text-xs sm:text-sm font-semibold mt-1">{bk.vehicleMakeModel}</h4>
                      </div>
                      <span className={`text-[10px] font-bold uppercase rounded-full px-2 py-0.5 ${
                        bk.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {bk.status}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 mt-2 space-y-0.5">
                      <p><strong>Scheduled:</strong> {bk.date} @ {bk.timeSlot}</p>
                      <p><strong>Package:</strong> {SERVICE_PACKAGES.find(p=>p.id === bk.packageId)?.name}</p>
                      <p><strong>Total Price:</strong> ${bk.totalCost}</p>
                      <p className="text-green-700"><strong>Online Deposit:</strong> $50.00 (Paid)</p>
                      <p className="font-semibold text-slate-800"><strong>Remaining Balance:</strong> ${bk.totalCost - 50}</p>
                    </div>
                  </div>

                  {bk.status !== 'cancelled' && (
                    <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm("Are you sure you want to cancel this detailing reservation?")) {
                            const updated = allBookings.map(b => b.id === bk.id ? { ...b, status: 'cancelled' as const } : b);
                            localStorage.setItem('ngreen_bookings', JSON.stringify(updated));
                            setAllBookings(updated);
                          }
                        }}
                        className="text-[10px] text-red-600 font-bold hover:underline bg-transparent border-0 cursor-pointer"
                      >
                        Cancel Appointment
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
