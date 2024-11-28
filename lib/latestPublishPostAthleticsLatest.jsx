

export async function latestPublishPostAthleticsLatest() {
    const result = await fetch(`https://sportzpoint-be.onrender.com/articles/category/athletics?limit=5&page=1`);
    console.log("result",result);
    
    if (!result.ok) {
        throw new Error('There was an error while fetching feature products');
    }
    const data=await result.json()
    // Correctly parse the JSON response
    return data.articles;
}