export async function getSingleAuthor(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch author data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching author:', error);
    return null;
  }
}