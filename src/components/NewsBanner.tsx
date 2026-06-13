"use client";
import React, { useState, useEffect } from "react";
import { newsArticles, NewsArticle } from "@/data/news";
import Image from "next/image";
import { useTheme } from "next-themes";

const FEEDS = [
  { name: "TechCrunch", url: "https://techcrunch.com/feed/" },
  { name: "Techweez", url: "https://techweez.com/feed/" },
  { name: "Techpoint Africa", url: "https://techpoint.africa/feed/" },
  { name: "Gadgets Africa", url: "https://gadgetsafrica.com/feed/" }
];

async function fetchRealTimeNews(): Promise<NewsArticle[]> {
  const allArticles: NewsArticle[] = [];
  
  await Promise.all(
    FEEDS.map(async (feed) => {
      try {
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}&timestamp=${Date.now()}`;
        const res = await fetch(proxyUrl);
        if (!res.ok) return;
        const data = await res.json();
        const xmlText = data.contents;
        if (!xmlText) return;
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const items = xmlDoc.querySelectorAll("item");
        
        items.forEach((item, index) => {
          if (index >= 5) return; // limit to 5 per feed
          
          const title = item.querySelector("title")?.textContent || "";
          const link = item.querySelector("link")?.textContent || "";
          const pubDateStr = item.querySelector("pubDate")?.textContent || "";
          const descriptionRaw = item.querySelector("description")?.textContent || "";
          
          // Clean HTML from description
          const content = descriptionRaw.replace(/<[^>]*>/g, "").trim();
          
          if (title && link) {
            allArticles.push({
              id: `${feed.name.toLowerCase().replace(/\s+/g, "-")}-${index}-${Date.parse(pubDateStr) || index}`,
              title,
              source: feed.name,
              date: pubDateStr ? new Date(pubDateStr).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              }) : "Recent",
              content: content.slice(0, 300) + (content.length > 300 ? "..." : ""),
              link
            });
          }
        });
      } catch (err) {
        console.error(`Failed to fetch feed ${feed.name}:`, err);
      }
    })
  );
  
  // Sort articles by date descending
  return allArticles.sort((a, b) => {
    const timeA = new Date(a.date).getTime() || 0;
    const timeB = new Date(b.date).getTime() || 0;
    return timeB - timeA;
  });
}

interface NewsBannerProps {
  onVisibilityChange?: (visible: boolean) => void;
}

export default function NewsBanner({ onVisibilityChange }: NewsBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [badgeText, setBadgeText] = useState("News");
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const { theme } = useTheme();
  const [articles, setArticles] = useState<NewsArticle[]>(newsArticles);

  // Load real-time news from RSS feeds
  useEffect(() => {
    let active = true;
    async function loadNews() {
      const liveArticles = await fetchRealTimeNews();
      if (liveArticles.length > 0 && active) {
        setArticles(liveArticles);
        setCurrentArticleIndex(0);
      }
    }
    loadNews();
    const interval = setInterval(loadNews, 60000); // refresh every minute
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const closeTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Load visibility and badge state from sessionStorage
  useEffect(() => {
    // 1. Get badge text preference
    const savedBadge = sessionStorage.getItem("news-banner-badge-text");
    if (savedBadge) {
      setBadgeText(savedBadge);
    }

    // 2. Check closed-at timestamp
    const closedAtStr = sessionStorage.getItem("news-banner-closed-at");
    if (closedAtStr) {
      const closedAt = parseInt(closedAtStr, 10);
      const elapsed = Date.now() - closedAt;
      if (elapsed < 50000) {
        setIsVisible(false);
        if (onVisibilityChange) onVisibilityChange(false);
        
        const remaining = 50000 - elapsed;
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
        closeTimerRef.current = setTimeout(() => {
          setIsVisible(true);
          setBadgeText("Discover");
          sessionStorage.setItem("news-banner-badge-text", "Discover");
          sessionStorage.removeItem("news-banner-closed-at");
          if (onVisibilityChange) onVisibilityChange(true);
        }, remaining);
      } else {
        setIsVisible(true);
        setBadgeText("Discover");
        sessionStorage.setItem("news-banner-badge-text", "Discover");
        sessionStorage.removeItem("news-banner-closed-at");
        if (onVisibilityChange) onVisibilityChange(true);
      }
    } else {
      // Fallback for old check key
      const closed = sessionStorage.getItem("news-banner-closed");
      if (closed === "true") {
        setIsVisible(false);
        if (onVisibilityChange) onVisibilityChange(false);
      }
    }

    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, [onVisibilityChange]);

  // Rotate through articles
  useEffect(() => {
    if (!isVisible || isBlogOpen || articles.length === 0) return;
    const interval = setInterval(() => {
      setCurrentArticleIndex((prev) => (prev + 1) % articles.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isVisible, isBlogOpen, articles.length]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    sessionStorage.removeItem("news-banner-closed"); // Clear old fallback key
    
    const now = Date.now();
    sessionStorage.setItem("news-banner-closed-at", now.toString());
    if (onVisibilityChange) onVisibilityChange(false);

    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setIsVisible(true);
      setBadgeText("Discover");
      sessionStorage.setItem("news-banner-badge-text", "Discover");
      sessionStorage.removeItem("news-banner-closed-at");
      if (onVisibilityChange) onVisibilityChange(true);
    }, 50000);
  };

  if (!isVisible) return null;

  const currentArticle = articles[currentArticleIndex] || articles[0] || newsArticles[0];

  return (
    <>
      {/* Top Banner */}
      <div
        className={`w-full fixed top-0 left-0 z-50 flex items-center justify-between px-4 py-2 text-xs md:text-sm border-b backdrop-blur-md transition-all duration-500 ease-in-out ${
          theme === "dark"
            ? "bg-black/80 border-white/10 text-white/95"
            : "bg-white/80 border-black/10 text-black/95"
        }`}
      >
        <div className="flex items-center gap-3 overflow-hidden flex-1">
          {/* Glowing News/Discover Tag */}
          {badgeText === "News" ? (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold tracking-wider uppercase bg-red-500/10 text-red-500 border border-red-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              News
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Discover
            </span>
          )}

          {/* Scrolling Ticker Headline */}
          <div className="relative flex-1 overflow-hidden h-4 md:h-5">
            <div
              key={currentArticleIndex}
              className="absolute w-full truncate animate-slide-in-up font-medium"
            >
              <span className="opacity-65 mr-1">[{currentArticle.source}]</span>
              {currentArticle.title}
            </div>
          </div>
        </div>

        {/* Banner Actions */}
        <div className="flex items-center gap-3 ml-4">
          <button
            onClick={() => setIsBlogOpen(true)}
            className={`px-2.5 py-1 rounded-md text-[10px] md:text-xs font-bold transition-all duration-300 border uppercase tracking-wider ${
              theme === "dark"
                ? "bg-white text-black border-white hover:bg-white/90"
                : "bg-black text-white border-black hover:bg-black/90"
            }`}
          >
            Read Blog
          </button>

          {/* Close Banner Button */}
          <button
            onClick={handleClose}
            className="p-1 rounded-md hover:bg-current/10 transition-colors"
            aria-label="Close News Banner"
          >
            <svg
              className="h-3.5 w-3.5 md:h-4 md:w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Tech News Blog Modal */}
      {isBlogOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-black/60 animate-fade-in">
          <div
            className={`w-full max-w-4xl h-[85vh] rounded-2xl overflow-hidden border flex flex-col relative shadow-2xl ${
              theme === "dark"
                ? "bg-zinc-950 border-white/20 text-white"
                : "bg-white border-black/25 text-black"
            }`}
          >
            {/* Modal Header */}
            <div
              className={`p-4 border-b flex items-center justify-between ${
                theme === "dark" ? "border-white/10" : "border-black/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/30 uppercase tracking-widest animate-pulse">
                  Live
                </span>
                <h2 className="text-lg md:text-xl font-bold tracking-wider">
                  Silicon Savannah News
                </h2>
              </div>
              <button
                onClick={() => setIsBlogOpen(false)}
                className={`p-1.5 rounded-full border transition-all duration-300 ${
                  theme === "dark"
                    ? "border-white/10 hover:bg-white/10"
                    : "border-black/10 hover:bg-black/10"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin p-4 md:p-6 space-y-6">
              {/* Featured Banner Image */}
              <div className="relative w-full h-40 md:h-60 rounded-xl overflow-hidden border border-current/10">
                <Image
                  src="/images/projects/kenya-tech-news.png"
                  alt="Silicon Savannah Tech News"
                  fill
                  className="object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${
                    theme === "dark"
                      ? "from-zinc-950 via-zinc-950/45 to-transparent"
                      : "from-white via-white/45 to-transparent"
                  }`}
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-md inline-block mb-1.5">
                    Featured Coverage
                  </p>
                  <h3 className="text-base md:text-2xl font-bold tracking-wide leading-tight text-white drop-shadow-md">
                    Tech in Kenya: The Emerging E-Mobility and Native AI Hub
                  </h3>
                </div>
              </div>

              {/* News Feed Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {articles.map((article) => {
                  const isExpanded = selectedArticleId === article.id;
                  return (
                    <div
                      key={article.id}
                      onClick={() => setSelectedArticleId(isExpanded ? null : article.id)}
                      className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                        theme === "dark"
                          ? "bg-zinc-900/40 border-white/[0.08] hover:border-white/20"
                          : "bg-zinc-50 border-black/[0.08] hover:border-black/20"
                      } ${isExpanded ? "md:col-span-2 shadow-inner" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-bold border uppercase ${
                              theme === "dark"
                                ? "bg-white/10 text-white/70 border-white/15"
                                : "bg-black/5 text-black/70 border-black/15"
                            }`}
                          >
                            {article.source}
                          </span>
                          <span className="text-[10px] opacity-60 font-medium">
                            {article.date}
                          </span>
                        </div>
                        <span className="text-xs transition-transform duration-300 opacity-60">
                          {isExpanded ? "▲" : "▼"}
                        </span>
                      </div>

                      <h4 className="text-sm md:text-base font-bold tracking-wide mb-2">
                        {article.title}
                      </h4>

                      <p
                        className={`text-xs md:text-sm leading-relaxed opacity-80 ${
                          isExpanded ? "" : "line-clamp-2"
                        }`}
                      >
                        {article.content}
                      </p>

                      {isExpanded && (
                        <div className="mt-4 pt-3 border-t border-current/10 flex items-center justify-between">
                          <span className="text-[10px] md:text-xs opacity-50 italic">
                            Source: {article.source} Kenya
                          </span>
                          <a
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] md:text-xs font-bold underline cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Visit Website →
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div
              className={`p-3 border-t text-center text-[10px] md:text-xs opacity-50 ${
                theme === "dark" ? "border-white/10" : "border-black/10"
              }`}
            >
              Sourced from known technology outlets in Kenya & Worldwide. Updated real-time.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
