const fs = require('fs');
const globby = require('globby');
const prettier = require('prettier');

async function generateSitemap() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  
  // Fetch all news and web stories URLs
  const pages = await globby([
    'pages/**/*.js',
    'pages/**/*.tsx',
    '!pages/_*.js',
    '!pages/_*.tsx',
    '!pages/api',
  ]);

  const currentDate = new Date().toISOString();

  // Generate sitemap content
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      ${pages
        .map((page) => {
          const path = page
            .replace('pages', '')
            .replace('.js', '')
            .replace('.tsx', '')
            .replace('/index', '');
          const route = path === '/index' ? '' : path;
          
          return `
            <url>
              <loc>\${process.env.NEXT_PUBLIC_SITE_URL}\${route}</loc>
              <lastmod>${currentDate}</lastmod>
              <changefreq>daily</changefreq>
              <priority>0.8</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  fs.writeFileSync('public/sitemap.xml', formatted);

  // Generate news-specific sitemap
  const newsSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
      ${/* Add your news articles here */}
    </urlset>
  `;

  const formattedNewsSitemap = prettier.format(newsSitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  fs.writeFileSync('public/news-sitemap.xml', formattedNewsSitemap);

  // Generate web stories sitemap
  const webStoriesSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${/* Add your web stories here */}
    </urlset>
  `;

  const formattedWebStoriesSitemap = prettier.format(webStoriesSitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  fs.writeFileSync('public/web-stories-sitemap.xml', formattedWebStoriesSitemap);
}

module.exports = generateSitemap;
