/**
 * ParallaxImage Component
 * Scroll-triggered parallax effect for images
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ParallaxImage.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxImage({
  src,
  alt = '',
  speed = 0.3,
  scale = 1.2,
  overlay = true,
  overlayGradient = 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%)',
  height = '50vh',
  children,
  className = '',
}) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    
    if (!container || !image) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      gsap.set(image, { scale: 1, y: 0 });
      return;
    }

    // Set initial state
    gsap.set(image, { scale });

    // Create parallax animation
    const tween = gsap.to(image, {
      y: () => container.offsetHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === container) st.kill();
      });
    };
  }, [speed, scale]);

  return (
    <div 
      ref={containerRef}
      className={`${styles.container} ${className}`}
      style={{ height }}
    >
      <div className={styles.imageWrapper}>
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className={styles.image}
          loading="eager"
        />
      </div>
      
      {overlay && (
        <div 
          className={styles.overlay}
          style={{ background: overlayGradient }}
        />
      )}
      
      {children && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  );
}
