import LRU from 'lru-cache';

const cache = new LRU({
  max: 500, // Maximum number of items to store
  maxAge: 1000 * 60 * 60, // Items expire after 1 hour
  updateAgeOnGet: true, // Reset age when item is accessed
  updateAgeOnHas: false,
});

export function getCachedData(key) {
  return cache.get(key);
}

export function setCachedData(key, data, ttl = 1000 * 60 * 60) {
  cache.set(key, data, { ttl });
}

export function invalidateCache(key) {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
}

export async function withCache(key, fetchFn, ttl) {
  // Try to get data from cache
  const cachedData = getCachedData(key);
  if (cachedData) {
    return cachedData;
  }

  // If not in cache, fetch new data
  try {
    const data = await fetchFn();
    setCachedData(key, data, ttl);
    return data;
  } catch (error) {
    console.error('Cache fetch error:', error);
    throw error;
  }
}

export default cache;
