import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Plus, 
  Edit3, 
  Trash, 
  X, 
  Sparkles, 
  LogOut, 
  Lock, 
  AlertCircle, 
  Save, 
  Grid, 
  BookOpen, 
  RefreshCw,
  Image as ImageIcon
} from "lucide-react";
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  User 
} from "firebase/auth";
import { motion, AnimatePresence } from "motion/react";
import { db, auth, OperationType, handleFirestoreError } from "../firebase";

interface BlogDoc {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  category: string;
  image: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
  createdAt: any;
  updatedAt: any;
}

const CATEGORIES = ["Trekking Guide", "Culture", "Wildlife", "Tips & Tricks", "Food & Stay"];

const DEFAULT_COVER_IMAGES = [
  { name: "Annapurna Peak", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" },
  { name: "Upper Mustang Valley", url: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800" },
  { name: "Chitwan Jungle Safari", url: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=800" },
  { name: "Tranquil Fewa Lake", url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800" },
  { name: "World Peace Lumbini", url: "https://images.unsplash.com/photo-1596120236172-231999844ade?auto=format&fit=crop&q=80&w=800" }
];

const SEED_TEMPLATES = [
  {
    title: "The Ultimate First-Timer's Guide to Trekking in Nepal",
    subtitle: "Preparing for your first Himalayan trek? Here is everything you need to know about altitude sickness, packing lists, permits, and choosing the perfect route.",
    content: "Trekking in Nepal is one of the most rewarding adventures on Earth. Whether you are trekking to the majestic Everest Base Camp or doing the classic Annapurna Circuit, preparation is key to safety and enjoyment.\n\n### 1. Understanding Altitude Sickness\nAcute Mountain Sickness (AMS) is a real risk at elevations above 2,500 meters (8,200 feet). Remember to climb slowly, sleep low, and hydrate constantly. Avoid alcoholic drinks during high ascent.\n\n### 2. Packing Essentials\n- A sturdy pair of broken-in trekking boots\n- Layered moisture-wicking apparel\n- High quality down jacket and rain gear\n- Reliable water purification tablets or filter\n- Trekking poles for steep ascents and descents.\n\n### 3. Hiring Local Guides\nGuides are invaluable. They have deep connections with locals, ensure safety, navigate trails flawlessly, and enrich your understanding of the beautiful Himalayan culture.",
    category: "Trekking Guide",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "10 Hidden Secrets of Upper Mustang Revealed",
    subtitle: "Upper Mustang is more than just a dry desert. Explore the mystery behind the 10,000-year-old human-carved sky caves and unique polyandry cultures.",
    content: "Upper Mustang, the former Kingdom of Lo, is a high-altitude desert protected by deep mountains and wind-swept gorges. Here are some of its best-kept secrets:\n\n### 1. The Mysterious Sky Caves\nOver 10,000 human-made caves are carved high into the sheer canyon walls. Archaelogists believe they were used as burial chambers and spiritual sanctuaries dating back 2,000 to 3,000 years.\n\n### 2. The Ancient Walled City of Lo Manthang\nHeavily fortified in 1380, the medieval city of Lo Manthang remains largely unchanged. A single massive earthen wall protects whitewashed clay houses, Tibetan monasteries, and the former King's palace.\n\n### 3. Tiji Festival\nA magnificent three-day festival celebrating the myth of a son saving his kingdom from destruction. Rich with colorful Tibetan costumes, dances, and deep spiritual chants.",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Why Chitwan is a Safest Haven for Endangered Rhinos",
    subtitle: "Discover Nepal's outstanding wildlife conservation achievements. Get the scoop on how anti-poaching patrols successfully protected the unique one-horned rhino.",
    content: "Nepal has become a global model for wildlife preservation. Chitwan National Park, situated in the subtropical inner Terai lowlands, is at the heart of this success story.\n\n### 1. Community-First Patrols\nLocal youth anti-poaching groups work closely with the Nepal Army to monitor endangered habitats. This unified force keeps poachers away, achieving consecutive years of 'Zero Poaching'.\n\n### 2. Habitat Restoration\nSpecial grass and waterhole management projects ensure that rhinos have abundant food and clean water in their natural ecosystem.\n\n### 3. Eco-Tourism Synergy\nTrekking on elephant-back or private jeep safaris fund direct conservation research, ensuring that local communities directly benefit from saving wild animals.",
    category: "Wildlife",
    image: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=800"
  }
];

export default function BlogSection() {
  const [blogs, setBlogs] = useState<BlogDoc[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  
  // Dialog / Modal Visibility
  const [selectedBlog, setSelectedBlog] = useState<BlogDoc | null>(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Blog Form State (CRUD)
  const [formTitle, setFormTitle] = useState("");
  const [formSubtitle, setFormSubtitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formCategory, setFormCategory] = useState("Trekking Guide");
  const [formImage, setFormImage] = useState(DEFAULT_COVER_IMAGES[0].url);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Monitor Auth Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch blogs in real-time from Firestore
  useEffect(() => {
    const blogsCollectionRef = collection(db, "blogs");
    const blogsQuery = query(blogsCollectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      blogsQuery,
      (snapshot) => {
        const blogsList: BlogDoc[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          blogsList.push({
            id: doc.id,
            title: data.title,
            subtitle: data.subtitle,
            content: data.content,
            category: data.category,
            image: data.image,
            authorId: data.authorId,
            authorName: data.authorName,
            authorEmail: data.authorEmail,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          });
        });
        setBlogs(blogsList);
        setIsLoadingBlogs(false);
      },
      (error) => {
        console.error("Firestore loading error:", error);
        setIsLoadingBlogs(false);
        // Fallback or alert if permissions deny
      }
    );

    return () => unsubscribe();
  }, []);

  // Google Login popup
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
      setIsAuthModalOpen(false);
      setIsDashboardOpen(true);
    } catch (error: any) {
      console.error("Google Sign In Error:", error);
      alert("Failed to authenticate. Please make sure popups are allowed for this site.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsDashboardOpen(false);
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
  };

  // Seeding initial posts to database if empty
  const handleSeedDatabase = async () => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      for (const t of SEED_TEMPLATES) {
        const docId = `seed-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const path = `blogs/${docId}`;
        const newDocPayload = {
          title: t.title,
          subtitle: t.subtitle,
          content: t.content,
          category: t.category,
          image: t.image,
          authorId: user.uid,
          authorName: user.displayName || "Admin Guide",
          authorEmail: user.email || "guide@ghumnajaam.com",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        try {
          const docRef = doc(db, "blogs", docId);
          await updateDoc(docRef, newDocPayload).catch(async (e) => {
            // Document doesn't exist, create it with setDoc equivalent or addDoc
            // Since we set up specific isValidId in security rules, let's write to custom doc
            const { setDoc } = await import("firebase/firestore");
            await setDoc(doc(db, "blogs", docId), newDocPayload);
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.CREATE, path);
        }
      }
    } catch (error: any) {
      console.error("Seeding failed:", error);
      alert("Seeding error. Check database or rules configuration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Blog CRUD (Create & Update)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setFormError(null);

    // Validate lengths client-side to strictly respect firestore.rules
    if (formTitle.trim().length < 3 || formTitle.length > 150) {
      setFormError("Title must be between 3 and 150 characters.");
      return;
    }
    if (formSubtitle.trim().length < 3 || formSubtitle.length > 250) {
      setFormError("Subtitle must be between 3 and 250 characters.");
      return;
    }
    if (formContent.trim().length < 10 || formContent.length > 10000) {
      setFormError("Content body must be between 10 and 10,000 characters.");
      return;
    }

    setIsSubmitting(true);
    const path = isEditing && editingBlogId ? `blogs/${editingBlogId}` : "blogs";

    try {
      if (isEditing && editingBlogId) {
        // Update Blog (Pillar 4 Action Gate)
        const blogDocRef = doc(db, "blogs", editingBlogId);
        const updatePayload = {
          title: formTitle,
          subtitle: formSubtitle,
          content: formContent,
          category: formCategory,
          image: formImage,
          authorId: user.uid, // Keep identical for validation integrity
          authorName: user.displayName || "Ghumna Jaam Editor",
          authorEmail: user.email || "",
          updatedAt: serverTimestamp(),
        };

        await updateDoc(blogDocRef, updatePayload).catch((err) => {
          handleFirestoreError(err, OperationType.UPDATE, path);
        });
      } else {
        // Create Blog (Ensure strict document ID constraints)
        const customId = `blog-${Date.now()}`;
        const newBlogPayload = {
          title: formTitle,
          subtitle: formSubtitle,
          content: formContent,
          category: formCategory,
          image: formImage,
          authorId: user.uid,
          authorName: user.displayName || "Ghumna Jaam Editor",
          authorEmail: user.email || "",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        const { setDoc } = await import("firebase/firestore");
        await setDoc(doc(db, "blogs", customId), newBlogPayload).catch((err) => {
          handleFirestoreError(err, OperationType.CREATE, `blogs/${customId}`);
        });
      }

      // Reset Form State on success
      resetForm();
    } catch (error: any) {
      console.error("Database operation error:", error);
      let parsedError = error.message;
      try {
        const errorJson = JSON.parse(error.message);
        parsedError = `Firebase Permission Denied. Your email must be verified. [Operation: ${errorJson.operationType}]`;
      } catch (e) {
        // fallthrough
      }
      setFormError(parsedError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormTitle("");
    setFormSubtitle("");
    setFormContent("");
    setFormCategory("Trekking Guide");
    setFormImage(DEFAULT_COVER_IMAGES[0].url);
    setIsEditing(false);
    setEditingBlogId(null);
    setFormError(null);
  };

  const triggerEdit = (blog: BlogDoc) => {
    setFormTitle(blog.title);
    setFormSubtitle(blog.subtitle);
    setFormContent(blog.content);
    setFormCategory(blog.category);
    setFormImage(blog.image);
    setIsEditing(true);
    setEditingBlogId(blog.id);
  };

  const handleDelete = async (blogId: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post? This action is permanent.")) return;
    const path = `blogs/${blogId}`;
    try {
      const blogDocRef = doc(db, "blogs", blogId);
      await deleteDoc(blogDocRef).catch((err) => {
        handleFirestoreError(err, OperationType.DELETE, path);
      });
    } catch (error: any) {
      console.error("Delete operation failed:", error);
      alert("Permission denied. Only the author can delete this post.");
    }
  };

  // Helper to format dates cleanly
  const formatBlogDate = (timestamp: any) => {
    if (!timestamp) return "Just now";
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      });
    }
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <section id="blog" className="py-24 bg-gray-50 dark:bg-[#071E3C]/40 transition-colors duration-500 border-b dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* UPPER TITLE BAR WITH REALTIME DB CONTROLS */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <span className="text-sm font-bold uppercase tracking-widest text-[#FF9F1C] block mb-2">Himalayan Insights</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0A2A52] dark:text-white tracking-tight leading-tight">
              Our Latest Travel Blogs
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-2">
              Explore cultural highlights, trekking protocols, packing guides, and scenic secrets written by verified travelers and guides.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!isLoadingAuth && (
              user ? (
                <div className="flex items-center bg-white dark:bg-[#0E2744] p-2 pr-4 rounded-xl border border-gray-150 dark:border-white/10 shadow-sm gap-3">
                  <img 
                    src={user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"} 
                    alt={user.displayName || "User"}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="text-left">
                    <p className="text-xs font-extrabold text-[#0A2A52] dark:text-white line-clamp-1">{user.displayName || "Verified Author"}</p>
                    <button 
                      onClick={() => setIsDashboardOpen(true)}
                      className="text-[11px] font-black text-[#00B4D8] hover:text-[#FF9F1C] uppercase tracking-wider block transition-colors cursor-pointer"
                    >
                      Blogger Workspace
                    </button>
                  </div>
                  <button 
                    onClick={handleSignOut}
                    title="Sign Out"
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors ml-2 text-gray-400 hover:text-rose-500 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-[#0A2A52] hover:bg-[#FF9F1C] text-white font-extrabold text-xs sm:text-sm px-5 py-3.5 rounded-xl tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 active:scale-95"
                >
                  <Lock className="w-4 h-4" />
                  <span>Blogger Portal</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* LOADING INDICATOR FOR FIREBASE REAL-TIME SYNC */}
        {isLoadingBlogs ? (
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw className="w-10 h-10 text-[#FF9F1C] animate-spin mb-4" />
            <p className="text-gray-500 text-xs sm:text-sm font-medium">Synchronizing blogs with Cloud Firestore...</p>
          </div>
        ) : blogs.length === 0 ? (
          // Empty State Prompting Seeding or First Post
          <div className="text-center py-20 bg-white dark:bg-[#071E3C] rounded-2xl border border-dashed border-gray-200 dark:border-white/10 max-w-xl mx-auto p-8 shadow-sm">
            <BookOpen className="w-12 h-12 text-[#00B4D8] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#0A2A52] dark:text-white">No Blogs Stored Yet</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 mb-6">
              Cloud Firestore database is active but empty. Log in through the Portal to write the first blog post or seed our beautiful sample blogs.
            </p>
            {user ? (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSeedDatabase}
                className="bg-gradient-to-r from-[#00B4D8] to-[#FF9F1C] text-white text-xs sm:text-sm font-extrabold px-6 py-3.5 rounded-xl uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-2 shadow-md hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSubmitting ? "Seeding..." : "Seed Default Nepal Blogs"}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-[#0A2A52] hover:bg-[#FF9F1C] text-white text-xs sm:text-sm font-extrabold px-6 py-3.5 rounded-xl uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-2 shadow-md"
              >
                <Lock className="w-4 h-4" />
                <span>Log In to Seed or Write</span>
              </button>
            )}
          </div>
        ) : (
          /* BLOG REAL-TIME GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <article
                key={post.id}
                className="group bg-white dark:bg-[#071E3C] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-white/5 flex flex-col justify-between"
              >
                <div>
                  {/* Category Pill and Image */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <span className="absolute top-4 left-4 z-10 bg-[#FF9F1C] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow">
                      {post.category}
                    </span>
                    <img
                      src={post.image || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                  </div>

                  {/* Text Content */}
                  <div className="p-6 text-left">
                    {/* Meta Pillars */}
                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-3">
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-[#00B4D8]" />
                        {formatBlogDate(post.createdAt)}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1 text-[#FF9F1C]" />
                        {Math.ceil(post.content.length / 800)} min read
                      </span>
                    </div>

                    {/* Blog Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-[#0A2A52] dark:text-white leading-snug line-clamp-2 mb-3 group-hover:text-[#FF9F1C] transition-colors">
                      {post.title}
                    </h3>

                    {/* Subtitle / Excerpt */}
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {post.subtitle}
                    </p>
                  </div>
                </div>

                {/* Card Action footer */}
                <div className="p-6 pt-0 flex items-center justify-between border-t border-gray-50 dark:border-white/5 mt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedBlog(post)}
                    className="inline-flex items-center text-xs sm:text-sm font-bold text-[#0A2A52] hover:text-[#FF9F1C] dark:text-gray-300 dark:hover:text-[#FF9F1C] group/link transition-colors cursor-pointer"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4.5 h-4.5 ml-1.5 transition-transform group-hover/link:translate-x-1 text-[#00B4D8]" />
                  </button>

                  <div className="text-[10px] text-gray-400 font-bold italic">
                    By {post.authorName.split(" ")[0]}
                  </div>
                </div>

              </article>
            ))}
          </div>
        )}

        {/* AUTHENTICATION PORTAL LOGIN DIALOG */}
        <AnimatePresence>
          {isAuthModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAuthModalOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />

              {/* Login Window */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative w-full max-w-md bg-white dark:bg-[#0E2744] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-white/10 p-6 text-center z-10"
              >
                <button 
                  onClick={() => setIsAuthModalOpen(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-gray-150 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="w-12 h-12 bg-[#FF9F1C]/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-[#FF9F1C]/20 text-[#FF9F1C]">
                  <Lock className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-extrabold text-[#0A2A52] dark:text-white">Blogger Portal Access</h3>
                <p className="text-gray-500 dark:text-gray-300 text-xs sm:text-sm mt-1.5 mb-6 leading-relaxed">
                  Sign in with Google to join our veteran travel guides. Write high-altitude trekking insights, post cultural articles, or edit your travel blogs.
                </p>

                <button
                  onClick={handleGoogleSignIn}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 font-extrabold text-sm py-3.5 px-4 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm flex items-center justify-center gap-3 transition-colors cursor-pointer dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* DATABASE MANAGEMENT SYSTEM (DBMS) & BLOGGER DASHBOARD WORKSPACE */}
        <AnimatePresence>
          {isDashboardOpen && user && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  if (!isSubmitting) setIsDashboardOpen(false);
                }}
                className="absolute inset-0 bg-[#071526]/80 backdrop-blur-sm"
              />

              <motion.div
                initial={{ y: 50, scale: 0.98, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 50, scale: 0.98, opacity: 0 }}
                className="relative w-full h-full sm:h-[90vh] sm:max-w-6xl bg-white dark:bg-[#0B1E34] sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 border border-gray-100 dark:border-white/10"
              >
                {/* Dashboard Topbar */}
                <div className="bg-[#0A2A52] text-white p-4 flex items-center justify-between border-b dark:border-white/10 shadow-sm flex-shrink-0">
                  <div className="flex items-center space-x-3 text-left">
                    <Grid className="w-5 h-5 text-[#FF9F1C]" />
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base tracking-wide uppercase">Blogger DBMS Dashboard</h3>
                      <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">
                        Logged in as {user.email}
                      </p>
                    </div>
                  </div>

                  <button
                    disabled={isSubmitting}
                    onClick={() => setIsDashboardOpen(false)}
                    className="p-1.5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Split Workspace */}
                <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 p-4 sm:p-6 gap-6 bg-gray-50/50 dark:bg-[#071526]/30">
                  
                  {/* Left Column: Create & Edit Form */}
                  <div className="lg:col-span-5 bg-white dark:bg-[#0E2744] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col text-left">
                    <div className="flex items-center justify-between mb-4 border-b border-gray-50 dark:border-white/5 pb-3">
                      <h4 className="font-extrabold text-sm text-[#0A2A52] dark:text-white flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-[#FF9F1C]" />
                        {isEditing ? "Modify Post Settings" : "Draft New Travel Post"}
                      </h4>
                      {isEditing && (
                        <button
                          onClick={resetForm}
                          className="text-[10px] font-bold text-rose-500 bg-rose-500/10 px-2 py-1 rounded hover:bg-rose-500/20 transition-colors cursor-pointer"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>

                    {formError && (
                      <div className="bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-300 p-3 rounded-xl border border-rose-100 dark:border-rose-900/30 text-xs flex items-start gap-2 mb-4">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span className="font-medium leading-relaxed">{formError}</span>
                      </div>
                    )}

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      {/* Blog Title */}
                      <div>
                        <label className="text-[10px] sm:text-xs font-extrabold text-gray-400 uppercase tracking-wider block mb-1.5">
                          Blog Title <span className="text-rose-500">*</span> (3 - 150 chars)
                        </label>
                        <input
                          type="text"
                          required
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                          placeholder="e.g., Hidden Tea Gardens of Ilam"
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-150 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#0A2A52] dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#00B4D8]"
                        />
                      </div>

                      {/* Subtitle / Excerpt */}
                      <div>
                        <label className="text-[10px] sm:text-xs font-extrabold text-gray-400 uppercase tracking-wider block mb-1.5">
                          Subtitle / Brief Excerpt <span className="text-rose-500">*</span> (3 - 250 chars)
                        </label>
                        <input
                          type="text"
                          required
                          value={formSubtitle}
                          onChange={(e) => setFormSubtitle(e.target.value)}
                          placeholder="e.g., Uncover the scenic mist valleys and pristine organic plantations of Eastern Nepal."
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-150 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#0A2A52] dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#00B4D8]"
                        />
                      </div>

                      {/* Category and Image Selector */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] sm:text-xs font-extrabold text-gray-400 uppercase tracking-wider block mb-1.5">
                            Category <span className="text-rose-500">*</span>
                          </label>
                          <select
                            value={formCategory}
                            onChange={(e) => setFormCategory(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-150 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#0A2A52] dark:text-white focus:outline-none focus:border-[#00B4D8] cursor-pointer"
                          >
                            {CATEGORIES.map((cat) => (
                              <option key={cat} value={cat} className="bg-white dark:bg-[#0E2744] text-[#0A2A52] dark:text-white">
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] sm:text-xs font-extrabold text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                            <ImageIcon className="w-3.5 h-3.5 text-[#FF9F1C]" />
                            <span>Cover Image</span>
                          </label>
                          <select
                            value={formImage}
                            onChange={(e) => setFormImage(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-150 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#0A2A52] dark:text-white focus:outline-none focus:border-[#00B4D8] cursor-pointer"
                          >
                            {DEFAULT_COVER_IMAGES.map((img) => (
                              <option key={img.url} value={img.url} className="bg-white dark:bg-[#0E2744] text-[#0A2A52] dark:text-white">
                                {img.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Cover Image Preview */}
                      <div className="h-24 w-full rounded-xl overflow-hidden relative shadow-inner bg-gray-100 dark:bg-[#071526]/50">
                        <img 
                          src={formImage} 
                          alt="Cover preview" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10 flex items-end p-2">
                          <span className="text-[9px] font-extrabold text-white uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">Cover Banner Preview</span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div>
                        <label className="text-[10px] sm:text-xs font-extrabold text-gray-400 uppercase tracking-wider block mb-1.5">
                          Rich Post Body Content <span className="text-rose-500">*</span> (10 - 10,000 chars)
                        </label>
                        <textarea
                          required
                          rows={6}
                          value={formContent}
                          onChange={(e) => setFormContent(e.target.value)}
                          placeholder="Write travel details, trekking route schedules, packing guides..."
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-150 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#0A2A52] dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#00B4D8] font-sans leading-relaxed resize-y min-h-[140px]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#00B4D8] hover:bg-[#FF9F1C] text-white font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-xl tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <Save className="w-4 h-4" />
                        <span>{isSubmitting ? "Saving Content..." : isEditing ? "Save Modifications" : "Publish Post"}</span>
                      </button>
                    </form>
                  </div>

                  {/* Right Column: Blog posts table / list (DBMS View) */}
                  <div className="lg:col-span-7 bg-white dark:bg-[#0E2744] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col text-left">
                    <div className="flex items-center justify-between mb-4 border-b border-gray-50 dark:border-white/5 pb-3 flex-shrink-0">
                      <h4 className="font-extrabold text-sm text-[#0A2A52] dark:text-white">
                        Database Entries ({blogs.length})
                      </h4>
                      <button
                        onClick={handleSeedDatabase}
                        disabled={isSubmitting}
                        className="text-[10px] font-black text-[#FF9F1C] hover:text-[#00B4D8] border border-[#FF9F1C]/20 hover:border-[#00B4D8]/20 bg-[#FF9F1C]/5 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer uppercase tracking-widest flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Force templates seed</span>
                      </button>
                    </div>

                    {blogs.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
                        <BookOpen className="w-10 h-10 text-gray-300 mb-2" />
                        <p className="text-gray-400 text-xs">No entries found in Cloud Firestore.</p>
                      </div>
                    ) : (
                      <div className="flex-1 overflow-y-auto space-y-3.5 max-h-[500px] pr-1.5">
                        {blogs.map((b) => {
                          const isOwner = b.authorId === user.uid;
                          return (
                            <div 
                              key={b.id}
                              className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                                editingBlogId === b.id 
                                  ? "bg-[#00B4D8]/5 border-[#00B4D8] shadow-xs" 
                                  : "bg-gray-50/50 dark:bg-white/2 border-gray-100 dark:border-white/5"
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <img 
                                  src={b.image} 
                                  alt="" 
                                  className="w-12 h-12 rounded-lg object-cover bg-gray-250 flex-shrink-0"
                                />
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                    <span className="text-[9px] font-black uppercase text-[#FF9F1C] bg-[#FF9F1C]/10 px-2 py-0.5 rounded">
                                      {b.category}
                                    </span>
                                    <span className="text-[9px] font-mono text-gray-400 font-bold">
                                      ID: {b.id.substring(0, 10)}...
                                    </span>
                                  </div>
                                  <h5 className="font-extrabold text-xs sm:text-sm text-[#0A2A52] dark:text-white truncate">
                                    {b.title}
                                  </h5>
                                  <p className="text-[10px] text-gray-400 font-medium truncate">
                                    Author: {b.authorName} ({b.authorEmail})
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 flex-shrink-0">
                                {isOwner ? (
                                  <>
                                    <button
                                      title="Edit Post"
                                      onClick={() => triggerEdit(b)}
                                      className="p-2 text-gray-400 hover:text-[#00B4D8] hover:bg-[#00B4D8]/10 rounded-lg transition-all cursor-pointer"
                                    >
                                      <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button
                                      title="Delete Post"
                                      onClick={() => handleDelete(b.id)}
                                      className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer"
                                    >
                                      <Trash className="w-4 h-4" />
                                    </button>
                                  </>
                                ) : (
                                  <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold bg-gray-200/50 dark:bg-white/5 px-2 py-1 rounded">Read-Only</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* FULL ARTICLE DETAIL SLIDE-OVER / DIALOG VIEW */}
        <AnimatePresence>
          {selectedBlog && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedBlog(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />

              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                className="relative w-full max-w-3xl h-[85vh] bg-white dark:bg-[#0E2744] rounded-2xl overflow-hidden shadow-2xl flex flex-col z-10 border border-gray-150 dark:border-white/10"
              >
                {/* Close trigger button */}
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="absolute top-4 right-4 z-25 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors cursor-pointer shadow"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Cover Hero Banner */}
                <div className="relative h-64 sm:h-80 flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                  <img 
                    src={selectedBlog.image} 
                    alt={selectedBlog.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-left">
                    <span className="bg-[#FF9F1C] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-md mb-3 inline-block">
                      {selectedBlog.category}
                    </span>
                    <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight drop-shadow-sm">
                      {selectedBlog.title}
                    </h3>
                    <p className="text-gray-200 text-xs sm:text-sm font-medium mt-2 leading-relaxed drop-shadow-xs line-clamp-2">
                      {selectedBlog.subtitle}
                    </p>
                  </div>
                </div>

                {/* Article Read Area */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-left bg-white dark:bg-[#0E2744]">
                  {/* Meta Details & Author */}
                  <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/10 pb-4 flex-wrap gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-[#0A2A52] border border-[#FF9F1C]/20 flex items-center justify-center font-black text-[#FF9F1C] text-sm">
                        {selectedBlog.authorName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-extrabold text-[#0A2A52] dark:text-white leading-none">
                          {selectedBlog.authorName}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          {selectedBlog.authorEmail}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-xs font-mono text-gray-400">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-[#00B4D8]" />
                        {formatBlogDate(selectedBlog.createdAt)}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-[#FF9F1C]" />
                        {Math.ceil(selectedBlog.content.length / 800)} min read
                      </span>
                    </div>
                  </div>

                  {/* Body Text (renders formatted paragraphs / subheadings easily) */}
                  <div className="text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-sans">
                    {selectedBlog.content.split("\n").map((para, i) => {
                      const text = para.trim();
                      if (text.startsWith("###")) {
                        return (
                          <h4 key={i} className="text-base sm:text-lg font-extrabold text-[#0A2A52] dark:text-white pt-4 pb-1">
                            {text.substring(3).trim()}
                          </h4>
                        );
                      }
                      if (text.startsWith("##")) {
                        return (
                          <h3 key={i} className="text-lg sm:text-xl font-extrabold text-[#0A2A52] dark:text-white pt-5 pb-1">
                            {text.substring(2).trim()}
                          </h3>
                        );
                      }
                      if (text.startsWith("- ") || text.startsWith("* ")) {
                        return (
                          <li key={i} className="ml-5 list-disc pl-1 text-sm sm:text-base my-1">
                            {text.substring(2).trim()}
                          </li>
                        );
                      }
                      return (
                        <p key={i} className="leading-relaxed">
                          {text}
                        </p>
                      );
                    })}
                  </div>
                </div>

                {/* Footer of modal */}
                <div className="p-4 bg-gray-50 dark:bg-[#071526]/50 border-t border-gray-100 dark:border-white/10 flex items-center justify-end flex-shrink-0">
                  <button
                    onClick={() => setSelectedBlog(null)}
                    className="bg-[#0A2A52] hover:bg-[#FF9F1C] text-white text-xs font-bold px-5 py-2.5 rounded-xl uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Close Reading
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
