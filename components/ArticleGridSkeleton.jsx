'use client';

const ArticleGridSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="relative w-full pt-[56.25%] bg-gray-200" />
      
      {/* Content placeholders */}
      <div className="p-4">
        {/* Category placeholder */}
        <div className="flex gap-2 mb-2">
          <div className="h-5 w-20 bg-gray-200 rounded" />
          <div className="h-5 w-20 bg-gray-200 rounded" />
        </div>
        
        {/* Title placeholder */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-6 bg-gray-200 rounded w-1/2" />
        </div>
        
        {/* Date placeholder */}
        <div className="mt-4 h-4 bg-gray-200 rounded w-32" />
      </div>
    </div>
  );
};

export default ArticleGridSkeleton;
