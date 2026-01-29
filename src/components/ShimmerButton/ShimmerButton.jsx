/**
 * ShimmerButton Component
 * Inspired by 21st.dev/Magic UI - Shimmering button effect
 */

import { motion } from 'framer-motion';
import styles from './ShimmerButton.module.css';

export default function ShimmerButton({ 
  children, 
  onClick,
  className = '',
  variant = 'primary', // 'primary' | 'secondary' | 'ghost'
  size = 'medium', // 'small' | 'medium' | 'large'
  disabled = false,
  ...props
}) {
  return (
    <motion.button
      className={`${styles.shimmerButton} ${styles[variant]} ${styles[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {/* Shimmer effect */}
      <span className={styles.shimmer} />
      
      {/* Content */}
      <span className={styles.content}>
        {children}
      </span>
    </motion.button>
  );
}
