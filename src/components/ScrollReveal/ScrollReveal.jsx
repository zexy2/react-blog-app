/**
 * ScrollReveal Component
 * Reusable wrapper for GSAP scroll-triggered animations
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ANIMATION_PRESETS = {
  fadeUp: {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  fadeLeft: {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0 },
  },
  fadeRight: {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0 },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
  },
  slideUp: {
    from: { y: 100 },
    to: { y: 0 },
  },
};

export default function ScrollReveal({
  children,
  animation = 'fadeUp',
  duration = 0.8,
  delay = 0,
  start = 'top 85%',
  end = 'bottom 15%',
  scrub = false,
  markers = false,
  once = false,
  className = '',
  style = {},
  as: Component = 'div',
}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Show content immediately
      gsap.set(element, { opacity: 1, x: 0, y: 0, scale: 1 });
      return;
    }

    const preset = ANIMATION_PRESETS[animation] || ANIMATION_PRESETS.fadeUp;

    // Set initial state
    gsap.set(element, preset.from);

    // Create animation
    const tween = gsap.to(element, {
      ...preset.to,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
        markers,
        toggleActions: once ? 'play none none none' : 'play none none reverse',
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === element) st.kill();
      });
    };
  }, [animation, duration, delay, start, end, scrub, markers, once]);

  return (
    <Component ref={elementRef} className={className} style={style}>
      {children}
    </Component>
  );
}
