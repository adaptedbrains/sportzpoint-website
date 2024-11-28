"use client";

import { formatDate } from "@/util/timeFormat";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

const ArticleGridCard = ({ post }) => {
  const router = useRouter();

  // Add this debug log
  // console.log("Post data:", {
  //   slug: post.slug,
  //   categories: post.categories,
  //   firstCategory: post.categories?.[0],
  // });

  if (!post) {
    return (
      <div className="text-center text-red-600 font-semibold">
        Data is missing
      </div>
    );
  }
  const handleClick = () => {
    const categorySlug = post.categories?.[0]?.slug || "general";
    const postSlug = post.slug;

    if (!categorySlug || !postSlug) {
      console.error("Missing required data:", { categorySlug, postSlug, post });
      return;
    }

    router.push(`/${categorySlug}/${postSlug}`);
  };

  return (
    <div
      className="bg-white hover:bg-gray-50 transition-colors border border-gray-200 rounded-lg overflow-hidden cursor-pointer flex flex-col"
      onClick={handleClick}
    >
      {/* Image container with fixed aspect ratio */}
      <div className="relative w-full pt-[56.25%]"> {/* 16:9 aspect ratio */}
        {post.banner_image ? (
          <Image
            src={`https://sportzpoint.s3.ap-south-1.amazonaws.com/${post.banner_image}`}
            alt={post.title}
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
          {post.categories?.length > 0 && post.categories.map((c, i) => (
            <span key={i} className="text-[10px] font-medium text-[#006356] bg-[#006356]/10 px-2 py-0.5 rounded">
              {c?.name || "Uncategorized"}
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
            By {post.author?.name || "Unknown Author"}
          </p>
          <div className="flex items-center text-[10px] text-gray-500 mt-1">
            <span className="truncate">
              {post.updated_at_datetime ? formatDate(post.updated_at_datetime) : "No Date"}
            </span>
            <span className="mx-2 flex-shrink-0">•</span>
            <span className="flex-shrink-0">{post.readTime || "2 min read"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleGridCard;
