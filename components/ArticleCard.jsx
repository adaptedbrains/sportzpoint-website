"use client";

import { formatDate } from "@/util/timeFormat";
import Image from "next/image";
import React from "react";



const ArticleCard = ({ post }) => {
  if (!post) {
    return (
      <div className="text-center text-red-600 font-semibold">
        Data is missing
      </div>
    );
  }

  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {post.banner_image && (
        <Image
          src={`https://img-cdn.thepublive.com/fit-in/1280x720/filters:format(webp)/${post.banner_image}`}
          alt="Article"
          width={800}
          height={700}
          className="object-contain"
        />
      )}
      <div className="p-4">
        <p className="text-sm text-green-600 font-semibold">Cricket</p>
        <h2 className="text-lg font-bold text-gray-800 mt-1">{post.title}</h2>
        <p className="text-sm text-gray-600 mt-2">{post.summary}</p>
        <div className="mt-3 flex items-center text-gray-500 text-sm">
          <p>{post.author.name || "Unknown Author"}</p>
          <span className="mx-2">•</span>
          <p>{formatDate(post.updated_at_datetime)}</p>
          <span className="mx-2">•</span>
          <p>{post.readTime || "2 Min read"}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
