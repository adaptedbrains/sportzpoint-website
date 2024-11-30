import { Redis } from '@upstash/redis';

const CACHE_TTL = 60 * 60; // 1 hour
const STALE_TTL = 60 * 5; // 5 minutes

// Initialize Redis only if credentials are available
let redis;
try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
} catch (error) {
  console.warn('Redis initialization failed:', error);
}

export class Cache {
  constructor(namespace) {
    this.namespace = namespace;
    this.memoryCache = new Map();
  }

  generateKey(key) {
    return `${this.namespace}:${key}`;
  }

  async get(key) {
    const cacheKey = this.generateKey(key);
    
    try {
      if (redis) {
        const data = await redis.get(cacheKey);
        return data ? JSON.parse(data) : null;
      }
      
      // Fallback to memory cache if Redis is not available
      const data = this.memoryCache.get(cacheKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.warn('Cache get error:', error);
      return null;
    }
  }

  async set(key, value, ttl = CACHE_TTL) {
    const cacheKey = this.generateKey(key);
    const stringValue = JSON.stringify(value);
    
    try {
      if (redis) {
        await redis.set(cacheKey, stringValue, { ex: ttl });
      }
      
      // Also set in memory cache
      this.memoryCache.set(cacheKey, stringValue);
      
      // Clear memory cache after TTL
      setTimeout(() => {
        this.memoryCache.delete(cacheKey);
      }, ttl * 1000);
    } catch (error) {
      console.warn('Cache set error:', error);
    }
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
      const staleData = redis 
        ? await redis.get(staleKey)
        : this.memoryCache.get(staleKey);
      
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
        if (redis) {
          await redis.set(staleKey, JSON.stringify(currentData), { ex: STALE_TTL });
        }
        this.memoryCache.set(staleKey, JSON.stringify(currentData));
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
