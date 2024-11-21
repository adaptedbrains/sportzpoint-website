import Image from "next/image";
import React from "react";

const ArticleListCard = ({
  imageUrl,
  category,
  title,
  author,
  date,
  readTime,
}) => {
  return (
    <div className="bg-white mt-2 border border-gray-300 rounded-lg overflow-hidden shadow-md flex gap-2 items-center">
      <Image
        src={imageUrl} // Dynamic image source
        alt="Article"
        width={230}
        height={50}
        className="object-contain"
      />
      <div className="w-[80%]">
        <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-md">
          {category}
        </span>
        <h3 className="mt-2 text-sm font-bold text-gray-800 leading-snug">
          {title}
        </h3>
        <p className="text-xs text-gray-600 mt-2">By&nbsp;{author}</p>
        <div className="flex items-center text-xs text-gray-500 mt-2">
          <span>{date}</span>
          <span className="mx-2">•</span>
          <span>{readTime}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleListCard;
