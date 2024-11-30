const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

async function generateSitemap() {
    const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
    const appDir = path.join(process.cwd(), 'app');
    
    function getFiles(dir) {
        const files = [];
        const items = fs.readdirSync(dir, { withFileTypes: true });
        
        for (const item of items) {
            if (item.isDirectory()) {
                files.push(...getFiles(path.join(dir, item.name)));
            } else if (item.name.match(/\.(js|jsx|ts|tsx)$/)) {
                if (!item.name.startsWith('_') && !item.name.includes('[')) {
                    files.push(path.join(dir, item.name));
                }
            }
        }
        
        return files;
    }
    
    const pages = getFiles(appDir).map(file => 
        file.replace(appDir, '')
            .replace(/\\/g, '/')
            .replace(/\.jsx?$/, '')
            .replace(/\.tsx?$/, '')
            .replace('/page', '')
            .replace('/route', '')
    );

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sportzpoint.com';

    const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
            ${pages
                .map(route => {
                    return `
                        <url>
                            <loc>${`${siteUrl}${route}`}</loc>
                            <changefreq>daily</changefreq>
                            <priority>0.7</priority>
                        </url>
                    `;
                })
                .join('')}

            <!-- Static URLs -->
            <url>
                <loc>${siteUrl}/</loc>
                <changefreq>daily</changefreq>
                <priority>1.0</priority>
            </url>
            <url>
                <loc>${siteUrl}/about-us</loc>
                <changefreq>monthly</changefreq>
                <priority>0.8</priority>
            </url>
            <url>
                <loc>${siteUrl}/privacy-policy</loc>
                <changefreq>monthly</changefreq>
                <priority>0.5</priority>
            </url>
        </urlset>
    `;

    const formatted = await prettier.format(sitemap, {
        ...prettierConfig,
        parser: 'html',
    });

    fs.writeFileSync('public/sitemap.xml', formatted);
    console.log('Sitemap generated successfully!');
}

generateSitemap().catch(console.error);
