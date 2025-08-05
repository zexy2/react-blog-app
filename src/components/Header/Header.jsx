import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">Postify Blog</Link>
        </div>
        <nav className={styles.navLinks}>
          <Link to="/">Ana Sayfa</Link>
          <Link to="/about">Hakkında</Link>
          <Link to="/contact">İletişim</Link>
          <a
            href="https://github.com/zexy2"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
