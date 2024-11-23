
export async function SinglePost() {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/publish?limit=20&page=1`);
    
    if (!result.ok) {
        throw new Error('There was an error while fetching feature products');
    }
    const data=await result.json()
    // Correctly parse the JSON response
    return data.articles;
}
