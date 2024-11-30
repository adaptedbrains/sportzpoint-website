
export async function gettingMainBlogPost(url) {
    const result = await fetch(url);
  
    
    if (!result.ok) {
        throw new Error('There was an error while fetching feature products');
    }
    const data=await result.json()
    // Correctly parse the JSON response
    return data;
}