import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { apiUrl, siteUrl } from '@/config/environment';

export default async function handler(req, res) {
  try {
    // Using the render.com development URL
    const articles = await fetch(`${apiUrl}/v1/articles`).then(r => r.json());

    const links = articles.map((article) => ({
      url: `/news/${article.categories[0]?.slug}/${article.slug}`,
      changefreq: 'hourly',
      priority: 0.9,
      lastmod: article.updated_at || article.published_at_datetime,
      news: {
        publication: {
          name: 'SportzPoint',
          language: 'en'
        },
        publication_date: article.published_at_datetime,
        title: article.title
      }
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
    console.error('Sitemap generation error:', error);
    res.status(500).end();
  }
} 