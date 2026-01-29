/**
 * PostCardCompact
 * Small typography-focused post card for Bento Grid
 */

import { Link } from 'react-router-dom';
import { FiBookmark } from 'react-icons/fi';
import styles from './PostCards.module.css';

export default function PostCardCompact({ post, isBookmarked, onBookmarkToggle }) {
  const { id, title, userId } = post;

  // Generate tag based on post ID for visual variety
  const tags = ['Tech', 'Design', 'Code', 'Web', 'React', 'CSS', 'UX', 'Dev'];
  const tag = tags[id % tags.length];

  return (
    <article className={`${styles.card} ${styles.compact}`}>
      <div className={styles.compactContent}>
        <div className={styles.compactHeader}>
          <span className={styles.tag}>{tag}</span>
          <button
            className={`${styles.bookmarkBtn} ${styles.tiny} ${isBookmarked ? styles.bookmarked : ''}`}
            onClick={() => onBookmarkToggle?.(post)}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            <FiBookmark size={14} />
          </button>
        </div>
        
        <Link to={`/posts/${id}`} className={styles.titleLink}>
          <h4 className={styles.compactTitle}>{title}</h4>
        </Link>
        
        <div className={styles.compactFooter}>
          <span className={styles.author}>User {userId}</span>
        </div>
      </div>
    </article>
  );
}
