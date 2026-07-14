import React, { useState } from "react";
import { Compass, Facebook, Instagram, Twitter, Youtube, Send, Mail, Check, ShieldCheck } from "lucide-react";
import companyLogo from "../../company.png";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && /\S+@\S+\.\S+/.test(email)) {
      setIsSubscribed(true);
      setEmail("");
    } else {
      alert("Please provide a valid email address.");
    }
  };

  const handleFooterScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-[#0A2A52] text-white pt-20 pb-8 relative overflow-hidden border-t border-white/5">
      {/* Decorative vector bg */}
      <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          
          {/* Column 1: Brand details (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <div className="relative w-10 h-10 flex items-center justify-center rounded-xl overflow-hidden bg-white/10 border border-white/10 p-0.5 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={companyLogo}
                  alt="Ghumna Jaam Logo"
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight block text-white">
                  GHUMNA JAAM
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] block uppercase -mt-1 text-[#FF9F1C]">
                  Travels
                </span>
              </div>
            </div>
            
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              We specialize in custom Himalayan luxury packages, high-altitude alpine treks, pristine jungle safaris, and spiritual retreats across mystical Nepal.
            </p>

            <p className="text-xs text-[#00B4D8] font-bold italic">
              "Not Just a Trip. A Memory in the Making."
            </p>

            {/* Social icons */}
            <div className="flex space-x-4">
              {[
                { icon: <Facebook className="w-5 h-5" />, url: "https://facebook.com/ghumnajaam", color: "hover:text-blue-500 hover:bg-blue-500/10" },
                { icon: <Instagram className="w-5 h-5" />, url: "https://instagram.com/ghumnajaam", color: "hover:text-pink-500 hover:bg-pink-500/10" },
                { icon: <Twitter className="w-5 h-5" />, url: "https://twitter.com/ghumnajaam", color: "hover:text-sky-400 hover:bg-sky-400/10" },
                { icon: <Youtube className="w-5 h-5" />, url: "https://youtube.com/ghumnajaam", color: "hover:text-red-500 hover:bg-red-500/10" }
              ].map((soc, i) => (
                <a
                  key={i}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-full text-gray-300 border border-white/10 transition-all ${soc.color}`}
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#FF9F1C]">Quick Links</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              {[
                { label: "Home Base", id: "hero" },
                { label: "Our Why", id: "why-nepal" },
                { label: "Packages", id: "packages" },
                { label: "Interactive Finder", id: "package-finder" },
                { label: "Photo Gallery", id: "gallery" },
                { label: "FAQ Center", id: "faqs" }
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleFooterScroll(link.id)}
                    className="hover:text-[#FF9F1C] hover:translate-x-1 transition-all cursor-pointer text-left block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Destinations (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#FF9F1C]">Top Regions</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              {["Everest Region", "Pokhara Lakes", "Chitwan Wildlife", "Upper Mustang Desert", "Lumbini Peace Stupa", "Rara Pristine Lake"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleFooterScroll("destinations")}
                    className="hover:text-[#00B4D8] hover:translate-x-1 transition-all cursor-pointer text-left block"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#FF9F1C]">Weekly Travel Journal</h4>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Subscribe to get exclusive high-end flight deal announcements, custom altitude safety bulletins, and early booking promo codes.
            </p>

            {isSubscribed ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl flex items-center space-x-2 text-xs">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>Subscribed successfully! Namaste.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex space-x-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/10 border border-white/10 focus:border-[#FF9F1C] focus:outline-none rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-gray-400"
                  />
                  <Mail className="absolute right-3.5 top-3.5 w-4 h-4 text-gray-400" />
                </div>
                <button
                  type="submit"
                  className="bg-[#FF9F1C] hover:bg-[#e08b10] text-white p-3 rounded-xl transition-colors shadow-md flex items-center justify-center cursor-pointer flex-shrink-0"
                >
                  <Send className="w-4.5 h-4.5" />
                </button>
              </form>
            )}

            <div className="flex items-center space-x-2 text-[10px] text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>We value your confidentiality. No spam, ever.</span>
            </div>
          </div>

        </div>

        {/* Divider and copyright panel */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} Ghumna Jaam Travels Pvt. Ltd. All rights reserved.</p>
          
          <div className="flex space-x-6">
            <button onClick={() => alert("Privacy policy details are a simulation in this preview.")} className="hover:text-[#FF9F1C]">Privacy Policy</button>
            <button onClick={() => alert("Terms of service details are a simulation in this preview.")} className="hover:text-[#FF9F1C]">Terms of Service</button>
            <button onClick={() => alert("Cancellation parameters are detailed in the FAQs.")} className="hover:text-[#FF9F1C]">Cancellation Policy</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
