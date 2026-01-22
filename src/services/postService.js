/**
 * Post Service
 * All post-related API operations
 */

import api from './api';

export const postService = {
  /**
   * Fetch all posts
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>} List of posts
   */
  getAll: async (params = {}) => {
    const { data } = await api.get('/posts', { params });
    return data;
  },

  /**
   * Fetch single post by ID
   * @param {number|string} id - Post ID
   * @returns {Promise<Object>} Post object
   */
  getById: async (id) => {
    const { data } = await api.get(`/posts/${id}`);
    return data;
  },

  /**
   * Fetch posts by user ID
   * @param {number|string} userId - User ID
   * @returns {Promise<Array>} List of user's posts
   */
  getByUserId: async (userId) => {
    const { data } = await api.get(`/users/${userId}/posts`);
    return data;
  },

  /**
   * Create new post
   * @param {Object} postData - Post data { title, body, userId }
   * @returns {Promise<Object>} Created post
   */
  create: async (postData) => {
    const { data } = await api.post('/posts', postData);
    return data;
  },

  /**
   * Update existing post
   * @param {number|string} id - Post ID
   * @param {Object} postData - Updated post data
   * @returns {Promise<Object>} Updated post
   */
  update: async (id, postData) => {
    const { data } = await api.put(`/posts/${id}`, postData);
    return data;
  },

  /**
   * Partially update post
   * @param {number|string} id - Post ID
   * @param {Object} partialData - Partial update data
   * @returns {Promise<Object>} Updated post
   */
  patch: async (id, partialData) => {
    const { data } = await api.patch(`/posts/${id}`, partialData);
    return data;
  },

  /**
   * Delete post
   * @param {number|string} id - Post ID
   * @returns {Promise<void>}
   */
  delete: async (id) => {
    await api.delete(`/posts/${id}`);
  },

  /**
   * Get comments for a post
   * @param {number|string} postId - Post ID
   * @returns {Promise<Array>} List of comments
   */
  getComments: async (postId) => {
    const { data } = await api.get(`/posts/${postId}/comments`);
    return data;
  },
};

export default postService;
