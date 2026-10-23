import { createContext, useContext, useState, useEffect } from "react";
import { useFeeds } from "./FeedContext";
import { sampleNews } from "../data/sampleNews";

const NewsContext = createContext();

const SERVER = import.meta.env.VITE_API_URL;

function makeId(text) {
  let hash = 0;
  for (const char of text) {
    hash = (hash * 31 + char.charCodeAt(0)) | 0;
  }
  return String(Math.abs(hash));
}

export function NewsProvider({ children }) {
  const { feeds } = useFeeds();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastSeen, setLastSeen] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("lastSeen")) || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("lastSeen", JSON.stringify(lastSeen));
  }, [lastSeen]);

  useEffect(() => {
    if (feeds.length === 0) {
      setArticles([]);
      return;
    }

    let cancelled = false;

    async function loadAll() {
      setLoading(true);

      const results = await Promise.all(
        feeds.map(async (feed) => {
          try {
            const response = await fetch(
              `${SERVER}/api/feed?url=${encodeURIComponent(feed.url)}`,
            );
            const data = await response.json();

            if (!response.ok) return [];

            return data.items.map((item) => {
              const id = makeId(item.link || item.title);
              return {
                id,
                title: item.title,
                source: data.source,
                category: feed.category,
                publishedAt: item.publishedAt || new Date().toISOString(),
                image: item.image || `https://picsum.photos/seed/${id}/600/400`,
                link: item.link,
                description: item.description,
              };
            });
          } catch {
            return [];
          }
        }),
      );

      if (cancelled) return;

      const all = results.flat();
      const unique = Array.from(new Map(all.map((a) => [a.id, a])).values());
      unique.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

      setArticles(unique);
      setLoading(false);
    }

    loadAll();

    return () => {
      cancelled = true;
    };
  }, [feeds]);

  const news = feeds.length === 0 ? sampleNews : articles;

  const newCount = (category) =>
    news.filter(
      (article) =>
        article.category === category &&
        new Date(article.publishedAt).getTime() > (lastSeen[category] || 0),
    ).length;

  const markSeen = (category) => {
    setLastSeen((previous) => ({ ...previous, [category]: Date.now() }));
  };

  return (
    <NewsContext.Provider value={{ news, loading, newCount, markSeen }}>
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  return useContext(NewsContext);
}
