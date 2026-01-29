/**
 * AISettings Component
 * AI asistan özelliklerini yönetmek için ayarlar paneli
 */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import {
  selectAIEnabled,
  selectGhostCompletionEnabled,
  selectLanguage,
  selectAcceptanceRate,
  toggleAI,
  toggleGhostCompletion,
  setLanguage,
  resetAnalytics,
} from '../../store/aiSlice';
import { isAIAvailable, setApiKey, clearApiKey } from '../../services/aiService';
import styles from './AISettings.module.css';

const AISettings = () => {
  const dispatch = useDispatch();

  // Redux state
  const aiEnabled = useSelector(selectAIEnabled);
  const ghostEnabled = useSelector(selectGhostCompletionEnabled);
  const language = useSelector(selectLanguage);
  const acceptanceRate = useSelector(selectAcceptanceRate);

  // Local state
  const [apiKeyValue, setApiKeyValue] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeySet, setApiKeySet] = useState(isAIAvailable());
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSaveApiKey = () => {
    if (apiKeyValue.trim()) {
      setApiKey(apiKeyValue.trim());
      setApiKeySet(true);
      setApiKeyValue('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  const handleClearApiKey = () => {
    clearApiKey();
    setApiKeySet(false);
    setApiKeyValue('');
  };

  const handleResetAnalytics = () => {
    if (window.confirm('Tüm AI istatistikleri sıfırlansın mı?')) {
      dispatch(resetAnalytics());
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>🤖</div>
        <div>
          <h3 className={styles.title}>AI Yazım Asistanı</h3>
          <p className={styles.subtitle}>
            Doğal ve görünmez AI destekli yazım yardımı
          </p>
        </div>
      </div>

      {/* API Key Section */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>API Ayarları</h4>

        {apiKeySet ? (
          <div className={styles.apiStatus}>
            <span className={styles.statusDot}></span>
            <span>OpenAI API bağlı</span>
            <button
              className={styles.clearButton}
              onClick={handleClearApiKey}
            >
              Kaldır
            </button>
          </div>
        ) : (
          <div className={styles.apiKeyInput}>
            <input
              type={showApiKey ? 'text' : 'password'}
              value={apiKeyValue}
              onChange={(e) => setApiKeyValue(e.target.value)}
              placeholder="sk-..."
              className={styles.input}
            />
            <button
              className={styles.toggleVisibility}
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? '👁️' : '🔒'}
            </button>
            <button
              className={styles.saveButton}
              onClick={handleSaveApiKey}
              disabled={!apiKeyValue.trim()}
            >
              Kaydet
            </button>
          </div>
        )}

        {showSuccess && (
          <motion.div
            className={styles.success}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ✓ API anahtarı kaydedildi
          </motion.div>
        )}

        <p className={styles.hint}>
          OpenAI API anahtarınızı{' '}
          <a
            href="https://platform.openai.com/api-keys"
            target="_blank"
            rel="noopener noreferrer"
          >
            platform.openai.com
          </a>
          {' '}adresinden alabilirsiniz.
        </p>
      </div>

      {/* Feature Toggles */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Özellikler</h4>

        <div className={styles.toggle}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleLabel}>AI Asistan</span>
            <span className={styles.toggleDesc}>
              Tüm AI özelliklerini aç/kapat
            </span>
          </div>
          <button
            className={`${styles.switch} ${aiEnabled ? styles.active : ''}`}
            onClick={() => dispatch(toggleAI())}
          >
            <span className={styles.switchThumb}></span>
          </button>
        </div>

        <div className={styles.toggle}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleLabel}>Ghost Text</span>
            <span className={styles.toggleDesc}>
              Yazarken otomatik tamamlama önerileri
            </span>
          </div>
          <button
            className={`${styles.switch} ${ghostEnabled && aiEnabled ? styles.active : ''}`}
            onClick={() => dispatch(toggleGhostCompletion())}
            disabled={!aiEnabled}
          >
            <span className={styles.switchThumb}></span>
          </button>
        </div>
      </div>

      {/* Language Selection */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Dil</h4>
        <div className={styles.languageButtons}>
          <button
            className={`${styles.langButton} ${language === 'tr' ? styles.active : ''}`}
            onClick={() => dispatch(setLanguage('tr'))}
          >
            🇹🇷 Türkçe
          </button>
          <button
            className={`${styles.langButton} ${language === 'en' ? styles.active : ''}`}
            onClick={() => dispatch(setLanguage('en'))}
          >
            🇬🇧 English
          </button>
        </div>
      </div>

      {/* Usage Stats */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Kullanım İstatistikleri</h4>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{acceptanceRate}%</span>
            <span className={styles.statLabel}>Kabul Oranı</span>
          </div>
        </div>
        <button
          className={styles.resetButton}
          onClick={handleResetAnalytics}
        >
          İstatistikleri Sıfırla
        </button>
      </div>

      {/* How It Works */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Nasıl Çalışır?</h4>
        <ul className={styles.howItWorks}>
          <li>
            <kbd>Tab</kbd> öneriyi kabul et
          </li>
          <li>
            <kbd>Esc</kbd> öneriyi reddet
          </li>
          <li>
            <kbd>⌘</kbd> + <kbd>→</kbd> kelime kelime kabul et
          </li>
          <li>Başka bir şey yazarak öneri otomatik silinir</li>
        </ul>
      </div>
    </div>
  );
};

export default AISettings;
