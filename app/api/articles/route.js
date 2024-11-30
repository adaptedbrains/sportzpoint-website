import { NextResponse } from 'next/server';
import { articleCache } from '@/utils/cache';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;
    const category = searchParams.get('category');

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Generate cache key based on query parameters
    const cacheKey = `${category || 'all'}-${page}-${limit}`;

    // Fetch data with stale-while-revalidate
    const { data, isStale } = await articleCache.getWithSWR(
      cacheKey,
      async () => {
        // Build the API URL with pagination parameters
        let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/articles?offset=${offset}&limit=${limit}`;
        if (category) {
          apiUrl += `&category=${category}`;
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }

        return response.json();
      }
    );

    // Set cache control headers based on data freshness
    const cacheControl = isStale
      ? 'public, s-maxage=1, stale-while-revalidate=59'
      : 'public, s-maxage=60, stale-while-revalidate=59';

    return NextResponse.json(
      {
        articles: data.articles,
        total: data.total,
        page,
        limit,
        isStale,
      },
      {
        headers: {
          'Cache-Control': cacheControl,
        },
      }
    );
  } catch (error) {
    console.error('Error in articles API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
