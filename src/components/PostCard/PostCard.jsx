/**
 * PostCard Component
 * Card for displaying post preview with bookmark functionality
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './PostCard.module.css';
import Button from '../Button/Button';
import BookmarkButton from '../BookmarkButton';

const PostCard = ({ post, author }) => {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  
  if (!post) return null;

  const getInitial = (name) => {
    if (!name) return post.id.toString().charAt(0);
    return name.charAt(0).toUpperCase();
  };

  // Calculate reading time
  const wordCount = post.body?.split(/\s+/).length || 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const snippet = post.body?.substring(0, 120) + '...' || '';
  const avatarText = author ? getInitial(author.name) : post.id;

  // Check if it's the current user's post
  const isOwnPost = isAuthenticated && post.createdBy === user?.id;

  return (
    <article className={styles.card}>
      {/* Own Post Badge */}
      {isOwnPost && <span className={styles.localBadge}>{t('posts.myPosts')}</span>}

      <div className={styles.cardHeader}>
        <Link to={author?.id ? `/users/${author.id}` : '#'} className={styles.avatarLink}>
          <div className={styles.avatar}>{avatarText}</div>
        </Link>
        <div className={styles.headerContent}>
          <Link to={`/posts/${post.id}`} className={styles.titleLink}>
            <h3 className={styles.cardTitle}>{post.title}</h3>
          </Link>
          {author && (
            <div className={styles.meta}>
              <Link to={`/users/${author.id}`} className={styles.authorName}>
                {author.name}
              </Link>
              <span className={styles.dot}>•</span>
              <span className={styles.readTime}>{readingTime} {t('posts.readingTime')}</span>
            </div>
          )}
        </div>
      </div>

      <p className={styles.body}>{snippet}</p>

      <div className={styles.cardFooter}>
        <Button to={`/posts/${post.id}`} variant="primary" size="small">
          {t('common.readMore')}
        </Button>
        <BookmarkButton post={{ ...post, authorName: author?.name }} size="small" />
      </div>
    </article>
  );
};

export default PostCard;
