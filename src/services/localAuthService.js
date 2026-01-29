/**
 * Local Authentication Service
 *
 * Provides authentication without external backend
 * Uses localStorage for persistence with JWT tokens
 */

import { jwtService } from "./jwtService";

const USERS_KEY = "postify_users";
const SESSION_KEY = "postify_session";
const REFRESH_TOKEN_KEY = "postify_refresh_token";

// User roles
export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
  MODERATOR: "moderator",
};

// Hash password (simple hash for demo - in production use bcrypt)
const hashPassword = (password) => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(16);
};

// Helper to save users to localStorage
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Helper to get users from localStorage
const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  let userList = users ? JSON.parse(users) : [];

  // Always ensure admin user exists
  const adminExists = userList.find((u) => u.email === "admin@postify.com");
  if (!adminExists) {
    const defaultAdmin = {
      id: "admin_001",
      email: "admin@postify.com",
      password: hashPassword("admin123"),
      role: USER_ROLES.ADMIN,
      user_metadata: {
        full_name: "Admin User",
        username: "admin",
        avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
      },
      created_at: new Date().toISOString(),
    };
    userList.push(defaultAdmin);
    saveUsers(userList);
  }

  return userList;
};

// Helper to get current session
const getStoredSession = () => {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
};

// Helper to save session
const saveSession = (session) => {
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
};

