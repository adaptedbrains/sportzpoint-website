export async function latestPost(url) {
    try {
        const result = await fetch(`${url}`, {
            next: {
                revalidate: 1
            }
        });
        
        if (!result.ok) return [];
        
        const data = await result.json();
        if (!data?.articles?.length) return [];
        
        return data.articles.map(article => ({
            ...article,
            categories: article.categories?.length > 0 
                ? article.categories 
                : [{ slug: 'sports', name: 'Sports' }],
            author: { name: article.credits || article.author?.name || 'Unknown Author' },
            slug: article.slug || article._id?.toString() || 'article',
            published_date: article.published_date || article.createdAt || new Date().toISOString(),
            updated_at_datetime: article.updated_at_datetime || article.published_date || article.createdAt || new Date().toISOString()
        }));
    } catch (error) {
        return [];
    }
}