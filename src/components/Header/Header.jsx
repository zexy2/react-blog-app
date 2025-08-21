import React, { useState, useEffect, useContext } from "react";
import styles from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );
  const location = useLocation();
  const { searchQuery, updateSearchQuery } = useContext(SearchContext);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/" onClick={closeMenu}>
            Postify Blog
          </Link>
        </div>
        <button
          className={`${styles.menuButton} ${isMenuOpen ? styles.open : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div
          className={`${styles.navContainer} ${isMenuOpen ? styles.open : ""}`}
        >
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="🔍 Yazı ara..."
              value={searchQuery}
              onChange={(e) => updateSearchQuery(e.target.value)}
            />
          </div>
          <nav className={styles.navLinks}>
            <Link
              to="/"
              className={location.pathname === "/" ? styles.active : ""}
              onClick={closeMenu}
            >
              Ana Sayfa
            </Link>
            <Link
              to="/about"
              className={location.pathname === "/about" ? styles.active : ""}
              onClick={closeMenu}
            >
              Hakkında
            </Link>
            <Link
              to="/contact"
              className={location.pathname === "/contact" ? styles.active : ""}
              onClick={closeMenu}
            >
              İletişim
            </Link>
            <a
              href="https://github.com/zexy2"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubButton}
              onClick={closeMenu}
            >
              GitHub
            </a>
            <button onClick={toggleTheme} className={styles.themeToggle}>
              {theme === "light" ? "🌙" : "🌞"}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
