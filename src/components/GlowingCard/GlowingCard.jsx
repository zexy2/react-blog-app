/**
 * GlowingCard Component
 * Inspired by 21st.dev/Aceternity - Cursor's glowing effect
 * A card with animated glowing border effect on hover
 */

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './GlowingCard.module.css';

export default function GlowingCard({ 
  children, 
  className = '',
  glowColor = 'rgba(255, 255, 255, 0.1)',
  borderRadius = '12px',
}) {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.glowingCard} ${className}`}
      style={{ borderRadius }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Glow effect */}
      <div 
        className={styles.glowEffect}
        style={{
          background: isHovered 
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 40%)`
            : 'transparent',
          borderRadius,
        }}
      />
      
      {/* Border glow */}
      <div 
        className={styles.borderGlow}
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.15), transparent 40%)`
            : 'transparent',
          borderRadius,
        }}
      />
      
      {/* Content */}
      <div className={styles.content} style={{ borderRadius }}>
        {children}
      </div>
    </motion.div>
  );
}
