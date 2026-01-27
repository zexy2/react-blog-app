/**
 * PostCardFeatured
 * Large hero-style post card for Bento Grid featured position
 */

import { Link } from 'react-router-dom';
import { FiBookmark, FiClock, FiUser } from 'react-icons/fi';
import styles from './PostCards.module.css';

export default function PostCardFeatured({ post, isBookmarked, onBookmarkToggle }) {
  const { id, title, body, userId } = post;
  
  // Generate a gradient based on post id for visual variety
  const gradientIndex = id % 5;
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  ];

  return (
    <article className={`${styles.card} ${styles.featured}`}>
      {/* Background gradient */}
      <div 
        className={styles.featuredBackground}
        style={{ background: gradients[gradientIndex] }}
      />
      
      {/* Overlay for text readability */}
      <div className={styles.featuredOverlay} />
      
      {/* Content */}
      <div className={styles.featuredContent}>
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <FiUser size={14} />
            User {userId}
          </span>
          <span className={styles.metaItem}>
            <FiClock size={14} />
            5 min read
          </span>
        </div>
        
        <Link to={`/post/${id}`} className={styles.titleLink}>
          <h2 className={styles.featuredTitle}>{title}</h2>
        </Link>
        
        <p className={styles.featuredExcerpt}>
          {body.length > 200 ? `${body.substring(0, 200)}...` : body}
        </p>
        
        <div className={styles.actions}>
          <Link to={`/post/${id}`} className={styles.readMore}>
            Read Article
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          
          <button
            className={`${styles.bookmarkBtn} ${isBookmarked ? styles.bookmarked : ''}`}
            onClick={() => onBookmarkToggle?.(post)}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            <FiBookmark size={20} />
          </button>
        </div>
      </div>
    </article>
  );
}
