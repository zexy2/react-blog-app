/**
 * TextReveal Component
 * Inspired by 21st.dev - Text reveal animation on scroll/load
 */

import { motion } from 'framer-motion';
import styles from './TextReveal.module.css';

export default function TextReveal({ 
  text, 
  className = '',
  delay = 0,
  staggerDelay = 0.03,
  duration = 0.5,
  as: Component = 'span',
}) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.span
      className={`${styles.textReveal} ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className={styles.word}
        >
          {word}
          {index < words.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.span>
  );
}
