import { generateSitemap } from '@/utils/sitemap-generator';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Fetching categories...');
    // Fetch all categories
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`);
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    
    // Get the categories array from the response
    const categories = data.categories;
    if (!categories || !Array.isArray(categories)) {
      throw new Error('No categories array found in API response');
    }

    console.log(`Found ${categories.length} categories`);

    // Transform categories into sitemap format
    const pages = categories.map(category => ({
      url: `/category/${category.slug}`,
      lastmod: category.updatedAt || category.createdAt || new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.8'
    }));

    console.log('Generating sitemap...');
    const sitemap = await generateSitemap(pages, 'web');
    
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      },
    });
  } catch (error) {
    console.error('Error in category sitemap generation:', error);
    return new NextResponse(JSON.stringify({ 
      error: error.message,
      stack: error.stack 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
