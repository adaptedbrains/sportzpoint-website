export async function latestPost() {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/publish?limit=20&page=1`,{next:{revalidate:200}});
    
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