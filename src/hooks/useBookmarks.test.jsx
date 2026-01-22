/**
 * useBookmarks Hook Tests
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import bookmarksReducer from '../store/slices/bookmarksSlice';
import { useBookmarks } from './useBookmarks';

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
  },
}));

const createTestStore = () => {
  return configureStore({
    reducer: {
      bookmarks: bookmarksReducer,
    },
  });
};

const wrapper = ({ children }) => (
  <Provider store={createTestStore()}>{children}</Provider>
);

describe('useBookmarks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return empty bookmarks initially', () => {
    const { result } = renderHook(() => useBookmarks(), { wrapper });

    expect(result.current.bookmarkedIds).toEqual([]);
    expect(result.current.bookmarksCount).toBe(0);
  });

  it('should check if post is bookmarked', () => {
    const { result } = renderHook(() => useBookmarks(), { wrapper });

    expect(result.current.isBookmarked(1)).toBe(false);
  });

  it('should add bookmark', () => {
    const store = createTestStore();
    const customWrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useBookmarks(), { wrapper: customWrapper });

    act(() => {
      result.current.add(1, { id: 1, title: 'Test Post' });
    });

    expect(result.current.isBookmarked(1)).toBe(true);
    expect(result.current.bookmarksCount).toBe(1);
  });

  it('should remove bookmark', () => {
    const store = createTestStore();
    const customWrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useBookmarks(), { wrapper: customWrapper });

    act(() => {
      result.current.add(1, { id: 1, title: 'Test Post' });
    });

    expect(result.current.isBookmarked(1)).toBe(true);

    act(() => {
      result.current.remove(1);
    });

    expect(result.current.isBookmarked(1)).toBe(false);
    expect(result.current.bookmarksCount).toBe(0);
  });

  it('should toggle bookmark', () => {
    const store = createTestStore();
    const customWrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useBookmarks(), { wrapper: customWrapper });

    // Toggle on
    act(() => {
      result.current.toggle(1, { id: 1, title: 'Test Post' });
    });
    expect(result.current.isBookmarked(1)).toBe(true);

    // Toggle off
    act(() => {
      result.current.toggle(1);
    });
    expect(result.current.isBookmarked(1)).toBe(false);
  });

  it('should clear all bookmarks', () => {
    const store = createTestStore();
    const customWrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useBookmarks(), { wrapper: customWrapper });

    act(() => {
      result.current.add(1, { id: 1, title: 'Test 1' });
      result.current.add(2, { id: 2, title: 'Test 2' });
    });

    expect(result.current.bookmarksCount).toBe(2);

    act(() => {
      result.current.clearAll();
    });

    expect(result.current.bookmarksCount).toBe(0);
  });
});
