import { createContext, useContext, useState, useEffect } from "react";

const SavedContext = createContext();

export function SavedProvider({ children }) {
  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("savedArticles")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("savedArticles", JSON.stringify(saved));
  }, [saved]);

  const isSaved = (id) => saved.some((article) => article.id === id);

  const toggleSave = (article) => {
    setSaved((previous) =>
      previous.some((item) => item.id === article.id)
        ? previous.filter((item) => item.id !== article.id)
        : [...previous, article],
    );
  };

  return (
    <SavedContext.Provider value={{ saved, isSaved, toggleSave }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  return useContext(SavedContext);
}
