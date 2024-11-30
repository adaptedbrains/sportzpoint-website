import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;
    const category = searchParams.get('category');

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Build the API URL with pagination parameters
    let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/articles?offset=${offset}&limit=${limit}`;
    if (category) {
      apiUrl += `&category=${category}`;
    }

    // Fetch articles from your backend API
    const response = await fetch(apiUrl, {
      headers: {
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    const data = await response.json();

    return NextResponse.json({
      articles: data.articles,
      total: data.total,
      page,
      limit,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
      },
    });
  } catch (error) {
    console.error('Error in articles API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
