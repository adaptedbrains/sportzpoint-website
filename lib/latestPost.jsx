export async function latestPost(url) {
    try {
        const result = await fetch(`${url}`, {
            next: {
                revalidate: 600 // 10 minutes to avoid rate limits
            }
        });
        
        if (!result.ok) {
            console.error(`API Error: ${result.status}`);
            return [];
        }
        
        const data = await result.json();
        if (!data?.articles?.length) return [];
        
        // Debug log raw data
        console.log('Raw latest post data:', {
            firstArticle: data.articles[0]
        });
        
        const processedArticles = data.articles.map(article => {
            // Debug log each article's category data
            console.log('Article category data:', {
                title: article.title,
                categories: article.categories,
                category: article.category
            });
            
            let categories;
            if (article.categories?.length > 0) {
                categories = article.categories;
            } else if (article.category) {
                // If we have a single category object
                if (typeof article.category === 'object' && article.category.name) {
                    categories = [article.category];
                } 
                // If category is a string
                else if (typeof article.category === 'string') {
                    categories = [{
                        name: article.category,
                        slug: article.category.toLowerCase().replace(/\s+/g, '-')
                    }];
                }
                else {
                    categories = [{ slug: 'sports', name: 'Sports' }];
                }
            } else {
                categories = [{ slug: 'sports', name: 'Sports' }];
            }
            
            return {
                ...article,
                categories,
                slug: article.slug || article._id?.toString() || 'article',
                published_date: article.published_date || article.createdAt || new Date().toISOString(),
                updated_at_datetime: article.updated_at_datetime || article.published_date || article.createdAt || new Date().toISOString()
            };
        });
        
        // Debug log processed data
        console.log('Processed latest post data:', {
            firstArticle: processedArticles[0]
        });
        
        return processedArticles;
    } catch (error) {
        console.error('Latest post error:', error);
        return [];
    }
}