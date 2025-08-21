import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import UserPage from "./pages/UserPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Header from "./components/Header/Header";
import { SearchProvider } from "./context/SearchContext";
import React, { useEffect, useLayoutEffect } from "react";

// useLayoutEffect'in SSR uyumlu versiyonu
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function App() {
  const location = useLocation();

  useIsomorphicLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [location.pathname]);

  return (
    <SearchProvider>
      <div
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Header />
        <main
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route path="/users/:id" element={<UserPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
      </div>
    </SearchProvider>
  );
}

export default App;
