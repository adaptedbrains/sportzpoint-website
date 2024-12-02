
export async function latestPublishPostByCategories(url) {
    const result = await fetch(url,{next:{revalidate:5}});
    
    if (!result.ok) {
        throw new Error('There was an error while fetching feature products');
    }
    const data=await result.json()
    // Correctly parse the JSON response
    return data.articles;
}