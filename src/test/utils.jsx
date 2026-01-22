/**
 * Test Utilities
 * Wrapper with all providers for testing
 */

import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { configureStore } from '@reduxjs/toolkit';

import uiReducer from '../store/slices/uiSlice';
import postsReducer from '../store/slices/postsSlice';
import bookmarksReducer from '../store/slices/bookmarksSlice';
import userReducer from '../store/slices/userSlice';

// Create a test store
const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      ui: uiReducer,
      posts: postsReducer,
      bookmarks: bookmarksReducer,
      user: userReducer,
    },
    preloadedState,
  });
};

// Create a test query client
const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
};

// Custom render with all providers
export const renderWithProviders = (
  ui,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    queryClient = createTestQueryClient(),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );

  return {
    store,
    queryClient,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

// Re-export everything from testing-library
export * from '@testing-library/react';
export { renderWithProviders as render };
