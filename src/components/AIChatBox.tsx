import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles, RefreshCw, ChevronDown, Compass, CornerDownLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
}

// Simple local Markdown formatter to style Gemini responses safely
function formatMessageContent(content: string) {
  const lines = content.split("\n");
  return lines.map((line, idx) => {
    let cleanLine = line.trim();
    
    // Bullet points
    if (cleanLine.startsWith("- ") || cleanLine.startsWith("* ")) {
      const listContent = cleanLine.substring(2);
      return (
        <li key={idx} className="ml-4 list-disc text-xs sm:text-sm my-1 leading-relaxed">
          {renderBoldText(listContent)}
        </li>
      );
    }
    
    // Numbered list
    const numberedMatch = cleanLine.match(/^(\d+)\.\s+(.*)/);
    if (numberedMatch) {
      const listContent = numberedMatch[2];
      return (
        <li key={idx} className="ml-4 list-decimal text-xs sm:text-sm my-1 leading-relaxed">
          {renderBoldText(listContent)}
        </li>
      );
    }

    // Paragraph
    if (cleanLine === "") {
      return <div key={idx} className="h-2" />;
    }

    return (
      <p key={idx} className="text-xs sm:text-sm my-1 leading-relaxed">
        {renderBoldText(cleanLine)}
      </p>
    );
  });
}

function renderBoldText(text: string) {
  const parts = text.split(/\*\*([\s\S]*?)\*\*/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return <strong key={i} className="font-bold text-[#0A2A52] dark:text-white">{part}</strong>;
    }
    return part;
  });
}

export default function AIChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      content: "Namaste! 🙏 I am your Ghumna Jaam AI guide. Ask me anything about our premium Himalayan treks, Chitwan safaris, custom itineraries, or flight guidelines! How can I help plan your Nepal journey today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessageAlert, setHasNewMessageAlert] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Map history to server-side endpoint format
      const historyPayload = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload
        })
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with AI server");
      }

      const data = await response.json();
      
      const assistantMsg: Message = {
        id: `ai-${Date.now()}`,
        role: "model",
        content: data.text,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        role: "model",
        content: "Oops! I encountered an error connecting to our tour base. Please verify your internet connection or try again shortly.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "model",
        content: "Namaste! 🙏 Welcome back to our booking concierge. How can I assist you with custom trekking itineraries, hotel options, or pricing parameters today?",
        timestamp: new Date()
      }
    ]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  const suggestions = [
    "Tell me about the Everest Base Camp Trek",
    "What is the best time to visit Pokhara?",
    "Do you offer custom itineraries?",
    "How do I book a safari in Chitwan?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* CHAT WINDOW INTERFACE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="w-[90vw] sm:w-[420px] h-[550px] bg-white dark:bg-[#0B1E34] border border-gray-100 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#0A2A52] to-[#00B4D8] p-4 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center space-x-2.5">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                    <Compass className="w-5.5 h-5.5 text-[#FF9F1C] animate-spin-slow" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0A2A52] rounded-full" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm tracking-wide">Ghumna Jaam AI</h3>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">Concierge Active</span>
                    <Sparkles className="w-3 h-3 text-[#FF9F1C]" />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={clearChat}
                  title="Clear Conversation"
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Conversation Flow Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-[#071526]/40 scrollbar-thin">
              {messages.map((msg) => {
                const isAI = msg.role === "model";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isAI ? "" : "flex-row-reverse"}`}
                  >
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shadow-sm flex-shrink-0 ${
                      isAI 
                        ? "bg-[#0A2A52] text-[#FF9F1C] border border-[#FF9F1C]/20" 
                        : "bg-[#FF9F1C] text-white"
                    }`}>
                      {isAI ? "G" : "U"}
                    </div>

                    {/* Chat Bubble content */}
                    <div className="max-w-[78%] flex flex-col">
                      <div className={`p-3.5 rounded-2xl shadow-sm text-xs sm:text-sm ${
                        isAI 
                          ? "bg-white dark:bg-[#0E2744] text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-white/5 rounded-tl-none" 
                          : "bg-[#0A2A52] dark:bg-[#FF9F1C] text-white rounded-tr-none"
                      }`}>
                        {isAI ? (
                          <div className="space-y-1.5">
                            {formatMessageContent(msg.content)}
                          </div>
                        ) : (
                          <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        )}
                      </div>
                      <span className={`text-[9px] text-gray-400 mt-1 px-1 font-mono ${
                        isAI ? "text-left" : "text-right"
                      }`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Loader indicator while compiling AI feedback */}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0A2A52] text-[#FF9F1C] border border-[#FF9F1C]/20 flex items-center justify-center text-xs font-black flex-shrink-0">
                    G
                  </div>
                  <div className="bg-white dark:bg-[#0E2744] p-3.5 rounded-2xl rounded-tl-none border border-gray-100 dark:border-white/5 shadow-sm flex items-center space-x-2">
                    <span className="text-xs text-gray-400 dark:text-gray-300 italic">Concierge is writing...</span>
                    <span className="flex space-x-1">
                      <span className="w-1.5 h-1.5 bg-[#FF9F1C] rounded-full animate-bounce delay-75" />
                      <span className="w-1.5 h-1.5 bg-[#FF9F1C] rounded-full animate-bounce delay-150" />
                      <span className="w-1.5 h-1.5 bg-[#FF9F1C] rounded-full animate-bounce delay-300" />
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Bar */}
            {messages.length === 1 && !isLoading && (
              <div className="p-3 bg-white dark:bg-[#0B1E34] border-t dark:border-white/5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 px-1">Common Inquiries</span>
                <div className="flex flex-wrap gap-1.5 max-h-[110px] overflow-y-auto">
                  {suggestions.map((s, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(s)}
                      className="bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 text-[11px] font-medium py-1.5 px-2.5 rounded-lg border border-gray-100 dark:border-white/5 text-left transition-colors cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input action toolbar */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-[#0B1E34] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about tours, guides, permits..."
                disabled={isLoading}
                className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-150 dark:border-white/10 focus:border-[#00B4D8] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#0A2A52] dark:text-white placeholder-gray-400 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-[#0A2A52] hover:bg-[#FF9F1C] disabled:bg-gray-200 dark:disabled:bg-white/5 text-white disabled:text-gray-400 p-2.5 rounded-xl transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 flex items-center justify-center flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING ACTION LAUNCHER BUTTON */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setHasNewMessageAlert(false);
        }}
        className="bg-[#0A2A52] hover:bg-[#FF9F1C] text-white p-4 rounded-full shadow-2xl hover:shadow-[#0A2A52]/20 transition-all duration-300 transform hover:-translate-y-1 hover:rotate-6 flex items-center justify-center cursor-pointer group relative"
        title="Chat with our AI Guide"
      >
        {isOpen ? (
          <ChevronDown className="w-6 h-6 animate-pulse" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6 fill-white text-[#0A2A52] group-hover:text-white transition-colors" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-500 ease-out whitespace-nowrap text-xs font-bold pl-0 group-hover:pl-2">
              Chat with AI
            </span>
          </>
        )}

        {/* Pulse Indicator on closed bubble */}
        {!isOpen && hasNewMessageAlert && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9F1C] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#FF9F1C] border border-white dark:border-[#071E3C] text-[8px] font-black items-center justify-center text-white">1</span>
          </span>
        )}
      </button>

    </div>
  );
}
