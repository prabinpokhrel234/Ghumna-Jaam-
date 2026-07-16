import { useEffect, useState, useRef } from "react";
import { Mountain, Compass, Heart, Award, ShieldCheck, Milestone, CheckCircle, Flame, Leaf, Eye } from "lucide-react";
import { motion, useInView, AnimatePresence } from "motion/react";

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

function Counter({ target, suffix = "", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-extrabold text-3xl sm:text-5xl font-display text-[#FF9F1C] tracking-tight">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function WhyNepal() {
  const [selectedTopic, setSelectedTopic] = useState("nature");

  const topics = [
    {
      id: "nature",
      title: "Nature & Sanctuary",
      icon: <Leaf className="w-8 h-8 text-[#00B4D8]" />,
      desc: "Nepal boasts an unbelievable geographic variation, stretching from tropical terai flatlands to pristine alpine high mountain peaks, harboring thousands of unique botanical species.",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "adventure",
      title: "Epic Adventure",
      icon: <Compass className="w-8 h-8 text-[#FF9F1C]" />,
      desc: "The ultimate playground. Paraglide beside the Annapurnas, white-water raft down wild Himalayan glacial rivers, or cross towering steel suspension bridges.",
      image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "mountains",
      title: "Majestic Mountains",
      icon: <Mountain className="w-8 h-8 text-[#00B4D8]" />,
      desc: "Eight of the world's fourteen highest mountain peaks, including Mount Everest, are situated within Nepal, offering unforgettable trekking panoramas.",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "wildlife",
      title: "Primal Wildlife",
      icon: <Eye className="w-8 h-8 text-[#FF9F1C]" />,
      desc: "Untamed jungles where the royal Bengal tigers roam, one-horned rhinoceros splash in muddy rivers, and over 850 bird species create an incredible tropical paradise.",
      image: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "spirituality",
      title: "Spirituality & Peace",
      icon: <Flame className="w-8 h-8 text-[#00B4D8]" />,
      desc: "Bask in holy serenity. Visit Lumbini—the sacred birthplace of Lord Buddha—or trek to high ancient monasteries echoing with deep resonant Buddhist chants.",
      image: "https://images.unsplash.com/photo-1596120236172-231999844ade?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="why-nepal" className="py-24 transition-colors duration-500 bg-gray-50 dark:bg-[#071E3C]/40 border-y dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-[#FF9F1C] block mb-2">Why Nepal? Why Now?</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0A2A52] dark:text-white tracking-tight leading-tight mb-4">
            A Paradise of Contrasts and Infinite Beauty
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
            From deep misty valleys to alpine heights, Nepal has captured the hearts of travelers for generations. Explore our pristine sanctuaries where nature, adventure, and soul converge.
          </p>
        </div>

        {/* Interactive Highlight Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-24">
          
          {/* Vertical Tabs selection (Left) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`flex items-start text-left p-4 rounded-xl transition-all duration-300 border ${
                  selectedTopic === topic.id
                    ? "bg-[#0A2A52] border-[#0A2A52] text-white shadow-xl dark:bg-white dark:border-white dark:text-[#0A2A52] transform translate-x-2"
                    : "bg-white dark:bg-[#071E3C] border-gray-100 dark:border-white/5 text-[#0A2A52] dark:text-white hover:bg-gray-100/50 dark:hover:bg-white/5"
                }`}
              >
                <div className="mr-4 p-2 rounded-lg bg-gray-50 dark:bg-black/35 flex-shrink-0">
                  {topic.icon}
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg">{topic.title}</h3>
                  <p className={`text-xs mt-1 line-clamp-2 ${selectedTopic === topic.id ? "text-gray-200 dark:text-gray-600" : "text-gray-500"}`}>
                    {topic.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Large Tab Display (Right) */}
          <div className="lg:col-span-7 h-[350px] sm:h-[450px] relative">
            <AnimatePresence mode="wait">
              {topics.map((topic) => {
                if (topic.id !== selectedTopic) return null;
                return (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, x: 20, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                    className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl h-full w-full group border dark:border-white/5"
                  >
                    <img
                      src={topic.image}
                      alt={topic.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-6 sm:p-10" />
                    <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 text-white z-10">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-[#FF9F1C] text-white text-[10px] uppercase font-black px-2.5 py-1 rounded">Unique Experience</span>
                      </div>
                      <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">{topic.title}</h3>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">{topic.desc}</p>
                      <div className="flex items-center text-[#00B4D8] font-bold text-sm cursor-pointer group/link hover:text-[#00B4D8]/80">
                        Explore matching packages
                        <span className="ml-1.5 transition-transform group-hover/link:translate-x-1">→</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>

        {/* Counter Statistics Grid */}
        <div className="bg-[#0A2A52] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-white/5">
          {/* Subtle background abstract shape */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            
            {/* Stat 1 */}
            <div className="flex flex-col justify-center py-4 md:py-0">
              <Counter target={1000000} suffix="+" duration={1800} />
              <span className="text-xs sm:text-sm font-bold tracking-widest text-gray-300 uppercase mt-2">Annual Tourists</span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col justify-center pt-8 md:pt-0">
              <Counter target={100} suffix="+" duration={1500} />
              <span className="text-xs sm:text-sm font-bold tracking-widest text-gray-300 uppercase mt-2">Destinations Covered</span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col justify-center pt-8 md:pt-0">
              <Counter target={500} suffix="+" duration={1500} />
              <span className="text-xs sm:text-sm font-bold tracking-widest text-gray-300 uppercase mt-2">Premium Activities</span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col justify-center pt-8 md:pt-0">
              <Counter target={5000} suffix="+" duration={1800} />
              <span className="text-xs sm:text-sm font-bold tracking-widest text-gray-300 uppercase mt-2">Happy Customers</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
