/**
 * User Service
 * All user-related API operations
 */

import api from './api';

export const userService = {
  /**
   * Fetch all users
   * @returns {Promise<Array>} List of users
   */
  getAll: async () => {
    const { data } = await api.get('/users');
    return data;
  },

  /**
   * Fetch single user by ID
   * @param {number|string} id - User ID
   * @returns {Promise<Object>} User object
   */
  getById: async (id) => {
    const { data } = await api.get(`/users/${id}`);
    return data;
  },

  /**
   * Fetch user's albums
   * @param {number|string} userId - User ID
   * @returns {Promise<Array>} List of albums
   */
  getAlbums: async (userId) => {
    const { data } = await api.get(`/users/${userId}/albums`);
    return data;
  },

  /**
   * Fetch user's todos
   * @param {number|string} userId - User ID
   * @returns {Promise<Array>} List of todos
   */
  getTodos: async (userId) => {
    const { data } = await api.get(`/users/${userId}/todos`);
    return data;
  },
};

export default userService;
