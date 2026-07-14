import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GalleryItem {
  id: string;
  url: string;
  title: string;
  location: string;
}

const galleryImages: GalleryItem[] = [
  {
    id: "g1",
    url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800",
    title: "Ama Dablam Base Camp Trek",
    location: "Everest Region"
  },
  {
    id: "g2",
    url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800",
    title: "Sunset over Phewa Lake",
    location: "Pokhara"
  },
  {
    id: "g3",
    url: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=800",
    title: "One-horned Rhino Crossing",
    location: "Chitwan National Park"
  },
  {
    id: "g4",
    url: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800",
    title: "Ancient Lo Manthang City",
    location: "Upper Mustang"
  },
  {
    id: "g5",
    url: "https://images.unsplash.com/photo-1596120236172-231999844ade?auto=format&fit=crop&q=80&w=800",
    title: "World Peace Pagoda Temple",
    location: "Lumbini"
  },
  {
    id: "g6",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800",
    title: "Wild Pines of Rara Lake",
    location: "Rara Lake Wilderness"
  },
  {
    id: "g7",
    url: "https://images.unsplash.com/photo-1555899434-94d1368aa712?auto=format&fit=crop&q=80&w=800",
    title: "Mist Shrouding Tea Garden",
    location: "Ilam"
  },
  {
    id: "g8",
    url: "https://images.unsplash.com/photo-1578593139888-39622e2047de?auto=format&fit=crop&q=80&w=800",
    title: "18th-century Newari Brick Streets",
    location: "Bandipur Heritage"
  }
];

export default function Gallery() {
  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIdx(index);
  };

  const closeLightbox = () => {
    setSelectedImageIdx(null);
  };

  const handleNext = () => {
    if (selectedImageIdx !== null) {
      setSelectedImageIdx((selectedImageIdx + 1) % galleryImages.length);
    }
  };

  const handlePrev = () => {
    if (selectedImageIdx !== null) {
      setSelectedImageIdx((selectedImageIdx - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIdx === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIdx]);

  return (
    <section id="gallery" className="py-24 bg-white dark:bg-[#071E3C]/20 transition-colors duration-500 border-b dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-[#FF9F1C] block mb-2">Visual Journeys</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0A2A52] dark:text-white tracking-tight leading-tight">
            Our Himalayan Expedition Gallery
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-2">
            Browse high-fidelity snapshots from real treks, wildlife safaris, and cultural retreats captured by our tour coordinators and travelers.
          </p>
        </div>

        {/* Masonry Layout Grid using CSS columns */}
        <div className="masonry-grid">
          {galleryImages.map((img, index) => (
            <div
              key={img.id}
              onClick={() => openLightbox(index)}
              className="masonry-item relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border dark:border-white/5"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              {/* Fade Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 duration-500">
                <span className="text-[#FF9F1C] text-[9px] font-black uppercase tracking-widest block">{img.location}</span>
                <h4 className="text-sm font-bold line-clamp-1">{img.title}</h4>
                <div className="flex items-center text-[10px] text-[#00B4D8] font-bold uppercase mt-1.5">
                  <Maximize2 className="w-3 h-3 mr-1" />
                  View Fullscreen
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* LIGHTBOX MODAL CONTAINER */}
      <AnimatePresence>
        {selectedImageIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 sm:p-10"
          >
            {/* Close trigger click anywhere on overlay */}
            <div onClick={closeLightbox} className="absolute inset-0 cursor-zoom-out" />

            {/* Top Toolbar */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-50 text-white">
              <div>
                <span className="text-[#FF9F1C] text-[10px] font-black uppercase tracking-[0.2em] block">
                  {galleryImages[selectedImageIdx].location}
                </span>
                <h3 className="text-sm sm:text-lg font-bold">{galleryImages[selectedImageIdx].title}</h3>
              </div>
              
              <button
                onClick={closeLightbox}
                className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 sm:w-6 h-6" />
              </button>
            </div>

            {/* Slide Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-colors z-50 cursor-pointer hidden sm:block"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 h-8" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-colors z-50 cursor-pointer hidden sm:block"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 h-8" />
            </button>

            {/* Active Fullscreen Image */}
            <motion.div
              key={selectedImageIdx}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[75vh] sm:max-h-[80vh] rounded-xl overflow-hidden shadow-2xl z-40"
            >
              <img
                src={galleryImages[selectedImageIdx].url}
                alt={galleryImages[selectedImageIdx].title}
                className="w-full h-auto max-h-[75vh] sm:max-h-[80vh] object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Mobile Bottom Navigation Info bar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-6 text-white z-50 bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10 text-xs font-semibold sm:hidden">
              <button onClick={handlePrev} className="hover:text-[#FF9F1C] py-1 px-3">Prev</button>
              <span className="text-gray-400 font-mono">
                {selectedImageIdx + 1} / {galleryImages.length}
              </span>
              <button onClick={handleNext} className="hover:text-[#FF9F1C] py-1 px-3">Next</button>
            </div>

            {/* Lightbox watermark metadata */}
            <div className="absolute bottom-6 right-8 hidden sm:flex items-center space-x-1 text-gray-500 text-[10px] tracking-widest font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#FF9F1C]" />
              <span>Ghumna Jaam Travels Elite Client Portfolio</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
