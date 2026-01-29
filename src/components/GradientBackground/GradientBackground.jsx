/**
 * GradientBackground Component
 * GradFlow ile animasyonlu arka plan
 * Postify renk paletiyle uyumlu
 */

import React from 'react';
import { GradFlow } from 'gradflow';
import styles from './GradientBackground.module.css';

const GradientBackground = ({ 
  type = 'silk',
  opacity = 0.4,
  speed = 0.3,
  className = '',
}) => {
  return (
    <div className={`${styles.container} ${className}`} style={{ opacity }}>
      <GradFlow
        config={{
          // Postify renk paleti - Linear indigo teması
          color1: '#5e6ad2', // Primary indigo
          color2: '#8b95e0', // Lighter indigo
          color3: '#3d4692', // Darker indigo
          speed: speed,
          scale: 1.5,
          type: type,
          noise: 0.06,
        }}
        className={styles.gradient}
      />
    </div>
  );
};

// Farklı sayfa türleri için preset'ler
export const GradientPresets = {
  // Hero için - yavaş, zarif silk
  hero: {
    type: 'silk',
    opacity: 0.35,
    speed: 0.25,
  },
  // Sayfalar için - subtle smoke
  page: {
    type: 'smoke',
    opacity: 0.25,
    speed: 0.2,
  },
  // Dinamik alanlar için - animated
  dynamic: {
    type: 'animated',
    opacity: 0.3,
    speed: 0.4,
  },
  // Minimal - wave
  minimal: {
    type: 'wave',
    opacity: 0.2,
    speed: 0.15,
  },
};

export default GradientBackground;
