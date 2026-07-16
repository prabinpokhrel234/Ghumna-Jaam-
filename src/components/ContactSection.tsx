import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Check, Sparkles, AlertCircle, Award } from "lucide-react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      setError("Please complete all the input fields before sending.");
      return;
    }
    setError("");
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-[#071E3C]/20 transition-colors duration-500 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-[#FF9F1C] block mb-2">Connect With Us</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0A2A52] dark:text-white tracking-tight leading-tight">
            Contact Our Expedition Base
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-2">
            Ready to design your customized luxury Himalayan escape? Write us directly, call our booking hotline, or ping our 24/7 WhatsApp concierge.
          </p>
        </div>

        {/* Contact Split Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Column: Direct info, Socials, WhatsApp */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-gray-50 dark:bg-[#071E3C] p-8 rounded-3xl border border-gray-100 dark:border-white/5 space-y-6 shadow-sm">
              <h3 className="text-xl sm:text-2xl font-black text-[#0A2A52] dark:text-white">Headquarters Information</h3>
              <p className="text-gray-500 dark:text-gray-300 text-sm leading-relaxed">
                Visit our elegant main booking office situated in the heart of Kathmandu's historical tourist hub, Thamel.
              </p>

              {/* Direct Info list */}
              <div className="space-y-4">
                
                <div className="flex items-start">
                  <div className="bg-white dark:bg-[#0A2A52] p-3 rounded-xl border border-gray-100 dark:border-white/10 text-[#FF9F1C] shadow-sm mr-4 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider">Office Address</h4>
                    <p className="text-sm font-bold text-[#0A2A52] dark:text-white mt-0.5">Ghumna Jaam Plaza, Thamel, Kathmandu, Nepal</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white dark:bg-[#0A2A52] p-3 rounded-xl border border-gray-100 dark:border-white/10 text-[#00B4D8] shadow-sm mr-4 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider">Hotline booking</h4>
                    <p className="text-sm font-bold text-[#0A2A52] dark:text-white mt-0.5">+977-1-4400000 / +977-9801234567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white dark:bg-[#0A2A52] p-3 rounded-xl border border-gray-100 dark:border-white/10 text-[#FF9F1C] shadow-sm mr-4 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email Base</h4>
                    <p className="text-sm font-bold text-[#0A2A52] dark:text-white mt-0.5">explore@ghumnajaam.com</p>
                  </div>
                </div>

              </div>

              {/* WhatsApp Button */}
              <div className="pt-4 border-t border-gray-200/50 dark:border-white/5">
                <a
                  href="https://wa.me/9779801234567?text=Hi%20Ghumna%20Jaam%20Travels!%20I'm%20interested%20in%20booking%20a%20luxury%20Nepal%20tour."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 group text-sm"
                >
                  <MessageSquare className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                  <span>Ping WhatsApp Concierge</span>
                </a>
              </div>

            </div>

            {/* Quality Seals */}
            <div className="bg-[#0A2A52] p-6 rounded-3xl text-white flex items-center space-x-4 border border-white/5 shadow-md">
              <Award className="w-10 h-10 text-[#FF9F1C] flex-shrink-0" />
              <div>
                <h4 className="font-extrabold text-sm sm:text-base">NTB Certified Operator</h4>
                <p className="text-xs text-gray-300 leading-normal mt-0.5">Authorized luxury tour coordinator registered directly with the Nepal Tourism Board.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7 bg-gray-50 dark:bg-[#071E3C] p-8 sm:p-10 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
            {isSubmitted ? (
              /* Success screen */
              <div className="text-center py-12 space-y-4">
                <div className="bg-emerald-500 text-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0A2A52] dark:text-white">Message Transmitted!</h3>
                <p className="text-gray-500 dark:text-gray-300 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                  Namaste. Your message was successfully received by our sales team. We will respond back with custom options in 2 hours.
                </p>
                <button
                  onClick={handleReset}
                  className="bg-[#0A2A52] hover:bg-[#FF9F1C] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow transition-all cursor-pointer mt-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              /* Contact Form */
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <h3 className="text-xl sm:text-2xl font-black text-[#0A2A52] dark:text-white mb-2">Write Us a Message</h3>
                
                {error && (
                  <div className="bg-red-50 text-red-500 text-xs font-bold p-3 rounded-xl flex items-center space-x-2 border border-red-100">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Your Name</label>
                    <input
                      type="text"
                      placeholder="Jane Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white dark:bg-white/5 text-[#0A2A52] dark:text-white px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:border-[#FF9F1C] focus:outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Email Address</label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white dark:bg-white/5 text-[#0A2A52] dark:text-white px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:border-[#FF9F1C] focus:outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Subject</label>
                  <input
                    type="text"
                    placeholder="E.g., Group luxury booking inquiry, Upper Mustang query..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-white dark:bg-white/5 text-[#0A2A52] dark:text-white px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:border-[#FF9F1C] focus:outline-none transition-all text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Message Body</label>
                  <textarea
                    rows={4}
                    placeholder="Share your dream travel plan details with our coordinator..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white dark:bg-white/5 text-[#0A2A52] dark:text-white px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:border-[#FF9F1C] focus:outline-none transition-all text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FF9F1C] hover:bg-[#e08b10] text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer transform active:scale-98"
                >
                  <span>Transmit Inquiry</span>
                  <Send className="w-4 h-4" />
                </button>

              </form>
            )}
          </div>

        </div>

        {/* Bottom Full-width Google Map Embed */}
        <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-white/5 h-[350px] sm:h-[450px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3532.128741355416!2d85.3101235!3d27.71501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fcb5e8da1d%3A0x8677c78096c4b22e!2sThamel%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ghumna Jaam Travels Headquarters Location"
          />
        </div>

      </div>
    </section>
  );
}
