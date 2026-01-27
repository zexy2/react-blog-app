/**
 * AnimationProvider
 * GSAP context and timeline management for coordinated animations
 */

import { createContext, useContext, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const AnimationContext = createContext(null);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    console.warn('useAnimation must be used within AnimationProvider');
  }
  return context;
};

// Animation presets
export const ANIMATION_PRESETS = {
  fadeUp: {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: 0.6, ease: 'power2.out' },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' },
  },
  slideInLeft: {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
  },
  slideInRight: {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
  },
  staggerUp: {
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
  },
};

export default function AnimationProvider({ children }) {
  const contextRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Disable all GSAP animations for reduced motion
      gsap.globalTimeline.timeScale(0);
      ScrollTrigger.defaults({ markers: false });
    }

    // Create GSAP context for cleanup
    contextRef.current = gsap.context(() => {});

    // Refresh ScrollTrigger on route changes
    ScrollTrigger.refresh();

    return () => {
      // Kill all ScrollTriggers and GSAP animations
      contextRef.current?.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Create scroll-triggered animation
  const createScrollTrigger = (element, animation, options = {}) => {
    if (!element) return null;

    const preset = ANIMATION_PRESETS[animation] || animation;
    
    gsap.set(element, preset.from);
    
    return gsap.to(element, {
      ...preset.to,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse',
        ...options,
      },
    });
  };

  // Animate element with preset
  const animate = (element, preset, options = {}) => {
    if (!element) return null;
    
    const config = ANIMATION_PRESETS[preset] || preset;
    gsap.set(element, config.from);
    return gsap.to(element, { ...config.to, ...options });
  };

  // Create staggered animation
  const stagger = (elements, preset, staggerTime = 0.1) => {
    if (!elements?.length) return null;
    
    const config = ANIMATION_PRESETS[preset] || ANIMATION_PRESETS.staggerUp;
    gsap.set(elements, config.from);
    return gsap.to(elements, { ...config.to, stagger: staggerTime });
  };

  // Kill specific animation
  const kill = (animation) => {
    if (animation?.kill) animation.kill();
  };

  // Refresh all ScrollTriggers
  const refresh = () => {
    ScrollTrigger.refresh();
  };

  const value = {
    gsap,
    ScrollTrigger,
    createScrollTrigger,
    animate,
    stagger,
    kill,
    refresh,
    presets: ANIMATION_PRESETS,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}
