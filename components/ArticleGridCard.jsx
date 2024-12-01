"use client";

import { formatDate } from "@/util/timeFormat";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

const ArticleGridCard = ({ post }) => {
  const router = useRouter();

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
  const renderingCategory = [...post.primary_category, ...post.categories];
  const uniqueRenderingCategory = Array.from(
    new Map(renderingCategory.map((item) => [item._id, item])).values()
  );

  return (
    <div
      className="bg-white hover:bg-gray-50 transition-colors border border-gray-200 rounded-lg overflow-hidden cursor-pointer flex flex-col"
      onClick={handleClick}
    >
      {/* Image container with fixed aspect ratio */}
      <div className="relative w-full pt-[56.25%]">
        {" "}
        {/* 16:9 aspect ratio */}
        {post.banner_image ? (
          <Image
            src={`https://dmpsza32x691.cloudfront.net/${post.banner_image}`}
            alt={post.banner_desc || post.title || ""}
            fill
            className="object-cover absolute top-0 left-0"
            priority
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
            No Image
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

          {uniqueRenderingCategory.map(
            (c, i) =>
              c.name &&
              c.name !== "Sports" && (
                <div key={i}>
                  <span className="text-[10px] font-medium text-[#006356] bg-[#006356]/10 px-2 py-0.5 rounded">
                    {c.name || "Uncategorized"}
                  </span>
                </div>
              )
          )}
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
                {c.name}
                {i < post.credits.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
          <div className="flex items-center text-[10px] text-gray-500 mt-1">
            <span className="truncate">{formatDate(post.published_at_datetime)}</span>
            <span className="mx-2 flex-shrink-0">•</span>
            <span className="flex-shrink-0">{post.readTime || "2 min read"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleGridCard;
