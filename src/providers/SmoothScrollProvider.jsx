/**
 * SmoothScrollProvider
 * Wraps the app with Lenis for cinematic smooth scrolling
 */

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

const SmoothScrollContext = createContext(null);

export const useSmoothScroll = () => {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    console.warn('useSmoothScroll must be used within SmoothScrollProvider');
  }
  return context;
};

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return; // Skip smooth scroll for users who prefer reduced motion
    }

    // Initialize Lenis
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenisInstance;
    setLenis(lenisInstance);

    // Animation frame loop
    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenisInstance.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Scroll to element helper
  const scrollTo = (target, options = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: -80, // Account for header
        duration: 1.2,
        ...options,
      });
    }
  };

  // Stop/start scroll
  const stop = () => lenisRef.current?.stop();
  const start = () => lenisRef.current?.start();

  return (
    <SmoothScrollContext.Provider value={{ lenis, scrollTo, stop, start }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
