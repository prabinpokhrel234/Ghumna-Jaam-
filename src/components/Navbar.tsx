import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, MapPin, Navigation, Compass } from "lucide-react";
import companyLogo from "../../company.png";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onBookNowClick: () => void;
}

export default function Navbar({ darkMode, setDarkMode, onBookNowClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
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
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? darkMode
            ? "bg-[#071E3C]/95 backdrop-blur-md shadow-lg py-3 border-b border-white/5"
            : "bg-white/95 backdrop-blur-md shadow-lg py-3 border-b border-gray-100"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick("hero")}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="relative w-10 h-10 flex items-center justify-center rounded-xl overflow-hidden bg-white/10 dark:bg-white/5 border border-white/10 p-0.5 group-hover:scale-105 transition-transform duration-300">
              <img
                src={companyLogo}
                alt="Ghumna Jaam Logo"
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className={`text-xl font-extrabold tracking-tight block ${
                isScrolled 
                  ? darkMode ? "text-white" : "text-[#0A2A52]"
                  : "text-white"
              }`}>
                GHUMNA JAAM
              </span>
              <span className={`text-[10px] font-bold tracking-[0.2em] block uppercase -mt-1 ${
                isScrolled
                  ? darkMode ? "text-gray-400" : "text-[#FF9F1C]"
                  : "text-[#FF9F1C]"
              }`}>
                Travels
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick("hero")}
              className={`text-sm font-medium hover:text-[#FF9F1C] transition-colors duration-300 ${
                isScrolled ? darkMode ? "text-gray-200" : "text-gray-700" : "text-white"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick("destinations")}
              className={`text-sm font-medium hover:text-[#FF9F1C] transition-colors duration-300 ${
                isScrolled ? darkMode ? "text-gray-200" : "text-gray-700" : "text-white"
              }`}
            >
              Destinations
            </button>
            <button
              onClick={() => handleNavClick("packages")}
              className={`text-sm font-medium hover:text-[#FF9F1C] transition-colors duration-300 ${
                isScrolled ? darkMode ? "text-gray-200" : "text-gray-700" : "text-white"
              }`}
            >
              Packages
            </button>
            <button
              onClick={() => handleNavClick("why-nepal")}
              className={`text-sm font-medium hover:text-[#FF9F1C] transition-colors duration-300 ${
                isScrolled ? darkMode ? "text-gray-200" : "text-gray-700" : "text-white"
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick("blog")}
              className={`text-sm font-medium hover:text-[#FF9F1C] transition-colors duration-300 ${
                isScrolled ? darkMode ? "text-gray-200" : "text-gray-700" : "text-white"
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className={`text-sm font-medium hover:text-[#FF9F1C] transition-colors duration-300 ${
                isScrolled ? darkMode ? "text-gray-200" : "text-gray-700" : "text-white"
              }`}
            >
              Contact
            </button>
          </div>

          {/* Buttons & Toggles */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isScrolled
                  ? darkMode ? "hover:bg-white/5 text-yellow-400" : "hover:bg-gray-100 text-gray-600"
                  : "hover:bg-white/10 text-white"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => alert("Welcome to Ghumna Jaam Travels Portal! The client portal is a simulation in this preview.")}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-300 ${
                isScrolled
                  ? darkMode ? "text-white hover:bg-white/5" : "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Login
            </button>

            <button
              onClick={onBookNowClick}
              className="bg-[#FF9F1C] hover:bg-[#e08b10] text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Right Controls (Hamburger & Dark Mode) */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isScrolled
                  ? darkMode ? "text-yellow-400" : "text-gray-600"
                  : "text-white"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled
                  ? darkMode ? "text-white hover:bg-white/5" : "text-[#0A2A52] hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sliding Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-[280px] z-50 shadow-2xl transition-transform duration-500 ease-out transform lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } ${darkMode ? "bg-[#071E3C]" : "bg-white"}`}
      >
        <div className="flex flex-col h-full justify-between p-6">
          <div>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-2">
                <img
                  src={companyLogo}
                  alt="Logo"
                  className="w-7 h-7 object-contain rounded"
                  referrerPolicy="no-referrer"
                />
                <span className={`text-base font-extrabold ${darkMode ? "text-white" : "text-[#0A2A52]"}`}>
                  GHUMNA JAAM
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-2 rounded-lg ${darkMode ? "text-white hover:bg-white/5" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col space-y-4">
              {["hero", "destinations", "packages", "why-nepal", "blog", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`text-left text-base font-semibold py-2 border-b uppercase tracking-wider text-xs ${
                    darkMode 
                      ? "text-gray-300 border-white/5 hover:text-[#FF9F1C]" 
                      : "text-gray-700 border-gray-100 hover:text-[#FF9F1C]"
                  }`}
                >
                  {item === "hero" ? "Home" : item === "why-nepal" ? "About" : item}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                alert("Login portal is simulated.");
              }}
              className={`w-full py-2.5 rounded-lg text-sm font-semibold text-center border ${
                darkMode
                  ? "text-white border-white/10 hover:bg-white/5"
                  : "text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookNowClick();
              }}
              className="w-full bg-[#FF9F1C] text-white py-3 rounded-lg text-sm font-bold text-center shadow-md active:bg-[#e08b10]"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Background Overlay for Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}
    </nav>
  );
}
