module.exports = {
  siteUrl: 'https://sportzpoint.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/static/*', '/api/*', '/admin/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://sportzpoint.com/webcontent-sitemap.xml',
      'https://sportzpoint.com/category-sitemap.xml',
      'https://sportzpoint.com/news-sitemap.xml',
      'https://sportzpoint.com/webstory-sitemap.xml',
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/static/*', '/api/*', '/admin/*'],
      },
      {
        userAgent: 'SemrushBot',
        disallow: ['/'],
      },
      {
        userAgent: 'AhrefsBot',
        disallow: ['/'],
      },
    ],
  },
}; 