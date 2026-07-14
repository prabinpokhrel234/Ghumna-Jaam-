import { Package, Destination, Testimonial, BlogPost, FAQItem } from "./types";

export const destinations: Destination[] = [
  {
    id: "dest-everest",
    name: "Everest Region",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200",
    description: "Stand at the roof of the world. Experience the breathtaking grandeur of Mt. Everest, legendary Sherpa culture, and high-altitude alpine trails.",
    tag: "Roof of the World",
    visitorsPerYear: "45K+",
    recommendedDuration: "12-16 Days"
  },
  {
    id: "dest-pokhara",
    name: "Pokhara",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200",
    description: "A tranquil paradise nestled beside Fewa Lake, framed by the majestic Annapurna range. The adventure capital of Nepal.",
    tag: "Lake & Adventure Paradise",
    visitorsPerYear: "350K+",
    recommendedDuration: "3-7 Days"
  },
  {
    id: "dest-chitwan",
    name: "Chitwan National Park",
    image: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=1200",
    description: "Embark on an immersive jungle safari. Track the endangered one-horned rhinoceros, royal Bengal tigers, and vibrant exotic birdlife.",
    tag: "Untamed Jungle Wildlife",
    visitorsPerYear: "180K+",
    recommendedDuration: "3-4 Days"
  },
  {
    id: "dest-mustang",
    name: "Upper Mustang",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=1200",
    description: "Explore a forbidden Tibetan kingdom. Wander through red clay cliffs, ancient wind-carved caves, and centuries-old Buddhist monasteries.",
    tag: "Forbidden Kingdom",
    visitorsPerYear: "10K+",
    recommendedDuration: "8-12 Days"
  },
  {
    id: "dest-lumbini",
    name: "Lumbini",
    image: "https://images.unsplash.com/photo-1596120236172-231999844ade?auto=format&fit=crop&q=80&w=1200",
    description: "Discover deep spiritual peace at the birthplace of Siddhartha Gautama, the Buddha. Walk through elegant international peace monasteries.",
    tag: "Birthplace of Buddha",
    visitorsPerYear: "200K+",
    recommendedDuration: "2-3 Days"
  },
  {
    id: "dest-rara",
    name: "Rara Lake",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200",
    description: "A pristine blue jewel in the remote wilderness of Western Nepal. Surrounded by deep pine forests and snow-dusted alpine ridges.",
    tag: "The Blue Pearl",
    visitorsPerYear: "5K+",
    recommendedDuration: "5-7 Days"
  },
  {
    id: "dest-ilam",
    name: "Ilam",
    image: "https://images.unsplash.com/photo-1555899434-94d1368aa712?auto=format&fit=crop&q=80&w=1200",
    description: "Stroll through endless rolling tea gardens, shrouded in soft mountain mists. Experience rich agricultural heritage and tranquil country drives.",
    tag: "Tea Capital of Nepal",
    visitorsPerYear: "80K+",
    recommendedDuration: "3-5 Days"
  },
  {
    id: "dest-bandipur",
    name: "Bandipur",
    image: "https://images.unsplash.com/photo-1578593139888-39622e2047de?auto=format&fit=crop&q=80&w=1200",
    description: "A beautifully preserved Newari hilltop settlement. Step back in time with its traditional brick architecture and sweeping Himalayan views.",
    tag: "Living Museum Town",
    visitorsPerYear: "40K+",
    recommendedDuration: "2-3 Days"
  }
];

