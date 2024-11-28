const fs = require('fs');
const globby = require('globby');
const prettier = require('prettier');

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc');
  const pages = await globby([
    'pages/**/*.{js,jsx,ts,tsx}',
    '!pages/_*.{js,jsx,ts,tsx}',
    '!pages/api',
    '!pages/404.{js,jsx,ts,tsx}',
  ]);

  const currentDate = new Date().toISOString();

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          const path = page
            .replace('pages', '')
            .replace('.js', '')
            .replace('.jsx', '')
            .replace('.ts', '')
            .replace('.tsx', '')
            .replace('/index', '');
          const route = path === '/index' ? '' : path;
          return `
            <url>
              <loc>\${process.env.NEXT_PUBLIC_SITE_URL}\${route}</loc>
              <lastmod>${currentDate}</lastmod>
              <changefreq>daily</changefreq>
              <priority>${route === '' ? '1.0' : '0.7'}</priority>
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
