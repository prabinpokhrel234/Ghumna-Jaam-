import { useState, useEffect } from "react";
import { ArrowUp, Compass, MessageCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Import custom sub-components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import WhyNepal from "./components/WhyNepal";
import FeaturedPackages from "./components/FeaturedPackages";
import PackageFinder from "./components/PackageFinder";
import PopularDestinations from "./components/PopularDestinations";
import Testimonials from "./components/Testimonials";
import BlogSection from "./components/BlogSection";
import BookingForm from "./components/BookingForm";
import Gallery from "./components/Gallery";
import FAQs from "./components/FAQs";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import AIChatBox from "./components/AIChatBox";

// Import types
import { Package } from "./types";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // States for cross-component interactions
  const [searchQuery, setSearchQuery] = useState<{ destination: string; date: string; travelers: number; budget: number } | null>(null);
  const [selectedBookingPackage, setSelectedBookingPackage] = useState<Package | null>(null);

  // 1. Loading screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // 2. Dark Mode effect handler
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // 3. Scroll tracking (back-to-top, progress bar)
  useEffect(() => {
    const handleScroll = () => {
      // Show back to top button
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handler: When user searches via the floating search panel
  const handleSearchSubmit = (filters: { destination: string; date: string; travelers: number; budget: number }) => {
    setSearchQuery(filters);
  };

  // Handler: When user chooses a package in Featured or Interactive Finder
  const handleSelectPackageForBooking = (pkg: Package) => {
    setSelectedBookingPackage(pkg);
    
    // Scroll smoothly to booking form
    const bookingSection = document.getElementById("booking-section");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Handler: When user clicks on popular destination (e.g., Pokhara)
  const handleDestinationSelect = (destName: string) => {
    // Treat as destination-based search query
    setSearchQuery({
      destination: destName,
      date: "",
      travelers: 1,
      budget: 3000
    });

    // Scroll smoothly to featured packages to display matching items
    const packagesSection = document.getElementById("packages");
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBookingTrigger = () => {
    const bookingSection = document.getElementById("booking-section");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleExploreTrigger = () => {
    const packagesSection = document.getElementById("packages");
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePlanTrigger = () => {
    const finderSection = document.getElementById("package-finder");
    if (finderSection) {
      finderSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "bg-[#071E3C] text-white" : "bg-white text-[#111827]"}`}>
      
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* INTRO LOADING SCREEN ANIMATION */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 bg-[#0A2A52] z-9999 flex flex-col items-center justify-center text-white"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="mb-6 text-[#FF9F1C]"
            >
              <Compass className="w-16 h-16" />
            </motion.div>

            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl sm:text-3xl font-extrabold tracking-widest font-display text-white"
            >
              GHUMNA JAAM TRAVELS
            </motion.h1>
            
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.6 }}
              className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#FF9F1C] mt-1.5 uppercase"
            >
              Explore • Experience • Enjoy
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRIMARY WEBSITE CONTENT */}
      {!loading && (
        <>
          {/* Header Navigation */}
          <Navbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onBookNowClick={handleBookingTrigger}
          />

          {/* Main sections layout */}
          <main>
            {/* 1. Hero banner */}
            <Hero
              onExploreClick={handleExploreTrigger}
              onPlanClick={handlePlanTrigger}
            />

            {/* 2. Overlapping Search engine */}
            <SearchBar onSearch={handleSearchSubmit} />

            {/* 3. Why Nepal Section with counters */}
            <WhyNepal />

            {/* 4. Curated Packages Grid */}
            <FeaturedPackages
              searchQuery={searchQuery}
              onBookPackage={handleSelectPackageForBooking}
            />

            {/* 5. Smart interactive finder */}
            <PackageFinder onSelectPackage={handleSelectPackageForBooking} />

            {/* 6. Destination Grid */}
            <PopularDestinations onSelectDestination={handleDestinationSelect} />

            {/* 7. Masonry Photo gallery */}
            <Gallery />

            {/* 8. Testimonials carousel */}
            <Testimonials />

            {/* 9. Secure Booking System Form */}
            <BookingForm
              selectedPackage={selectedBookingPackage}
              onBookingSuccess={() => {
                // optional success callback actions
              }}
            />

            {/* 10. FAQ Center Accordions */}
            <FAQs />

            {/* 11. Blog post slider */}
            <BlogSection />

            {/* 12. Contact Form, Maps and WhatsApp */}
            <ContactSection />
          </main>

          {/* Footer content */}
          <Footer />

          {/* FLOATING ACTION UTILITIES */}

          {/* Back to top scroll button */}
          <AnimatePresence>
            {showBackToTop && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={handleBackToTop}
                className="fixed bottom-6 left-6 z-40 bg-[#FF9F1C] hover:bg-[#e08b10] text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95 cursor-pointer"
                aria-label="Back to top"
              >
                <ArrowUp className="w-5 h-5 stroke-[2.5]" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Premium Floating AI Travel Concierge Assistant */}
          <AIChatBox />
        </>
      )}

    </div>
  );
}
