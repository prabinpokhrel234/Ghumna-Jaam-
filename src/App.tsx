import { useState, useEffect } from "react";
import { ArrowUp, Compass, MessageCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Import custom sub-components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import LayoutCustomizer from "./components/LayoutCustomizer";
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

  // Layout optimization / Declutter states
  const [layoutPreset, setLayoutPreset] = useState<"explorer" | "quick-book" | "media" | "custom">("explorer");
  const [visibleSections, setVisibleSections] = useState({
    whyNepal: true,
    packageFinder: true,
    destinations: true,
    gallery: true,
    testimonials: true,
    faqs: true,
    blog: true,
  });

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

  // Preset Layout Manager Action
  const handlePresetChange = (preset: "explorer" | "quick-book" | "media" | "custom") => {
    setLayoutPreset(preset);
    if (preset === "quick-book") {
      setVisibleSections({
        whyNepal: false,
        packageFinder: true,
        destinations: false,
        gallery: false,
        testimonials: false,
        faqs: false,
        blog: false,
      });
    } else if (preset === "media") {
      setVisibleSections({
        whyNepal: false,
        packageFinder: false,
        destinations: true,
        gallery: true,
        testimonials: true,
        faqs: false,
        blog: true,
      });
    } else if (preset === "explorer") {
      setVisibleSections({
        whyNepal: true,
        packageFinder: true,
        destinations: true,
        gallery: true,
        testimonials: true,
        faqs: true,
        blog: true,
      });
    }
  };

  const handleToggleSection = (section: "whyNepal" | "packageFinder" | "destinations" | "gallery" | "testimonials" | "faqs" | "blog") => {
    setLayoutPreset("custom");
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Safe navbar action which auto-reveals a section before scrolling to it
  const handleNavClickWithReveal = (id: string) => {
    const mapping: Record<string, "whyNepal" | "packageFinder" | "destinations" | "gallery" | "testimonials" | "faqs" | "blog"> = {
      "why-nepal": "whyNepal",
      "packages": "packageFinder",
      "gallery": "gallery",
      "blog": "blog",
      "destinations": "destinations",
      "faqs": "faqs",
    };

    const sectionKey = mapping[id];
    if (sectionKey && !visibleSections[sectionKey]) {
      setVisibleSections((prev) => ({
        ...prev,
        [sectionKey]: true,
      }));
      setLayoutPreset("custom");
    }

    // Delayed scroll to allow the component to mount in DOM
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // height of sticky navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 150);
  };

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
    // Ensure the package finder is visible
    if (!visibleSections.packageFinder) {
      setVisibleSections((prev) => ({ ...prev, packageFinder: true }));
      setLayoutPreset("custom");
    }
    setTimeout(() => {
      const finderSection = document.getElementById("package-finder");
      if (finderSection) {
        finderSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
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
            onNavClick={handleNavClickWithReveal}
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

            {/* Layout Customizer declutter panel */}
            <LayoutCustomizer
              layoutPreset={layoutPreset}
              onPresetChange={handlePresetChange}
              visibleSections={visibleSections}
              onToggleSection={handleToggleSection}
              darkMode={darkMode}
            />

            {/* 3. Why Nepal Section with counters */}
            {visibleSections.whyNepal && <WhyNepal />}

            {/* 4. Curated Packages Grid (Always visible core section) */}
            <FeaturedPackages
              searchQuery={searchQuery}
              onBookPackage={handleSelectPackageForBooking}
            />

            {/* 5. Smart interactive finder */}
            {visibleSections.packageFinder && (
              <PackageFinder onSelectPackage={handleSelectPackageForBooking} />
            )}

            {/* 6. Destination Grid */}
            {visibleSections.destinations && (
              <PopularDestinations onSelectDestination={handleDestinationSelect} />
            )}

            {/* 7. Masonry Photo gallery */}
            {visibleSections.gallery && <Gallery />}

            {/* 8. Testimonials carousel */}
            {visibleSections.testimonials && <Testimonials />}

            {/* 9. Secure Booking System Form (Always visible) */}
            <BookingForm
              selectedPackage={selectedBookingPackage}
              onBookingSuccess={() => {
                // optional success callback actions
              }}
            />

            {/* 10. FAQ Center Accordions */}
            {visibleSections.faqs && <FAQs />}

            {/* 11. Blog post slider */}
            {visibleSections.blog && <BlogSection />}

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
