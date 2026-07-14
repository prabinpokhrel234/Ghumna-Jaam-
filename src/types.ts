export interface Package {
  id: string;
  title: string;
  location: string;
  duration: string;
  rating: number;
  reviewsCount: number;
  price: number;
  image: string;
  categories: string[]; // Adventure, Family, Luxury, Honeymoon, Spiritual, Budget
  description: string;
  highlights: string[];
}

export interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  tag: string;
  visitorsPerYear: string;
  recommendedDuration: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  review: string;
  avatar: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
