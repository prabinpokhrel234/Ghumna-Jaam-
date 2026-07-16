import { useState } from "react";
import { SlidersHorizontal, Eye, EyeOff, LayoutTemplate, Sparkles, Check, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LayoutCustomizerProps {
  layoutPreset: "explorer" | "quick-book" | "media" | "custom";
  onPresetChange: (preset: "explorer" | "quick-book" | "media" | "custom") => void;
  visibleSections: {
    whyNepal: boolean;
    packageFinder: boolean;
    destinations: boolean;
    gallery: boolean;
    testimonials: boolean;
    faqs: boolean;
    blog: boolean;
  };
  onToggleSection: (section: "whyNepal" | "packageFinder" | "destinations" | "gallery" | "testimonials" | "faqs" | "blog") => void;
  darkMode: boolean;
}

export default function LayoutCustomizer({
  layoutPreset,
  onPresetChange,
  visibleSections,
  onToggleSection,
  darkMode,
}: LayoutCustomizerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Labels for the toggleable sections
  const sectionLabels = [
    { key: "whyNepal" as const, label: "Why Nepal (Intro Guide)", desc: "Counters & general tourism details" },
    { key: "packageFinder" as const, label: "Interactive Package Quiz", desc: "Questionnaire-based recommender" },
    { key: "destinations" as const, label: "Popular Destination Cards", desc: "Grid of featured regions in Nepal" },
    { key: "gallery" as const, label: "Masonry Photo Gallery", desc: "User memories & high-res snapshots" },
    { key: "testimonials" as const, label: "Client Testimonials Slider", desc: "Global traveler reviews & scores" },
    { key: "faqs" as const, label: "FAQ Accordions", desc: "Altitude, health, & flight queries" },
    { key: "blog" as const, label: "Travel Blogs & Experiences", desc: "Community posts and tips" },
  ];

  return (
    <section className="py-6 bg-gradient-to-r from-[#0A2A52]/5 to-[#00B4D8]/5 dark:from-[#0A2A52]/20 dark:to-[#00B4D8]/10 border-b dark:border-white/5 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Info message */}
          <div className="flex items-start space-x-3 text-center md:text-left">
            <div className="p-2 bg-[#FF9F1C]/10 rounded-xl mt-0.5 text-[#FF9F1C] flex-shrink-0 mx-auto md:mx-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#0A2A52] dark:text-white flex items-center justify-center md:justify-start gap-1.5">
                Optimize Reading & Declutter View
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-300 max-w-xl">
                Too much content? Streamline your experience. Easily filter out sections you don't need or pick a preset layout to speed up your search.
              </p>
            </div>
          </div>

          {/* Right: Controller button & presets bar */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {/* Presets Quick Toggles */}
            <div className="flex flex-wrap items-center gap-1 bg-white dark:bg-[#071E3C] p-1 rounded-xl shadow-sm border dark:border-white/5">
              <button
                onClick={() => onPresetChange("explorer")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  layoutPreset === "explorer"
                    ? "bg-[#0A2A52] text-white dark:bg-[#00B4D8]"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                }`}
                title="Show all sections"
              >
                Full Guide
              </button>
              <button
                onClick={() => onPresetChange("quick-book")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  layoutPreset === "quick-book"
                    ? "bg-[#FF9F1C] text-white"
                    : "text-gray-500 hover:text-[#FF9F1C] dark:text-gray-300 dark:hover:text-[#FF9F1C]"
                }`}
                title="Only view packages & direct booking form"
              >
                ⚡ Fast Booking
              </button>
              <button
                onClick={() => onPresetChange("media")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  layoutPreset === "media"
                    ? "bg-[#0A2A52] text-white dark:bg-[#00B4D8]"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                }`}
                title="Show gallery, reviews, and community blogs"
              >
                📸 Visual & Blogs
              </button>
            </div>

            {/* Custom Sliders Toggler */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border cursor-pointer transition-all ${
                isOpen || layoutPreset === "custom"
                  ? "bg-[#00B4D8]/10 text-[#00B4D8] border-[#00B4D8]"
                  : "bg-white dark:bg-[#071E3C] text-gray-700 dark:text-gray-200 border-gray-200 dark:border-white/5 hover:bg-gray-50"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{isOpen ? "Close Manager" : "Manage Layout"}</span>
              {layoutPreset === "custom" && (
                <span className="w-2 h-2 rounded-full bg-[#FF9F1C] inline-block" />
              )}
            </button>
          </div>

        </div>

        {/* Expandable Custom Toggles Area */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-6 pt-6 border-t border-gray-200/50 dark:border-white/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sectionLabels.map((sec) => {
                  const isVisible = visibleSections[sec.key];
                  return (
                    <div
                      key={sec.key}
                      onClick={() => onToggleSection(sec.key)}
                      className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start space-x-3 select-none ${
                        isVisible
                          ? "bg-white dark:bg-[#071E3C] border-emerald-500/40 shadow-sm"
                          : "bg-gray-100/40 dark:bg-white/5 border-gray-200/50 dark:border-white/5 opacity-60 hover:opacity-85"
                      }`}
                    >
                      <div className="mt-0.5">
                        {isVisible ? (
                          <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-500">
                            <Eye className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="p-1.5 bg-gray-200 dark:bg-white/5 rounded-lg text-gray-400">
                            <EyeOff className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-xs font-bold leading-tight truncate ${isVisible ? "text-gray-900 dark:text-white" : "text-gray-500"}`}>
                            {sec.label}
                          </h4>
                          {isVisible && <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 ml-1.5" />}
                        </div>
                        <p className="text-[10px] text-gray-400 dark:text-gray-400 leading-normal mt-0.5 line-clamp-2 font-medium">
                          {sec.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {/* Info Card inside Grid */}
                <div className="p-4 rounded-2xl bg-[#00B4D8]/5 border border-[#00B4D8]/10 flex items-start space-x-2.5 sm:col-span-2 md:col-span-3 lg:col-span-1">
                  <Info className="w-4 h-4 text-[#00B4D8] flex-shrink-0 mt-0.5" />
                  <div className="text-[10px] text-[#00B4D8]/80 leading-snug font-medium">
                    Hiding any section completely removes it from the scroll path. Booking features, search bars, navigation menu, and chat systems remain permanently available.
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
