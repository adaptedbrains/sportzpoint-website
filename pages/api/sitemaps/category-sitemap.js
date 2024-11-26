import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { apiUrl, siteUrl } from '@/config/environment';

export default async function handler(req, res) {
  try {
    // Fetch categories from your API with proper endpoint
    const response = await fetch(`${apiUrl}/v1/categories`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    const categories = await response.json();

    if (!Array.isArray(categories)) {
      throw new Error('Categories data is not in expected format');
    }

    const links = categories.map((category) => ({
      url: `/category/${category.slug}`,
      changefreq: 'daily',
      priority: 0.8,
      lastmod: category.updated_at || new Date().toISOString(),
    }));

    const stream = new SitemapStream({ hostname: siteUrl });
    
    res.writeHead(200, {
      'Content-Type': 'application/xml',
    });

    const sitemapOutput = await streamToPromise(
      Readable.from(links).pipe(stream)
    );

    res.write(sitemapOutput);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
} 