import { NextResponse } from 'next/server';

// Cache configuration based on content type
const CACHE_CONFIG = {
  static: {
    maxAge: 365 * 24 * 60 * 60, // 1 year
    sMaxAge: 365 * 24 * 60 * 60, // 1 year
    staleWhileRevalidate: 60 * 60, // 1 hour
  },
  dynamic: {
    maxAge: 60 * 60, // 1 hour
    sMaxAge: 60 * 60, // 1 hour
    staleWhileRevalidate: 30, // 30 seconds
  },
  api: {
    maxAge: 60, // 1 minute
    sMaxAge: 60, // 1 minute
    staleWhileRevalidate: 30, // 30 seconds
  }
};

function isStaticAsset(pathname) {
  return /\.(js|css|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|otf)$/i.test(pathname);
}

function isApiRoute(pathname) {
  return pathname.startsWith('/api/');
}

export async function middleware(request) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  // Security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

  // Set cache headers based on content type
  let cacheConfig;
  if (isStaticAsset(pathname)) {
    cacheConfig = CACHE_CONFIG.static;
  } else if (isApiRoute(pathname)) {
    cacheConfig = CACHE_CONFIG.api;
  } else {
    cacheConfig = CACHE_CONFIG.dynamic;
  }

  const cacheControl = [
    `public`,
    `max-age=${cacheConfig.maxAge}`,
    `s-maxage=${cacheConfig.sMaxAge}`,
    `stale-while-revalidate=${cacheConfig.staleWhileRevalidate}`,
  ].join(', ');

  response.headers.set('Cache-Control', cacheControl);

  // Add Vary header for proper cache invalidation
  response.headers.set('Vary', 'Accept, Accept-Encoding, Cookie');

  // Enable CORS for static assets
  if (isStaticAsset(pathname)) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
