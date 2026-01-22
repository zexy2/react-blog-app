/**
 * Local Authentication Service
 * 
 * Provides authentication without external backend
 * Uses localStorage for persistence
 */

const USERS_KEY = 'postify_users';
const SESSION_KEY = 'postify_session';

// Helper to get users from localStorage
const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Helper to save users to localStorage
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
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

// Hash password (simple hash for demo - in production use bcrypt)
const hashPassword = (password) => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
};

export const localAuthService = {
  /**
   * Register a new user
   */
  register: async ({ email, password, fullName, username }) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = getUsers();

    // Check if email already exists
    if (users.find(u => u.email === email)) {
      throw new Error('Bu e-posta adresi zaten kullanılıyor');
    }

    // Check if username already exists
    if (users.find(u => u.username === username)) {
      throw new Error('Bu kullanıcı adı zaten kullanılıyor');
    }

    const newUser = {
      id: generateId(),
      email,
      password: hashPassword(password),
      user_metadata: {
        full_name: fullName,
        username,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      },
      created_at: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    return { user: { ...newUser, password: undefined } };
  },

  /**
   * Sign in with email and password
   */
  login: async ({ email, password }) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = getUsers();
    const user = users.find(
      u => u.email === email && u.password === hashPassword(password)
    );

    if (!user) {
      throw new Error('E-posta veya şifre hatalı');
    }

    const session = {
      access_token: `token_${Date.now()}`,
      user: { ...user, password: undefined },
      expires_at: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    saveSession(session);

    return { session, user: session.user };
  },

  /**
   * Sign in with OAuth (simulated)
   */
  loginWithOAuth: async (provider) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo, create/login a demo user
    const demoEmail = `demo_${provider}@example.com`;
    const users = getUsers();
    let user = users.find(u => u.email === demoEmail);

    if (!user) {
      user = {
        id: generateId(),
        email: demoEmail,
        password: hashPassword('demo123'),
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

    const session = {
      access_token: `token_${Date.now()}`,
      user: { ...user, password: undefined },
      expires_at: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };

    saveSession(session);

    return { session, user: session.user };
  },

  /**
   * Sign out current user
   */
  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    saveSession(null);
  },

  /**
   * Get current session
   */
  getSession: async () => {
    const session = getStoredSession();
    
    if (session && session.expires_at > Date.now()) {
      return session;
    }
    
    saveSession(null);
    return null;
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
    const user = users.find(u => u.id === userId);
    
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      full_name: user.user_metadata.full_name,
      username: user.user_metadata.username,
      avatar_url: user.user_metadata.avatar_url,
      bio: user.user_metadata.bio || '',
      website: user.user_metadata.website || '',
      location: user.user_metadata.location || '',
      created_at: user.created_at,
    };
  },

  /**
   * Update user profile
   */
  updateProfile: async (userId, updates) => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      throw new Error('Kullanıcı bulunamadı');
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
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = getUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
      // Don't reveal if email exists
      return { success: true };
    }

    // In real app, send email. In development, log the request
    if (import.meta.env.DEV) {
      console.log('Password reset requested for:', email);
    }
    return { success: true };
  },

  /**
   * Update password
   */
  updatePassword: async (newPassword) => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const session = getStoredSession();
    if (!session) {
      throw new Error('Oturum bulunamadı');
    }

    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === session.user.id);

    if (userIndex === -1) {
      throw new Error('Kullanıcı bulunamadı');
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
      callback('SIGNED_IN', session);
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
    localAuthService._callbacks.forEach(cb => cb(event, session));
  },
};

export default localAuthService;
