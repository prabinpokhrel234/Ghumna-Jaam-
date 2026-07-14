import React, { useState } from "react";
import { Search, MapPin, Calendar, Users, DollarSign, Sparkles } from "lucide-react";

interface SearchBarProps {
  onSearch: (filters: { destination: string; date: string; travelers: number; budget: number }) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [budget, setBudget] = useState(2500);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ destination, date, travelers, budget });
    
    // Scroll smoothly to packages
    const packagesSection = document.getElementById("packages");
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="search-bar-section" className="relative z-30 max-w-6xl mx-auto px-4 -mt-16 sm:-mt-20">
      <div className="bg-[#0A2A52]/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 glass">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          
          {/* Destination */}
          <div className="space-y-2">
            <label className="text-gray-300 text-xs font-bold tracking-wider uppercase block flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1 text-[#FF9F1C]" />
              Where to?
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Everest, Pokhara, Mustang..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-white/10 focus:bg-white/20 text-white placeholder-gray-400 font-semibold pl-4 pr-4 py-3.5 rounded-xl border border-white/10 focus:border-[#FF9F1C] focus:outline-none transition-all text-sm"
              />
            </div>
          </div>

          {/* Travel Date */}
          <div className="space-y-2">
            <label className="text-gray-300 text-xs font-bold tracking-wider uppercase block flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-[#00B4D8]" />
              When?
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-white/10 focus:bg-white/20 text-white font-semibold px-4 py-3.5 rounded-xl border border-white/10 focus:border-[#00B4D8] focus:outline-none transition-all text-sm [color-scheme:dark]"
            />
          </div>

          {/* Travelers */}
          <div className="space-y-2">
            <label className="text-gray-300 text-xs font-bold tracking-wider uppercase block flex items-center">
              <Users className="w-3.5 h-3.5 mr-1 text-[#FF9F1C]" />
              Travelers
            </label>
            <select
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value))}
              className="w-full bg-[#0A2A52] text-white font-semibold px-4 py-3.5 rounded-xl border border-white/10 focus:border-[#FF9F1C] focus:outline-none transition-all text-sm cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num} className="bg-[#0A2A52] text-white">
                  {num} {num === 1 ? "Traveler" : "Travelers"}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Limit */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-gray-300 text-xs font-bold tracking-wider uppercase flex items-center">
                <DollarSign className="w-3.5 h-3.5 mr-1 text-[#00B4D8]" />
                Max Budget
              </label>
              <span className="text-xs text-[#FF9F1C] font-extrabold font-mono">${budget}</span>
            </div>
            <div className="pt-2 flex items-center">
              <input
                type="range"
                min="300"
                max="3000"
                step="50"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-[#FF9F1C] h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Search Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-[#FF9F1C] hover:bg-[#e08b10] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-[#FF9F1C]/20 hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group transform active:scale-95"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Search Journeys</span>
            </button>
          </div>

        </form>
        
        {/* Quick Help Badges */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-400">
          <span className="font-bold text-gray-300">Popular Searches:</span>
          {["Everest Trek", "Luxury Pokhara Resort", "Rhino Safari", "Upper Mustang Off-road"].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setDestination(term);
                if (term.includes("Everest")) {
                  setBudget(1500);
                } else if (term.includes("Pokhara")) {
                  setBudget(2500);
                } else if (term.includes("Mustang")) {
                  setBudget(2000);
                } else {
                  setBudget(600);
                }
              }}
              className="bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white px-3 py-1.5 rounded-full transition-colors font-medium border border-white/5"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
