import { generateSitemap } from '@/utils/sitemap-generator';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch published news articles
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/publish`);
    if (!response.ok) {
      throw new Error(`Failed to fetch news articles: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    
    // Get the articles array from the response
    const articles = data.articles;
    if (!articles || !Array.isArray(articles)) {
      throw new Error('No articles array found in API response');
    }

    // Transform articles into sitemap format
    const pages = articles.map(article => ({
      url: `/news/${article.slug || article._id}`,
      title: article.title || '',
      publishDate: article.published_at_datetime || article.custom_published_at || new Date().toISOString()
    }));

    const sitemap = await generateSitemap(pages, 'news');
    
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      },
    });
  } catch (error) {
    console.error('Error in news sitemap generation:', error);
    return new NextResponse(JSON.stringify({ 
      error: error.message,
      stack: error.stack 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
