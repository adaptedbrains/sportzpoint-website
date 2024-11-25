export async function latestPost(url) {
    const result = await fetch(`${url}`,{next:{revalidate:200}});
    
    if (!result.ok) {
        throw new Error('Failed to fetch posts');
    }
    const data = await result.json();
    
    // Debug log
    
    // Ensure categories exist for each article
    const articlesWithCategories = data.articles.map(article => ({
        ...article,
        categories: article.categories || [{ slug: 'general', name: 'General' }]
    }));
    
    return articlesWithCategories;
}