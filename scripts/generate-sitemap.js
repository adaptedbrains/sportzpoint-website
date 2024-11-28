const fs = require('fs');
const globby = require('globby');
const prettier = require('prettier');

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pages = await globby([
    'app/**/*.jsx',
    'app/**/*.js',
    '!app/**/_*.jsx',
    '!app/**/_*.js',
    '!app/**/[...].jsx',
    '!app/**/[...].js',
    '!app/api',
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            const path = page
              .replace('app', '')
              .replace('/page.jsx', '')
              .replace('/page.js', '')
              .replace('index', '');
            const route = path === '/index' ? '' : path;
            return `
              <url>
                  <loc>${`https://sportzpoint.com${route}`}</loc>
                  <lastmod>${new Date().toISOString()}</lastmod>
                  <changefreq>daily</changefreq>
                  <priority>0.7</priority>
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
})();
