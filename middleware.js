import { NextResponse } from 'next/server';

const CACHE_REVALIDATION_TIME = 60; // 1 minute in seconds
const STALE_WHILE_REVALIDATE_TIME = 60 * 60; // 1 hour in seconds

export function middleware(request) {
  const response = NextResponse.next();

  // Don't cache non-GET requests
  if (request.method !== 'GET') {
    return response;
  }

  // Don't cache API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return response;
  }

  // Set caching headers
  response.headers.set(
    'Cache-Control',
    `public, s-maxage=${CACHE_REVALIDATION_TIME}, stale-while-revalidate=${STALE_WHILE_REVALIDATE_TIME}`
  );

  // Add Surrogate-Control header for CDNs
  response.headers.set(
    'Surrogate-Control',
    `max-age=${CACHE_REVALIDATION_TIME}, stale-while-revalidate=${STALE_WHILE_REVALIDATE_TIME}`
  );

  // Add Vary header to properly handle different versions
  response.headers.set('Vary', 'Accept-Encoding, Accept');

  return response;
}

export const config = {
  matcher: [
    // Match all routes except /api, _next/static, _next/image, favicon.ico, and other static files
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|ico)).*)',
  ],
};
