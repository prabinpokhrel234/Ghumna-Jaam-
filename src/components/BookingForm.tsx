import React, { useState, useEffect } from "react";
import { Calculator, CheckCircle2, DollarSign, Calendar, Users, Phone, Mail, User, ShieldCheck, Heart, Sparkles } from "lucide-react";
import { packages } from "../data";
import { Package } from "../types";

interface BookingFormProps {
  selectedPackage: Package | null;
  onBookingSuccess: () => void;
}

export default function BookingForm({ selectedPackage, onBookingSuccess }: BookingFormProps) {
  const [activePackageId, setActivePackageId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  
  // Custom Add-on features
  const [addPrivatePorter, setAddPrivatePorter] = useState(false);
  const [addHelicopterSightsee, setAddHelicopterSightsee] = useState(false);

  // Success screen state
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const activePackage = packages.find((pkg) => pkg.id === activePackageId) || selectedPackage || packages[0];

  useEffect(() => {
    if (selectedPackage) {
      setActivePackageId(selectedPackage.id);
    } else {
      setActivePackageId(packages[0].id);
    }
  }, [selectedPackage]);

  // Live Price Calculation
  const basePrice = activePackage ? activePackage.price : 0;
  const porterAddonCost = addPrivatePorter ? 150 : 0; // $150 flat porter charge
  const helicopterAddonCost = addHelicopterSightsee ? 350 : 0; // $350 flat helicopter sightsee per person

  const pricePerTraveler = basePrice + helicopterAddonCost;
  const subtotal = pricePerTraveler * travelers;
  const totalAmount = subtotal + porterAddonCost;

  // Validation state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Full Name is required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Provide a valid email address";
    if (!phone.trim() || phone.length < 8) newErrors.phone = "Provide a valid contact number";
    if (!travelDate) newErrors.travelDate = "Please choose a departure date";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate booking generation
      const refCode = "GJ-" + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(refCode);
      setIsSuccess(true);
      onBookingSuccess();
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setName("");
    setEmail("");
    setPhone("");
    setTravelDate("");
    setTravelers(1);
    setSpecialRequests("");
    setAddPrivatePorter(false);
    setAddHelicopterSightsee(false);
    setErrors({});
  };

  return (
    <section id="booking-section" className="py-24 bg-white dark:bg-[#071E3C]/20 transition-colors duration-500 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-[#FF9F1C] block mb-2">Secure Reservation</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0A2A52] dark:text-white tracking-tight leading-tight">
            Book Your Journey
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-2">
            Complete the form below to lock in your custom itinerary. No deposit required today—our travel specialists will contact you to finalize.
          </p>
        </div>

        {isSuccess ? (
          /* SUCCESS SCREEN RECEIPT */
          <div className="max-w-2xl mx-auto bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 rounded-3xl p-8 sm:p-12 text-center shadow-xl animate-fade-in">
            <div className="bg-emerald-500 text-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-emerald-800 dark:text-emerald-400 mb-2">Booking Requested!</h3>
            <p className="text-emerald-700 dark:text-emerald-300 text-sm mb-6 max-w-md mx-auto">
              Namaste, <strong>{name}</strong>! Your reservation inquiry for the <strong>{activePackage.title}</strong> has been received successfully.
            </p>

            {/* Receipt Summary */}
            <div className="bg-white dark:bg-[#071E3C] rounded-2xl p-6 shadow-sm border border-emerald-100 dark:border-emerald-900/50 text-left mb-8">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-3 mb-3">
                <span className="text-xs text-gray-400 font-bold uppercase">Booking Reference</span>
                <span className="text-sm font-extrabold font-mono text-[#0A2A52] dark:text-[#00B4D8]">{bookingRef}</span>
              </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <p><strong>Destination:</strong> {activePackage.location}</p>
                <p><strong>Departure Date:</strong> {travelDate}</p>
                <p><strong>Travelers:</strong> {travelers} Pax</p>
                
                {/* Add-ons line item */}
                {(addPrivatePorter || addHelicopterSightsee) && (
                  <p>
                    <strong>Selected Extras:</strong>{" "}
                    {addPrivatePorter && "Private Porter, "}
                    {addHelicopterSightsee && "Helicopter Ride"}
                  </p>
                )}
                
                <div className="pt-3 border-t border-gray-100 dark:border-white/5 flex justify-between items-center text-base">
                  <span className="font-extrabold text-[#0A2A52] dark:text-white">Estimated Total:</span>
                  <span className="font-black text-[#FF9F1C] font-mono text-xl">${totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-gray-500 leading-relaxed">
                *Our travel coordinator will email you at <strong>{email}</strong> within 2 hours with the verified flight itinerary and payment gateway details.
              </p>
              <button
                onClick={handleReset}
                className="bg-[#0A2A52] hover:bg-[#FF9F1C] text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md cursor-pointer"
              >
                Plan Another Trip
              </button>
            </div>
          </div>
        ) : (
          /* DUAL COLUMNS: FORM AND LIVE CALCULATOR */
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Booking Form (Left Column) */}
            <div className="lg:col-span-7 bg-gray-50 dark:bg-[#071E3C] rounded-3xl p-6 sm:p-10 border border-gray-100 dark:border-white/5 shadow-md">
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                
                {/* Selection Dropdown */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-bold text-[#0A2A52] dark:text-gray-300 uppercase tracking-wider block">
                    Choose Your Expedition
                  </label>
                  <select
                    value={activePackageId}
                    onChange={(e) => setActivePackageId(e.target.value)}
                    className="w-full bg-white dark:bg-[#0A2A52] text-[#0A2A52] dark:text-white font-semibold px-4 py-3.5 rounded-xl border border-gray-200 dark:border-white/10 focus:border-[#FF9F1C] focus:outline-none transition-all cursor-pointer"
                  >
                    {packages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.title} (${pkg.price}/pax)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Form fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#0A2A52] dark:text-gray-300 uppercase tracking-wider block">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full bg-white dark:bg-white/5 pl-10 pr-4 py-3 rounded-xl border focus:outline-none transition-all text-sm ${
                          errors.name ? "border-red-500" : "border-gray-200 dark:border-white/10 focus:border-[#FF9F1C]"
                        }`}
                      />
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                    </div>
                    {errors.name && <span className="text-[10px] text-red-500 font-bold">{errors.name}</span>}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#0A2A52] dark:text-gray-300 uppercase tracking-wider block">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full bg-white dark:bg-white/5 pl-10 pr-4 py-3 rounded-xl border focus:outline-none transition-all text-sm ${
                          errors.email ? "border-red-500" : "border-gray-200 dark:border-white/10 focus:border-[#FF9F1C]"
                        }`}
                      />
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                    </div>
                    {errors.email && <span className="text-[10px] text-red-500 font-bold">{errors.email}</span>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#0A2A52] dark:text-gray-300 uppercase tracking-wider block">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="+977-9800000000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full bg-white dark:bg-white/5 pl-10 pr-4 py-3 rounded-xl border focus:outline-none transition-all text-sm ${
                          errors.phone ? "border-red-500" : "border-gray-200 dark:border-white/10 focus:border-[#FF9F1C]"
                        }`}
                      />
                      <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                    </div>
                    {errors.phone && <span className="text-[10px] text-red-500 font-bold">{errors.phone}</span>}
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#0A2A52] dark:text-gray-300 uppercase tracking-wider block">
                      Departure Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className={`w-full bg-white dark:bg-white/5 px-4 py-3 rounded-xl border focus:outline-none transition-all text-sm [color-scheme:light] ${
                          errors.travelDate ? "border-red-500" : "border-gray-200 dark:border-white/10 focus:border-[#FF9F1C]"
                        }`}
                      />
                    </div>
                    {errors.travelDate && <span className="text-[10px] text-red-500 font-bold">{errors.travelDate}</span>}
                  </div>

                </div>

                {/* Travelers slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-[#0A2A52] dark:text-gray-300 uppercase tracking-wider flex items-center">
                      <Users className="w-4 h-4 mr-1 text-[#FF9F1C]" />
                      Number of Travelers
                    </label>
                    <span className="text-sm font-black font-mono text-[#FF9F1C]">{travelers} Pax</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="w-full accent-[#FF9F1C] h-2 bg-gray-200 dark:bg-white/25 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Custom Luxury Addons checkmarks */}
                <div className="bg-white dark:bg-[#071E3C]/40 p-4 rounded-2xl border border-gray-100 dark:border-white/5 space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">Luxury Upgrades</span>
                  
                  {/* Porter */}
                  <label className="flex items-center space-x-3 cursor-pointer group select-none">
                    <input
                      type="checkbox"
                      checked={addPrivatePorter}
                      onChange={(e) => setAddPrivatePorter(e.target.checked)}
                      className="accent-[#FF9F1C] w-4.5 h-4.5 rounded"
                    />
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-[#0A2A52] dark:text-white group-hover:text-[#FF9F1C] transition-colors">
                        Add Private Sherpa Porter (+$150 flat)
                      </span>
                      <p className="text-[10px] text-gray-400 leading-none">Carries up to 15kg weight, leaving you completely unencumbered.</p>
                    </div>
                  </label>

                  {/* Heli sightsee */}
                  <label className="flex items-center space-x-3 cursor-pointer group select-none">
                    <input
                      type="checkbox"
                      checked={addHelicopterSightsee}
                      onChange={(e) => setAddHelicopterSightsee(e.target.checked)}
                      className="accent-[#FF9F1C] w-4.5 h-4.5 rounded"
                    />
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-[#0A2A52] dark:text-white group-hover:text-[#FF9F1C] transition-colors">
                        Add Heli Sightseeing Experience (+$350/person)
                      </span>
                      <p className="text-[10px] text-gray-400 leading-none">A breathtaking 30-minute high alpine flight over glaciers.</p>
                    </div>
                  </label>
                </div>

                {/* Special Requests */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#0A2A52] dark:text-gray-300 uppercase tracking-wider block">
                    Special Requests / Dietary Restrictions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="E.g., Vegetarian diet, oxygen tank request, twin bed configuration..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-white dark:bg-white/5 px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:border-[#FF9F1C] focus:outline-none transition-all text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0A2A52] hover:bg-[#FF9F1C] text-white font-bold py-4 rounded-xl shadow-lg transition-all transform active:scale-98 flex items-center justify-center space-x-2 cursor-pointer dark:bg-white/10 dark:hover:bg-[#FF9F1C]"
                >
                  <ShieldCheck className="w-5 h-5 text-[#00B4D8]" />
                  <span>Request Custom Booking</span>
                </button>

              </form>
            </div>

            {/* Price Calculator display panel (Right Column) */}
            <div className="lg:col-span-5 bg-[#0A2A52] rounded-3xl p-6 sm:p-10 text-white border border-white/5 shadow-xl space-y-6 relative overflow-hidden self-start">
              
              {/* Background gradient element */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center space-x-2 pb-4 border-b border-white/10">
                <Calculator className="w-5 h-5 text-[#FF9F1C]" />
                <h3 className="text-lg font-bold">Instant Price Calculator</h3>
              </div>

              {activePackage && (
                <div className="space-y-4">
                  {/* Selected Package detail summary */}
                  <div className="flex items-start space-x-3">
                    <img
                      src={activePackage.image}
                      alt={activePackage.title}
                      className="w-16 h-16 rounded-xl object-cover border border-white/10"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="text-[10px] text-[#00B4D8] font-black uppercase">{activePackage.location}</span>
                      <h4 className="text-sm font-bold line-clamp-1 leading-tight">{activePackage.title}</h4>
                      <span className="text-xs text-gray-300 font-mono font-bold">${basePrice} / pax</span>
                    </div>
                  </div>

                  {/* Calculator Ledger */}
                  <div className="pt-4 border-t border-white/10 space-y-3.5 text-sm">
                    
                    <div className="flex justify-between items-center text-gray-300">
                      <span>Base Package Price:</span>
                      <span className="font-bold font-mono">${basePrice} × {travelers}</span>
                    </div>

                    {addHelicopterSightsee && (
                      <div className="flex justify-between items-center text-gray-300">
                        <span>Heli Sightseeing Upgrade:</span>
                        <span className="font-bold text-emerald-400 font-mono">+${helicopterAddonCost} × {travelers}</span>
                      </div>
                    )}

                    {addPrivatePorter && (
                      <div className="flex justify-between items-center text-gray-300">
                        <span>Private Porter/Sherpa:</span>
                        <span className="font-bold text-emerald-400 font-mono">+${porterAddonCost} (Flat)</span>
                      </div>
                    )}

                    <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                      <div>
                        <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">Estimated Cost</span>
                        <span className="text-sm text-gray-300 font-medium">All-Inclusive Price</span>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-black text-[#FF9F1C] font-mono block">${totalAmount}</span>
                        <span className="text-[10px] text-gray-400 block italic">USD (Taxes Included)</span>
                      </div>
                    </div>

                  </div>

                  {/* Luxury Badges and Trust Seals */}
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-[11px] text-gray-300 space-y-2.5">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Best Luxury Price Guarantee</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-[#FF9F1C] flex-shrink-0" />
                      <span>Zero-Interest Payment Plans available</span>
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
