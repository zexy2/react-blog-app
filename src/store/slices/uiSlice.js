/**
 * UI Slice
 * Manages UI state: theme, sidebar, modals, search, language
 */

import { createSlice } from '@reduxjs/toolkit';
import { STORAGE_KEYS, THEME } from '../../constants';

// Get initial theme from localStorage or system preference
const getInitialTheme = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.THEME);
  if (saved) return saved;
  
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? THEME.DARK : THEME.LIGHT;
};

// Get initial language
const getInitialLanguage = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
  if (saved) return saved;
  
  const browserLang = navigator.language.split('-')[0];
  return ['tr', 'en'].includes(browserLang) ? browserLang : 'en';
};

const initialState = {
  theme: getInitialTheme(),
  language: getInitialLanguage(),
  searchQuery: '',
  sidebarOpen: false,
  modalOpen: null, // 'createPost' | 'editPost' | 'deleteConfirm' | null
  modalData: null,
  isLoading: false,
  notification: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem(STORAGE_KEYS.THEME, state.theme);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem(STORAGE_KEYS.THEME, state.theme);
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, state.language);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSearch: (state) => {
      state.searchQuery = '';
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
    openModal: (state, action) => {
      state.modalOpen = action.payload.type;
      state.modalData = action.payload.data || null;
    },
    closeModal: (state) => {
      state.modalOpen = null;
      state.modalData = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  setLanguage,
  setSearchQuery,
  clearSearch,
  toggleSidebar,
  closeSidebar,
  openModal,
  closeModal,
  setLoading,
  showNotification,
  clearNotification,
} = uiSlice.actions;

// Selectors
export const selectTheme = (state) => state.ui.theme;
export const selectLanguage = (state) => state.ui.language;
export const selectSearchQuery = (state) => state.ui.searchQuery;
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectModalState = (state) => ({
  isOpen: state.ui.modalOpen !== null,
  type: state.ui.modalOpen,
  data: state.ui.modalData,
});
export const selectIsLoading = (state) => state.ui.isLoading;
export const selectNotification = (state) => state.ui.notification;

export default uiSlice.reducer;
