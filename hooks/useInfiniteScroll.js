'use client';

import { useState, useEffect, useCallback } from 'react';

export const useInfiniteScroll = ({ 
  fetchMore, 
  hasMore, 
  threshold = 100,
  initialLoading = false 
}) => {
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState(null);

  const handleScroll = useCallback(async () => {
    if (loading || !hasMore) return;

    // Check if we're near the bottom of the page
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollHeight - scrollTop - clientHeight < threshold) {
      try {
        setLoading(true);
        await fetchMore();
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  }, [loading, hasMore, fetchMore, threshold]);

  useEffect(() => {
    const throttledHandleScroll = () => {
      let timeoutId;
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => handleScroll(), 100);
      };
    };

    const scrollListener = throttledHandleScroll();
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [handleScroll]);

  return { loading, error };
};
