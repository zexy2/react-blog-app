/**
 * Hero Component
 * Premium hero section with kinetic typography and gradient mesh background
 */

import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import SplitType from 'split-type';
import styles from './Hero.module.css';

export default function Hero({ 
  title, 
  subtitle, 
  showSearch = true,
  searchValue = '',
  onSearchChange,
}) {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Show content immediately without animation
      if (titleRef.current) titleRef.current.style.opacity = '1';
      if (subtitleRef.current) subtitleRef.current.style.opacity = '1';
      if (searchRef.current) searchRef.current.style.opacity = '1';
      return;
    }

    const ctx = gsap.context(() => {
      // Split title into characters for kinetic animation
      if (titleRef.current) {
        const splitTitle = new SplitType(titleRef.current, { 
          types: 'chars',
          tagName: 'span'
        });

        // Animate each character with stagger
        gsap.fromTo(
          splitTitle.chars,
          { 
            opacity: 0, 
            y: 100,
            rotateX: -90,
          },
          { 
            opacity: 1, 
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: 'power4.out',
            delay: 0.2,
          }
        );
      }

      // Animate subtitle
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: 'power3.out',
            delay: 0.6,
          }
        );
      }

      // Animate search bar
      if (searchRef.current) {
        gsap.fromTo(
          searchRef.current,
          { opacity: 0, y: 20, scale: 0.95 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 0.6, 
            ease: 'power3.out',
            delay: 0.9,
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [title]);

  return (
    <section ref={heroRef} className={styles.hero}>
      {/* Gradient mesh background */}
      <div className={styles.gradientMesh} aria-hidden="true">
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gradientOrb3} />
        <div className={styles.gradientOrb4} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h1 ref={titleRef} className={styles.title}>
          {title || t('home.title', 'Postify')}
        </h1>
        
        <p ref={subtitleRef} className={styles.subtitle}>
          {subtitle || t('home.subtitle', 'Discover stories, insights, and ideas')}
        </p>

        {showSearch && (
          <div ref={searchRef} className={styles.searchWrapper}>
            <div className={styles.searchContainer}>
              <svg 
                className={styles.searchIcon} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                className={styles.searchInput}
                placeholder={t('home.searchPlaceholder', 'Search posts...')}
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                aria-label={t('home.searchLabel', 'Search posts')}
              />
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
