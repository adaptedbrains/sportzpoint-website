"use client";
import { formatDate } from "@/util/timeFormat";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const SectionArticleCard = ({ post }) => {
  const router = useRouter();

  if (!post) return null;

  const handleClick = () => {
    if (!post?.primary_category?.[0]?.slug) return;
    router.push(`/${post.primary_category[0].slug}/${post.slug}`);
  };

  const renderingCategory = [...post.primary_category, ...post.categories];
  const uniqueRenderingCategory = Array.from(
    new Map(renderingCategory.map((item) => [item._id, item])).values()
  );

  return (
    <div
      className="bg-white hover:bg-gray-50 transition-colors border border-gray-200 rounded-lg overflow-hidden cursor-pointer flex flex-col h-full"
      onClick={handleClick}
    >
      <div className="relative w-full pt-[56.25%]">
        {post.banner_image ? (
          <Image
            src={`https://dmpsza32x691.cloudfront.net/${post.banner_image}`}
            alt={post.banner_desc || post.title || ""}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col h-full">
        <div className="flex flex-wrap gap-1 mb-3">
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

        <h2 className="text-xl font-semibold text-gray-800 line-clamp-2 mb-3">
          {post.title}
        </h2>

        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {post.summary}
        </p>

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
            <span className="truncate">
              {formatDate(post.updated_at_datetime)}
            </span>
            <span className="mx-2 flex-shrink-0">•</span>
            <span className="truncate">{post.readTime || "2 Min read"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionArticleCard;
