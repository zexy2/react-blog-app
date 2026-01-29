/**
 * Admin Service
 * Handles all admin-related API operations
 */

import { localAuthService, USER_ROLES } from "./localAuthService";

const POSTS_KEY = "postify_posts";

// Helper to get posts from localStorage
const getPosts = () => {
  const posts = localStorage.getItem(POSTS_KEY);
  return posts ? JSON.parse(posts) : [];
};

// Helper to save posts
const savePosts = (posts) => {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
};

export const adminService = {
  /**
   * Check admin authorization
   */
  checkAdminAuth: async () => {
    const isAdmin = await localAuthService.isAdmin();
    if (!isAdmin) {
      throw new Error("Admin yetkisi gerekiyor");
    }
    return true;
  },

  /**
   * Get dashboard statistics
   */
  getDashboardStats: async () => {
    await adminService.checkAdminAuth();
    return localAuthService.getDashboardStats();
  },

  /**
   * Get all users
   */
  getAllUsers: async () => {
    await adminService.checkAdminAuth();
    return localAuthService.getAllUsers();
  },

  /**
   * Update user role
   */
  updateUserRole: async (userId, role) => {
    await adminService.checkAdminAuth();
    return localAuthService.updateUserRole(userId, role);
  },

  /**
   * Delete user
   */
  deleteUser: async (userId) => {
    await adminService.checkAdminAuth();
    return localAuthService.deleteUser(userId);
  },

  /**
   * Get all posts for admin (with moderation info)
   */
  getAllPosts: async () => {
    await adminService.checkAdminAuth();
    await new Promise((resolve) => setTimeout(resolve, 300));

    const posts = getPosts();
    return posts.map((post) => ({
      ...post,
      _admin: {
        canEdit: true,
        canDelete: true,
        canModerate: true,
      },
    }));
  },

  /**
   * Delete any post (Admin only)
   */
  deletePost: async (postId) => {
    await adminService.checkAdminAuth();
    await new Promise((resolve) => setTimeout(resolve, 300));

    const posts = getPosts();
    const filteredPosts = posts.filter(
      (p) => p.id !== postId && p.id !== Number(postId),
    );

    savePosts(filteredPosts);
    return { success: true };
  },

  /**
   * Update any post (Admin only)
   */
  updatePost: async (postId, updates) => {
    await adminService.checkAdminAuth();
    await new Promise((resolve) => setTimeout(resolve, 300));

    const posts = getPosts();
    const postIndex = posts.findIndex(
      (p) => p.id === postId || p.id === Number(postId),
    );

    if (postIndex === -1) {
      throw new Error("Post bulunamadı");
    }

    posts[postIndex] = {
      ...posts[postIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
      _moderatedBy: (await localAuthService.getSession())?.user?.id,
    };

    savePosts(posts);
    return posts[postIndex];
  },

  /**
   * Toggle post visibility/published status
   */
  togglePostVisibility: async (postId) => {
    await adminService.checkAdminAuth();
    await new Promise((resolve) => setTimeout(resolve, 300));

    const posts = getPosts();
    const postIndex = posts.findIndex(
      (p) => p.id === postId || p.id === Number(postId),
    );

    if (postIndex === -1) {
      throw new Error("Post bulunamadı");
    }

    posts[postIndex].isPublished = !posts[postIndex].isPublished;
    posts[postIndex].updatedAt = new Date().toISOString();

    savePosts(posts);
    return posts[postIndex];
  },

  /**
   * Get system logs (mock)
   */
  getSystemLogs: async () => {
    await adminService.checkAdminAuth();

    // Mock logs
    return [
      {
        id: 1,
        action: "USER_LOGIN",
        user: "admin",
        timestamp: new Date().toISOString(),
        details: "Successful login",
      },
      {
        id: 2,
        action: "POST_CREATED",
        user: "user1",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        details: "New post created",
      },
      {
        id: 3,
        action: "USER_REGISTERED",
        user: "newuser",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        details: "New user registration",
      },
    ];
  },
};

export { USER_ROLES };
export default adminService;
