import redis from '@/lib/redis';

const CACHE_TTL = 60 * 60; // 1 hour
const STALE_TTL = 60 * 5; // 5 minutes

export class Cache {
  constructor(namespace) {
    this.namespace = namespace;
  }

  generateKey(key) {
    return `${this.namespace}:${key}`;
  }

  async get(key) {
    const cacheKey = this.generateKey(key);
    const data = await redis.get(cacheKey);
    
    if (!data) return null;
    
    return JSON.parse(data);
  }

  async set(key, value, ttl = CACHE_TTL) {
    const cacheKey = this.generateKey(key);
    await redis.set(cacheKey, JSON.stringify(value), { ex: ttl });
  }

  async getWithSWR(key, fetchFn) {
    const cacheKey = this.generateKey(key);
    const staleKey = `stale:${cacheKey}`;
    
    try {
      // Try to get fresh data
      const cachedData = await this.get(key);
      
      if (cachedData) {
        return { data: cachedData, isStale: false };
      }
      
      // Try to get stale data
      const staleData = await redis.get(staleKey);
      
      // Revalidate in background
      this.revalidate(key, staleKey, fetchFn);
      
      if (staleData) {
        return { data: JSON.parse(staleData), isStale: true };
      }
      
      // If no cached data, fetch fresh
      const freshData = await fetchFn();
      await this.set(key, freshData);
      return { data: freshData, isStale: false };
      
    } catch (error) {
      console.error('Cache error:', error);
      // Fallback to direct fetch
      const freshData = await fetchFn();
      return { data: freshData, isStale: false };
    }
  }

  async revalidate(key, staleKey, fetchFn) {
    try {
      // Move current data to stale
      const currentData = await this.get(key);
      if (currentData) {
        await redis.set(staleKey, JSON.stringify(currentData), { ex: STALE_TTL });
      }
      
      // Fetch fresh data
      const freshData = await fetchFn();
      await this.set(key, freshData);
      
      return freshData;
    } catch (error) {
      console.error('Revalidation error:', error);
    }
  }
}

// Create cache instances for different types of data
export const articleCache = new Cache('articles');
export const categoryCache = new Cache('categories');
export const webStoryCache = new Cache('webstories');
