/**
 * Bookmarks Slice
 * Manages bookmarked posts with localStorage persistence
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of bookmarked post IDs
  posts: {}, // Cached post data { [id]: postData }
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    toggleBookmark: (state, action) => {
      const { id, postData } = action.payload;
      const index = state.items.indexOf(id);
      
      if (index === -1) {
        // Add bookmark
        state.items.push(id);
        if (postData) {
          state.posts[id] = postData;
        }
      } else {
        // Remove bookmark
        state.items.splice(index, 1);
        delete state.posts[id];
      }
    },
    addBookmark: (state, action) => {
      const { id, postData } = action.payload;
      if (!state.items.includes(id)) {
        state.items.push(id);
        if (postData) {
          state.posts[id] = postData;
        }
      }
    },
    removeBookmark: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((itemId) => itemId !== id);
      delete state.posts[id];
    },
    clearAllBookmarks: (state) => {
      state.items = [];
      state.posts = {};
    },
  },
});

export const { toggleBookmark, addBookmark, removeBookmark, clearAllBookmarks } =
  bookmarksSlice.actions;

// Selectors
export const selectBookmarkedIds = (state) => state.bookmarks.items;
export const selectBookmarkedPosts = (state) => state.bookmarks.posts;
export const selectIsBookmarked = (id) => (state) =>
  state.bookmarks.items.includes(id);
export const selectBookmarksCount = (state) => state.bookmarks.items.length;

export default bookmarksSlice.reducer;
