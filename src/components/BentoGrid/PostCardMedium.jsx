/**
 * PostCardMedium
 * Standard-sized post card for Bento Grid
 */

import { Link } from 'react-router-dom';
import { FiBookmark, FiClock } from 'react-icons/fi';
import styles from './PostCards.module.css';

export default function PostCardMedium({ post, isBookmarked, onBookmarkToggle }) {
  const { id, title, body, userId } = post;

  return (
    <article className={`${styles.card} ${styles.medium}`}>
      {/* Accent line */}
      <div className={styles.accentLine} />
      
      <div className={styles.mediumContent}>
        <div className={styles.metaSmall}>
          <span>User {userId}</span>
          <span className={styles.dot}>•</span>
          <span><FiClock size={12} /> 3 min</span>
        </div>
        
        <Link to={`/post/${id}`} className={styles.titleLink}>
          <h3 className={styles.mediumTitle}>{title}</h3>
        </Link>
        
        <p className={styles.mediumExcerpt}>
          {body.length > 100 ? `${body.substring(0, 100)}...` : body}
        </p>
        
        <div className={styles.footer}>
          <Link to={`/post/${id}`} className={styles.readLink}>
            Read more →
          </Link>
          
          <button
            className={`${styles.bookmarkBtn} ${styles.small} ${isBookmarked ? styles.bookmarked : ''}`}
            onClick={() => onBookmarkToggle?.(post)}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            <FiBookmark size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
