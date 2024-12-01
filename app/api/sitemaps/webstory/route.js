import { generateSitemap } from '@/utils/sitemap-generator';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/type/Web%20Story`);
    if (!response.ok) {
      throw new Error(`Failed to fetch web stories: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    
    const stories = data.articles;
    if (!stories || !Array.isArray(stories)) {
      throw new Error('No web stories array found in API response');
    }

    const pages = stories.map(story => ({
      url: `/web-story/${story.slug || story._id}`,
      lastmod: story.published_at_datetime || new Date().toISOString(),
      changefreq: 'daily',
      priority: '0.8'
    }));

    const sitemap = await generateSitemap(pages, 'web');
    
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ 
      error: error.message,
      stack: error.stack 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
