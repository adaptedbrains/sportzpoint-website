"use client";

import { formatDate } from "@/util/timeFormat";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

const ArticleCard = ({ post }) => {
  const router = useRouter(); // Initialize useRouter

  if (!post) {
    return (
      <div className="text-center text-red-600 font-semibold">
        Data is missing
      </div>
    );
  }

  // Function to handle routing when the card is clicked
  const handleClick = () => {
   
    
    router.push(`/${post.categories[0].slug}/${post.slug}`); // Adjust the route as needed
  };
  
  return (
    <div
      className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
      onClick={handleClick} // Add onClick handler here
    >
      {post.banner_image && (
        <Image
        src={`https://sportzpoint-media.s3.ap-south-1.amazonaws.com/${post.banner_image}`}
          alt="Article"
          width={800}
          height={700}
          className="object-contain"
          priority
        />
      )}
      <div className="p-4">
        <div className="flex gap-1">

        {post.categories.length && post.categories!==0 && post.categories.map((c,i)=><p key={i} className="text-sm text-green-600 font-semibold">{c.name || "Uncategorized"} </p>)}
        </div>
        
        <h2 className="text-lg font-bold text-gray-800 mt-1">{post.title}</h2>
        <p className="text-sm text-gray-600 mt-2">{post.summary}</p>
        <div className="mt-3 flex items-center text-gray-500 text-sm">
          <p>{post && post.author && post.author.name &&  post.author.name || "Unknown Author"}</p>
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
