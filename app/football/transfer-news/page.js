'use client';

import React, { useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import usePostStore from "@/store/postStore";
import FeaturedEvents from "@/components/FeaturedEvents";
import LoginSignUp from "@/components/LoginSignUp";
import Follow from "@/components/Follow";
import ArticleListCard from "@/components/ArticleListCard";
import ArticleCard from "@/components/ArticleCard";
import ArticleGridCard from "@/components/ArticleGridCard";
import LatestStories from "@/components/LatestStory";

const Sidebar = () => (
    <div className="col-span-2  flex-col gap-4 sticky top-0 h-screen hidden lg:flex">
        {/* Sidebar is hidden on screens smaller than 'lg' */}
        <LoginSignUp />
        <FeaturedEvents />
        <Follow />
    </div>
);

const PaginationControls = ({ currentPage, setCurrentPage, totalPages, loading }) => {
    const pageButtons = useMemo(() => {
        const buttons = [1]; // Always show page 1
        if (currentPage > 1) buttons.push(currentPage - 1);
        buttons.push(currentPage);
        if (currentPage < totalPages) buttons.push(currentPage + 1);
        if (totalPages) buttons.push(totalPages);
        return [...new Set(buttons)].sort((a, b) => a - b);
    }, [currentPage, totalPages]);

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            <button
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || loading}
            >
                Previous
            </button>
            {pageButtons.map((page) => (
                <button
                    key={page}
                    className={`px-4 py-2 rounded ${page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>
            ))}
            <button
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => (totalPages ? Math.min(prev + 1, totalPages) : prev + 1))}
                disabled={currentPage === totalPages || loading}
            >
                Next
            </button>
        </div>
    );
};

const Page = () => {
    const pathname = usePathname();
    const slug = pathname.split("/")[1];
    const [currentPage, setCurrentPage] = useState(1);
    const { posts, loading, fetchPosts, totalPages } = usePostStore();
   
    const url = useMemo(() => {
        if (!slug) return null;
        return `${process.env.NEXT_PUBLIC_API_URL}/articles/category/${slug}?limit=20&page=${currentPage}`;
    }, [slug, currentPage]);
    
    useEffect(() => {
        if (url) fetchPosts(url);
    }, [url, fetchPosts]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 px-4 lg:px-28 mt-7">
            {/* Sidebar - on mobile, it will stack at the top */}
           <Sidebar />

            {/* Main Content */}
            <div className="lg:col-span-5 col-span-1">
                {posts && posts[0] && <ArticleCard post={posts[0]} />}
                <div className="grid grid-cols-1 gap-3">
                    {posts.slice(1, 11).map((article, index) => (
                        <ArticleListCard key={index} post={article} />
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    {posts.slice(11, 20).map((article, index) => (
                        <ArticleGridCard key={index} post={article} />
                    ))}
                </div>
                <PaginationControls
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    loading={loading}
                />
            </div>

            {/* Latest Stories - on mobile, will stack under the content */}
            <div className="lg:col-span-3 col-span-1 sticky lg:top-20 top-0 h-auto lg:h-screen overflow-y-auto mb-4 lg:mb-0">
                <LatestStories  />
            </div>
        </div>
    );
};

export default Page;
