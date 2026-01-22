/**
 * API Service Layer
 * Centralized HTTP client with interceptors and error handling
 */

import axios from 'axios';
import { API_CONFIG } from '../constants';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if exists
    const token = localStorage.getItem('postify_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const duration = new Date() - response.config.metadata.startTime;
    
    if (import.meta.env.DEV) {
      console.log(`[API] ${response.config.method?.toUpperCase()} ${response.config.url} - ${duration}ms`);
    }
    
    return response;
  },
  (error) => {
    // Handle specific error codes
    const { response } = error;
    
    if (response) {
      switch (response.status) {
        case 401:
          // Handle unauthorized
          localStorage.removeItem('postify_auth_token');
          window.location.href = '/';
          break;
        case 404:
          console.error('[API] Resource not found');
          break;
        case 500:
          console.error('[API] Server error');
          break;
        default:
          console.error(`[API] Error: ${response.status}`);
      }
    } else if (error.code === 'ECONNABORTED') {
      console.error('[API] Request timeout');
    } else {
      console.error('[API] Network error');
    }
    
    return Promise.reject(error);
  }
);

export default api;
