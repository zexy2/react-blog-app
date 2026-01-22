/**
 * Skeleton Loader Component
 * 
 * Provides loading placeholders
 */

import styles from './Skeleton.module.css';

export const Skeleton = ({ 
  width = '100%', 
  height = '1rem', 
  borderRadius = '4px',
  className = '',
  variant = 'text',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'circular':
        return { borderRadius: '50%', width: height, height };
      case 'rectangular':
        return { borderRadius: '0' };
      case 'rounded':
        return { borderRadius: '8px' };
      default:
        return {};
    }
  };

  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...getVariantStyles(),
      }}
    />
  );
};

export const PostCardSkeleton = () => (
  <div className={styles.postCard}>
    <Skeleton height="200px" borderRadius="12px 12px 0 0" />
    <div className={styles.postCardContent}>
      <div className={styles.postCardHeader}>
        <Skeleton variant="circular" height="32px" />
        <div style={{ flex: 1 }}>
          <Skeleton width="60%" height="0.875rem" />
          <Skeleton width="40%" height="0.75rem" style={{ marginTop: '4px' }} />
        </div>
      </div>
      <Skeleton width="90%" height="1.25rem" />
      <Skeleton width="100%" height="0.875rem" style={{ marginTop: '8px' }} />
      <Skeleton width="80%" height="0.875rem" style={{ marginTop: '4px' }} />
      <div className={styles.postCardFooter}>
        <Skeleton width="80px" height="1.5rem" borderRadius="20px" />
        <Skeleton width="60px" height="1rem" />
      </div>
    </div>
  </div>
);

export const CommentSkeleton = () => (
  <div className={styles.comment}>
    <Skeleton variant="circular" height="40px" />
    <div style={{ flex: 1 }}>
      <div className={styles.commentHeader}>
        <Skeleton width="120px" height="0.875rem" />
        <Skeleton width="80px" height="0.75rem" />
      </div>
      <Skeleton width="100%" height="0.875rem" />
      <Skeleton width="70%" height="0.875rem" style={{ marginTop: '4px' }} />
    </div>
  </div>
);

export const ProfileSkeleton = () => (
  <div className={styles.profile}>
    <div className={styles.profileHeader}>
      <Skeleton variant="circular" height="120px" />
      <div style={{ flex: 1 }}>
        <Skeleton width="200px" height="1.5rem" />
        <Skeleton width="120px" height="1rem" style={{ marginTop: '8px' }} />
      </div>
    </div>
    <Skeleton width="100%" height="100px" style={{ marginTop: '24px' }} />
  </div>
);

export default Skeleton;
