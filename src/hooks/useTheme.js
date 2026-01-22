/**
 * useTheme Hook
 * Manage application theme with Redux
 */

import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { toggleTheme, setTheme, selectTheme } from '../store/slices/uiSlice';
import { THEME } from '../constants';

export function useTheme() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  // Apply theme to document on mount and change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        theme === THEME.DARK ? '#1a1a2e' : '#ffffff'
      );
    }
  }, [theme]);

  const toggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  const setLightTheme = useCallback(() => {
    dispatch(setTheme(THEME.LIGHT));
  }, [dispatch]);

  const setDarkTheme = useCallback(() => {
    dispatch(setTheme(THEME.DARK));
  }, [dispatch]);

  const set = useCallback(
    (newTheme) => {
      dispatch(setTheme(newTheme));
    },
    [dispatch]
  );

  return {
    theme,
    isDark: theme === THEME.DARK,
    isLight: theme === THEME.LIGHT,
    toggle,
    setLightTheme,
    setDarkTheme,
    set,
  };
}
