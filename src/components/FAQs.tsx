import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { faqs } from "../data";

export default function FAQs() {
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-24 bg-gray-50 dark:bg-[#071E3C]/40 transition-colors duration-500 border-b dark:border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-[#FF9F1C] block mb-2">Got Questions?</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0A2A52] dark:text-white tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-2">
            Find immediate answers regarding altitudes, flight safety permits, medical guides, and cancellation parameters.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white dark:bg-[#071E3C] rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#FF9F1C] shadow-lg shadow-gray-100/30 dark:shadow-none"
                    : "border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10"
                }`}
              >
                {/* Header button */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex justify-between items-center p-5 sm:p-6 text-left cursor-pointer select-none"
                >
                  <div className="flex items-center space-x-3.5 pr-4">
                    <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${isOpen ? "text-[#FF9F1C]" : "text-gray-400"}`} />
                    <span className="text-sm sm:text-base font-bold text-[#0A2A52] dark:text-white">
                      {faq.question}
                    </span>
                  </div>

                  <span className={`p-1.5 rounded-lg transition-transform duration-300 ${isOpen ? "rotate-180 bg-[#FF9F1C]/10 text-[#FF9F1C]" : "bg-gray-50 dark:bg-white/5 text-gray-500"}`}>
                    <ChevronDown className="w-4 h-4 sm:w-5 h-5" />
                  </span>
                </button>

                {/* Animated Answer Body */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-[300px] opacity-100 pb-6 px-6 sm:px-8 border-t border-gray-100 dark:border-white/5 pt-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Custom Quick Call-to-action */}
        <div className="mt-12 bg-[#0A2A52] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between shadow-xl relative overflow-hidden border border-white/5">
          <div className="absolute right-0 top-0 w-32 h-32 bg-[#00B4D8]/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <h4 className="font-extrabold text-base sm:text-lg flex items-center justify-center sm:justify-start">
              <Sparkles className="w-4 h-4 text-[#FF9F1C] mr-2" />
              Have custom inquiries?
            </h4>
            <p className="text-xs text-gray-300 leading-normal mt-1 max-w-sm">
              Our live expedition planners are standing by. Get instant customized support through chat or call.
            </p>
          </div>

          <button
            onClick={() => {
              const contactSec = document.getElementById("contact");
              if (contactSec) {
                contactSec.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-[#FF9F1C] hover:bg-[#e08b10] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow transition-colors whitespace-nowrap"
          >
            Ask Us Directly
          </button>
        </div>

      </div>
    </section>
  );
}
