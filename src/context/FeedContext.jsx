import { createContext, useContext, useState, useEffect } from "react";

const FeedsContext = createContext();

export function FeedsProvider({ children }) {
  const [feeds, setFeeds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("rssFeeds")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("rssFeeds", JSON.stringify(feeds));
  }, [feeds]);

  const addFeed = (url, category) => {
    setFeeds((previous) => [...previous, { id: Date.now(), url, category }]);
  };

  const removeFeed = (id) => {
    setFeeds((previous) => previous.filter((feed) => feed.id !== id));
  };

  return (
    <FeedsContext.Provider value={{ feeds, addFeed, removeFeed }}>
      {children}
    </FeedsContext.Provider>
  );
}

export function useFeeds() {
  return useContext(FeedsContext);
}
