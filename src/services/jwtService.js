/**
 * JWT Service
 * Handles JWT token generation, validation, and management
 *
 * Note: In production, JWT should be generated server-side.
 * This is a client-side implementation for demo/learning purposes.
 */

// JWT Secret (In production, this should be on server-side only!)
const JWT_SECRET = "postify_jwt_secret_key_2024";
const JWT_EXPIRES_IN = 7 * 24 * 60 * 60 * 1000; // 7 days
const JWT_REFRESH_THRESHOLD = 24 * 60 * 60 * 1000; // 1 day before expiry

/**
 * Base64URL encode
 */
const base64UrlEncode = (str) => {
  const base64 = btoa(unescape(encodeURIComponent(JSON.stringify(str))));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

/**
 * Base64URL decode
 */
const base64UrlDecode = (str) => {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return JSON.parse(decodeURIComponent(escape(atob(base64))));
};

/**
 * Create HMAC-SHA256 signature (simplified for client-side)
 */
const createSignature = (header, payload, secret) => {
  const data = `${header}.${payload}`;
  let hash = 0;
  const combined = data + secret;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
};

/**
 * Generate JWT Token
 */
export const generateToken = (payload) => {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const now = Date.now();
  const tokenPayload = {
    ...payload,
    iat: now,
    exp: now + JWT_EXPIRES_IN,
  };

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(tokenPayload);
  const signature = createSignature(encodedHeader, encodedPayload, JWT_SECRET);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

/**
 * Generate Refresh Token
 */
export const generateRefreshToken = (userId) => {
  const payload = {
    userId,
    type: "refresh",
    exp: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
  };

  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(payload);
  const signature = createSignature(encodedHeader, encodedPayload, JWT_SECRET);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

/**
 * Verify JWT Token
 */
export const verifyToken = (token) => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return { valid: false, error: "Invalid token format" };
    }

    const [encodedHeader, encodedPayload, signature] = parts;

    // Verify signature
    const expectedSignature = createSignature(
      encodedHeader,
      encodedPayload,
      JWT_SECRET,
    );
    if (signature !== expectedSignature) {
      return { valid: false, error: "Invalid signature" };
    }

    // Decode payload
    const payload = base64UrlDecode(encodedPayload);

    // Check expiration
    if (payload.exp && payload.exp < Date.now()) {
      return { valid: false, error: "Token expired", expired: true };
    }

    return { valid: true, payload };
  } catch (error) {
    return { valid: false, error: error.message };
  }
};

/**
 * Decode token without verification
 */
export const decodeToken = (token) => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    return base64UrlDecode(parts[1]);
  } catch {
    return null;
  }
};

/**
 * Check if token needs refresh
 */
export const shouldRefreshToken = (token) => {
  const payload = decodeToken(token);
  if (!payload || !payload.exp) return false;

  const timeUntilExpiry = payload.exp - Date.now();
  return timeUntilExpiry < JWT_REFRESH_THRESHOLD && timeUntilExpiry > 0;
};

/**
 * Refresh access token using refresh token
 */
export const refreshAccessToken = (refreshToken, userData) => {
  const result = verifyToken(refreshToken);

  if (!result.valid) {
    throw new Error("Invalid refresh token");
  }

  if (result.payload.type !== "refresh") {
    throw new Error("Invalid token type");
  }

  return generateToken(userData);
};

export const jwtService = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  decodeToken,
  shouldRefreshToken,
  refreshAccessToken,
};

export default jwtService;
