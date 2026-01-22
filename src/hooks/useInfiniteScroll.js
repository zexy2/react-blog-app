/**
 * useInfiniteScroll Hook
 * 
 * Provides infinite scroll functionality with intersection observer
 */

import { useEffect, useRef, useCallback } from 'react';

export const useInfiniteScroll = ({
  onLoadMore,
  hasNextPage,
  isLoading,
  threshold = 0.5,
  rootMargin = '100px',
}) => {
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isLoading) {
        onLoadMore();
      }
    },
    [onLoadMore, hasNextPage, isLoading]
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold,
      rootMargin,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver, threshold, rootMargin]);

  return { loadMoreRef };
};

export default useInfiniteScroll;
