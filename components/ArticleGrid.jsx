'use client';

import { Suspense, useState, useEffect, useTransition } from 'react';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useStaggeredLoad } from '@/utils/staggeredLoad';
import ArticleGridCard from './ArticleGridCard';
import ArticleGridSkeleton from './ArticleGridSkeleton';

const ITEMS_PER_PAGE = 12;
const BATCH_SIZE = 4;
const STAGGER_DELAY = 150;

// Separate component for the article list to enable better suspense boundaries
const ArticleList = ({ articles }) => {
  const { loadWithStagger } = useStaggeredLoad(100);
  const [visibleArticles, setVisibleArticles] = useState([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const staggeredArticles = await loadWithStagger(
        articles,
        BATCH_SIZE,
        STAGGER_DELAY
      );
      setVisibleArticles(staggeredArticles);
    });
  }, [articles]);

  return (
    <>
      {visibleArticles.map((article, index) => (
        <ArticleGridCard
          key={`${article.id}-${index}`}
          post={article}
          priority={index < 4} // Prioritize loading for first 4 articles
        />
      ))}
      {isPending && (
        <div className="col-span-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(BATCH_SIZE)].map((_, i) => (
              <ArticleGridSkeleton key={`stagger-loading-${i}`} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const ArticleGrid = ({ initialArticles, category }) => {
  const [articles, setArticles] = useState(initialArticles);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreArticles = async () => {
    try {
      const nextPage = page + 1;
      const response = await fetch(
        `/api/articles?page=${nextPage}&limit=${ITEMS_PER_PAGE}${category ? `&category=${category}` : ''}`
      );
      const data = await response.json();
      
      if (data.articles.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }
      
      setArticles(prev => [...prev, ...data.articles]);
      setPage(nextPage);
    } catch (error) {
      console.error('Error fetching more articles:', error);
      throw error;
    }
  };

  const { loading, error } = useInfiniteScroll({
    fetchMore: fetchMoreArticles,
    hasMore,
    threshold: 200
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      <Suspense fallback={
        <div className="col-span-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
              <ArticleGridSkeleton key={`initial-loading-${i}`} />
            ))}
          </div>
        </div>
      }>
        <ArticleList articles={articles} />
      </Suspense>
      
      {loading && (
        <div className="col-span-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(BATCH_SIZE)].map((_, i) => (
              <ArticleGridSkeleton key={`infinite-loading-${i}`} />
            ))}
          </div>
        </div>
      )}
      
      {error && (
        <div className="col-span-full text-center text-red-600 py-4">
          Error loading more articles. Please try again.
        </div>
      )}
      
      {!hasMore && (
        <div className="col-span-full text-center text-gray-600 py-4">
          No more articles to load.
        </div>
      )}
    </div>
  );
};

export default ArticleGrid;
