import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "../data";

export default function BlogSection() {
  return (
    <section id="blog" className="py-24 bg-gray-50 dark:bg-[#071E3C]/40 transition-colors duration-500 border-b dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-[#FF9F1C] block mb-2">Himalayan Insights</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0A2A52] dark:text-white tracking-tight leading-tight">
            Our Latest Travel Blogs
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-2">
            Get the latest stories, cultural reports, altitude trekking checklists, and packing checklists straight from our veteran local guides.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white dark:bg-[#071E3C] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-white/5 flex flex-col justify-between"
            >
              <div>
                {/* Image & Tag slot */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                  <span className="absolute top-4 left-4 z-10 bg-[#FF9F1C] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded shadow">
                    {post.category}
                  </span>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>

                {/* Body Content */}
                <div className="p-6">
                  {/* Meta Pilles */}
                  <div className="flex items-center space-x-4 text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-3">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-[#00B4D8]" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-[#FF9F1C]" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#0A2A52] dark:text-white leading-snug line-clamp-2 mb-3 group-hover:text-[#FF9F1C] transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read More button footer */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => alert(`Reading "${post.title}" is a simulated action. In production, this would open the blog article page.`)}
                  className="inline-flex items-center text-xs sm:text-sm font-bold text-[#0A2A52] hover:text-[#FF9F1C] dark:text-gray-300 dark:hover:text-[#FF9F1C] group/link transition-colors cursor-pointer"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover/link:translate-x-1" />
                </button>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
