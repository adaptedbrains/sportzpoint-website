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
      className="bg-white mt-2 border border-gray-300 rounded-lg overflow-hidden shadow-md  cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative w-full h-[150px]">
        {post.banner_image ? (
          <Image
            src={`https://sportzpoint-media.s3.ap-south-1.amazonaws.com/${post.banner_image}`}
            alt="Article"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
          />
        ) : (
          <div className="flex items-center justify-center bg-gray-200 h-full text-gray-400">
            No Image Available
          </div>
        )}
      </div>
      <div className="w-full p-2">
        <div className="flex gap-1">

      {post.categories.length && post.categories!==0 && post.categories.map((c,i)=><span key={i} className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-md">
          {c?.name || "Uncategorized"}
        </span>)}
        </div>
        
        <h3 className="mt-2 text-sm font-bold text-gray-800 leading-snug">
          {post.title || "No Title Available"}
        </h3>
        <p className="text-xs text-gray-600 mt-2">
          By {post.author.name || "Unknown Author"}
        </p>
        <div className="flex items-center text-[10px] text-gray-500 mt-2">
          <span>
            {post.updated_at_datetime
              ? formatDate(post.updated_at_datetime)
              : "No Date"}
          </span>
          <span className="mx-2">•</span>
          <span>{post.readTime || "2 min read"}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleGridCard;
