import { ArrowRight, Globe, MapPin, Users } from "lucide-react";
import { destinations } from "../data";

interface PopularDestinationsProps {
  onSelectDestination: (destName: string) => void;
}

export default function PopularDestinations({ onSelectDestination }: PopularDestinationsProps) {
  return (
    <section id="destinations" className="py-24 bg-gray-50 dark:bg-[#071E3C]/40 transition-colors duration-500 border-b dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-[#FF9F1C] block mb-2">Unparalleled Wonders</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0A2A52] dark:text-white tracking-tight leading-tight mb-4">
            Popular Destinations
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            From the high snow-capped Himalayan ridges to the deep tropical wild jungles, explore the absolute best mystical regions of Nepal with our handpicked journeys.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest.name)}
              className="group relative h-[360px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border dark:border-white/5"
            >
              
              {/* Card Image */}
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Dynamic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:via-black/50 transition-all duration-500" />
              
              {/* Top Tag */}
              <div className="absolute top-4 left-4 z-10 bg-white/10 backdrop-blur-md px-3 py-1 rounded-md border border-white/20 text-[9px] text-white font-extrabold tracking-widest uppercase">
                {dest.tag}
              </div>

              {/* Content Card Body */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white flex flex-col justify-end h-full">
                <span className="text-[10px] text-[#FF9F1C] font-extrabold uppercase tracking-widest flex items-center mb-1">
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  Nepal
                </span>
                
                <h3 className="text-xl sm:text-2xl font-black mb-2 tracking-tight group-hover:text-[#FF9F1C] transition-colors">
                  {dest.name}
                </h3>
                
                {/* Description - reveals more on hover */}
                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed mb-4 group-hover:line-clamp-none transition-all duration-300">
                  {dest.description}
                </p>

                {/* Info Pills */}
                <div className="flex items-center space-x-4 text-[10px] text-gray-400 font-bold uppercase mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="flex items-center">
                    <Globe className="w-3.5 h-3.5 mr-1 text-[#00B4D8]" />
                    {dest.visitorsPerYear} / year
                  </span>
                  <span>
                    Est: {dest.recommendedDuration}
                  </span>
                </div>

                {/* Call To Action Button */}
                <div className="flex items-center text-xs font-black tracking-widest uppercase text-[#FF9F1C] group-hover:translate-x-1 transition-transform">
                  <span>Explore Packages</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
