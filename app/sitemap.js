export default async function sitemap() {
  try {
    // Fetch all articles
    const articlesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/all`);
    const articles = await articlesRes.json();

    // Fetch all categories
    const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
    const categories = await categoriesRes.json();

    // Generate article URLs
    const articleUrls = articles.map((article) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${article.primary_category?.[0]?.slug}/${article.slug}`,
      lastModified: article.modified_date || article.published_date,
      changeFrequency: 'daily',
      priority: 0.8,
    }));

    // Generate category URLs
    const categoryUrls = categories.map((category) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${category.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    }));

    // Add static pages
    const staticPages = [
      {
        url: process.env.NEXT_PUBLIC_SITE_URL,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      // Add other static pages here
    ];

    return [...staticPages, ...categoryUrls, ...articleUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return [];
  }
}
