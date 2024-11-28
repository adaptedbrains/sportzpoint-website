"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import usePostStore from "@/store/postStore";
import FeaturedEvents from "@/components/FeaturedEvents";
import LoginSignUp from "@/components/LoginSignUp";
import Follow from "@/components/Follow";
import ArticleCard from "@/components/ArticleCard";
import ArticleGridCard from "@/components/ArticleGridCard";
import LatestStories from "@/components/LatestStory";
import SectionArticleCard from "@/components/SectionArticleCard";

const Page = () => {
    const pathname = usePathname();
    const slug = pathname.split("/")[1];
    const [currentPage, setCurrentPage] = useState(1);
    const { posts, loading, error, fetchPosts, totalPages } = usePostStore();

    useEffect(() => {
        if (slug) {
            setCurrentPage(1);
            const url = `${process.env.NEXT_PUBLIC_API_URL}/articles/tags/${slug}?limit=20&page=1`;
            fetchPosts(url);
        }
    }, [slug, fetchPosts]);
    
    useEffect(() => {
        if (slug) {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/articles/tags/${slug}?limit=20&page=${currentPage}`;
            fetchPosts(url);
        }
    }, [slug, currentPage, fetchPosts]);

    const generatePageButtons = () => {
        const buttons = [1];
        if (currentPage > 1) buttons.push(currentPage - 1);
        buttons.push(currentPage);
        if (currentPage < totalPages) buttons.push(currentPage + 1);
        if (totalPages) buttons.push(totalPages);
        return [...new Set(buttons)].sort((a, b) => a - b);
    };

    return (
        <div className="w-full px-4 md:px-6 lg:px-8 xl:px-4 2xl:px-0 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4">
            {/* Left Sidebar */}
            <aside className="hidden lg:block lg:col-span-3 xl:col-span-2">
                <div className="flex flex-col gap-4 sticky top-[64px]">
                    <FeaturedEvents />
                    <Follow />
                </div>
            </aside>
    
            {/* Main Content */}
            <main className="lg:col-span-7 xl:col-span-7 col-span-1">
                {/* Featured Articles - First two posts */}
                {/* {posts?.length > 0 && (
                    <ArticleCard 
                        mainPost={posts[0]} 
                        secondaryPost={posts[1]} 
                    />
                )} */}
                 <SectionArticleCard post={posts[0]} />
                
                {/* Grid Articles - Remaining posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                    {posts?.slice(1).map((article, index) => (
                        <ArticleGridCard key={index} post={article} />
                    ))}
                </div>
    
                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 mt-6">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1 || loading}
                    >
                        Previous
                    </button>
    
                    {generatePageButtons().map((page) => (
                        <button
                            key={page}
                            className={`px-4 py-2 rounded ${
                                page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}
    
                    <button
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => 
                            totalPages ? Math.min(prev + 1, totalPages) : prev + 1
                        )}
                        disabled={currentPage === totalPages || loading}
                    >
                        Next
                    </button>
                </div>
            </main>
    
            {/* Right Sidebar */}
            <aside className="lg:col-span-3 col-span-1">
                <div className="sticky top-[64px] space-y-4">
                    <LatestStories />
                </div>
            </aside>
        </div>
    </div>
    

    );
};

export default Page;
