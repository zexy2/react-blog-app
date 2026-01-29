/**
 * AI Assistant Redux Slice
 * AI durumu ve tercihlerini yönetir
 */

import { createSlice } from '@reduxjs/toolkit';
import { AI_CONFIG } from '../../../constants/ai';

// Load preferences from localStorage
const loadPreferences = () => {
  try {
    const stored = localStorage.getItem(AI_CONFIG.STORAGE_KEYS.AI_PREFERENCES);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

// Load analytics from localStorage
const loadAnalytics = () => {
  try {
    const stored = localStorage.getItem(AI_CONFIG.STORAGE_KEYS.AI_ANALYTICS);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const defaultPreferences = {
  enabled: true,
  ghostCompletionEnabled: true,
  grammarCheckEnabled: false, // Phase 2
  suggestionDelay: AI_CONFIG.DEBOUNCE.COMPLETION,
  language: 'en',
};

const defaultAnalytics = {
  totalSuggestions: 0,
  acceptedSuggestions: 0,
  rejectedSuggestions: 0,
  lastSessionDate: null,
};

const initialState = {
  // User preferences
  preferences: loadPreferences() || defaultPreferences,

  // Current session state
  session: {
    currentSuggestion: null, // { text, position, confidence }
    isLoading: false,
    lastRequestTime: null,
    cooldownUntil: null, // Timestamp until new suggestions are blocked
    error: null,
  },

  // Usage analytics for adaptive behavior
  analytics: loadAnalytics() || defaultAnalytics,

  // Computed adaptive delay (based on acceptance rate)
  adaptiveDelay: AI_CONFIG.DEBOUNCE.COMPLETION,
};

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    // Toggle AI feature on/off
    toggleAI: (state) => {
      state.preferences.enabled = !state.preferences.enabled;
      savePreferences(state.preferences);
    },

    // Toggle ghost completion
    toggleGhostCompletion: (state) => {
      state.preferences.ghostCompletionEnabled =
        !state.preferences.ghostCompletionEnabled;
      savePreferences(state.preferences);
    },

    // Set language preference
    setLanguage: (state, action) => {
      state.preferences.language = action.payload;
      savePreferences(state.preferences);
    },

    // Set current suggestion
    setSuggestion: (state, action) => {
      state.session.currentSuggestion = action.payload;
      state.session.isLoading = false;
      state.session.error = null;
      state.analytics.totalSuggestions += 1;
      saveAnalytics(state.analytics);
    },

    // Clear current suggestion
    clearSuggestion: (state) => {
      state.session.currentSuggestion = null;
    },

    // Set loading state
    setLoading: (state, action) => {
      state.session.isLoading = action.payload;
      if (action.payload) {
        state.session.lastRequestTime = Date.now();
      }
    },

    // Set error state
    setError: (state, action) => {
      state.session.error = action.payload;
      state.session.isLoading = false;
    },

    // Accept suggestion - user pressed Tab
    acceptSuggestion: (state) => {
      if (state.session.currentSuggestion) {
        state.analytics.acceptedSuggestions += 1;
        state.session.currentSuggestion = null;
        // Decrease delay when user accepts (more responsive)
        state.adaptiveDelay = Math.max(
          AI_CONFIG.DEBOUNCE.ADAPTIVE_MIN,
          state.adaptiveDelay - 50
        );
        saveAnalytics(state.analytics);
      }
    },

    // Reject suggestion - user pressed Esc or typed differently
    rejectSuggestion: (state) => {
      if (state.session.currentSuggestion) {
        state.analytics.rejectedSuggestions += 1;
        state.session.currentSuggestion = null;
        // Set cooldown to prevent immediate new suggestion
        state.session.cooldownUntil =
          Date.now() + AI_CONFIG.UI.COOLDOWN_AFTER_DISMISS;
        // Increase delay when user rejects (less intrusive)
        state.adaptiveDelay = Math.min(
          AI_CONFIG.DEBOUNCE.ADAPTIVE_MAX,
          state.adaptiveDelay + 100
        );
        saveAnalytics(state.analytics);
      }
    },

    // Reset cooldown
    clearCooldown: (state) => {
      state.session.cooldownUntil = null;
    },

    // Update preferences
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
      savePreferences(state.preferences);
    },

    // Reset analytics
    resetAnalytics: (state) => {
      state.analytics = defaultAnalytics;
      state.adaptiveDelay = AI_CONFIG.DEBOUNCE.COMPLETION;
      saveAnalytics(state.analytics);
    },
  },
});

// Helper functions for persistence
const savePreferences = (preferences) => {
  try {
    localStorage.setItem(
      AI_CONFIG.STORAGE_KEYS.AI_PREFERENCES,
      JSON.stringify(preferences)
    );
  } catch (e) {
    console.warn('Failed to save AI preferences:', e);
  }
};

const saveAnalytics = (analytics) => {
  try {
    localStorage.setItem(
      AI_CONFIG.STORAGE_KEYS.AI_ANALYTICS,
      JSON.stringify(analytics)
    );
  } catch (e) {
    console.warn('Failed to save AI analytics:', e);
  }
};

// Selectors
export const selectAIEnabled = (state) =>
  state.ai?.preferences?.enabled ?? true;
export const selectGhostCompletionEnabled = (state) =>
  state.ai?.preferences?.ghostCompletionEnabled ?? true;
export const selectCurrentSuggestion = (state) =>
  state.ai?.session?.currentSuggestion;
export const selectIsLoading = (state) => state.ai?.session?.isLoading ?? false;
export const selectAdaptiveDelay = (state) =>
  state.ai?.adaptiveDelay ?? AI_CONFIG.DEBOUNCE.COMPLETION;
export const selectLanguage = (state) =>
  state.ai?.preferences?.language ?? 'en';
export const selectAcceptanceRate = (state) => {
  const { acceptedSuggestions, totalSuggestions } = state.ai?.analytics ?? {};
  if (!totalSuggestions) return 0;
  return Math.round((acceptedSuggestions / totalSuggestions) * 100);
};
export const selectIsCooldown = (state) => {
  const cooldownUntil = state.ai?.session?.cooldownUntil;
  return cooldownUntil ? Date.now() < cooldownUntil : false;
};

export const {
  toggleAI,
  toggleGhostCompletion,
  setLanguage,
  setSuggestion,
  clearSuggestion,
  setLoading,
  setError,
  acceptSuggestion,
  rejectSuggestion,
  clearCooldown,
  updatePreferences,
  resetAnalytics,
} = aiSlice.actions;

export default aiSlice.reducer;
