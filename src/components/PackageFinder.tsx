import { useState } from "react";
import { Sparkles, HelpCircle, Users, Wallet, Clock, Compass, Check, ArrowRight, RefreshCw, CalendarRange } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { packages } from "../data";
import { Package } from "../types";

interface PackageFinderProps {
  onSelectPackage: (pkg: Package) => void;
}

export default function PackageFinder({ onSelectPackage }: PackageFinderProps) {
  const [step, setStep] = useState(1);
  const [companion, setCompanion] = useState("");
  const [budget, setBudget] = useState(1500);
  const [duration, setDuration] = useState(""); // short (1-5), medium (6-10), long (11+)
  const [adventure, setAdventure] = useState(""); // low, medium, extreme

  const [recommendedPackage, setRecommendedPackage] = useState<Package | null>(null);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Calculate Recommendation using JS logic
      calculateRecommendation();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const calculateRecommendation = () => {
    // Advanced Scoring logic to find the best package
    let bestPackage: Package | null = null;
    let highestScore = -1;

    packages.forEach((pkg) => {
      let score = 0;

      // 1. Companion Check
      if (companion === "Couple" || companion === "Honeymoon") {
        if (pkg.categories.includes("Honeymoon")) score += 5;
        if (pkg.categories.includes("Luxury")) score += 2;
      } else if (companion === "Family") {
        if (pkg.categories.includes("Family")) score += 5;
      } else if (companion === "Solo" || companion === "Friends") {
        if (pkg.categories.includes("Adventure")) score += 4;
        if (pkg.categories.includes("Budget")) score += 2;
      }

      // 2. Budget Check (pkg price compared to user max budget)
      if (pkg.price <= budget) {
        score += 5;
        // closest budget bonus
        const diff = budget - pkg.price;
        if (diff < 300) score += 2;
      } else {
        score -= 5; // too expensive
      }

      // 3. Duration Check
      const days = parseInt(pkg.duration.replace(/\D/g, ""));
      if (duration === "short") {
        if (days <= 5) score += 5;
      } else if (duration === "medium") {
        if (days > 5 && days <= 10) score += 5;
      } else if (duration === "long") {
        if (days > 10) score += 5;
      }

      // 4. Adventure Check
      if (adventure === "extreme") {
        if (pkg.categories.includes("Adventure")) score += 5;
        if (pkg.location.includes("Everest") || pkg.location.includes("Annapurna")) score += 2;
      } else if (adventure === "medium") {
        if (pkg.location.includes("Mustang") || pkg.location.includes("Rara")) score += 4;
      } else if (adventure === "low") {
        if (pkg.categories.includes("Spiritual") || pkg.categories.includes("Family") || pkg.categories.includes("Luxury")) score += 5;
      }

      if (score > highestScore) {
        highestScore = score;
        bestPackage = pkg;
      }
    });

    // Fallback if none matched budget constraints
    if (!bestPackage) {
      bestPackage = packages[0];
    }

    setRecommendedPackage(bestPackage);
    setStep(5); // Result stage
  };

  const resetFinder = () => {
    setStep(1);
    setCompanion("");
    setBudget(1500);
    setDuration("");
    setAdventure("");
    setRecommendedPackage(null);
  };

  return (
    <section id="package-finder" className="py-24 bg-[#0A2A52] text-white relative overflow-hidden border-y border-white/5">
      {/* Background blobs for depth */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#00B4D8]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF9F1C]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#FF9F1C] text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center space-x-1.5 mb-2">
            <Sparkles className="w-4 h-4 text-[#FF9F1C]" />
            <span>AI Powered</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Interactive Package Finder</h2>
          <p className="text-gray-300 text-sm sm:text-base mt-2 max-w-lg mx-auto">
            Not sure which route suits you best? Complete our 30-second curated questionnaire and discover your dream Nepalese expedition.
          </p>
        </div>

        {/* Questionnaire Box */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative">
          
          {/* Progress Indicators */}
          {step <= 4 && (
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <span className="text-xs sm:text-sm font-bold text-[#00B4D8]">Step {step} of 4</span>
              <div className="flex space-x-1.5">
                {[1, 2, 3, 4].map((num) => (
                  <div
                    key={num}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      step >= num ? "w-8 bg-[#FF9F1C]" : "w-3 bg-white/15"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Steps animation block */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-[#FF9F1C]" />
                  <h3 className="text-lg sm:text-xl font-bold">Who are you travelling with?</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Solo", desc: "Just me and my boots" },
                    { label: "Couple", desc: "A romantic adventure" },
                    { label: "Family", desc: "Memorable trip for everyone" },
                    { label: "Friends", desc: "A thrilling group trip" }
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setCompanion(opt.label)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        companion === opt.label
                          ? "bg-[#FF9F1C] border-[#FF9F1C] text-white shadow-lg scale-102"
                          : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-base">{opt.label}</span>
                        {companion === opt.label && <div className="bg-white text-[#FF9F1C] rounded-full p-0.5"><Check className="w-3 h-3 stroke-[3]" /></div>}
                      </div>
                      <span className="text-xs text-white/70 block mt-1 leading-snug">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-2">
                  <Wallet className="w-5 h-5 text-[#00B4D8]" />
                  <h3 className="text-lg sm:text-xl font-bold">What is your maximum budget per person?</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-300 font-medium">
                    <span>Value Explorer ($300)</span>
                    <span className="text-[#FF9F1C] text-lg font-black font-mono">${budget}</span>
                    <span>Luxury Traveler ($3000)</span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="3000"
                    step="50"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full accent-[#FF9F1C] h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-center text-xs text-gray-400">
                    *Our packages include local flights, premium guides, porter assistance, permit fees, and fine dining.
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-[#FF9F1C]" />
                  <h3 className="text-lg sm:text-xl font-bold">How long would you like your journey to be?</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { value: "short", label: "Short Getaway", desc: "1 to 5 Days" },
                    { value: "medium", label: "Steady Journey", desc: "6 to 10 Days" },
                    { value: "long", label: "Epic Expedition", desc: "11+ Days" }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setDuration(opt.value)}
                      className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                        duration === opt.value
                          ? "bg-[#FF9F1C] border-[#FF9F1C] text-white shadow-lg"
                          : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-base">{opt.label}</span>
                        {duration === opt.value && <div className="bg-white text-[#FF9F1C] rounded-full p-0.5"><Check className="w-3 h-3 stroke-[3]" /></div>}
                      </div>
                      <span className="text-xs text-white/70 block mt-1 leading-snug">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-2">
                  <Compass className="w-5 h-5 text-[#00B4D8]" />
                  <h3 className="text-lg sm:text-xl font-bold">What is your preferred Adventure Intensity level?</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { value: "low", label: "Relaxed & Serene", desc: "Culture, luxury retreats, easy sight-seeing walks." },
                    { value: "medium", label: "Moderate Explorer", desc: "Light road trips, short forest hikes, canoe safaris." },
                    { value: "extreme", label: "Himalayan Hardcore", desc: "High-altitude mountaineering treks, deep alpine passes." }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setAdventure(opt.value)}
                      className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                        adventure === opt.value
                          ? "bg-[#FF9F1C] border-[#FF9F1C] text-white shadow-lg"
                          : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-base">{opt.label}</span>
                        {adventure === opt.value && <div className="bg-white text-[#FF9F1C] rounded-full p-0.5"><Check className="w-3 h-3 stroke-[3]" /></div>}
                      </div>
                      <span className="text-xs text-white/70 block mt-1 leading-snug">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 5 && recommendedPackage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="text-center py-2">
                  <span className="bg-[#FF9F1C]/20 text-[#FF9F1C] text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#FF9F1C]/30">
                    ✨ Your Perfect Nepal Match ✨
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold mt-3">{recommendedPackage.title}</h3>
                </div>

                {/* Package Result Card */}
                <div className="bg-white/10 rounded-2xl overflow-hidden border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-0">
                  {/* Left image column */}
                  <div className="md:col-span-5 h-48 md:h-full relative min-h-[200px]">
                    <img
                      src={recommendedPackage.image}
                      alt={recommendedPackage.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-[#0A2A52] text-[#00B4D8] font-bold text-xs px-3 py-1.5 rounded-lg border border-white/10">
                      {recommendedPackage.location}
                    </div>
                  </div>

                  {/* Right description column */}
                  <div className="md:col-span-7 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center text-xs text-gray-300 mb-2">
                        <span>Duration: <strong>{recommendedPackage.duration}</strong></span>
                        <span className="text-[#FF9F1C] font-bold">★ {recommendedPackage.rating} rating</span>
                      </div>
                      <p className="text-sm text-gray-200 leading-relaxed mb-4">
                        {recommendedPackage.description}
                      </p>
                      
                      <div className="space-y-1 mb-4">
                        <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider block mb-1">Highlights:</span>
                        {recommendedPackage.highlights.slice(0, 3).map((hl, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-200">
                            <span className="text-[#00B4D8] mr-2">✓</span>
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/15 pt-4">
                      <div>
                        <span className="text-[10px] text-gray-400 block uppercase font-bold">Base Price</span>
                        <span className="text-xl sm:text-2xl font-black font-mono text-[#FF9F1C]">${recommendedPackage.price}</span>
                      </div>
                      
                      <button
                        onClick={() => onSelectPackage(recommendedPackage!)}
                        className="bg-[#FF9F1C] hover:bg-[#e08b10] text-white text-xs sm:text-sm font-bold px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-xl shadow-md transition-all duration-300 transform active:scale-95"
                      >
                        Select & Customize
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={resetFinder}
                    className="flex items-center text-xs text-gray-300 hover:text-[#FF9F1C] font-semibold transition-colors mt-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin-hover" />
                    Retake Questionnaire
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stepper Actions buttons */}
          {step <= 4 && (
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={handlePrev}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  step === 1 ? "opacity-0 cursor-default" : "text-gray-300 hover:text-white hover:bg-white/5 cursor-pointer"
                }`}
                disabled={step === 1}
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={
                  (step === 1 && !companion) ||
                  (step === 3 && !duration) ||
                  (step === 4 && !adventure)
                }
                className={`px-6 py-3 rounded-xl text-sm font-bold shadow-lg transition-all flex items-center space-x-1.5 ${
                  ((step === 1 && !companion) || (step === 3 && !duration) || (step === 4 && !adventure))
                    ? "bg-white/10 text-white/40 cursor-not-allowed"
                    : "bg-[#FF9F1C] hover:bg-[#e08b10] text-white cursor-pointer"
                }`}
              >
                <span>{step === 4 ? "Find Recommendation" : "Continue"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
