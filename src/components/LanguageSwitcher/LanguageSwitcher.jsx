/**
 * LanguageSwitcher Component
 * Toggle between TR and EN languages
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage, selectLanguage } from '../../store/slices/uiSlice';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector(selectLanguage);

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'tr' ? 'en' : 'tr';
    dispatch(setLanguage(newLang));
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={styles.button}
      title={t('theme.toggle')}
    >
      <span className={`${styles.flag} ${currentLanguage === 'tr' ? styles.active : ''}`}>
        🇹🇷
      </span>
      <span className={styles.divider}>/</span>
      <span className={`${styles.flag} ${currentLanguage === 'en' ? styles.active : ''}`}>
        🇬🇧
      </span>
    </button>
  );
};

export default LanguageSwitcher;
