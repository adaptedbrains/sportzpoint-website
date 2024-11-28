"use client";
import { formatDate } from "@/util/timeFormat";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const SectionArticleCard = ({ post }) => {
  const router = useRouter();

  if (!post) return null;

  const handleClick = () => {
    if (!post?.categories?.[0]?.slug) return;
    router.push(`/${post.categories[0].slug}/${post.slug}`);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <div 
        className="bg-white hover:bg-gray-50 transition-colors border border-gray-200 rounded-lg overflow-hidden cursor-pointer flex flex-col h-full col-span-2"
        onClick={handleClick}
      >
        {/* Image container with fixed aspect ratio */}
        

        <div className="relative w-full pt-[56.25%]">
        {post.banner_image ? (
          <Image
            src={`https://img-cdn.thepublive.com/fit-in/1280x720/filters:format(webp)/sportzpoint/media/${post.banner_image}`}
            alt={post.title}
            fill
            objectFit="cover" // Ensures the image covers the entire container while maintaining its aspect ratio
            objectPosition="center" // Centers the image
            priority
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>




        {/* Content Section */}
        <div className="p-3 flex flex-col h-full">
          {/* Categories and Live Tag */}
          <div className="flex flex-wrap gap-1 mb-2">
            {post.isLive && (
              <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded flex items-center">
                LIVE
              </span>
            )}
            {post.categories?.map((c, i) => (
              <span 
                key={i} 
                className="text-[10px] font-medium text-[#006356] bg-[#006356]/10 px-2 py-0.5 rounded"
              >
                {c.name || "Uncategorized"}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="text-base md:text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
            {post.title}
          </h2>

          {/* Summary - Only visible on larger screens */}
          <p className="hidden md:block text-sm text-gray-600 line-clamp-2 mb-2">
            {post.summary}
          </p>

          {/* Author and Meta Info */}
          <div className="mt-auto">
            <p className="text-xs text-gray-600 truncate">
              By {post.author?.name || "Unknown Author"}
            </p>
            <div className="flex items-center text-[10px] text-gray-500 mt-1">
              <span className="truncate">
                {formatDate(post.updated_at_datetime)}
              </span>
              <span className="mx-2 flex-shrink-0">•</span>
              <span className="truncate">
                {post.readTime || "2 Min read"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionArticleCard; 