export const packages: Package[] = [
  {
    id: "pkg-ebc-trek",
    title: "Everest Base Camp Legendary Trek",
    location: "Everest Region",
    duration: "14 Days",
    rating: 4.9,
    reviewsCount: 142,
    price: 1350,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800",
    categories: ["Adventure", "Budget"],
    description: "Follow the footsteps of legends. Climb through bustling Sherpa villages, ancient active monasteries, and cross high suspension bridges to stand at the foot of Mount Everest.",
    highlights: ["Stand at Everest Base Camp (5,364m)", "Breathtaking views from Kala Patthar (5,545m)", "Acclimatize in Namche Bazaar", "Visit the historic Tengboche Monastery"]
  },
  {
    id: "pkg-annapurna-luxury",
    title: "Annapurna Luxury Sanctuary & Spa",
    location: "Pokhara & Foothills",
    duration: "7 Days",
    rating: 4.9,
    reviewsCount: 88,
    price: 2400,
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800",
    categories: ["Luxury", "Honeymoon", "Family"],
    description: "Dine on gourmet food and sleep in luxury alpine lodges with spectacular mountain vistas. Includes helicopter transfers and a premium spa treatment facing Lake Fewa.",
    highlights: ["Luxury lodge accommodations", "Private helicopter tour over Annapurna Range", "Elite spa treatments at Pokhara Luxury Resort", "Private guided boat cruise on Lake Fewa"]
  },
  {
    id: "pkg-mustang-jeep",
    title: "Upper Mustang Forbidden Kingdom Expedition",
    location: "Upper Mustang",
    duration: "10 Days",
    rating: 4.8,
    reviewsCount: 56,
    price: 1950,
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800",
    categories: ["Adventure", "Luxury"],
    description: "Journey by private 4x4 rugged Jeep into Upper Mustang, a semi-arid desert displaying spectacular red wind-carved caves, deep canyons, and ancient walled Tibetan citadels.",
    highlights: ["Explore the walled capital of Lo Manthang", "Inspect 10,000-year-old mysterious sky caves", "Private off-road 4x4 vehicles with pro drivers", "Exclusive audiences with local village elders"]
  },
  {
    id: "pkg-chitwan-wildlife",
    title: "Chitwan Wildlife Safari & Tharu Culture",
    location: "Chitwan",
    duration: "4 Days",
    rating: 4.7,
    reviewsCount: 110,
    price: 480,
    image: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=800",
    categories: ["Family", "Budget"],
    description: "An incredible deep-jungle wildlife experience. Travel by customized open jeep to track the rare single-horned rhinoceros and Bengal tigers. Experience warm Tharu dance performances.",
    highlights: ["Jeep safari deep in Chitwan National Park", "Canoe safari along the Rapti River", "Observe endangered baby elephant nurseries", "Vibrant Tharu tribal cultural dance dinner"]
  },
  {
    id: "pkg-spiritual-pilgrimage",
    title: "Spiritual Path: Kathmandu & Lumbini",
    location: "Kathmandu & Lumbini",
    duration: "8 Days",
    rating: 4.8,
    reviewsCount: 64,
    price: 950,
    image: "https://images.unsplash.com/photo-1596120236172-231999844ade?auto=format&fit=crop&q=80&w=800",
    categories: ["Spiritual", "Family"],
    description: "A deeply peaceful and transformative journey tracing historic stupas in Kathmandu before staying at a quiet monastery retreat in Lumbini, the sacred birthplace of Lord Buddha.",
    highlights: ["Meditate at the sacred Mayadevi Temple", "Guided walking tours of Kathmandu's Heritage Stupas", "Quiet luxury stay at Lumbini Monastic garden", "Private sessions with resident Buddhist masters"]
  },
  {
    id: "pkg-rara-honeymoon",
    title: "Rara Lake Romantic Wilderness Escape",
    location: "Rara Lake",
    duration: "6 Days",
    rating: 4.9,
    reviewsCount: 32,
    price: 1650,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800",
    categories: ["Honeymoon", "Luxury", "Adventure"],
    description: "Celebrate love in total alpine solitude. Stay in premium private glamping cabins on the edge of the crystal-blue Rara Lake, and ride horses through dense pine forests under starry skies.",
    highlights: ["Sunset luxury champagne boat ride", "Lakeside luxury glamping tents", "Horse riding through dense pine forests", "Stunning alpine stargazing experiences"]
  },
  {
    id: "pkg-ilam-tea",
    title: "Eastern Greenery: Ilam Tea Trail & Countryside",
    location: "Ilam",
    duration: "5 Days",
    rating: 4.6,
    reviewsCount: 41,
    price: 380,
    image: "https://images.unsplash.com/photo-1555899434-94d1368aa712?auto=format&fit=crop&q=80&w=800",
    categories: ["Family", "Budget"],
    description: "A peaceful and serene agricultural countryside escape. Tour historic tea processing plants, pick green tea leaves alongside local farmers, and watch sunrises over low rolling clouds.",
    highlights: ["Tour century-old tea manufacturing plants", "Traditional homestay dinners with local farmers", "Hike up Antu Danda to watch stunning sunrises", "Taste-test premium organic Orthodox Teas"]
  },
  {
    id: "pkg-bandipur-heritage",
    title: "Bandipur Heritage & Newari Culture",
    location: "Bandipur",
    duration: "3 Days",
    rating: 4.7,
    reviewsCount: 49,
    price: 290,
    image: "https://images.unsplash.com/photo-1578593139888-39622e2047de?auto=format&fit=crop&q=80&w=800",
    categories: ["Budget", "Family"],
    description: "Step into a Living Museum. Bandipur is a beautiful pedestrian heritage hilltop village preserving traditional 18th-century Newari brick architecture and peaceful courtyard cafes.",
    highlights: ["Stay in restored heritage boutique houses", "Wander historical stone paved vehicle-free streets", "Short scenic ridge hike to Ramkot village", "Panoramic sunrise views of the Annapurnas"]
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Charlotte Dubois",
    role: "Adventure Enthusiast, France",
    rating: 5,
    review: "The Everest Base Camp Trek organized by Ghumna Jaam Travels was simply flawless! Every detail—from our fantastic Sherpa guide to our warm cozy teahouse stays—was perfectly coordinated. They made a challenging trek feel absolutely secure and incredibly fun.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    date: "May 2026"
  },
  {
    id: "t2",
    name: "Dr. Rajesh K. Patel",
    role: "Family Vacationer, India",
    rating: 5,
    review: "We booked the Chitwan Safari and Pokhara Package for our family of six. It was incredibly comfortable! Ghumna Jaam handled the logistics with utmost professionalism. The kids loved the baby elephant nursery, and the private boat tour in Pokhara was breathtaking.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    date: "April 2026"
  },
  {
    id: "t3",
    name: "Sophia & Liam Vane",
    role: "Honeymooners, United Kingdom",
    rating: 5,
    review: "Our honeymoon at Rara Lake was an absolute dream. The glamping tents were ultra-luxurious, and the sunset champagne cruise was unforgettable. The level of personal service we received from Ghumna Jaam Travels made us feel like VIPs every single step of the way.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
    date: "June 2026"
  },
  {
    id: "t4",
    name: "Kenji Sato",
    role: "Cultural Photographer, Japan",
    rating: 5,
    review: "Upper Mustang is a mystical place, and going there with Ghumna Jaam Travels was the best decision. Our professional off-road driver was incredibly skilled, and our guide had deep connections in Lo Manthang, granting us entry to highly exclusive historic monasteries.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    date: "October 2025"
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "The Ultimate First-Timer's Guide to Trekking in Nepal",
    excerpt: "Preparing for your first Himalayan trek? Here is everything you need to know about altitude sickness, packing lists, permits, and choosing the perfect route.",
    date: "June 28, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    category: "Trekking Guide"
  },
  {
    id: "b2",
    title: "10 Hidden Secrets of Upper Mustang Revealed",
    excerpt: "Upper Mustang is more than just a dry desert. Explore the mystery behind the 10,000-year-old human-carved sky caves and unique polyandry cultures.",
    date: "July 02, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800",
    category: "Culture"
  },
  {
    id: "b3",
    title: "Why Chitwan is a Safest Haven for Endangered Rhinos",
    excerpt: "Discover Nepal's outstanding wildlife conservation achievements. Get the scoop on how anti-poaching patrols successfully protected the unique one-horned rhino.",
    date: "July 12, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=800",
    category: "Wildlife"
  }
];

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "When is the absolute best time to visit Nepal?",
    answer: "The absolute best times to visit are Autumn (September to November) and Spring (March to May). During these months, the mountain air is exceptionally clear, skies are bright blue, and temperatures are perfect for hiking and sightseeing. Spring also brings gorgeous blooming rhododendron forests."
  },
  {
    id: "faq-2",
    question: "Do I need a visa to enter Nepal? How do I get it?",
    answer: "Most nationalities can obtain a Tourist Visa on Arrival at Tribhuvan International Airport in Kathmandu or at land border crossings. You will need a passport valid for at least 6 months, passport-sized photos, and visa fee in cash (USD, EUR, or AUD are preferred). You can also apply online in advance."
  },
  {
    id: "faq-3",
    question: "What is Altitude Sickness, and how do you prevent it?",
    answer: "Acute Mountain Sickness (AMS) can occur at altitudes above 2,500 meters. Our itineraries are meticulously structured with built-in acclimatization days. We advise our travelers to climb slowly, stay fully hydrated (drinking 4-5 liters of water daily), avoid alcohol, and consume local garlic soup. Our guides also carry oximeters and supplementary oxygen tanks."
  },
  {
    id: "faq-4",
    question: "Are your tour packages customizable?",
    answer: "Absolutely! We specialize in custom-tailored itineraries. Whether you want to extend your stay in Pokhara, book a private helicopter ride to Everest, or modify hotel ratings to suit your budget, our expert tour designers will construct the exact trip you desire."
  },
  {
    id: "faq-5",
    question: "Is travel insurance mandatory for trekking in Nepal?",
    answer: "Yes, comprehensive travel insurance is mandatory for all trekking and adventure packages. Your policy MUST specifically cover high-altitude trekking (up to 6,000 meters) and emergency medical helicopter evacuation. We require a copy of your policy before departing Kathmandu."
  }
];
