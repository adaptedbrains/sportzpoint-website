// Cache configuration for data fetching
export const cacheConfig = {
  // Revalidate cache every 5 minutes by default
  defaultRevalidate: 300,
  
  // Cache times for different types of content
  revalidate: {
    articles: 300, // 5 minutes
    liveScores: 60, // 1 minute
    staticPages: 3600, // 1 hour
    images: 86400, // 24 hours
  },
};

// Cache headers for static assets
export const cacheHeaders = {
  images: {
    'Cache-Control': 'public, max-age=86400, must-revalidate',
  },
  static: {
    'Cache-Control': 'public, max-age=31536000, immutable',
  },
  api: {
    'Cache-Control': 'public, max-age=300, must-revalidate',
  },
};

// Helper function to generate cache key
export function generateCacheKey(type, params) {
  const key = `${type}:${Object.values(params).join(':')}`;
  return key;
}
