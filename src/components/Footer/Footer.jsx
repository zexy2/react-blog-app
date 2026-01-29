/**
 * Footer Component
 * Linear App style 4-column footer
 */

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';
import styles from './Footer.module.css';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Features Column */}
          <div className={styles.column}>
            <h4>{t('footer.features', 'Features')}</h4>
            <Link to="/">{t('footer.blog', 'Blog')}</Link>
            <Link to="/bookmarks">{t('footer.bookmarks', 'Bookmarks')}</Link>
            <Link to="/analytics">{t('footer.analytics', 'Analytics')}</Link>
          </div>

          {/* Product Column */}
          <div className={styles.column}>
            <h4>{t('footer.product', 'Product')}</h4>
            <Link to="/posts/create">{t('footer.create', 'Create Post')}</Link>
            <Link to="/">{t('footer.explore', 'Explore')}</Link>
            <Link to="/">{t('footer.trending', 'Trending')}</Link>
          </div>

          {/* Company Column */}
          <div className={styles.column}>
            <h4>{t('footer.company', 'Company')}</h4>
            <Link to="/about">{t('footer.about', 'About')}</Link>
            <Link to="/contact">{t('footer.contact', 'Contact')}</Link>
            <a href="https://github.com/zexy2" target="_blank" rel="noopener noreferrer">
              {t('footer.careers', 'Careers')}
            </a>
          </div>

          {/* Connect Column */}
          <div className={styles.column}>
            <h4>{t('footer.connect', 'Connect')}</h4>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="https://github.com/zexy2" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottom}>
          <span className={styles.logo}>Postify</span>
          
          <div className={styles.social}>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FiTwitter size={18} />
            </a>
            <a href="https://github.com/zexy2" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FiGithub size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FiLinkedin size={18} />
            </a>
          </div>
          
          <span className={styles.copyright}>© {currentYear} Postify</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
