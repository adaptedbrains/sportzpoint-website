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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-4 lg:px-16 mt-7">
            {/* Sidebar */}
            <div className="col-span-2 flex-col gap-4 sticky top-0 h-screen hidden lg:flex">
                <LoginSignUp />
                <FeaturedEvents />
                <Follow />
            </div>

            {/* Main Content */}
            <div className="col-span-1 lg:col-span-6">
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

            {/* Right sidebar with Latest stories and Newsletter */}
            <div className="lg:col-span-4 col-span-1">
                {/* Latest Stories - scrollable */}
                <div className="mb-6">
                    <LatestStories />
                </div>
                
                {/* Newsletter - fixed position */}
                <div className="sticky top-20 bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex flex-col items-start">
                        <h2 className="text-xl font-bold text-green-800 mb-2">Subscribe Newsletter</h2>
                        <div className="w-10 h-[1px] bg-green-800 mb-4"></div>
                        
                        <p className="text-sm text-gray-600 mb-4">
                            Get the latest sports updates and news delivered directly to your inbox.
                        </p>
                        
                        <form className="w-full space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-sm"
                                required
                            />
                            
                            <button
                                type="submit"
                                className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                            >
                                Subscribe Now
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
