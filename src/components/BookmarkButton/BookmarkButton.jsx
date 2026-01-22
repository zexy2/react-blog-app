/**
 * BookmarkButton Component
 * Reusable bookmark toggle button
 */

import React from 'react';
import { FiBookmark } from 'react-icons/fi';
import { useBookmarks } from '../../hooks/useBookmarks';
import styles from './BookmarkButton.module.css';

const BookmarkButton = ({ post, size = 'medium', showText = false }) => {
  const { isBookmarked, toggle } = useBookmarks();
  const isActive = isBookmarked(post.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(post.id, post);
  };

  const sizeClass = styles[size] || styles.medium;

  return (
    <button
      onClick={handleClick}
      className={`${styles.button} ${sizeClass} ${isActive ? styles.active : ''}`}
      title={isActive ? 'Favorilerden kaldır' : 'Favorilere ekle'}
      aria-label={isActive ? 'Favorilerden kaldır' : 'Favorilere ekle'}
    >
      <FiBookmark className={styles.icon} />
      {showText && (
        <span className={styles.text}>
          {isActive ? 'Kaydedildi' : 'Kaydet'}
        </span>
      )}
    </button>
  );
};

export default BookmarkButton;
