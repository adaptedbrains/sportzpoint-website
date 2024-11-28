export default async function sitemap() {
  const baseUrl = 'https://sportzpoint.com';

  // Fetch all articles
  const articlesRes = await fetch(`${process.env.API_URL}/articles`);
  const articles = await articlesRes.json();

  // Fetch all categories
  const categoriesRes = await fetch(`${process.env.API_URL}/categories`);
  const categories = await categoriesRes.json();

  // Generate article URLs
  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/${article.categories[0]?.slug || 'news'}/${article.slug}`,
    lastModified: article.updatedAt || article.publishedAt,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  // Generate category URLs
  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/${category.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // Static routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 1.0,
  }));

  return [...routes, ...categoryUrls, ...articleUrls];
}
