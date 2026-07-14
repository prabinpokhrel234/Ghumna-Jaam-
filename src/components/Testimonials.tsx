import { Star, Quote, Heart } from "lucide-react";
import { testimonials } from "../data";

export default function Testimonials() {
  // Duplicate list to achieve infinite seamless scrolling
  const doubleTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-[#071E3C]/20 overflow-hidden relative border-b dark:border-white/5">
      {/* Decorative quotes background */}
      <div className="absolute top-12 left-12 text-[#FF9F1C]/10 dark:text-white/5 pointer-events-none">
        <Quote className="w-48 h-48 transform -rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-bold uppercase tracking-widest text-[#FF9F1C] block mb-2">Honest Experiences</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0A2A52] dark:text-white tracking-tight leading-tight">
            Loved By Global Travelers
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-2">
            Read stories of unforgettable discoveries directly from our clients who have traversed the Himalayas with Ghumna Jaam Travels.
          </p>
        </div>
      </div>

      {/* Infinite Ticker Track */}
      <div className="w-full relative py-4">
        {/* Soft fade borders */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white dark:from-[#071E3C]/20 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white dark:from-[#071E3C]/20 to-transparent z-10 pointer-events-none" />

        {/* CSS Ticker Track */}
        <div className="overflow-x-hidden w-full">
          <div className="animate-ticker space-x-6 py-4">
            {doubleTestimonials.map((t, index) => (
              <div
                key={`${t.id}-${index}`}
                className="w-[300px] sm:w-[450px] flex-shrink-0 bg-gray-50 dark:bg-[#071E3C] p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-white/5 shadow-md hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between"
              >
                
                {/* Quote details */}
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm italic leading-relaxed mb-6 font-medium">
                    "{t.review}"
                  </p>
                </div>

                {/* Profile row */}
                <div className="flex items-center justify-between border-t border-gray-200/50 dark:border-white/5 pt-4 mt-auto">
                  <div className="flex items-center space-x-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#FF9F1C]"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[#0A2A52] dark:text-white leading-tight">{t.name}</h4>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold">{t.role}</span>
                    </div>
                  </div>
                  
                  <span className="text-[10px] text-[#FF9F1C] bg-[#FF9F1C]/10 font-bold px-2 py-1 rounded">
                    {t.date}
                  </span>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-xs text-gray-400 flex items-center justify-center">
          <Heart className="w-3.5 h-3.5 mr-1.5 text-red-500 fill-red-500 animate-pulse" />
          Hover over reviews to pause scrolling.
        </p>
      </div>

    </section>
  );
}