// Generate unique ID
const generateId = () => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const localAuthService = {
  /**
   * Register a new user
   */
  register: async ({ email, password, fullName, username }) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const users = getUsers();

    // Check if email already exists
    if (users.find((u) => u.email === email)) {
      throw new Error("Bu e-posta adresi zaten kullanılıyor");
    }

    // Check if username already exists
    if (users.find((u) => u.username === username)) {
      throw new Error("Bu kullanıcı adı zaten kullanılıyor");
    }

    const newUser = {
      id: generateId(),
      email,
      password: hashPassword(password),
      role: USER_ROLES.USER, // Default role is user
      user_metadata: {
        full_name: fullName,
        username,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      },
      created_at: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    // Generate JWT tokens
    const userWithoutPassword = { ...newUser, password: undefined };
    const accessToken = jwtService.generateToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });
    const refreshToken = jwtService.generateRefreshToken(newUser.id);

    const session = {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: userWithoutPassword,
      expires_at: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };

    saveSession(session);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

    return { user: userWithoutPassword, session };
  },

  /**
   * Sign in with email and password
   */
  login: async ({ email, password }) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const users = getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === hashPassword(password),
    );

    if (!user) {
      throw new Error("E-posta veya şifre hatalı");
    }

    // Generate JWT tokens
    const userWithoutPassword = { ...user, password: undefined };
    const accessToken = jwtService.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role || USER_ROLES.USER,
    });
    const refreshToken = jwtService.generateRefreshToken(user.id);

    const session = {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: userWithoutPassword,
      expires_at: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    saveSession(session);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

    // Notify auth state change
    localAuthService._notifyChange("SIGNED_IN", session);

    return { session, user: session.user };
  },

  /**
   * Sign in with OAuth (simulated)
   */
  loginWithOAuth: async (provider) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // For demo, create/login a demo user
    const demoEmail = `demo_${provider}@example.com`;
    const users = getUsers();
    let user = users.find((u) => u.email === demoEmail);

    if (!user) {
      user = {
        id: generateId(),
        email: demoEmail,
        password: hashPassword("demo123"),
        role: USER_ROLES.USER,
        user_metadata: {
          full_name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
          username: `${provider}_user`,
          avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`,
        },
        created_at: new Date().toISOString(),
      };
      users.push(user);
      saveUsers(users);
    }

    // Generate JWT tokens
    const userWithoutPassword = { ...user, password: undefined };
    const accessToken = jwtService.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role || USER_ROLES.USER,
    });
    const refreshToken = jwtService.generateRefreshToken(user.id);

    const session = {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: userWithoutPassword,
      expires_at: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };

    saveSession(session);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

    return { session, user: session.user };
  },

  /**
   * Sign out current user
   */
  logout: async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    saveSession(null);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localAuthService._notifyChange("SIGNED_OUT", null);
  },

  /**
   * Get current session with token validation
   */
  getSession: async () => {
    const session = getStoredSession();

    if (!session) {
      return null;
    }

    // Verify JWT token
    const tokenResult = jwtService.verifyToken(session.access_token);

    if (!tokenResult.valid) {
      if (tokenResult.expired) {
        // Try to refresh token
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        if (refreshToken) {
          try {
            const newAccessToken = jwtService.refreshAccessToken(refreshToken, {
              userId: session.user.id,
              email: session.user.email,
              role: session.user.role,
            });
            session.access_token = newAccessToken;
            session.expires_at = Date.now() + 7 * 24 * 60 * 60 * 1000;
            saveSession(session);
            return session;
          } catch {
            saveSession(null);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            return null;
          }
        }
      }
      saveSession(null);
      return null;
    }

    // Check if token needs refresh
    if (jwtService.shouldRefreshToken(session.access_token)) {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (refreshToken) {
        try {
          const newAccessToken = jwtService.refreshAccessToken(refreshToken, {
            userId: session.user.id,
            email: session.user.email,
            role: session.user.role,
          });
          session.access_token = newAccessToken;
          session.expires_at = Date.now() + 7 * 24 * 60 * 60 * 1000;
          saveSession(session);
        } catch {
          // Token refresh failed, but current token still valid
        }
      }
    }

    return session;
  },

  /**
   * Get current user
   */
  getCurrentUser: async () => {
    const session = getStoredSession();
    return session?.user || null;
  },

  /**
   * Get user profile
   */
  getProfile: async (userId) => {
    const users = getUsers();
    const user = users.find((u) => u.id === userId);

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      full_name: user.user_metadata.full_name,
      username: user.user_metadata.username,
      avatar_url: user.user_metadata.avatar_url,
      bio: user.user_metadata.bio || "",
      website: user.user_metadata.website || "",
      location: user.user_metadata.location || "",
      created_at: user.created_at,
    };
  },

  /**
   * Update user profile
   */
  updateProfile: async (userId, updates) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const users = getUsers();
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      throw new Error("Kullanıcı bulunamadı");
    }

    users[userIndex].user_metadata = {
      ...users[userIndex].user_metadata,
      ...updates,
    };

    saveUsers(users);

    // Update session
    const session = getStoredSession();
    if (session && session.user.id === userId) {
      session.user.user_metadata = users[userIndex].user_metadata;
      saveSession(session);
    }

    return users[userIndex].user_metadata;
  },

  /**
   * Reset password (simulated)
   */
  resetPassword: async (email) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const users = getUsers();
    const user = users.find((u) => u.email === email);

    if (!user) {
      // Don't reveal if email exists
      return { success: true };
    }

    // In real app, send email. In development, log the request
    if (import.meta.env.DEV) {
      console.log("Password reset requested for:", email);
    }
    return { success: true };
  },

  /**
   * Update password
   */
  updatePassword: async (newPassword) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const session = getStoredSession();
    if (!session) {
      throw new Error("Oturum bulunamadı");
    }

    const users = getUsers();
    const userIndex = users.findIndex((u) => u.id === session.user.id);

    if (userIndex === -1) {
      throw new Error("Kullanıcı bulunamadı");
    }

    users[userIndex].password = hashPassword(newPassword);
    saveUsers(users);

    return { success: true };
  },

  /**
   * Auth state change callback storage
   */
  _callbacks: [],

  /**
   * Subscribe to auth state changes
   */
  onAuthStateChange: (callback) => {
    localAuthService._callbacks.push(callback);

    // Initial state
    const session = getStoredSession();
    if (session && session.expires_at > Date.now()) {
      callback("SIGNED_IN", session);
    }

    return {
      data: {
        subscription: {
          unsubscribe: () => {
            const index = localAuthService._callbacks.indexOf(callback);
            if (index > -1) {
              localAuthService._callbacks.splice(index, 1);
            }
          },
        },
      },
    };
  },

  /**
   * Notify auth state change
   */
  _notifyChange: (event, session) => {
    localAuthService._callbacks.forEach((cb) => cb(event, session));
  },

  // ==================== ADMIN FUNCTIONS ====================

  /**
   * Check if current user is admin
   */
  isAdmin: async () => {
    const session = await localAuthService.getSession();
    return session?.user?.role === USER_ROLES.ADMIN;
  },

  /**
   * Check if current user is moderator or admin
   */
  isModerator: async () => {
    const session = await localAuthService.getSession();
    return [USER_ROLES.ADMIN, USER_ROLES.MODERATOR].includes(
      session?.user?.role,
    );
  },

  /**
   * Get all users (Admin only)
   */
  getAllUsers: async () => {
    const session = await localAuthService.getSession();
    if (session?.user?.role !== USER_ROLES.ADMIN) {
      throw new Error("Yetkiniz yok");
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    const users = getUsers();
    return users.map((u) => ({ ...u, password: undefined }));
  },

  /**
   * Update user role (Admin only)
   */
  updateUserRole: async (userId, newRole) => {
    const session = await localAuthService.getSession();
    if (session?.user?.role !== USER_ROLES.ADMIN) {
      throw new Error("Yetkiniz yok");
    }

    if (!Object.values(USER_ROLES).includes(newRole)) {
      throw new Error("Geçersiz rol");
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    const users = getUsers();
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      throw new Error("Kullanıcı bulunamadı");
    }

    // Prevent removing own admin role
    if (userId === session.user.id && newRole !== USER_ROLES.ADMIN) {
      throw new Error("Kendi admin yetkisini kaldıramazsınız");
    }

    users[userIndex].role = newRole;
    saveUsers(users);

    return { ...users[userIndex], password: undefined };
  },

  /**
   * Delete user (Admin only)
   */
  deleteUser: async (userId) => {
    const session = await localAuthService.getSession();
    if (session?.user?.role !== USER_ROLES.ADMIN) {
      throw new Error("Yetkiniz yok");
    }

    // Prevent deleting self
    if (userId === session.user.id) {
      throw new Error("Kendinizi silemezsiniz");
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    const users = getUsers();
    const filteredUsers = users.filter((u) => u.id !== userId);

    if (filteredUsers.length === users.length) {
      throw new Error("Kullanıcı bulunamadı");
    }

    saveUsers(filteredUsers);
    return { success: true };
  },

  /**
   * Get dashboard stats (Admin only)
   */
  getDashboardStats: async () => {
    const session = await localAuthService.getSession();
    if (session?.user?.role !== USER_ROLES.ADMIN) {
      throw new Error("Yetkiniz yok");
    }

    const users = getUsers();
    const posts = JSON.parse(localStorage.getItem("postify_posts") || "[]");

    return {
      totalUsers: users.length,
      totalPosts: posts.length,
      adminCount: users.filter((u) => u.role === USER_ROLES.ADMIN).length,
      moderatorCount: users.filter((u) => u.role === USER_ROLES.MODERATOR)
        .length,
      userCount: users.filter((u) => u.role === USER_ROLES.USER).length,
      recentUsers: users
        .slice(-5)
        .reverse()
        .map((u) => ({ ...u, password: undefined })),
    };
  },

  /**
   * Verify token from header
   */
  verifyAuthToken: (token) => {
    return jwtService.verifyToken(token);
  },
};

export default localAuthService;
