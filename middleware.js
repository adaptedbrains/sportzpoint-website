import { NextResponse } from 'next/server';

export function middleware(request) {
    const response = NextResponse.next();

    // Add security headers
    const securityHeaders = {
        'X-DNS-Prefetch-Control': 'on',
        'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        'X-XSS-Protection': '1; mode=block',
    };

    Object.entries(securityHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    // Add caching headers for static assets
    if (request.nextUrl.pathname.startsWith('/_next/static/')) {
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }

    // Add caching for images
    if (request.nextUrl.pathname.startsWith('/images/')) {
        response.headers.set('Cache-Control', 'public, max-age=86400, must-revalidate');
    }

    // Add caching for web stories
    if (request.nextUrl.pathname.includes('/web-story/')) {
        response.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');
    }

    return response;
}
