import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy initialize GoogleGenAI to prevent crashing on startup if key is missing
  let aiClient: GoogleGenAI | null = null;
  const getAIClient = (): GoogleGenAI => {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is required but missing. Please define it in your Settings > Secrets.");
      }
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return aiClient;
  };

  // API Route for AI Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      // Custom system instructions detailing Ghumna Jaam Travels and travel in Nepal
      const systemInstruction = `You are a warm, professional, and expert AI Travel Assistant/Concierge for "Ghumna Jaam Travels Pvt. Ltd." (based in Thamel, Kathmandu, Nepal).
Your job is to answer inquiries and help potential clients design or select custom high-end Himalayan tour packages, wildlife safaris, and spiritual retreats across mystical Nepal.

Important facts about Ghumna Jaam Travels:
- Name: Ghumna Jaam Travels ("Ghumna Jaam" means "Let's go travel!" in Nepali - representing wanderlust and warm local hospitality).
- Core Tagline: "Not Just a Trip. A Memory in the Making."
- Headquarters: Ghumna Jaam Plaza, Thamel, Kathmandu, Nepal.
- Direct Hotline: +977-1-4400000 / +977-9801234567
- Email: explore@ghumnajaam.com
- Main features/services: High-altitude alpine treks, pristine jungle safaris (e.g. Chitwan), ancient medieval culture tours, spiritual/meditational retreats (e.g. Lumbini).
- Packages include:
  1. Ama Dablam Base Camp Trek (Everest Region)
  2. Sunset over Phewa Lake & Pokhara explorations
  3. One-horned Rhino Spotting (Chitwan Safari)
  4. Ancient Lo Manthang Expedition (Upper Mustang Desert)
  5. World Peace Pagoda / Birthplace of Buddha (Lumbini)
  6. Wild Pines of Rara Lake (Pristine lake trek)
  7. Tea Gardens of Ilam
  8. Bandipur Heritage Walks

Tone guidelines:
- Be extremely polite, hospitable, and speak with standard professional composure. Use "Namaste!" to greet the user warmly.
- Keep your answers beautifully structured, readable, and format them using Markdown when appropriate (e.g., bullet points for lists, bolding key names).
- If the user asks about booking, guide them to use our "Booking Form" on the page or contact us directly on WhatsApp/Hotline.
- Answer questions on trek difficulties, weather in Nepal, high-altitude preparation, pricing, or customized itineraries.`;

      const contents = [];
      if (Array.isArray(history)) {
        for (const h of history) {
          if (h.role === "user" || h.role === "model") {
            contents.push({
              role: h.role,
              parts: [{ text: h.content || h.text || "" }]
            });
          }
        }
      }
      // Add the current message
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const client = getAIClient();
      const modelsToTry = [
        "gemini-3.5-flash",
        "gemini-3.1-pro-preview",
        "gemini-flash-latest"
      ];
      let replyText = "";
      let lastError = null;

      for (const modelName of modelsToTry) {
        try {
          console.log(`Attempting generation with model: ${modelName}`);
          const response = await client.models.generateContent({
            model: modelName,
            contents: contents,
            config: {
              systemInstruction: systemInstruction,
              temperature: 0.7,
            }
          });
          if (response && response.text) {
            replyText = response.text;
            break;
          }
        } catch (err: any) {
          console.warn(`Model ${modelName} failed or unavailable:`, err?.message || err);
          lastError = err;
        }
      }

      if (!replyText) {
        throw lastError || new Error("All models are currently experiencing high demand. Please try again in a moment.");
      }

      res.json({ text: replyText });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error?.message || "Failed to generate AI response. Make sure GEMINI_API_KEY is configured in your Secrets." });
    }
  });

  // SEO Routes: sitemap.xml and robots.txt
  app.get("/sitemap.xml", (req, res) => {
    res.header("Content-Type", "application/xml");
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ghumnajaam.com/</loc>
    <lastmod>2026-07-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ghumnajaam.com/#packages</loc>
    <lastmod>2026-07-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ghumnajaam.com/#why-nepal</loc>
    <lastmod>2026-07-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://ghumnajaam.com/#package-finder</loc>
    <lastmod>2026-07-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://ghumnajaam.com/#destinations</loc>
    <lastmod>2026-07-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ghumnajaam.com/#blog</loc>
    <lastmod>2026-07-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://ghumnajaam.com/#booking-section</loc>
    <lastmod>2026-07-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ghumnajaam.com/#faqs</loc>
    <lastmod>2026-07-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://ghumnajaam.com/#contact</loc>
    <lastmod>2026-07-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;
    res.send(sitemap);
  });

  app.get("/robots.txt", (req, res) => {
    res.header("Content-Type", "text/plain");
    const robots = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://ghumnajaam.com/sitemap.xml`;
    res.send(robots);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
