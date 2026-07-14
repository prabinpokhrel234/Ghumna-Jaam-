import { useState, useMemo } from "react";
import { Star, MapPin, Clock, Calendar, ArrowUpRight, ArrowRight, ShieldAlert, Sparkles, Filter } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { packages } from "../data";
import { Package } from "../types";

interface FeaturedPackagesProps {
  searchQuery: { destination: string; date: string; travelers: number; budget: number } | null;
  onBookPackage: (pkg: Package) => void;
}

const categories = ["All", "Adventure", "Family", "Luxury", "Honeymoon", "Spiritual", "Budget"];

export default function FeaturedPackages({ searchQuery, onBookPackage }: FeaturedPackagesProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      // 1. Category Filter
      if (selectedCategory !== "All" && !pkg.categories.includes(selectedCategory)) {
        return false;
      }
      
      // 2. Search query Filter (if active)
      if (searchQuery) {
        // Destination check
        if (searchQuery.destination) {
          const query = searchQuery.destination.toLowerCase();
          const matchesTitle = pkg.title.toLowerCase().includes(query);
          const matchesLocation = pkg.location.toLowerCase().includes(query);
          const matchesDesc = pkg.description.toLowerCase().includes(query);
          
          if (!matchesTitle && !matchesLocation && !matchesDesc) {
            return false;
          }
        }
        
        // Budget check (pkg price must be <= max budget)
        if (searchQuery.budget && pkg.price > searchQuery.budget) {
          return false;
        }
      }
      
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="packages" className="py-24 transition-colors duration-500 bg-white dark:bg-[#071E3C]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-xl">
            <span className="text-sm font-bold uppercase tracking-widest text-[#FF9F1C] block mb-2">Curated Journeys</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0A2A52] dark:text-white tracking-tight leading-tight">
              Featured Travel Packages
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-2">
              Our travel specialists have meticulously designed these itineraries to combine deep local authenticity, immersive excursions, and total comfort.
            </p>
          </div>
          
          {searchQuery && (
            <div className="mt-4 md:mt-0 bg-[#FF9F1C]/10 text-[#FF9F1C] text-xs font-bold py-2 px-4 rounded-xl border border-[#FF9F1C]/20 flex items-center">
              <Sparkles className="w-4 h-4 mr-1.5" />
              Filtered by Search Panel
            </div>
          )}
        </div>

        {/* Categories Bar Filter with JS logic */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2 no-scrollbar border-b dark:border-white/5">
          <div className="flex items-center text-gray-500 mr-2 text-xs font-bold uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 mr-1" />
            Category:
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-[#0A2A52] text-white dark:bg-white dark:text-[#0A2A52] shadow-lg shadow-[#0A2A52]/10"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-[#071E3C] dark:text-gray-300 dark:hover:bg-[#071E3C]/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Packages Cards Grid with Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPackages.map((pkg) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={pkg.id}
                className="group bg-white dark:bg-[#071E3C] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-white/5 flex flex-col justify-between"
              >
                
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 bg-[#0A2A52]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-[#FF9F1C]" />
                    <span className="text-[10px] text-white font-extrabold tracking-wider uppercase">
                      {pkg.location}
                    </span>
                  </div>
                  
                  {/* Category badglets */}
                  <div className="absolute top-4 right-4 z-10 flex flex-col space-y-1 items-end">
                    {pkg.categories.map((cat) => (
                      <span key={cat} className="bg-[#FF9F1C] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                        {cat}
                      </span>
                    ))}
                  </div>

                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Duration and Rating */}
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-[#00B4D8]" />
                        {pkg.duration}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-gray-700 dark:text-gray-200">{pkg.rating}</span>
                        <span className="text-[10px] text-gray-400 ml-1">({pkg.reviewsCount})</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-[#0A2A52] dark:text-white line-clamp-2 leading-snug hover:text-[#FF9F1C] dark:hover:text-[#FF9F1C] transition-colors mb-3">
                      {pkg.title}
                    </h3>

                    {/* Short Desc */}
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                      {pkg.description}
                    </p>

                    {/* Bullet Highlights */}
                    <ul className="space-y-1 mb-6 text-xs text-gray-600 dark:text-gray-300">
                      {pkg.highlights.slice(0, 2).map((hl, i) => (
                        <li key={i} className="flex items-center">
                          <span className="text-[#FF9F1C] mr-2">•</span>
                          <span className="line-clamp-1">{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing and Button Row */}
                  <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider block">Starts From</span>
                      <span className="text-xl sm:text-2xl font-black text-[#FF9F1C] font-mono">
                        ${pkg.price}
                        <span className="text-xs text-gray-400 font-normal font-sans ml-1">/ person</span>
                      </span>
                    </div>

                    <button
                      onClick={() => onBookPackage(pkg)}
                      className="bg-[#0A2A52] hover:bg-[#FF9F1C] text-white font-bold text-xs px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl transition-all duration-300 flex items-center space-x-1 shadow-md hover:shadow-lg dark:bg-white/10 dark:hover:bg-[#FF9F1C]"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </motion.div>
            ))}
          </AnimatePresence>

          {filteredPackages.length === 0 && (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
              <ShieldAlert className="w-12 h-12 text-[#FF9F1C] mb-4" />
              <h3 className="text-xl font-bold text-[#0A2A52] dark:text-white mb-2">No Matching Packages</h3>
              <p className="text-gray-500 max-w-sm">
                We couldn't find any packages matching your filter criteria. Try adjusting your search budget or switching categories!
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  const searchSection = document.getElementById("search-bar-section");
                  if (searchSection) {
                    searchSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="mt-4 bg-[#0A2A52] text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-[#0A2A52]/90"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
