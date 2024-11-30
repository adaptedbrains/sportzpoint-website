"use client";

import { formatDate } from "@/util/timeFormat";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ArticleGridCard = ({ post }) => {
  const router = useRouter();
  const [imageLoading, setImageLoading] = useState(true);

  if (!post) {
    return (
      <div className="text-center text-red-600 font-semibold">
        Data is missing
      </div>
    );
  }

  const handleClick = () => {
    const categorySlug = post.primary_category?.[0]?.slug || "general";
    const postSlug = post.slug;

    if (!categorySlug || !postSlug) {
      console.error("Missing required data:", { categorySlug, postSlug, post });
      return;
    }

    router.push(`/${categorySlug}/${postSlug}`);
  };

  const renderingCategory = [...(post.primary_category || []), ...(post.categories || [])];
  const uniqueRenderingCategory = Array.from(
    new Map(renderingCategory.map(item => [item._id, item])).values()
  );

  // Handle image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `https://dmpsza32x791.cloudfront.net/${imagePath}`;
  };

  return (
    <div
      className="bg-white hover:bg-gray-50 transition-colors border border-gray-200 rounded-lg overflow-hidden cursor-pointer flex flex-col"
      onClick={handleClick}
    >
      {/* Image container with fixed aspect ratio */}
      <div className="relative w-full pt-[56.25%]">
        {post.banner_image ? (
          <>
            <div 
              className={`absolute inset-0 bg-gray-200 ${
                imageLoading ? 'animate-pulse' : 'hidden'
              }`}
            />
            <Image
              src={getImageUrl(post.banner_image)}
              alt={post.banner_desc || post.title || ""}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-cover absolute top-0 left-0 transition-opacity duration-300 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              quality={75}
              priority={false}
              loading="lazy"
              onLoadingComplete={() => setImageLoading(false)}
              onError={(e) => {
                console.error('Image failed to load:', post.banner_image);
                setImageLoading(false);
              }}
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>

      {/* Content container */}
      <div className="p-3 flex-1 flex flex-col">
        {/* Categories and Live indicator */}
        <div className="flex flex-wrap gap-1 mb-2">
          {post.isLive && (
            <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded flex items-center">
              LIVE
            </span>
          )}
          {uniqueRenderingCategory && uniqueRenderingCategory.map((c, i) => (
            <span
              key={i}
              className="text-[10px] font-medium text-[#006356] bg-[#006356]/10 px-2 py-0.5 rounded"
            >
              {c.name || "Uncategorized"}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">
          {post.title || "No Title Available"}
        </h3>

        {/* Author and metadata */}
        <div className="mt-auto">
          <p className="text-xs text-gray-600 truncate">
            By{" "}
            {post.credits?.map((c, i) => (
              <span key={i}>
                {i > 0 && ", "}
                {c.name}
              </span>
            )) || "Unknown"}
          </p>
          <p className="text-xs text-gray-500">
            {formatDate(post.published_date)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleGridCard;
