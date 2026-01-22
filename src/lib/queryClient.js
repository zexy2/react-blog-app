/**
 * React Query Configuration
 * Centralized query client setup
 */

import { QueryClient } from '@tanstack/react-query';
import { CACHE_TIME } from '../constants';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_TIME.STALE,
      gcTime: CACHE_TIME.GC,
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});
