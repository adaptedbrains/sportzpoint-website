const generateSitemap = async (pages, type = 'web') => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sportzpoint.com';
  
  const getXmlTemplate = (items) => {
    switch(type) {
      case 'news':
        return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
          ${items}
        </urlset>`;
      
      case 'web':
      default:
        return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${items}
        </urlset>`;
    }
  };

  const getUrlTemplate = (item) => {
    switch(type) {
      case 'news':
        return `
          <url>
            <loc>${baseUrl}${item.url}</loc>
            <news:news>
              <news:publication>
                <news:name>SportzPoint</news:name>
                <news:language>en</news:language>
              </news:publication>
              <news:publication_date>${item.publishDate}</news:publication_date>
              <news:title>${item.title}</news:title>
            </news:news>
          </url>`;
      
      case 'web':
      default:
        return `
          <url>
            <loc>${baseUrl}${item.url}</loc>
            <lastmod>${item.lastmod || new Date().toISOString()}</lastmod>
            <changefreq>${item.changefreq || 'daily'}</changefreq>
            <priority>${item.priority || '0.7'}</priority>
          </url>`;
    }
  };

  const items = pages.map(page => getUrlTemplate(page)).join('');
  return getXmlTemplate(items);
};

export { generateSitemap };
