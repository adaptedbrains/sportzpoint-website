'use client'
import { formatDate } from "@/util/timeFormat";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation



const ArticleListCard = ({ post }) => {
  const router = useRouter();

  if (!post) {
    return (
      <div className="text-center text-red-600 font-semibold">
        Data is missing
      </div>
    );
  }
  const handleClick = () => {
    router.push(`/${post.categories[0].slug}/${post._id}`); // Adjust the route as needed
  };


  return (
    <div className="bg-white mt-2 border border-gray-300 rounded-lg overflow-hidden shadow-md flex gap-2 items-center  cursor-pointer"onClick={handleClick} >
      {post.banner_image ? (
        <Image
          src={`https://img-cdn.thepublive.com/fit-in/1280x720/filters:format(webp)/${post.banner_image}`}
          alt="Article"
          width={230}
          height={50}
          className="object-contain"
        />
      ) : (
        <div className="flex items-center justify-center bg-gray-200 w-[230px] h-[50px] text-gray-400">
          No Image Available
        </div>
      )}
      <div className="w-[80%]">
        <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-md">
          {post.category?.[0]?.name || "Uncategorized"}
        </span>
        <h3 className="mt-2 text-sm font-bold text-gray-800 leading-snug">
          {post.title || "No Title Available"}
        </h3>
        <p className="text-xs text-gray-600 mt-2">
          By {post.author.name || "Unknown Author"}
        </p>
        <div className="flex items-center text-xs text-gray-500 mt-2">
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

export default ArticleListCard;
