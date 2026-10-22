import { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline, Typography } from "@mui/material";
import { getTheme } from "./theme/theme";
import { ColorModeContext } from "./context/ColorModeContext";
import Splash from "./pages/Splash";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Explore from "./pages/Explore";
import Saved from "./pages/Saved";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";
import CategoryNews from "./pages/CategoryNews";
import Article from "./pages/Article";
import ManageFeeds from "./pages/ManageFeeds";

function App() {
  const [mode, setMode] = useState(
    localStorage.getItem("themeMode") || "light",
  );

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const [showSplash, setShowSplash] = useState(
    !sessionStorage.getItem("splashShown"),
  );

  useEffect(() => {
    if (!showSplash) return;
    const timer = setTimeout(() => {
      sessionStorage.setItem("splashShown", "yes");
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [showSplash]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ColorModeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={getTheme(mode)}>
        <CssBaseline />
        {showSplash ? (
          <Splash />
        ) : (
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/category/:name" element={<CategoryNews />} />
              <Route path="/article/:id" element={<Article />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/feeds" element={<ManageFeeds />} />

              <Route
                path="/settings"
                element={<Settings mode={mode} setMode={setMode} />}
              />
            </Routes>
          </Layout>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
