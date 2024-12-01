import { generateSitemap } from '@/utils/sitemap-generator';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Define main website pages
    const pages = [
      {
        url: '/',
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: '1.0'
      },
      {
        url: '/about',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: '0.8'
      },
      {
        url: '/contact',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: '0.8'
      },
      {
        url: '/news',
        lastmod: new Date().toISOString(),
        changefreq: 'hourly',
        priority: '0.9'
      },
      {
        url: '/categories',
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: '0.9'
      }
    ];

    const sitemap = await generateSitemap(pages, 'web');
    
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
