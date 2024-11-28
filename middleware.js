import { NextResponse } from 'next/server';

const CACHE_CONTROL_HEADERS = {
  // Static assets (images, fonts, etc.)
  static: 'public, max-age=31536000, immutable',
  // API responses
  api: 'public, s-maxage=60, stale-while-revalidate=300',
  // Dynamic pages
  default: 'public, s-maxage=10, stale-while-revalidate=59',
};

export async function middleware(request) {
  const response = NextResponse.next();

  // Add security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Set cache control headers based on the request path
  const { pathname } = request.nextUrl;

  if (pathname.match(/\.(jpg|jpeg|png|webp|avif|gif|ico)$/)) {
    response.headers.set('Cache-Control', CACHE_CONTROL_HEADERS.static);
  } else if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', CACHE_CONTROL_HEADERS.api);
  } else {
    response.headers.set('Cache-Control', CACHE_CONTROL_HEADERS.default);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
