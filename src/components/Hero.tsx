import { useState, useEffect } from "react";
import { ChevronDown, Sparkles, MapPin, Play, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeroProps {
  onExploreClick: () => void;
  onPlanClick: () => void;
}

const slides = [
  {
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1920",
    place: "Everest Region",
    desc: "Where mountains touch the heavens."
  },
  {
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1920",
    place: "Pokhara",
    desc: "The tranquil lake reflecting snowy peaks."
  },
  {
    image: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=1920",
    place: "Chitwan Jungle",
    desc: "Roam wild where the tiger walks."
  },
  {
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=1920",
    place: "Upper Mustang",
    desc: "Ancient secrets in the wind-swept desert."
  },
  {
    image: "https://images.unsplash.com/photo-1596120236172-231999844ade?auto=format&fit=crop&q=80&w=1920",
    place: "Lumbini",
    desc: "The birthplace of peace and enlightenment."
  }
];

const typingTexts = [
  "Mount Everest Base Camp",
  "Fewa Lake in Pokhara",
  "Wild Jungles of Chitwan",
  "Walled Kingdoms of Mustang",
  "Spiritual Grounds of Lumbini",
  "Mystic Waters of Rara Lake"
];

export default function Hero({ onExploreClick, onPlanClick }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Background Slider AutoPlay
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Typing Text Effect for Nepal Highlights
  useEffect(() => {
    const handleTyping = () => {
      const fullText = typingTexts[textIndex];
      if (!isDeleting) {
        // Typing characters
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullText) {
          // Pause at end
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        // Deleting characters
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === "") {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % typingTexts.length);
          setTypingSpeed(500);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, textIndex, typingSpeed]);

  const handleScrollDown = () => {
    const searchSection = document.getElementById("search-bar-section");
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background Slideshow with Parallax & Crossfade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A2A52]/50 via-[#0A2A52]/20 to-[#0A2A52]/70 z-10" />
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].place}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Sparkles decorative element */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
        <Sparkles className="w-4 h-4 text-[#FF9F1C] animate-pulse" />
        <span className="text-[11px] font-bold tracking-[0.15em] text-white uppercase">
          Nepal's Elite Luxury Travel Partner
        </span>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center">
        {/* Animated Sub-Heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white text-xs sm:text-sm font-extrabold tracking-[0.3em] uppercase mb-4 text-[#FF9F1C]"
        >
          Not Just a Trip • A Memory in the Making
        </motion.p>

        {/* Core Main Slogan */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-white tracking-tight leading-none mb-6 drop-shadow-md"
        >
          EXPLORE. <span className="text-[#FF9F1C]">EXPERIENCE.</span> <br />
          ENJOY.
        </motion.h1>

        {/* Dynamic Typing Sub-text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-8 sm:h-12 flex items-center justify-center mb-8"
        >
          <p className="text-gray-200 text-base sm:text-xl font-medium tracking-wide flex items-center bg-black/35 backdrop-blur-sm px-5 py-2 rounded-xl border border-white/5">
            <MapPin className="w-5 h-5 text-[#00B4D8] mr-2 animate-bounce" />
            Discover: <span className="text-white font-bold ml-1.5 border-r-2 border-[#FF9F1C] pr-1 animate-pulse">{currentText}</span>
          </p>
        </motion.div>

        {/* Actions Buttons with custom ripple hover and premium transitions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full justify-center max-w-md"
        >
          <button
            onClick={onExploreClick}
            className="group relative flex items-center justify-center bg-[#FF9F1C] hover:bg-[#e08b10] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            Explore Packages
          </button>
          
          <button
            onClick={onPlanClick}
            className="group flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl border border-white/30 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1"
          >
            <Calendar className="w-5 h-5 mr-2 text-[#00B4D8] group-hover:rotate-12 transition-transform" />
            Plan Your Journey
          </button>
        </motion.div>
      </div>

      {/* Floating Active Place Indicators */}
      <div className="absolute bottom-24 right-8 z-20 hidden lg:flex flex-col space-y-3 bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10 text-right">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF9F1C]">Currently Viewing</span>
        <h3 className="text-white font-bold text-lg">{slides[currentSlide].place}</h3>
        <p className="text-gray-300 text-xs italic">{slides[currentSlide].desc}</p>
      </div>

      {/* Slider dots indicator */}
      <div className="absolute bottom-24 left-8 z-20 hidden md:flex items-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index ? "w-8 bg-[#FF9F1C]" : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Animated Scroll Indicator with parallax cue */}
      <div
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer flex flex-col items-center group"
      >
        <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 group-hover:text-white transition-colors">
          Scroll to explore
        </span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1 group-hover:border-white transition-colors">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1.5 h-1.5 bg-[#FF9F1C] rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
