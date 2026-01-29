/**
 * PostCardFeatured
 * Large hero-style post card for Bento Grid featured position
 */

import { Link } from 'react-router-dom';
import { FiBookmark, FiClock, FiUser } from 'react-icons/fi';
import styles from './PostCards.module.css';

export default function PostCardFeatured({ post, isBookmarked, onBookmarkToggle }) {
  const { id, title, body, userId } = post;
  
  // Linear style: subtle dark gradients only
  const gradientIndex = id % 5;
  const gradients = [
    'linear-gradient(135deg, #1a1a1f 0%, #0d0d0f 100%)',
    'linear-gradient(135deg, #18181c 0%, #0f0f12 100%)',
    'linear-gradient(135deg, #1c1c22 0%, #101014 100%)',
    'linear-gradient(135deg, #191920 0%, #0e0e11 100%)',
    'linear-gradient(135deg, #1b1b21 0%, #0c0c0e 100%)',
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
        
        <Link to={`/posts/${id}`} className={styles.titleLink}>
          <h2 className={styles.featuredTitle}>{title}</h2>
        </Link>
        
        <p className={styles.featuredExcerpt}>
          {body.length > 200 ? `${body.substring(0, 200)}...` : body}
        </p>
        
        <div className={styles.actions}>
          <Link to={`/posts/${id}`} className={styles.readMore}>
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
